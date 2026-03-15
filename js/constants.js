// Détermine le chemin du fichier HTML où s'exécute ce script ----------------------------------------------------------
const CURRENT_URL = new URL(window.location.href);


// Détermine le dossier racine du projet -------------------------------------------------------------------------------
let ROOT;

if (CURRENT_URL.pathname.includes('/pages/')) {
    ROOT = new URL('../', CURRENT_URL).href; // toutes les autres pages
} else {
    ROOT = new URL('./', CURRENT_URL).href; // index.html
}


// Création des autres répertoires et exportation ----------------------------------------------------------------------
const ASSETS = new URL("assets/", ROOT).href;
const CSS = new URL("css/", ROOT).href;
const DATA = new URL("data/", ROOT).href;
const DOCUMENTS = new URL("documents/", ROOT).href;
const JS = new URL("js/", ROOT).href;
const PAGES = new URL("pages/", ROOT).href;
const MENU_DATA_FILE = new URL("menu.json", DATA).href;


// Structure des menus -------------------------------------------------------------------------------------------------
const NAVBAR_CONFIG = {
    containerTag: "li",
    containerClass: "navbar__element",
    titleTag: "h2",
    listTag: "ul",
    listClass: "navbar__submenu",
    itemTag: "li",
    itemClass: ""
};
const SIDEBAR_CONFIG = {
    containerTag: "section",
    containerClass: "sidebar__group",
    titleTag: "h2",
    listTag: "ul",
    listClass: "",
    itemTag: "li",
    itemClass: "sidebar__element"
};


// Exportation ---------------------------------------------------------------------------------------------------------
export { ROOT, CURRENT_URL, ASSETS, CSS, DATA, DOCUMENTS, JS, PAGES, MENU_DATA_FILE, NAVBAR_CONFIG, SIDEBAR_CONFIG };