# ACHT — сайт digital-студии

Сайт агентства на немецком и английском: главная с 3D-сценой, услуги, портфолио концепт-проектов, пакеты, форма заявки с отправкой на email, страницы услуг, Impressum и Datenschutz.

Стек: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Motion, Three.js + React Three Fiber, Lenis, Lucide.

«ACHT» — временное название. Оно, контакты и цены меняются в двух-трёх файлах, см. [чек-лист](#чек-лист-перед-публикацией).

---

## Запуск на своём компьютере

Нужен [Node.js](https://nodejs.org) версии 20.9 или новее.

```bash
npm install
cp .env.example .env.local   # Windows: copy .env.example .env.local
npm run dev
```

Сайт откроется на http://localhost:3000 (адрес без языка перенаправит на `/de` или `/en` по языку браузера).

Без заполненного `.env.local` сайт работает полностью, кроме отправки формы: она честно покажет ошибку и предложит написать письмо. Как подключить почту — в разделе [Форма заявки](#форма-заявки).

| Команда             | Что делает                                         |
| ------------------- | -------------------------------------------------- |
| `npm run dev`       | режим разработки с мгновенным обновлением          |
| `npm run build`     | сборка для публикации                              |
| `npm run start`     | запуск собранной версии (после `build`)            |
| `npm run lint`      | проверка кода                                      |
| `npm run typecheck` | проверка типов TypeScript                          |

---

## Чек-лист перед публикацией

Всё, что нужно заменить на свои данные:

| Что                         | Где                                                    |
| --------------------------- | ------------------------------------------------------ |
| Название студии             | `src/config/site.ts` → `name`                          |
| Email на сайте              | `src/config/site.ts` → `email`                         |
| Номер WhatsApp              | `src/config/site.ts` → `whatsapp` (только цифры, с кодом страны: `4915112345678`) |
| Соцсети (необязательно)     | `src/config/site.ts` → `social`                        |
| Данные для Impressum        | `src/config/site.ts` → `legal`                         |
| Цены пакетов                | `src/content/pricing.ts` → `priceFrom`                 |
| Адрес сайта                 | переменная `NEXT_PUBLIC_SITE_URL`                      |
| Почта для заявок            | переменные `MAIL_TO`, `MAIL_FROM`, `SMTP_*` или `RESEND_API_KEY` |
| Логотип                     | `src/components/ui/Logo.tsx`, иконки `src/app/icon.svg`, `apple-icon.png`, `favicon.ico` |

Пока в `legal` не заполнены имя, адрес и город, на страницах Impressum и Datenschutz виден жёлтый блок-напоминание и пометки `[Bitte ergänzen]`. После заполнения они исчезают.

**Важно про юридические страницы.** Impressum и Datenschutzerklärung — шаблоны. В Германии они обязательны для коммерческого сайта, и за их содержание отвечает владелец. Перед запуском впишите хостинг-провайдера и почтовый сервис в текст Datenschutz (`src/i18n/dictionaries/de.ts` и `en.ts`, раздел `legal.privacy`, места отмечены квадратными скобками) и покажите обе страницы юристу или проверьте генератором вроде eRecht24.

---

## Что и где менять

### Тексты

Все тексты лежат в двух файлах с одинаковой структурой:

- `src/i18n/dictionaries/de.ts` — немецкий (основной)
- `src/i18n/dictionaries/en.ts` — английский

Если добавить ключ в один файл и забыть во втором, `npm run typecheck` покажет ошибку.

### Цены

`src/content/pricing.ts`:

```ts
{ id: "starter-website", priceFrom: null },        // на сайте: «Ab … €»
{ id: "starter-website", priceFrom: 1490 },        // на сайте: «Ab 1.490 €»
{ id: "premium-website", priceFrom: null, custom: true }, // «Individuelles Angebot»
```

Названия пакетов и списки того, что в них входит, — в словарях, раздел `pricing.packages`.

### Портфолио

Сейчас в галерее восемь концепт-проектов с выдуманными брендами, каждый помечен «Konzeptprojekt». Когда появятся настоящие работы:

1. Положите обложку в `src/assets/` (например `mein-projekt.webp`, ширина 1600–2000 px).
2. В `src/content/projects.ts` добавьте id в `projectIds` и запись в `projects` с `concept: false` — метка «Konzeptprojekt» у неё не появится.
3. В обоих словарях добавьте название и описание в `work.projects`.
4. В `src/components/visuals/covers.tsx` в функции `ProjectCover` добавьте строку:
   ```tsx
   case "mein-projekt":
     return <ImageCover src={meinProjekt} />;
   ```
   и импорт картинки вверху файла.

Когда концепт-проектов не останется, уберите фразу о них из словарей (`work.intro`, `footer.conceptNote`, `legal.imprint.conceptText`).

### Услуги

Четыре услуги заданы в `src/content/services.ts`, тексты карточек и отдельных страниц — в словарях, раздел `services.items`. Адреса страниц: `/de/services/website-development`, `/3d-design`, `/graphic-design`, `/ui-ux-design`.

### Цвета и шрифт

`src/app/globals.css`, блок `@theme` в начале файла: фон `--color-ink`, неоновый акцент `--color-neon`, размеры заголовков и скругления. Шрифт Archivo лежит в `src/fonts/` и грузится с вашего же сервера — запросов к Google Fonts нет.

### Структура проекта

```
src/
├─ app/
│  ├─ [locale]/            страницы: главная, services/[slug], impressum, datenschutz, 404, error
│  ├─ api/inquiry/route.ts приём заявок и отправка письма
│  ├─ globals.css          дизайн-токены и базовые стили
│  └─ sitemap.ts, robots.ts, manifest.ts, icon.svg …
├─ components/
│  ├─ sections/            секции главной (Hero, Services, Work, Process, Pricing, Studio, Faq, Contact)
│  ├─ three/               3D-сцена первого экрана и её запасная картинка
│  ├─ visuals/             иллюстрации услуг и обложки проектов
│  ├─ form/                форма заявки
│  ├─ layout/              шапка, футер, кнопка WhatsApp, переключатель языка
│  └─ ui/                  мелкие общие элементы
├─ config/site.ts          название, контакты, реквизиты
├─ content/                услуги, проекты, пакеты, варианты в форме
├─ i18n/                   языки и словари
├─ lib/                    почта, проверка заявок, SEO
└─ proxy.ts                перенаправление на язык (/ → /de или /en)
```

---

## Форма заявки

Форма отправляет данные на `/api/inquiry`. Сервер проверяет их и шлёт письмо на адрес из `MAIL_TO`. В поле «Ответить» стоит адрес клиента, так что отвечать можно прямо из почты. Заявки нигде не хранятся, только уходят письмом.

Если отправка не удалась, посетитель видит сообщение об ошибке, его текст остаётся в форме, и ему предлагается готовое письмо в почтовой программе. Ложного «отправлено» не бывает.

Есть два способа подключить почту. Достаточно одного.

### Способ 1. SMTP — ваш обычный почтовый ящик

Подходит любой ящик: IONOS, Strato, Google Workspace, Gmail, mailbox.org и т. д.

```env
MAIL_TO=hallo@ihre-domain.de
MAIL_FROM="Website <website@ihre-domain.de>"
SMTP_HOST=smtp.ionos.de
SMTP_PORT=587
SMTP_USER=website@ihre-domain.de
SMTP_PASS=пароль-от-ящика
```

Адрес сервера и порт смотрите в справке своего провайдера. Обычно это порт 587 или 465. Для примера: IONOS — `smtp.ionos.de`, Strato — `smtp.strato.de`, Gmail — `smtp.gmail.com`. У Gmail вместо обычного пароля нужен «пароль приложения» (в настройках аккаунта Google, при включённой двухэтапной проверке).

`MAIL_FROM` должен быть адресом, с которого этот ящик имеет право отправлять, иначе почтовый сервер отклонит письмо.

### Способ 2. Resend

Если SMTP-доступа нет: зарегистрируйтесь на [resend.com](https://resend.com), создайте API-ключ и впишите:

```env
MAIL_TO=ваш@email.de
RESEND_API_KEY=re_xxxxxxxx
```

Без подтверждённого домена Resend доставляет письма только на адрес, на который зарегистрирован ваш аккаунт Resend. Поэтому в `MAIL_TO` должен стоять именно он — для формы заявок этого достаточно. Чтобы получать заявки на другой адрес или отправлять со своего домена, подтвердите домен в Resend и добавьте `MAIL_FROM="Website <website@ihre-domain.de>"`.

Если заданы и `RESEND_API_KEY`, и `SMTP_HOST`, используется Resend.

### Защита от спама

- скрытое поле-ловушка и проверка времени заполнения: боты получают «успех», письмо не уходит;
- не больше 5 заявок за 10 минут с одного IP;
- запросы с чужих сайтов отклоняются.

Счётчик заявок живёт в памяти сервера. Если спам всё же пойдёт, следующий шаг — капча (например Cloudflare Turnstile) в `src/app/api/inquiry/route.ts`.

---

## Публикация на Vercel

1. Создайте репозиторий на GitHub и загрузите проект:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/ВАШ-ЛОГИН/ВАШ-РЕПОЗИТОРИЙ.git
   git push -u origin main
   ```
   Файл `.env.local` в репозиторий не попадёт — он в `.gitignore`.
2. На [vercel.com](https://vercel.com) нажмите **Add New → Project** и выберите репозиторий. Vercel сам определит Next.js, настройки сборки менять не нужно.
3. До первого деплоя раскройте **Environment Variables** и добавьте те же переменные, что в `.env.local`: `NEXT_PUBLIC_SITE_URL`, `MAIL_TO`, `MAIL_FROM` и либо `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, либо `RESEND_API_KEY`.
4. Нажмите **Deploy**.
5. Подключите домен: **Project → Settings → Domains**. Vercel покажет, какие DNS-записи добавить у регистратора.
6. Впишите итоговый адрес в `NEXT_PUBLIC_SITE_URL` (например `https://www.ihre-domain.de`) и сделайте **Redeploy**. От этой переменной зависят canonical-ссылки, sitemap и картинка для соцсетей.

Каждый `git push` в ветку `main` автоматически публикует новую версию. После изменения переменных окружения нужен Redeploy.

После запуска отправьте тестовую заявку с рабочего сайта. Если письмо не пришло, откройте **Project → Logs** и найдите строку с `[Anfrageformular]` — там написана причина.

---

## SEO

Уже сделано:

- заголовки и описания для каждой страницы и языка, canonical и `hreflang`;
- `sitemap.xml` и `robots.txt` (создаются автоматически);
- картинка для соцсетей (Open Graph) создаётся при сборке из названия студии и заголовка — проверьте её по адресу `/de/opengraph-image`;
- структурированные данные schema.org (студия, услуги, FAQ);
- Impressum и Datenschutz закрыты от индексации.

После публикации добавьте сайт в [Google Search Console](https://search.google.com/search-console) и отправьте там `https://ваш-домен/sitemap.xml`.

Аналитики и cookies на сайте нет, поэтому cookie-баннер не нужен. Если добавите аналитику, понадобятся и баннер, и правка Datenschutz.

---

## Если что-то не так

- **Стили не обновились после правки `globals.css`.** Остановите `npm run dev`, удалите папку `.next` и запустите снова.
- **Форма показывает ошибку.** Локально причина видна в терминале, где запущен `npm run dev`, на Vercel — в Logs. Чаще всего это неверный пароль SMTP или `MAIL_FROM`, с которого ящику нельзя отправлять.
- **3D-сцена не показывается.** В браузерах без WebGL вместо неё выводится статичная картинка `public/hero-poster.webp` — так и задумано.
- **Нужен третий язык.** Добавьте код языка в `src/i18n/config.ts`, создайте словарь по образцу `en.ts` и подключите его в `src/i18n/get-dictionary.ts`. Остальные места (формат цен, подпись языка в письме) покажет `npm run typecheck`.

## Лицензии

Шрифт Archivo — SIL Open Font License, текст лицензии в `src/fonts/OFL.txt`. Иллюстрации, 3D-рендеры и бренды концепт-проектов созданы для этого сайта и не изображают реальные компании.
