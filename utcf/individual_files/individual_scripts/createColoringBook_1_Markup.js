import {
  renderCheckPanel,
  getCheckPanelElements,
} from "../../common_files/common_scripts.js";

export function createColoringBook_1_Markup(pencils, taskId) {
  let currentColor = null;

  const taskWrapper = document.querySelector(`#${taskId}`);
  const pencilsBox = taskWrapper.querySelector(
    ".coloringBook_1_pencilsWrapper"
  );
  const svgBox = taskWrapper.querySelector(".coloringBook_1_coloringImage");

  pencilsBox.insertAdjacentHTML("beforeend", createPencilsMarkup(pencils));
  renderCheckPanel(taskWrapper, false);
  const { btnReset } = getCheckPanelElements(taskWrapper);

  pencilsBox.addEventListener("click", onPencilClick);
  svgBox.addEventListener("click", onSvgClick);

  btnReset.addEventListener("click", onBtnResetClick);

  function createPencilsMarkup(pencils) {
    return pencils
      .map((pencil) => {
        return `<img src="${pencil.imgSrc}" alt="${pencil.colorName}" class="coloringBook_1_pencil" data-color="${pencil.colorName}" />
  `;
      })
      .join("");
  }

  function onPencilClick(e) {
    if (!e.target.classList.contains("coloringBook_1_pencil")) return;
    [...pencilsBox.children].forEach((pencil) => {
      pencil.classList.remove("coloringBook_1_pencilActive");
    });
    e.target.classList.add("coloringBook_1_pencilActive");
    currentColor = e.target.attributes.getNamedItem("data-color").value;
  }

  function onSvgClick(e) {
    if (e.target.classList.contains("coloringBook_1_coloringImage")) return;

    e.target.parentElement.style.fill = currentColor;
  }

  function onBtnResetClick() {
    [...svgBox.children].forEach((child) => {
      if (
        child.attributes.getNamedItem("stoppainting") &&
        child.attributes.getNamedItem("stoppainting").value === "true"
      )
        return;
      child.style.fill = "#ffffff";
    });
    [...pencilsBox.children].forEach((pencil) => {
      pencil.classList.remove("coloringBook_1_pencilActive");
    });
  }
}
