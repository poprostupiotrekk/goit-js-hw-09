function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  switchOnColorBtn: document.querySelector('[data-start]'),
  switchOffColorBtn: document.querySelector('[data-stop]'),
  bodyBkg: document.querySelector('body'),
};

let switchColor = null;

refs.switchOffColorBtn.disabled = true;

refs.switchOnColorBtn.addEventListener('click', () => {
  refs.switchOnColorBtn.disabled = true;
  refs.switchOffColorBtn.disabled = false;
  switchColor = setInterval(() => {
    refs.bodyBkg.style.backgroundColor = getRandomHexColor();
    console.log(
      `Page background current color is ${
        getComputedStyle(refs.bodyBkg).backgroundColor
      }.`
    );
  }, 1000);
});

refs.switchOffColorBtn.addEventListener('click', () => {
  refs.switchOffColorBtn.disabled = true;
  refs.switchOnColorBtn.disabled = false;
  clearInterval(switchColor);
});
