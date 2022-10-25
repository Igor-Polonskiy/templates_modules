import {
  scaleImage,
  checkingAnswerPositive,
  checkingAnswerReset,
  renderCheckPanel,
  getCheckPanelElements,
  togglePointerEventElement,
} from "../../common_files/common_scripts.js";

export function renderLetterTracing(
  taskId,
  letter,
  winPercent,
  font,
  rgbValues
) {
  const { r, g, b } = rgbValues;
  const fontSizeLetter = "310px";
  const fontWeightLetter = "bold";
  const letterInsideColor = "rgb(220, 220, 220)";
  const letterConturColor = "rgb(240, 100, 0)";

  const { redValue, greenValue, blueValue } = getRGB(letterInsideColor);

  let pixels = null;
  let letterpixels = null;
  let mousedown = false;
  let isLetterComplete = false;
  let drowColor = `rgb(${r}, ${g}, ${b})`;

  const taskWrapper = document.querySelector(`#${taskId}`);
  const letterPicture = taskWrapper.querySelector(
    ".letterTracing_letter_picture"
  );
  const audio = taskWrapper.querySelector(".letterTracing_letter_audio");
  let c = taskWrapper.querySelector(".letterTracing_letter_canvas");

  renderCheckPanel(taskWrapper, false);
  const { btnReset, controlsBox, infoBox } = getCheckPanelElements(taskWrapper);

  let cx = c.getContext("2d");
  cx.font = `${fontWeightLetter} ${fontSizeLetter} ${font}`;

  letterPicture.addEventListener("pointerdown", onImageClick);
  btnReset.addEventListener("click", reloadTask);

  c.addEventListener("pointerdown", onmousedown, false);
  c.addEventListener("pointerup", onmouseup, false);
  c.addEventListener("pointermove", onmousemove, false);

  if (document.fonts) {
    document.fonts
      .load(`${fontWeightLetter} ${fontSizeLetter} ${font}`)
      .then(function () {
        setupCanvas();
      });
  }

  function onImageClick(e) {
    scaleImage(e.target);
  }

  function getRGB(str) {
    const match = str.match(
      /rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/
    );
    return match
      ? {
          redValue: Number(match[1]),
          greenValue: Number(match[2]),
          blueValue: Number(match[3]),
        }
      : {};
  }

  function setupCanvas() {
    c.height = 300;
    c.width = 600;
    cx.lineCap = "round";
    cx.font = `${fontWeightLetter} ${fontSizeLetter} ${font}`;
    cx.fillStyle = letterInsideColor;
    cx.textBaseline = "middle";

    drawletter(letter, letterInsideColor);
    pixels = cx.getImageData(0, 0, c.width, c.height);

    letterpixels = getpixelamount(redValue, greenValue, blueValue);
  }

  function drawletter(letter, color) {
    let centerx = (c.width - cx.measureText(letter).width) / 2;
    let centery = c.height / 2;
    cx.fillStyle = color;

    cx.fillText(letter, centerx, centery);
    drawletterBorder(letter);
  }

  function drawletterBorder(letter) {
    let centerx = (c.width - cx.measureText(letter).width) / 2;
    let centery = c.height / 2;
    cx.lineWidth = 15;
    cx.lineCap = "round";
    cx.strokeStyle = letterConturColor;
    cx.strokeText(letter, centerx, centery);
  }

  function paint(x, y) {
    let colour = getpixelcolour(x, y);

    if (
      colour.r !== redValue ||
      colour.g !== greenValue ||
      colour.b !== blueValue
    ) {
      mousedown = false;
    } else {
      cx.strokeStyle = drowColor;

      cx.lineWidth = 28;
      cx.lineTo(x, y);
      cx.stroke();
      cx.beginPath();
      cx.stroke();

      cx.beginPath();
      cx.moveTo(x, y);

      drawletterBorder(letter);
    }
  }

  function getpixelcolour(x, y) {
    let index = y * (pixels.width * 4) + x * 4;
    return {
      r: pixels.data[index],
      g: pixels.data[index + 1],
      b: pixels.data[index + 2],
      a: pixels.data[index + 3],
    };
  }

  function getpixelamount(r, g, b) {
    let pixels = cx.getImageData(0, 0, c.width, c.height);
    let all = pixels.data.length;
    let amount = 0;
    for (let i = 0; i < all; i += 4) {
      if (
        pixels.data[i] === r &&
        pixels.data[i + 1] === g &&
        pixels.data[i + 2] === b
      ) {
        amount++;
      }
    }
    return amount;
  }

  function pixelthreshold() {
    if (getpixelamount(r, g, b) / letterpixels > winPercent) {
      if (!isLetterComplete) {
        pulse();
        checkingAnswerPositive(controlsBox, infoBox);
        togglePointerEventElement(taskWrapper.firstElementChild);
      }
    }
  }

  function pulse() {
    let size = parseInt(fontSizeLetter);

    audio.play();

    let timerId1 = setInterval(() => {
      size += 2;
      cx.clearRect(0, 0, c.width, c.height);
      cx.font = `${fontWeightLetter} ${size}px ${font}`;
      drawletter(letter, drowColor);
    }, 40);

    setTimeout(() => {
      clearInterval(timerId1);
      let timerId2 = setInterval(() => {
        size -= 2;
        cx.clearRect(0, 0, c.width, c.height);
        cx.font = `${fontWeightLetter} ${size}px ${font}`;
        drawletter(letter, drowColor);
      }, 40);
      setTimeout(() => {
        clearInterval(timerId2);
      }, 1000);
    }, 1000);

    isLetterComplete = true;
  }

  function onmousedown(ev) {
    mousedown = true;
    ev.preventDefault();
  }

  function onmouseup(ev) {
    mousedown = false;
    pixelthreshold();
    ev.preventDefault();
    cx.beginPath();
  }

  function onmousemove(ev) {
    if (mousedown) {
      let x = Math.round(ev.clientX - c.getBoundingClientRect().x);
      let y = Math.round(ev.clientY - c.getBoundingClientRect().y);
      paint(x, y);
    }
  }

  function reloadTask() {
    isLetterComplete = false;
    checkingAnswerReset(controlsBox, infoBox);
    setupCanvas();
    if (taskWrapper.firstElementChild.classList.contains("noEventElement")) {
      togglePointerEventElement(taskWrapper.firstElementChild);
    }
  }
}
