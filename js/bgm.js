window.addEventListener("load", () => {
  const audios = document.querySelectorAll(".music");
  const musics = document.querySelectorAll(".musics div");
  const effects = document.querySelector(".music__effects");
  const title = document.querySelector(".music__title");
  const colors = ["#fcf6f0", "#ff9e9d", "#aecbd9", "#9c99a2", "#e2f4de"];
  const textcolors = ["#ff784b", "#da463c", "#3948b1", "grey", "#50976a"];
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
    // const color = getComputedStyle(document.documentElement).getPropertyValue(
    //   `--music-${index + 1}`
    // );
    title.style.color = textcolors[index];
    effects.innerHTML = "";
    const bubble = document.createElement("div");
    effects.appendChild(bubble);
    bubble.style.backgroundColor = colors[index];
    bubble.style.animation = "animation 2000ms linear infinite both";
    bubble.style.position = "relative";
  };
});
