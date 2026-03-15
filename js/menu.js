import { MENU_DATA_FILE, PAGES, ROOT } from "./constants.js";

// Récupère le contenu du menu dans le fichier .json
const loadMenuData = async () => {
    const response = await fetch(MENU_DATA_FILE);

    if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const data = await response.json();
    return data;
};

// Génère le menu complet
export const generateMenu = async () => {
    // données nécessaires (élément + contenu du menu)
    const navBar = document.querySelector(".navbar");
    const menuData = await loadMenuData();

    // fragment à intégrer (= groupe d'éléments)
    const fragment = document.createDocumentFragment();

    // accueil
    const homeMenu = generateHome(menuData.home);
    fragment.appendChild(homeMenu);

    // chaque sous-menu
    for (const subMenuData of menuData.menu) {
        const subMenu = generateSubMenu(subMenuData);
        fragment.appendChild(subMenu);
    }

    // injection du fragment
    navBar.appendChild(fragment);
};

// Génère le bouton Accueil
export const generateHome = (homeData) => {
    // conteneur li.navbar__element
    const homeMenu = document.createElement("li");
    homeMenu.classList.add("navbar__element");

    // lien #navbar__home href=index.html
    const homeLink = document.createElement("a");
    homeLink.id = homeData.id;
    homeLink.href = `${ROOT}${homeData.target}.html`

    // icone Bootstrap
    const homeIcon = document.createElement("i");
    homeIcon.classList = homeData.icon;

    // montage du bloc html
    const textNode = document.createTextNode(homeData.text);

    homeLink.appendChild(homeIcon);
    homeLink.appendChild(textNode);
    homeMenu.appendChild(homeLink);

    // renvoi
    return homeMenu
};

// Génère un sous-menu
export const generateSubMenu = (menuData) => {
    // conteneur du sous-menu
    const container = document.createElement("li");
    container.classList.add("navbar__element");

    // titre du sous-menu
    const title = document.createElement("h2");
    title.textContent = menuData.title;

    // conteneur de l'ensemble des items
    const subContainer = document.createElement("ul");
    subContainer.classList.add("navbar__submenu");

    // ensemble des items
    for (const subMenu of menuData.subMenu) {
        const sub = document.createElement("li");
        const link = document.createElement("a");

        link.setAttribute("href", `${PAGES}${subMenu.tag}.html`);
        link.textContent = subMenu.text;

        sub.appendChild(link);
        subContainer.appendChild(sub);
    }

    // montage
    container.appendChild(title);
    container.appendChild(subContainer);

    return container;
};
