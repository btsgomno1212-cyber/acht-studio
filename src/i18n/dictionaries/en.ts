import { siteConfig } from "@/config/site";
import type { Dictionary } from "./de";

/** English copy. Mirrors the structure of `de.ts` one to one. */
export const en: Dictionary = {
  meta: {
    title: `${siteConfig.name} – Digital studio for websites, 3D design and brand identities`,
    description:
      "We design websites, 3D visuals, brand identities and interfaces for companies, start-ups and independent businesses in Germany and across Europe.",
    ogTagline: "Websites, 3D design and visual identities",
  },

  a11y: {
    skip: "Skip to content",
    home: "Back to home page",
    mainNav: "Main navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
    switchTo: "Switch language",
  },

  nav: {
    services: "Services",
    work: "Work",
    process: "Process",
    pricing: "Pricing",
    studio: "Studio",
    faq: "FAQ",
    contact: "Contact",
    cta: "Start a project",
  },

  hero: {
    title: ["We shape", "digital", "experiences."],
    sub: "Websites, 3D design and visual identities that make brands unmistakable.",
    primary: "Start a project",
    secondary: "Our services",
    wire: "Wireframe",
    render: "Render",
    hint: "Move your cursor across the shapes",
  },

  services: {
    title: "What we design for you",
    intro:
      "Design, 3D and development come from one team. You have a single point of contact, from the first draft to the finished result.",
    more: "Learn more",
    items: {
      web: {
        title: "Website Development",
        states: ["Wireframe", "Website"],
        short: "Modern websites, online shops and custom web solutions.",
        lead: "Websites that load fast, guide clearly and bring in enquiries.",
        intro:
          "Whether you run a trade business, a restaurant, an online shop or a start-up, we design and build your website from the ground up. No site builder, no off-the-shelf template. You get a site that fits your company and works on every device.",
        deliverables: [
          "Custom design that matches your brand",
          "Built with modern technology for short loading times",
          "Clean layout on phone, tablet and desktop",
          "Online shop, booking or forms as needed",
          "Search-engine-friendly structure",
          "A content system so you can edit pages yourself",
        ],
        useCases: [
          "Company websites",
          "Online shops",
          "Websites for restaurants and local businesses",
          "Landing pages for campaigns",
          "Portfolios for freelancers",
        ],
      },
      "3d": {
        title: "3D Design",
        states: ["Wireframe", "Render"],
        short: "Realistic 3D models, CGI, product renders and visualisations.",
        lead: "Images of things that do not exist yet, or that cannot be photographed.",
        intro:
          "We model products, spaces and objects in 3D and light them properly. The result is images and animations for your shop, catalogue and campaign, without a photo studio and in every variant you need.",
        deliverables: [
          "3D models from photos, sketches or CAD data",
          "Photorealistic product renders",
          "Colour and material variants without a new shoot",
          "Animations and 360° views",
          "Advertising visuals and complete 3D scenes",
          "Files for web, print and social media",
        ],
        useCases: [
          "Product images for online shops",
          "Prototype visualisation",
          "Campaign and advertising visuals",
          "Architecture and interior visualisation",
          "Animated product films",
        ],
      },
      graphic: {
        title: "Graphic Design",
        states: ["Construction", "Logo"],
        short: "Logos, branding, advertising material and corporate design.",
        lead: "A look people recognise.",
        intro:
          "From a logo to a complete corporate design, we give your company a face that works on a business card just as well as on a company van or in an Instagram feed.",
        deliverables: [
          "Logo and brand mark",
          "Colours, typefaces and design rules",
          "Business cards, letterhead and stationery",
          "Banners, ads and social media templates",
          "Flyers, brochures and packaging",
          "A style guide for consistent use",
        ],
        useCases: [
          "New businesses",
          "Rebranding existing companies",
          "Campaigns and promotions",
          "Packaging and labels",
          "Trade fair and advertising material",
        ],
      },
      uiux: {
        title: "UI/UX Design",
        states: ["Wireframe", "Interface"],
        short:
          "Intuitive interfaces and a carefully considered user experience.",
        lead: "Interfaces people understand without having to think.",
        intro:
          "We design apps, online shops and web platforms so people reach their goal quickly. We clarify flows and structure first. Only then does the product get its look.",
        deliverables: [
          "Analysis of users and flows",
          "Wireframes and clickable prototypes",
          "Interface design for web and app",
          "A design system with reusable components",
          "Tests with real users",
          "Handover to your developers, or built by us",
        ],
        useCases: [
          "Mobile apps",
          "Online shops",
          "Web platforms and portals",
          "Dashboards and internal tools",
          "Redesign of existing products",
        ],
      },
    },
  },

  servicePage: {
    back: "All services",
    includes: "What you get",
    useCases: "Typical projects",
    pricingTitle: "Packages for this service",
    pricingText:
      "Three starting points for orientation. We give you the exact price after a short conversation.",
    customTitle: "Priced by scope",
    customText:
      "UI/UX projects vary widely in size, so we always prepare a custom quote.",
    others: "More services",
    ctaTitle: "Tell us about your project",
  },

  visuals: {
    arven: {
      nav: ["Projects", "Office", "Contact"],
      headline: ["Spaces", "that stay."],
      projects: ["Hillside House", "City Library", "Atelier North"],
    },
    lumo: {
      nav: ["Menu", "Evenings", "Contact"],
      headline: ["Pasta like", "in Bologna."],
      sub: "Fresh every evening, from 6 pm.",
      chips: ["Today", "7:30 pm", "2 guests"],
      cta: "Book a table",
    },
    runa: {
      today: "Today",
      distance: "7.4 km",
      time: "38:12",
      pace: "5:09",
      week: "This week",
      route: "Morning run",
      routeDistance: "5.2",
      unit: "kilometres",
    },
    kontor: {
      nav: ["Overview", "Invoices", "Receipts", "Tax"],
      title: "Overview",
      period: "March",
      kpis: [
        { label: "Income", value: "€24,380" },
        { label: "Expenses", value: "€9,120" },
        { label: "Profit", value: "€15,260" },
      ],
      listTitle: "Invoices",
      status: ["Paid", "Open", "Paid"],
    },
    kardo: {
      product: "Filter coffee",
      origin: "Ethiopia",
      weight: "250 g",
    },
    vela: {
      tagline: "Yoga and breath",
      schedule: "Class schedule",
    },
  },

  work: {
    title: "Concept projects",
    intro:
      "Self-initiated studies that show how we think and work. All brands and names are fictional.",
    filterLabel: "Filter projects",
    all: "All",
    categories: {
      websites: "Websites",
      "3d": "3D Design",
      branding: "Branding",
      uiux: "UI/UX",
    },
    concept: "Concept project",
    empty: "There are no projects in this category yet.",
    projects: {
      lumo: {
        title: "Osteria Lumo",
        description: "Website with table booking for an Italian restaurant.",
      },
      arven: {
        title: "Arven Architekten",
        description: "Portfolio website for an architecture practice.",
      },
      nuvra: {
        title: "Nuvra Skincare",
        description: "Product renders for a skincare range.",
      },
      mono: {
        title: "Mono table lamp",
        description: "CGI still life for a designer lamp.",
      },
      kardo: {
        title: "Kardo Roastery",
        description: "Brand identity and packaging for a coffee roastery.",
      },
      vela: {
        title: "Studio Vela",
        description: "Logo and stationery for a yoga studio.",
      },
      runa: {
        title: "Runa",
        description: "Running app with training plan and route tracking.",
      },
      kontor: {
        title: "Kontor",
        description: "Finance dashboard for small businesses.",
      },
    },
  },

  process: {
    title: "How a project runs",
    intro:
      "Five steps that show you where we are and what comes next at any time.",
    steps: [
      {
        title: "Getting to know each other",
        text: "You describe what you have in mind, we ask the right questions. Afterwards both sides know what is needed.",
      },
      {
        title: "Concept and quote",
        text: "You receive a written quote with scope, schedule and price. No hidden items.",
      },
      {
        title: "Design",
        text: "We design, you give feedback. In fixed review rounds, until the direction is right.",
      },
      {
        title: "Production",
        text: "The design becomes the finished result: developed, rendered or finalised for print, and tested thoroughly.",
      },
      {
        title: "Handover and support",
        text: "You receive all files and access details. If you wish, we stay on board after launch.",
      },
    ],
  },

  pricing: {
    title: "Packages and pricing",
    intro:
      "Three starting points per discipline. We give you the exact price after a short conversation, in writing and easy to follow.",
    tabsLabel: "Choose a discipline",
    tabs: {
      web: "Website",
      "3d": "3D Design",
      graphic: "Graphic Design",
    },
    from: "From",
    placeholder: "…",
    custom: "Custom quote",
    cta: "Request a quote",
    note: "The packages are for orientation. You receive a binding quote after the first conversation.",
    uiuxTitle: "UI/UX Design",
    uiuxText:
      "We always price interface projects by scope. Describe your project and we will prepare a custom quote.",
    packages: {
      "starter-website": {
        name: "Business card website",
        tagline: "Your business on one page – online fast.",
        features: [
          "One page with your key information",
          "Contact details, opening hours and directions",
          "Optimised for phone, tablet and desktop",
          "Legal notice and privacy policy included",
        ],
      },
      "business-website": {
        name: "Business website",
        tagline: "A one-pager that wins customers.",
        features: [
          "One-pager with services, references and FAQ",
          "Custom design with animations",
          "Contact form with e-mail notification",
          "SEO basics and fast loading",
          "Multiple languages possible",
        ],
      },
      "premium-website": {
        name: "Online shop",
        tagline: "Sell your products directly online.",
        features: [
          "Product pages, cart and checkout",
          "Payment via PayPal, card and more",
          "Easy management of products and orders",
          "Optimised for phone, tablet and desktop",
          "Walkthrough after launch",
        ],
      },
      "basic-3d": {
        name: "Basic 3D",
        tagline: "For single products and simple objects.",
        features: [
          "One object or product",
          "Modelling from photos or sketches",
          "Several views as still images",
          "Cut out or in a studio setting",
        ],
      },
      "professional-3d": {
        name: "Professional 3D",
        tagline: "For product ranges and campaign visuals.",
        features: [
          "Several objects or variants",
          "Photorealistic materials and lighting",
          "Scenes with an environment",
          "Still images for print and web",
          "Short 360° animation",
        ],
      },
      "premium-cgi": {
        name: "Premium CGI",
        tagline: "For commercials and complete visual worlds.",
        features: [
          "Animated sequences",
          "Custom scenes and camera moves",
          "Simulations and effects",
          "Formats for TV, web and social media",
        ],
      },
      "logo-design": {
        name: "Logo Design",
        tagline: "For a strong first impression.",
        features: [
          "Several design directions",
          "Refinement of the chosen logo",
          "Versions for light and dark backgrounds",
          "All file formats for print and web",
        ],
      },
      "brand-identity": {
        name: "Brand Identity",
        tagline: "For a coherent overall picture.",
        features: [
          "Logo and brand mark",
          "Colour palette and typography",
          "Business cards and stationery",
          "Compact style guide",
        ],
      },
      "complete-branding": {
        name: "Complete Branding",
        tagline: "For brands that should be recognised everywhere.",
        features: [
          "Positioning and brand core",
          "Complete corporate design",
          "Templates for social media and advertising",
          "Packaging, signage and promotional material as needed",
          "Detailed brand manual",
        ],
      },
    },
  },

  studio: {
    title: "One studio instead of four suppliers",
    text: `${siteConfig.name} is an independent digital studio based in Germany. We build websites, create 3D worlds and design brands and interfaces in one team that talks to each other. For you that means one contact person, one consistent thread and no friction between design and technology.`,
    principles: [
      {
        title: "Understand first, design second",
        text: "We ask about your goals and your customers before we show a first draft.",
      },
      {
        title: "Speed is part of the design",
        text: "A website has to load fast, a render has to be ready on time. We plan for both from the start.",
      },
      {
        title: "Plain language",
        text: "Quotes you can follow, honest assessments and answers without jargon.",
      },
      {
        title: "German, English and Russian",
        text: "We work with companies in Germany, Europe and beyond, remotely or on site.",
      },
    ],
  },

  faq: {
    title: "Frequently asked questions",
    items: [
      {
        q: "How much does a project cost?",
        a: "That depends on the scope. Our packages give you a first idea. After a short conversation you receive a written quote that states scope and price clearly.",
      },
      {
        q: "How long does it take?",
        a: "A compact website or a logo is often finished within a few weeks. We plan larger projects such as online shops, complete brand identities or CGI productions together with you, with fixed milestones.",
      },
      {
        q: "What do you need from me to get started?",
        a: "A short description of what you have in mind is enough. Existing logos, texts, images or examples you like help us as well.",
      },
      {
        q: "Can I combine several services?",
        a: "Yes. Many projects combine, for example, a new logo with a website or product renders with an online shop. We prepare one joint quote for that.",
      },
      {
        q: "Can I maintain my website myself later?",
        a: "Yes, if you would like to. We set up a content system and show you how to change texts and images yourself.",
      },
      {
        q: "Do you work with clients outside Germany?",
        a: "Yes. We work remotely with companies across Europe and beyond, in German, English and Russian.",
      },
      {
        q: "Who owns the finished files?",
        a: "You do. With the final payment you receive the agreed usage rights and all final files.",
      },
    ],
  },

  contact: {
    title: "Start a project",
    intro:
      "Tell us briefly what you have in mind. We will get back to you with questions or a first proposal.",
    directTitle: "Prefer to reach us directly?",
    emailLabel: "Write an email",
    whatsappLabel: "Message us on WhatsApp",
    form: {
      legend: "Project enquiry",
      name: "Name",
      namePlaceholder: "First and last name",
      company: "Company",
      companyPlaceholder: "Name of your company",
      optional: "optional",
      email: "Email",
      emailPlaceholder: "name@company.com",
      services: "Which service are you interested in?",
      servicesHint: "You can select more than one",
      budget: "Approximate budget",
      timeline: "Preferred timeline",
      message: "Project description",
      messagePlaceholder:
        "What is it about? What should exist at the end? Is there any material or reference already?",
      packageLabel: "Selected package",
      removePackage: "Remove package",
      submit: "Send enquiry",
      submitting: "Sending enquiry …",
      privacy:
        "We use your details only to handle your enquiry. You can find the details in our",
      privacyLink: "privacy policy",
      honeypot: "Please leave this field empty",
    },
    budgets: {
      s: "Under €1,500",
      m: "€1,500 to €5,000",
      l: "€5,000 to €15,000",
      xl: "Over €15,000",
      open: "Not decided yet",
    },
    timelines: {
      asap: "As soon as possible",
      soon: "In 1 to 2 months",
      later: "In 3 to 6 months",
      flexible: "Flexible",
    },
    errors: {
      summary: "Please check the highlighted fields.",
      name: "Please enter your name.",
      email: "Please enter a valid email address.",
      services: "Please select at least one service.",
      budget: "Please select an approximate budget.",
      timeline: "Please select a timeline.",
      message:
        "Please describe your project in a few sentences (at least 20 characters).",
      messageLong: "The description is too long (5,000 characters maximum).",
      company: "The company name is too long.",
      sendTitle: "The enquiry was not sent",
      send: "Something went wrong while sending. Your entries are still here. Try again or send the enquiry directly by email.",
      rateLimited:
        "Too many requests in a short time. Please wait a few minutes and try again.",
      offline:
        "No connection to the server. Please check your internet connection and try again.",
      retry: "Send again",
      viaEmail: "Send by email",
    },
    success: {
      title: "Enquiry sent",
      text: "Thank you, {name}. Your enquiry has reached us. We will reply to {email}.",
      nextTitle: "What happens next",
      next: [
        "We read your enquiry and clarify open points.",
        "You receive a reply from us with questions or a suggested date for a call.",
        "After the conversation you get a written quote.",
      ],
      again: "Send another enquiry",
    },
    mailto: {
      subject: "Project enquiry",
    },
  },

  whatsapp: {
    label: "WhatsApp",
    aria: "Open a chat on WhatsApp",
    message: `Hello ${siteConfig.name}, I am interested in a project.`,
  },

  footer: {
    claim: "Digital studio for websites, 3D design, brands and interfaces.",
    navTitle: "Site",
    servicesTitle: "Services",
    contactTitle: "Contact",
    legalTitle: "Legal",
    imprint: "Legal notice",
    privacy: "Privacy policy",
    rights: "All rights reserved.",
    backToTop: "Back to top",
    conceptNote:
      "All work shown consists of concept projects with fictional brands.",
  },

  notFound: {
    code: "404",
    title: "This page does not exist",
    text: "The link is out of date or the address contains a typo.",
    home: "Back to home page",
    contact: "Start a project",
  },

  error: {
    title: "The page could not be loaded",
    text: "Reload the page. If the error persists, send us an email.",
    retry: "Reload page",
    home: "Back to home page",
  },

  legal: {
    templateNote:
      "Template: please add your details in src/config/site.ts and have this page reviewed by a legal professional before publishing.",
    missing: "[Please complete]",
    imprint: {
      title: "Legal notice",
      description: `Legal notice and provider identification for ${siteConfig.name}.`,
      providerTitle: "Information pursuant to Section 5 DDG",
      representedBy: "Represented by",
      contactTitle: "Contact",
      phone: "Phone",
      email: "Email",
      vatTitle: "VAT ID",
      vatText:
        "VAT identification number pursuant to Section 27 a of the German VAT Act:",
      registerTitle: "Register entry",
      responsibleTitle: "Responsible for content",
      responsibleText: "Responsible pursuant to Section 18 (2) MStV:",
      disputeTitle: "Consumer dispute resolution",
      disputeText:
        "We are neither willing nor obliged to take part in dispute resolution proceedings before a consumer arbitration board.",
      conceptTitle: "Note on the work shown",
      conceptText:
        "The work shown under “Work” consists of concept projects. The brands, names and products depicted are fictional. Any resemblance to existing companies is unintentional.",
    },
    privacy: {
      title: "Privacy policy",
      description: `How ${siteConfig.name} processes personal data on this website.`,
      sections: [
        {
          title: "Controller",
          body: [
            "The controller responsible for data processing on this website is:",
            "{controller}",
          ],
        },
        {
          title: "Hosting",
          body: [
            "This website is hosted by Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA. When pages are requested, Vercel processes technically necessary data such as IP address, time of access and browser information in server logs.",
            "The legal basis is Art. 6 (1) (f) GDPR. Our legitimate interest is the secure and stable operation of the website.",
            "Data may be transferred to the USA in the process. Vercel is certified under the EU-U.S. Data Privacy Framework; the transfer is based on the European Commission's adequacy decision (Art. 45 GDPR). More information: https://vercel.com/legal/privacy-policy",
          ],
        },
        {
          title: "Enquiry form",
          body: [
            "When you write to us using the form, we process the details you provide: name, company, email address, selected service, budget, timeline and your message. We use this data only to handle your enquiry.",
            "The legal basis is Art. 6 (1) (b) GDPR (steps prior to entering into a contract). The enquiry is delivered to us by email. For sending and for our mailbox we use Gmail, provided by Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland. Data may be transferred to Google LLC in the USA; Google is certified under the EU-U.S. Data Privacy Framework. More information: https://policies.google.com/privacy",
            "We delete the data as soon as it is no longer required for handling your enquiry and no statutory retention periods apply.",
          ],
        },
        {
          title: "Contact by email and WhatsApp",
          body: [
            "When you write to us by email, we process your message and your sender address in order to reply.",
            "The WhatsApp button opens a chat in the WhatsApp application. Data is only transferred to WhatsApp once you click the button. The provider is WhatsApp Ireland Limited. WhatsApp's own privacy notice applies to processing there.",
          ],
        },
        {
          title: "Cookies, tracking and fonts",
          body: [
            "This website does not set cookies and does not use analytics or advertising tools.",
            "Fonts are loaded from our own server. No connection to the servers of font providers is established.",
          ],
        },
        {
          title: "Your rights",
          body: [
            "You have the right to access, rectification, erasure and restriction of processing of your data, the right to data portability and the right to object to processing.",
            "You may also lodge a complaint with a data protection supervisory authority. For questions about data protection, you can reach us at the address given above.",
          ],
        },
      ],
    },
  },
};
