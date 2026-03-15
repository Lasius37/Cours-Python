import { CURRENT_URL } from "./constants.js";
import { generateMenu, generateAside } from "./menu.js";
import { checkVideos } from "./videos.js"

generateMenu();

if (CURRENT_URL.pathname.includes('/index.html')) {
    generateAside();
} else {
    document.addEventListener("DOMContentLoaded", checkVideos);
}