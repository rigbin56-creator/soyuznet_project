const music = document.getElementById("bgMusic");
const musicButton = document.getElementById("musicButton");

// Estado inicial
musicButton.textContent = "▶";

// Play / Pause
musicButton.addEventListener("click", () => {

    if (music.paused) {
        music.play();
        musicButton.textContent = "⏸";
    } else {
        music.pause();
        musicButton.textContent = "▶";
    }

});

// Si la música termina (aunque está en loop)
music.addEventListener("ended", () => {
    musicButton.textContent = "▶";
});