import {
  checkingAnswerPositive,
  checkingAnswerNegative,
  checkingAnswerReset,
  toggleOpacityAndEventsElement,
  renderCheckPanel,
  getCheckPanelElements,
  togglePointerEventElement,
} from "../../common_files/common_scripts.js";

export function createСoloringBook_2_Markup(pencils, taskId, rightAnswers) {
  let currentColor = null;
  let isGameStart = false;
  const taskWrapper = document.querySelector(`#${taskId}`);

  const pencilsBox = taskWrapper.querySelector(
    ".coloringBook_2_pencilsWrapper"
  );
  const svgBox = taskWrapper.querySelector(".coloringBook_2_coloringImage");

  pencilsBox.insertAdjacentHTML("beforeend", createPencilsMarkup(pencils));
  renderCheckPanel(taskWrapper, true);
  const { btnReset, btnTest, controlsBox, infoBox } =
    getCheckPanelElements(taskWrapper);

  // закрываем кнопку ПРОВЕРИТЬ
  toggleOpacityAndEventsElement(btnTest);
  const drawings = taskWrapper.querySelectorAll("[neededcolor]");

  pencilsBox.addEventListener("click", onPencilClick);
  svgBox.addEventListener("click", onSvgClick);
  btnReset.addEventListener("click", onBtnResetClick);
  btnTest.addEventListener("click", onBtnTestClick);

  function createPencilsMarkup(pencils) {
    return pencils
      .map((pencil) => {
        return `<img src="${pencil.imgSrc}" alt="${pencil.colorName}" class="coloringBook_2_pencil" data-color="${pencil.colorName}" />
        `;
      })
      .join("");
  }

  function rgbToHex(rgb) {
    const color =
      "#" +
      (
        (1 << 24) +
        +(rgb.match(/\d{1,3}/gi)[0] << 16) +
        +(rgb.match(/\d{1,3}/gi)[1] << 8) +
        +rgb.match(/\d{1,3}/gi)[2]
      )

        // (Number(rgb.match(/\d{1,3}/gi)[0]) << 16) +
        // (Number(rgb.match(/\d{1,3}/gi)[1]) << 8) +
        // Number(rgb.match(/\d{1,3}/gi)[2])
        .toString(16)
        .slice(1);
    return color;
  }

  function onBtnTestClick() {
    let winCount = 0;

    [...svgBox.children].forEach((el) => {
      if (el.style.fill) {
        if (
          rgbToHex(el.style.fill).toLowerCase() ===
          rightAnswers[
            el.attributes?.getNamedItem("neededcolor")?.value
          ]?.toLowerCase()
        ) {
          winCount += 1;
        } else winCount--
      }
    });

    if (winCount === drawings.length) {
      checkingAnswerPositive(controlsBox, infoBox);
    } else {
      checkingAnswerNegative(controlsBox, infoBox);
    }

    if (!svgBox.parentElement.classList.contains("noEventElement")) {
      togglePointerEventElement(svgBox.parentElement);
    }
  }

  function onPencilClick(e) {
    if (!e.target.classList.contains("coloringBook_2_pencil")) return;
    [...pencilsBox.children].forEach((pencil) => {
      pencil.classList.remove("coloringBook_2_pencilActive");
    });
    e.target.classList.add("coloringBook_2_pencilActive");
    currentColor = e.target.attributes.getNamedItem("data-color").value;
  }

  function onSvgClick(e) {
    if (e.target.classList.contains("coloringBook_2_coloringImage")) return;
    // открываем кнопку ПРОВЕРИТЬ
    if (e.target.tagName === 'path') {
      if (!isGameStart) {
        toggleOpacityAndEventsElement(btnTest);
        isGameStart = true;
      }
      e.target.parentElement.style.fill = currentColor;
    }
  }

  function onBtnResetClick() {
    [...svgBox.children].forEach((child) => {
      if (
        child.attributes.getNamedItem("stoppainting") &&
        child.attributes.getNamedItem("stoppainting").value === "true"
      )
        return;
      child.removeAttribute('style') //= "#ffffff";
    });
    [...pencilsBox.children].forEach((pencil) => {
      pencil.classList.remove("coloringBook_2_pencilActive");
    });
    checkingAnswerReset(controlsBox, infoBox);
    // скрываем кнопку ПРОВЕРИТЬ
    if (isGameStart) {
      toggleOpacityAndEventsElement(btnTest);
      isGameStart = false;
    }
    if (svgBox.parentElement.classList.contains("noEventElement")) {
      togglePointerEventElement(svgBox.parentElement);
    }
  }
}
