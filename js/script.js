import { CURRENT_URL } from "./constants.js";
import { generateMenu } from "./menu.js";
import { checkVideos } from "./videos.js"

generateMenu();

if ("index.html" in CURRENT_URL) {
    generateAside();
} else {
    document.addEventListener("DOMContentLoaded", checkVideos);
}