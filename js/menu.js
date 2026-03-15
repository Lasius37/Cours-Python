import { MENU_DATA_FILE, PAGES, ROOT, NAVBAR_CONFIG, SIDEBAR_CONFIG } from "./constants.js";


// charge les données du menu dans le fichier .json --------------------------------------------------------------------
const loadMenuData = async () => {
    const response = await fetch(MENU_DATA_FILE);

    if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const data = await response.json();
    return data;
};


// Crée un élément HTML ------------------------------------------------------------------------------------------------
const createElement = (tag, className="", text="") => {
    const element = document.createElement(tag);

    if (className) {element.className = className};

    if (text) {element.textContent = text};

    return element;
};


// Crée un lien HTML ---------------------------------------------------------------------------------------------------
const createLink = (href, text) => {
    const link = document.createElement("a");
    link.href = href;
    link.textContent = text;
    return link;
};


// Génère un groupe de menu --------------------------------------------------------------------------------------------
const generateGroup = (menuData, config) => {
    const {
        containerTag,
        containerClass,
        titleTag,
        listTag,
        listClass,
        itemTag,
        itemClass
    } = config;

    const container = createElement(containerTag, containerClass);
    const title = createElement(titleTag, "", menuData.title);
    const subContainer = createElement(listTag, listClass);

    for (const subMenu of menuData.subMenu) {
        const item = createElement(itemTag, itemClass);
        const link = createLink(`${PAGES}${subMenu.tag}.html`, subMenu.text);

        item.appendChild(link);
        subContainer.appendChild(item);

        container.appendChild(title);
        container.appendChild(subContainer);
    }

    return container;
};


// Génère une liste de groupes dans un conteneur -----------------------------------------------------------------------
const generateStructure = (selector, dataList, generator) => {
    const container = document.querySelector(selector);
    if (!container) return;

    const fragment = document.createDocumentFragment();

    for (const data of dataList) {
        fragment.appendChild(generator(data));
    };

    container.appendChild(fragment);
};


// Génère le bouton Accueil --------------------------------------------------------------------------------------------
const generateHome = (homeData) => {
    const homeMenu = createElement("li", "navbar__element");

    const homeLink = document.createElement("a");
    homeLink.id = homeData.id;
    homeLink.href = `${ROOT}${homeData.target}.html`;

    const homeIcon = document.createElement("i");
    homeIcon.classList = homeData.icon;

    const textNode = document.createTextNode(homeData.text);

    homeLink.appendChild(homeIcon);
    homeLink.appendChild(textNode);
    homeMenu.appendChild(homeLink);

    return homeMenu
};


// Génère le menu complet ----------------------------------------------------------------------------------------------
export const generateMenu = async () => {
    const menuData = await loadMenuData();
    const navBar = document.querySelector(".navbar");
    if (!navBar) return;

    const fragment = document.createDocumentFragment();
    fragment.appendChild(generateHome(menuData.home));

    for (const subMenuData of menuData.menu) {
        fragment.appendChild(generateGroup(subMenuData, NAVBAR_CONFIG));
    }

    navBar.appendChild(fragment);
};


// Génère le menu aside ----------------------------------------------------------------------------------------------
export const generateAside = async () => {
    const menuData = await loadMenuData();

    await generateStructure(
        ".sidebar",
        menuData.menu,
        (subMenuData) => generateGroup(subMenuData, SIDEBAR_CONFIG)
    );
};