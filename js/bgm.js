window.addEventListener("load", () => {
  const audios = document.querySelectorAll(".music");
  const musics = document.querySelectorAll(".musics div");
  const effects = document.querySelector(".music__effects");
  const title = document.querySelector(".music__title");

  musics.forEach((music, index) => {
    music.addEventListener("click", function () {
      audios.forEach((idx) => {
        idx.pause();
      });

      audios.forEach((audio) => {
        audio.onended = function () {
          effects.innerHTML = "";
          title.innerHTML = "";
        };
      });
      if (audios[index]) {
        audios[index].currentTime = 0;
        audios[index].play();

        const strArr = audios[index].src.split("sound/");
        title.innerHTML = strArr[1];
      }

      createAnimations(index, music);
    });
  });

  const createAnimations = (index) => {
    const color = getComputedStyle(document.documentElement).getPropertyValue(
      `--music-${index + 1}`
    );

    effects.innerHTML = "";
    const bubble = document.createElement("div");
    effects.appendChild(bubble);
    bubble.style.backgroundColor = color;
    bubble.style.animation = "animation 2000ms linear infinite both";
    bubble.style.position = "relative";
  };
});
