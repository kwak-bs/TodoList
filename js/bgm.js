window.addEventListener("load", () => {
  const audios = document.querySelectorAll(".music");
  const musics = document.querySelectorAll(".musics div");
  const effects = document.querySelector(".music__effects");
  const title = document.querySelector(".music__title");
  const colors = [
    "rgb(178, 32, 112)",
    "rgb(214, 141, 30)",
    "rgb(64, 55, 196)",
    "rgb(4, 184, 13)",
    "rgb(216, 55, 189)",
  ];
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

      createAnimations(index);
    });
  });

  const createAnimations = (index) => {
    effects.innerHTML = "";
    const bubble = document.createElement("div");
    effects.appendChild(bubble);
    bubble.style.backgroundColor = colors[index];
    bubble.style.animation = "animation 2000ms linear infinite both";
    bubble.style.position = "relative";
  };
});
