const playBtn = document.getElementById("play");
const infoPage = document.getElementById("page-info");

playBtn.addEventListener("click", () => {
    TweenMax.to(infoPage, 1, {
        left: "-200px",
        opacity: "0",
        ease: Power0.easeNone
    });
});
