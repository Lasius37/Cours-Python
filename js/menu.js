const toc = document.querySelector("#page-toc");  // Sélectionne le <details> du <aside>
const summary = toc.querySelector("summary");  // Sélectionne le <summary> du <details> précédent
const tocList = document.querySelector("#toc-list"); // Sélectionne la liste des chapitres de la page
const sections = document.querySelectorAll("main > section[id]"); // Sélectionne toutes les sections qui ont un id (= le plan de la page)
const mainDetails = document.querySelector("#menu-container");  // Sélectionne le <details> principal
const screen768 = window.matchMedia("(min-width: 768px)");  // Vérifie si la largeur de la fenêtre d'affichage >= 768 px
const screen1024 = window.matchMedia("(min-width: 1024px)");  // Vérifie si la largeur de la fenêtre d'affichage >= 1024 px
const tocSlot = document.querySelector("#header-toc-slot");  // Sélectionne l'emplacement du sommaire de la page dans le header
const tocSidebar = document.querySelector("#page-sidebar");  // Sélectionne l'emplacement de la barre de sommaire de la page
const header = document.querySelector("#main-header");


// Ouvre le <details> principal si la largeur est >= 768px;
function updateMenu () {
    mainDetails.open = screen768.matches;
}


// Ouvre le sommaire dès 1024px et désactive sa commande de fermeture.
function updateToc() {
    // Déplacer le même sommaire selon la largeur disponible.
    const destination = screen1024.matches ? tocSidebar : tocSlot;
    destination.appendChild(toc);

    // Le sommaire est automatiquement développé si la fenêtre >=1024px de large
    toc.open = screen1024.matches;

    if (screen1024.matches) {
        summary.setAttribute("aria-disabled", "true");
        summary.setAttribute("tabindex", "-1");
    } else {
        summary.removeAttribute("aria-disabled");
        summary.removeAttribute("tabindex");
    }
}


// Empêche la fermeture sur grand écran, à la souris comme au clavier.
summary.addEventListener("click", (event) => {
    if (screen1024.matches) {
        event.preventDefault();
    }
});


// Partager la hauteur réelle de l’en-tête avec le CSS.
function updateHeaderHeight() {
    document.documentElement.style.setProperty(
        "--header-height",
        `${header.getBoundingClientRect().height}px`
    );
}

// Crée le sommaire de la page à partir du plan
sections.forEach((section) => {
    const heading = section.querySelector(":scope > h2");  // Sélectionne le titre de la section

    if (!heading) return;  // En cas d'erreur

    const link = document.createElement("a");
    link.href = `#${encodeURIComponent(section.id)}`;  // Construit l'adresse du lien
    link.textContent = heading.textContent.trim();

    const item = document.createElement("li");
    item.appendChild(link);  // inclut le lien dans un élément de liste
    tocList.appendChild(item); // inclut le tout dans la liste
});

updateMenu();  // Fonctionne dès le départ
updateToc(); // Fonctionne dès le départ

screen768.addEventListener("change", updateMenu);  // Écoute les modifications de largeur de fenêtre (seuil : 768px)
screen1024.addEventListener("change", updateToc); // Écoute les modifications ed largeur de fenêtre (seuil : 1024px)


const headerObserver = new ResizeObserver(updateHeaderHeight);
headerObserver.observe(header);

updateHeaderHeight();