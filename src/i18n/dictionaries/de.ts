import { siteConfig } from "@/config/site";

/**
 * Alle deutschen Texte der Website.
 * Die englische Fassung (`en.ts`) hat exakt dieselbe Struktur.
 */
export const de = {
  meta: {
    title: `${siteConfig.name} – Digitalstudio für Websites, 3D-Design und Markenauftritte`,
    description:
      "Wir gestalten Websites, 3D-Visualisierungen, Markenauftritte und Interfaces für Unternehmen, Start-ups und Selbstständige in Deutschland und Europa.",
    ogTagline: "Websites, 3D-Design und visuelle Identitäten",
  },

  a11y: {
    skip: "Zum Inhalt springen",
    home: "Zur Startseite",
    mainNav: "Hauptnavigation",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
    language: "Sprache",
    switchTo: "Sprache wechseln",
  },

  nav: {
    services: "Leistungen",
    work: "Projekte",
    process: "Ablauf",
    pricing: "Preise",
    studio: "Studio",
    faq: "Fragen",
    contact: "Kontakt",
    cta: "Projekt starten",
  },

  hero: {
    title: ["Wir gestalten", "digitale", "Erlebnisse."],
    sub: "Websites, 3D-Design und visuelle Identitäten, die Marken unverwechselbar machen.",
    primary: "Projekt starten",
    secondary: "Unsere Leistungen",
    wire: "Drahtgitter",
    render: "Render",
    hint: "Cursor über die Formen bewegen",
  },

  services: {
    title: "Was wir für Sie gestalten",
    intro:
      "Design, 3D und Entwicklung kommen bei uns aus einem Team. Sie haben eine feste Ansprechperson, vom ersten Entwurf bis zum fertigen Ergebnis.",
    more: "Mehr erfahren",
    items: {
      web: {
        title: "Website Development",
        states: ["Wireframe", "Website"],
        short: "Moderne Websites, Online-Shops und individuelle Web-Lösungen.",
        lead: "Websites, die schnell laden, klar führen und Anfragen bringen.",
        intro:
          "Ob Handwerksbetrieb, Restaurant, Online-Shop oder Start-up: Wir entwerfen und entwickeln Ihre Website von Grund auf. Kein Baukasten, kein Template von der Stange. Sie bekommen einen Auftritt, der zu Ihrem Unternehmen passt und auf jedem Gerät funktioniert.",
        deliverables: [
          "Individuelles Design, abgestimmt auf Ihre Marke",
          "Entwicklung mit moderner Technik für kurze Ladezeiten",
          "Saubere Darstellung auf Smartphone, Tablet und Desktop",
          "Online-Shop, Buchung oder Formulare nach Bedarf",
          "Suchmaschinenfreundliche Struktur",
          "Redaktionssystem, damit Sie Inhalte selbst pflegen können",
        ],
        useCases: [
          "Unternehmenswebsites",
          "Online-Shops",
          "Websites für Restaurants und lokale Betriebe",
          "Landingpages für Kampagnen",
          "Portfolios für Selbstständige",
        ],
      },
      "3d": {
        title: "3D Design",
        states: ["Drahtgitter", "Render"],
        short:
          "Realistische 3D-Modelle, CGI, Produktrender und Visualisierungen.",
        lead: "Bilder von Dingen, die es noch nicht gibt oder die sich nicht fotografieren lassen.",
        intro:
          "Wir modellieren Produkte, Räume und Objekte in 3D und setzen sie ins richtige Licht. So entstehen Bilder und Animationen für Shop, Katalog und Kampagne, ohne Fotostudio und in jeder Variante, die Sie brauchen.",
        deliverables: [
          "3D-Modelle nach Fotos, Skizzen oder CAD-Daten",
          "Fotorealistische Produktrender",
          "Farb- und Materialvarianten ohne neues Shooting",
          "Animationen und 360°-Ansichten",
          "Werbemotive und komplette 3D-Szenen",
          "Dateien für Web, Print und Social Media",
        ],
        useCases: [
          "Produktbilder für Online-Shops",
          "Visualisierung von Prototypen",
          "Kampagnen- und Werbemotive",
          "Architektur- und Raumvisualisierung",
          "Animierte Produktfilme",
        ],
      },
      graphic: {
        title: "Graphic Design",
        states: ["Konstruktion", "Logo"],
        short: "Logos, Branding, Werbemittel und Corporate Design.",
        lead: "Ein Erscheinungsbild, das man wiedererkennt.",
        intro:
          "Vom Logo bis zum kompletten Corporate Design: Wir geben Ihrem Unternehmen ein Gesicht, das auf der Visitenkarte genauso funktioniert wie auf dem Firmenwagen oder im Instagram-Feed.",
        deliverables: [
          "Logo und Bildmarke",
          "Farben, Schriften und Gestaltungsregeln",
          "Visitenkarten, Briefpapier und Geschäftsausstattung",
          "Banner, Anzeigen und Social-Media-Vorlagen",
          "Flyer, Broschüren und Verpackungen",
          "Styleguide für die einheitliche Anwendung",
        ],
        useCases: [
          "Neugründungen",
          "Rebranding bestehender Unternehmen",
          "Kampagnen und Aktionen",
          "Verpackungen und Etiketten",
          "Messe- und Werbematerial",
        ],
      },
      uiux: {
        title: "UI/UX Design",
        states: ["Wireframe", "Interface"],
        short: "Intuitive Interfaces und eine durchdachte User Experience.",
        lead: "Oberflächen, die man versteht, ohne nachzudenken.",
        intro:
          "Wir gestalten Apps, Online-Shops und Web-Plattformen so, dass Menschen schnell ans Ziel kommen. Dafür klären wir zuerst Abläufe und Struktur. Erst danach bekommt das Produkt sein Aussehen.",
        deliverables: [
          "Analyse von Nutzern und Abläufen",
          "Wireframes und klickbare Prototypen",
          "Interface-Design für Web und App",
          "Design-System mit wiederverwendbaren Bausteinen",
          "Tests mit echten Nutzern",
          "Übergabe an Ihre Entwicklung oder Umsetzung durch uns",
        ],
        useCases: [
          "Mobile Apps",
          "Online-Shops",
          "Web-Plattformen und Portale",
          "Dashboards und interne Tools",
          "Redesign bestehender Produkte",
        ],
      },
    },
  },

  servicePage: {
    back: "Alle Leistungen",
    includes: "Das bekommen Sie",
    useCases: "Typische Projekte",
    pricingTitle: "Pakete für diese Leistung",
    pricingText:
      "Drei Einstiege zur Orientierung. Den genauen Preis nennen wir Ihnen nach einem kurzen Gespräch.",
    customTitle: "Preis nach Aufwand",
    customText:
      "UI/UX-Projekte unterscheiden sich stark im Umfang. Deshalb erstellen wir hier immer ein individuelles Angebot.",
    others: "Weitere Leistungen",
    ctaTitle: "Erzählen Sie uns von Ihrem Vorhaben",
  },

  /**
   * Beschriftungen innerhalb der Illustrationen (Bildschirme und Verpackungen
   * der Konzeptprojekte). Alle Marken und Zahlen darin sind frei erfunden.
   */
  visuals: {
    arven: {
      nav: ["Projekte", "Büro", "Kontakt"],
      headline: ["Räume,", "die bleiben."],
      projects: ["Haus am Hang", "Stadtbibliothek", "Atelier Nord"],
    },
    lumo: {
      nav: ["Speisekarte", "Abende", "Kontakt"],
      headline: ["Pasta wie", "in Bologna."],
      sub: "Jeden Abend frisch, ab 18 Uhr.",
      chips: ["Heute", "19:30", "2 Personen"],
      cta: "Tisch reservieren",
    },
    runa: {
      today: "Heute",
      distance: "7,4 km",
      time: "38:12",
      pace: "5:09",
      week: "Diese Woche",
      route: "Morgenrunde",
      routeDistance: "5,2",
      unit: "Kilometer",
    },
    kontor: {
      nav: ["Übersicht", "Rechnungen", "Belege", "Steuer"],
      title: "Übersicht",
      period: "März",
      kpis: [
        { label: "Einnahmen", value: "24.380 €" },
        { label: "Ausgaben", value: "9.120 €" },
        { label: "Gewinn", value: "15.260 €" },
      ],
      listTitle: "Rechnungen",
      status: ["Bezahlt", "Offen", "Bezahlt"],
    },
    kardo: {
      product: "Filterkaffee",
      origin: "Äthiopien",
      weight: "250 g",
    },
    vela: {
      tagline: "Yoga und Atem",
      schedule: "Kursplan",
    },
  },

  work: {
    title: "Konzeptprojekte",
    intro:
      "Eigene Studien, an denen wir zeigen, wie wir denken und arbeiten. Alle Marken und Namen sind frei erfunden.",
    filterLabel: "Projekte filtern",
    all: "Alle",
    categories: {
      websites: "Websites",
      "3d": "3D Design",
      branding: "Branding",
      uiux: "UI/UX",
    },
    concept: "Konzeptprojekt",
    empty: "In dieser Kategorie gibt es noch keine Projekte.",
    projects: {
      lumo: {
        title: "Osteria Lumo",
        description:
          "Website mit Tischreservierung für ein italienisches Restaurant.",
      },
      arven: {
        title: "Arven Architekten",
        description: "Portfolio-Website für ein Architekturbüro.",
      },
      nuvra: {
        title: "Nuvra Skincare",
        description: "Produktrender für eine Hautpflege-Serie.",
      },
      mono: {
        title: "Tischleuchte Mono",
        description: "CGI-Stillleben für eine Designleuchte.",
      },
      kardo: {
        title: "Rösterei Kardo",
        description: "Markenauftritt und Verpackung für eine Kaffeerösterei.",
      },
      vela: {
        title: "Studio Vela",
        description: "Logo und Geschäftsausstattung für ein Yogastudio.",
      },
      runa: {
        title: "Runa",
        description: "Lauf-App mit Trainingsplan und Streckenaufzeichnung.",
      },
      kontor: {
        title: "Kontor",
        description: "Finanz-Dashboard für kleine Unternehmen.",
      },
    },
  },

  process: {
    title: "So läuft ein Projekt ab",
    intro:
      "Fünf Schritte, an denen Sie jederzeit sehen, wo wir stehen und was als Nächstes kommt.",
    steps: [
      {
        title: "Kennenlernen",
        text: "Sie schildern Ihr Vorhaben, wir stellen die richtigen Fragen. Danach wissen beide Seiten, was gebraucht wird.",
      },
      {
        title: "Konzept und Angebot",
        text: "Sie erhalten ein schriftliches Angebot mit Umfang, Zeitplan und Preis. Ohne versteckte Posten.",
      },
      {
        title: "Design",
        text: "Wir entwerfen, Sie geben Rückmeldung. In festen Abstimmungsrunden, bis die Richtung stimmt.",
      },
      {
        title: "Umsetzung",
        text: "Aus dem Entwurf wird das fertige Ergebnis: entwickelt, gerendert oder reingezeichnet und gründlich geprüft.",
      },
      {
        title: "Übergabe und Betreuung",
        text: "Sie bekommen alle Dateien und Zugänge. Auf Wunsch begleiten wir Sie auch nach dem Start weiter.",
      },
    ],
  },

  pricing: {
    title: "Pakete und Preise",
    intro:
      "Drei Einstiege je Disziplin. Den genauen Preis nennen wir Ihnen nach einem kurzen Gespräch, schriftlich und nachvollziehbar.",
    tabsLabel: "Disziplin wählen",
    tabs: {
      web: "Website",
      "3d": "3D Design",
      graphic: "Graphic Design",
    },
    from: "Ab",
    placeholder: "…",
    custom: "Individuelles Angebot",
    cta: "Angebot anfragen",
    note: "Die Pakete dienen der Orientierung. Ein verbindliches Angebot erhalten Sie nach dem Erstgespräch.",
    uiuxTitle: "UI/UX Design",
    uiuxText:
      "Interface-Projekte kalkulieren wir immer nach Umfang. Beschreiben Sie Ihr Vorhaben, wir erstellen ein individuelles Angebot.",
    packages: {
      "starter-website": {
        name: "Website-Visitenkarte",
        tagline: "Ihr Unternehmen auf einer Seite – schnell online.",
        features: [
          "Eine Seite mit Ihren wichtigsten Infos",
          "Kontaktdaten, Öffnungszeiten und Anfahrt",
          "Optimiert für Smartphone, Tablet und Desktop",
          "Impressum und Datenschutz eingebunden",
        ],
      },
      "business-website": {
        name: "Business-Website",
        tagline: "Ein One-Pager, der Kunden gewinnt.",
        features: [
          "One-Pager mit Leistungen, Referenzen und FAQ",
          "Individuelles Design mit Animationen",
          "Kontaktformular mit E-Mail-Benachrichtigung",
          "SEO-Grundlagen und schnelle Ladezeit",
          "Mehrsprachigkeit möglich",
        ],
      },
      "premium-website": {
        name: "Online-Shop",
        tagline: "Verkaufen Sie Ihre Produkte direkt online.",
        features: [
          "Produktseiten, Warenkorb und Kasse",
          "Zahlung per PayPal, Karte und mehr",
          "Einfache Verwaltung von Produkten und Bestellungen",
          "Optimiert für Smartphone, Tablet und Desktop",
          "Einweisung nach dem Start",
        ],
      },
      "basic-3d": {
        name: "Basic 3D",
        tagline: "Für einzelne Produkte und einfache Objekte.",
        features: [
          "Ein Objekt oder Produkt",
          "Modellierung nach Fotos oder Skizzen",
          "Mehrere Ansichten als Standbild",
          "Freigestellt oder im Studio-Setting",
        ],
      },
      "professional-3d": {
        name: "Professional 3D",
        tagline: "Für Produktserien und Kampagnenmotive.",
        features: [
          "Mehrere Objekte oder Varianten",
          "Fotorealistische Materialien und Beleuchtung",
          "Szenen mit Umgebung",
          "Standbilder für Druck und Web",
          "Kurze 360°-Animation",
        ],
      },
      "premium-cgi": {
        name: "Premium CGI",
        tagline: "Für Werbefilme und komplette Bildwelten.",
        features: [
          "Animierte Sequenzen",
          "Individuelle Szenen und Kamerafahrten",
          "Simulationen und Effekte",
          "Formate für TV, Web und Social Media",
        ],
      },
      "logo-design": {
        name: "Logo Design",
        tagline: "Für einen starken ersten Eindruck.",
        features: [
          "Mehrere Entwurfsrichtungen",
          "Ausarbeitung des gewählten Logos",
          "Varianten für helle und dunkle Hintergründe",
          "Alle Dateiformate für Druck und Web",
        ],
      },
      "brand-identity": {
        name: "Brand Identity",
        tagline: "Für ein stimmiges Gesamtbild.",
        features: [
          "Logo und Bildmarke",
          "Farbpalette und Typografie",
          "Visitenkarten und Geschäftspapiere",
          "Kompakter Styleguide",
        ],
      },
      "complete-branding": {
        name: "Complete Branding",
        tagline: "Für Marken, die überall wiedererkannt werden sollen.",
        features: [
          "Positionierung und Markenkern",
          "Komplettes Corporate Design",
          "Vorlagen für Social Media und Werbung",
          "Verpackung, Beschilderung und Werbemittel nach Bedarf",
          "Ausführliches Brand Manual",
        ],
      },
    },
  },

  studio: {
    title: "Ein Studio statt vier Dienstleister",
    text: `${siteConfig.name} ist ein unabhängiges Digitalstudio aus Deutschland. Wir entwickeln Websites, bauen 3D-Welten und gestalten Marken und Interfaces in einem Team, das miteinander spricht. Für Sie heißt das: eine Ansprechperson, ein roter Faden und kein Reibungsverlust zwischen Design und Technik.`,
    principles: [
      {
        title: "Erst verstehen, dann gestalten",
        text: "Wir fragen nach Ihren Zielen und Ihren Kunden, bevor wir den ersten Entwurf zeigen.",
      },
      {
        title: "Tempo gehört zum Design",
        text: "Eine Website muss schnell laden, ein Render pünktlich fertig sein. Beides planen wir von Anfang an ein.",
      },
      {
        title: "Klartext",
        text: "Nachvollziehbare Angebote, ehrliche Einschätzungen und Antworten ohne Fachchinesisch.",
      },
      {
        title: "Deutsch, Englisch und Russisch",
        text: "Wir arbeiten mit Unternehmen in Deutschland, Europa und darüber hinaus, remote oder vor Ort.",
      },
    ],
  },

  faq: {
    title: "Häufige Fragen",
    items: [
      {
        q: "Was kostet ein Projekt?",
        a: "Das hängt vom Umfang ab. Unsere Pakete geben eine erste Orientierung. Nach einem kurzen Gespräch erhalten Sie ein schriftliches Angebot, in dem Umfang und Preis klar benannt sind.",
      },
      {
        q: "Wie lange dauert die Umsetzung?",
        a: "Eine kompakte Website oder ein Logo ist oft in wenigen Wochen fertig. Größere Vorhaben wie Online-Shops, komplette Markenauftritte oder CGI-Produktionen planen wir gemeinsam mit festen Meilensteinen.",
      },
      {
        q: "Was brauchen Sie von mir für den Start?",
        a: "Eine kurze Beschreibung Ihres Vorhabens genügt. Vorhandene Logos, Texte, Bilder oder Beispiele, die Ihnen gefallen, helfen uns zusätzlich.",
      },
      {
        q: "Kann ich mehrere Leistungen kombinieren?",
        a: "Ja. Viele Projekte verbinden zum Beispiel ein neues Logo mit einer Website oder Produktrender mit einem Online-Shop. Dafür erstellen wir ein gemeinsames Angebot.",
      },
      {
        q: "Kann ich meine Website später selbst pflegen?",
        a: "Ja, wenn Sie das möchten. Wir richten ein Redaktionssystem ein und zeigen Ihnen, wie Sie Texte und Bilder selbst ändern.",
      },
      {
        q: "Arbeiten Sie auch mit Kunden außerhalb Deutschlands?",
        a: "Ja. Wir arbeiten remote mit Unternehmen in ganz Europa und darüber hinaus, auf Deutsch, Englisch und Russisch.",
      },
      {
        q: "Wem gehören die fertigen Dateien?",
        a: "Ihnen. Mit der Abschlusszahlung erhalten Sie die vereinbarten Nutzungsrechte und alle finalen Dateien.",
      },
    ],
  },

  contact: {
    title: "Projekt starten",
    intro:
      "Erzählen Sie uns kurz, was Sie vorhaben. Wir melden uns mit Rückfragen oder einem ersten Vorschlag.",
    directTitle: "Lieber direkt?",
    emailLabel: "E-Mail schreiben",
    whatsappLabel: "Per WhatsApp schreiben",
    form: {
      legend: "Projektanfrage",
      name: "Name",
      namePlaceholder: "Vor- und Nachname",
      company: "Unternehmen",
      companyPlaceholder: "Name Ihres Unternehmens",
      optional: "optional",
      email: "E-Mail",
      emailPlaceholder: "name@unternehmen.de",
      services: "Welche Leistung interessiert Sie?",
      servicesHint: "Mehrfachauswahl möglich",
      budget: "Ungefähres Budget",
      timeline: "Gewünschter Zeitrahmen",
      message: "Projektbeschreibung",
      messagePlaceholder:
        "Worum geht es? Was soll am Ende entstehen? Gibt es schon Material oder Vorbilder?",
      packageLabel: "Gewähltes Paket",
      removePackage: "Paket entfernen",
      submit: "Anfrage senden",
      submitting: "Anfrage wird gesendet …",
      privacy:
        "Ihre Angaben verwenden wir ausschließlich, um Ihre Anfrage zu bearbeiten. Details stehen in der",
      privacyLink: "Datenschutzerklärung",
      honeypot: "Dieses Feld bitte leer lassen",
    },
    budgets: {
      s: "Unter 1.500 €",
      m: "1.500 bis 5.000 €",
      l: "5.000 bis 15.000 €",
      xl: "Über 15.000 €",
      open: "Noch offen",
    },
    timelines: {
      asap: "So bald wie möglich",
      soon: "In 1 bis 2 Monaten",
      later: "In 3 bis 6 Monaten",
      flexible: "Zeitlich flexibel",
    },
    errors: {
      summary: "Bitte prüfen Sie die markierten Felder.",
      name: "Bitte geben Sie Ihren Namen an.",
      email: "Bitte geben Sie eine gültige E-Mail-Adresse an.",
      services: "Bitte wählen Sie mindestens eine Leistung aus.",
      budget: "Bitte wählen Sie ein ungefähres Budget.",
      timeline: "Bitte wählen Sie einen Zeitrahmen.",
      message:
        "Bitte beschreiben Sie Ihr Projekt in ein paar Sätzen (mindestens 20 Zeichen).",
      messageLong: "Die Beschreibung ist zu lang (maximal 5.000 Zeichen).",
      company: "Der Unternehmensname ist zu lang.",
      sendTitle: "Die Anfrage wurde nicht gesendet",
      send: "Beim Versand ist ein Fehler aufgetreten. Ihre Eingaben sind noch da. Versuchen Sie es erneut oder schicken Sie die Anfrage direkt per E-Mail.",
      rateLimited:
        "Zu viele Anfragen in kurzer Zeit. Bitte warten Sie einige Minuten und versuchen Sie es dann erneut.",
      offline:
        "Keine Verbindung zum Server. Bitte prüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.",
      retry: "Erneut senden",
      viaEmail: "Per E-Mail senden",
    },
    success: {
      title: "Anfrage gesendet",
      text: "Danke, {name}. Ihre Anfrage ist bei uns angekommen. Wir antworten an {email}.",
      nextTitle: "So geht es weiter",
      next: [
        "Wir lesen Ihre Anfrage und klären offene Punkte.",
        "Sie erhalten von uns eine Antwort mit Rückfragen oder einem Terminvorschlag.",
        "Nach dem Gespräch bekommen Sie ein schriftliches Angebot.",
      ],
      again: "Weitere Anfrage senden",
    },
    mailto: {
      subject: "Projektanfrage",
    },
  },

  whatsapp: {
    label: "WhatsApp",
    aria: "Chat auf WhatsApp öffnen",
    message: `Hallo ${siteConfig.name}, ich interessiere mich für ein Projekt.`,
  },

  footer: {
    claim: "Digitalstudio für Websites, 3D-Design, Marken und Interfaces.",
    navTitle: "Seite",
    servicesTitle: "Leistungen",
    contactTitle: "Kontakt",
    legalTitle: "Rechtliches",
    imprint: "Impressum",
    privacy: "Datenschutz",
    rights: "Alle Rechte vorbehalten.",
    backToTop: "Nach oben",
    conceptNote:
      "Alle gezeigten Arbeiten sind Konzeptprojekte mit frei erfundenen Marken.",
  },

  notFound: {
    code: "404",
    title: "Diese Seite gibt es nicht",
    text: "Der Link ist veraltet oder die Adresse enthält einen Tippfehler.",
    home: "Zur Startseite",
    contact: "Projekt starten",
  },

  error: {
    title: "Die Seite konnte nicht geladen werden",
    text: "Laden Sie die Seite neu. Wenn der Fehler bleibt, schreiben Sie uns eine E-Mail.",
    retry: "Seite neu laden",
    home: "Zur Startseite",
  },

  legal: {
    templateNote:
      "Vorlage: Bitte ergänzen Sie Ihre Angaben in src/config/site.ts und lassen Sie diese Seite vor der Veröffentlichung rechtlich prüfen.",
    missing: "[Bitte ergänzen]",
    imprint: {
      title: "Impressum",
      description: `Impressum und Anbieterkennzeichnung von ${siteConfig.name}.`,
      providerTitle: "Angaben gemäß § 5 DDG",
      representedBy: "Vertreten durch",
      contactTitle: "Kontakt",
      phone: "Telefon",
      email: "E-Mail",
      vatTitle: "Umsatzsteuer-ID",
      vatText:
        "Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:",
      registerTitle: "Registereintrag",
      responsibleTitle: "Verantwortlich für den Inhalt",
      responsibleText: "Verantwortlich gemäß § 18 Abs. 2 MStV:",
      disputeTitle: "Verbraucherstreitbeilegung",
      disputeText:
        "Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
      conceptTitle: "Hinweis zu den gezeigten Arbeiten",
      conceptText:
        "Die im Bereich „Projekte“ gezeigten Arbeiten sind Konzeptprojekte. Die dargestellten Marken, Namen und Produkte sind frei erfunden. Ähnlichkeiten mit bestehenden Unternehmen sind nicht beabsichtigt.",
    },
    privacy: {
      title: "Datenschutzerklärung",
      description: `So verarbeitet ${siteConfig.name} personenbezogene Daten auf dieser Website.`,
      sections: [
        {
          title: "Verantwortlicher",
          body: [
            "Verantwortlich für die Datenverarbeitung auf dieser Website ist:",
            "{controller}",
          ],
        },
        {
          title: "Hosting",
          body: [
            "Diese Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA gehostet. Beim Aufruf der Seiten verarbeitet Vercel technisch notwendige Daten wie IP-Adresse, Zeitpunkt des Zugriffs und Browser-Informationen in Server-Protokollen.",
            "Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt im sicheren und stabilen Betrieb der Website.",
            "Dabei können Daten in die USA übertragen werden. Vercel ist nach dem EU-U.S. Data Privacy Framework zertifiziert; die Übermittlung stützt sich auf den Angemessenheitsbeschluss der EU-Kommission (Art. 45 DSGVO). Weitere Informationen: https://vercel.com/legal/privacy-policy",
          ],
        },
        {
          title: "Anfrageformular",
          body: [
            "Wenn Sie uns über das Formular schreiben, verarbeiten wir Ihre Angaben: Name, Unternehmen, E-Mail-Adresse, gewählte Leistung, Budget, Zeitrahmen und Ihre Nachricht. Wir verwenden diese Daten ausschließlich, um Ihre Anfrage zu bearbeiten.",
            "Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen). Die Anfrage wird uns per E-Mail zugestellt. Für den Versand und das Postfach nutzen wir Gmail der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Dabei ist eine Übermittlung an Google LLC in den USA möglich; Google ist nach dem EU-U.S. Data Privacy Framework zertifiziert. Weitere Informationen: https://policies.google.com/privacy",
            "Wir löschen die Daten, sobald sie für die Bearbeitung nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.",
          ],
        },
        {
          title: "Kontakt per E-Mail und WhatsApp",
          body: [
            "Wenn Sie uns per E-Mail schreiben, verarbeiten wir Ihre Nachricht und Ihre Absenderadresse, um zu antworten.",
            "Der WhatsApp-Button öffnet einen Chat in der Anwendung WhatsApp. Erst wenn Sie den Button anklicken, werden Daten an WhatsApp übertragen. Anbieter ist die WhatsApp Ireland Limited. Für die Verarbeitung dort gelten die Datenschutzhinweise von WhatsApp.",
          ],
        },
        {
          title: "Cookies, Tracking und Schriftarten",
          body: [
            "Diese Website setzt keine Cookies und verwendet keine Analyse- oder Werbe-Tools.",
            "Schriftarten werden von unserem eigenen Server geladen. Es wird keine Verbindung zu Servern von Schriftanbietern aufgebaut.",
          ],
        },
        {
          title: "Ihre Rechte",
          body: [
            "Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer Daten, auf Datenübertragbarkeit sowie das Recht, einer Verarbeitung zu widersprechen.",
            "Außerdem können Sie sich bei einer Datenschutz-Aufsichtsbehörde beschweren. Für Fragen zum Datenschutz erreichen Sie uns unter der oben genannten Adresse.",
          ],
        },
      ],
    },
  },
};

export type Dictionary = typeof de;
