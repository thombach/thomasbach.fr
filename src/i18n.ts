export const languages = ["en", "fr"] as const;
export type Lang = (typeof languages)[number];

export const ui = {
  en: {
    metaTitle: "Thomas Bach, full-stack engineer",
    metaDescription:
      "Thomas Bach is a full-stack engineer in Lyon. Projects: web apps, small games, and LED gadgets.",
    role: "Full-stack engineer based in Lyon. I try things out on my computer, some of them end up here.",
    navProjects: "Projects",
    navAbout: "About",
    navContact: "Contact",
    switchLang: "FR",
    switchLangLabel: "Lire en français",
    projects: "Projects",
    about: "About",
    aboutText: [
      "I'm a full-stack engineer in Lyon, with a degree from Polytech Grenoble. I build tools, games and other tech projects, to meet a need or simply to discover something new.",
      "Outside of that, I ride my bike and run, up a mountain when I can.",
    ],
    aboutAlt: "Thomas on a mountain ridge, arms raised",
    contact: "Get in touch",
    contactText: "Questions, ideas, or a project you'd like to talk about: write to me.",
    copy: "Copy address",
    copied: "Copied",
    mapCaption: "Terrain generated on each visit",
    nextSummit: "Another summit",
    north: "N",
    south: "S",
    east: "E",
    west: "W",
    demCredit: "Relief: Copernicus DEM GLO-30, © DLR e.V. 2010-2014 and © Airbus Defence and Space GmbH 2014-2018, provided under COPERNICUS by the European Union and ESA. Lakes and glaciers © OpenStreetMap contributors.",
    playOnItch: "Play on itch.io",
    watchDemo: "Watch the demo on YouTube",
    notFoundTitle: "Page not found",
    notFoundText: "This page doesn't exist or has moved.",
    backHome: "Back to the home page",
  },
  fr: {
    metaTitle: "Thomas Bach, ingénieur full-stack",
    metaDescription:
      "Thomas Bach est ingénieur full-stack à Lyon. Projets : applications web, petits jeux et gadgets LED.",
    role: "Ingénieur full-stack basé à Lyon. Je teste des trucs sur mon ordi, certains finissent ici.",
    navProjects: "Projets",
    navAbout: "À propos",
    navContact: "Contact",
    switchLang: "EN",
    switchLangLabel: "Read in English",
    projects: "Projets",
    about: "À propos",
    aboutText: [
      "Je suis ingénieur full-stack à Lyon, diplômé de Polytech Grenoble. Je crée des outils, des jeux et d'autres projets techniques, pour répondre à un besoin ou simplement découvrir de nouvelles choses.",
      "En dehors de ça, je fais du vélo et je cours, sur une montagne quand je peux.",
    ],
    aboutAlt: "Thomas sur une crête en montagne, les bras levés",
    contact: "Me contacter",
    contactText: "Une question, une idée ou un projet dont vous voulez parler : écrivez-moi.",
    copy: "Copier l'adresse",
    copied: "Copiée",
    mapCaption: "Relief généré à chaque visite",
    nextSummit: "Autre sommet",
    north: "N",
    south: "S",
    east: "E",
    west: "O",
    demCredit: "Relief : Copernicus DEM GLO-30, © DLR e.V. 2010-2014 et © Airbus Defence and Space GmbH 2014-2018, fourni dans le cadre de COPERNICUS par l'Union européenne et l'ESA. Lacs et glaciers © les contributeurs d'OpenStreetMap.",
    playOnItch: "Jouer sur itch.io",
    watchDemo: "Voir la démo sur YouTube",
    notFoundTitle: "Page introuvable",
    notFoundText: "Cette page n'existe pas ou a été déplacée.",
    backHome: "Retour à l'accueil",
  },
} as const;

export type Strings = (typeof ui)[Lang];

export function homePath(lang: Lang) {
  return lang === "en" ? "/" : `/${lang}/`;
}

export function pick(value: string | Record<Lang, string>, lang: Lang): string {
  return typeof value === "string" ? value : value[lang];
}
