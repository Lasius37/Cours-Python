export const checkVideos = () => {
    document.querySelectorAll(".layout__video").forEach(container => {
        const video = container.querySelector("video");
        const source = container.querySelector("source");

        if (!video || !source) return;

        source.addEventListener("error", () => {
            container.remove();
        });

        video.addEventListener("loadedmetadata", () => {
            container.style.display = "block";
        });

        video.load();
    });
};

