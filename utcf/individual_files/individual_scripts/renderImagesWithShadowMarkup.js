import {
  scaleImage,
  dropAppend,
  dragAppend,
  getRandomPositionToCard,
  checkingAnswerReset,
  checkingAnswerPositive,
  shuffleCards,
  renderCheckPanel,
  getCheckPanelElements,
} from "../../../_common_files/common_scripts.js";

export function renderImagesWithShadowMarkup(arrayOfElements, taskId) {
  let draggingItem;
  let elemBelow;

  const arrayOfElementsLength = arrayOfElements.length;

  const taskWrapper = document.querySelector(`#${taskId}`);

  const dropBox = taskWrapper.querySelector(
    ".dnd_imgWithShadow_dropPlaceWrapper"
  );
  const dragBox = taskWrapper.querySelector(
    ".dnd_imgWithShadow_dragPlaceWrapper"
  );

  dropBox.insertAdjacentHTML(
    "beforeend",
    createDropPictureCardsMarkup(shuffleCards([...arrayOfElements]))
  );
  dragBox.insertAdjacentHTML(
    "beforeend",
    createDragPictureCardsMarkup(shuffleCards([...arrayOfElements]))
  );
  renderCheckPanel(taskWrapper, false);
  const { btnReset, controlsBox, infoBox } = getCheckPanelElements(taskWrapper);

  dragBox.addEventListener("pointerdown", mouseDown);
  btnReset.addEventListener("click", onBtnResetClick);
  dropBox.addEventListener("pointerdown", onDropBoxClick);

  function onDropBoxClick(event) {
    if (event.target.classList.contains("dnd_imgWithShadow_dropPlace")) {
      scaleImage(event.target);
    }
  }

  function createDropPictureCardsMarkup(pictures) {
    if (arrayOfElementsLength > 4) {
      dropBox.classList.add("dnd_imgWithShadow_dropPlaceWrapper_width-small");
      dragBox.classList.add("dnd_imgWithShadow_dropPlaceWrapper_width-small");
    }
    return pictures
      .map((picture) => {
        return `<div class="dnd_imgWithShadow_dropPlace" drop-data=${picture.answerTag} style="background-image: url(${picture.srcShadow})">
            </div>
           `;
      })
      .join("");
  }
  function createDragPictureCardsMarkup(pictures) {
    return pictures
      .map((picture, index) => {
        return `
          <div class="dnd_imgWithShadow_dragPlace" drag-data=${picture.answerTag} draggable="false" style="background-image: url(${picture.imgSrc})">
            </div>
          `;
      })
      .join("");
  }

  function onBtnResetClick() {
    [...dropBox.children].forEach((item) => {
      if (item.children.length > 0) {
        getRandomPositionToCard(item.children[0]);
        dragBox.appendChild(item.children[0]);
      }
    });

    [...dropBox.children].forEach((el) =>
      el.classList.remove("dnd_imgWithShadow_dropPlace-animated")
    );
    checkingAnswerReset(controlsBox, infoBox);
    draggingItem = null;
  }

  function mouseDown(event) {
    if (event.button !== 0) return;
    if (!event.target.classList.contains("dnd_imgWithShadow_dragPlace")) return;

    draggingItem = event.target;
    // находим индекс элемента, который берем в списке отрисованных. dragBox - контейнер для перетаскиваемых элементов
    const findIdx = [...dragBox.children].findIndex(
      (el) => el === draggingItem
    );
    draggingItem.style.touchAction = "none";
    draggingItem.style.cursor = "grabbing";
    let shiftX = event.clientX - draggingItem.getBoundingClientRect().left;
    let shiftY = event.clientY - draggingItem.getBoundingClientRect().top;
    // ЛИММИТЫ КООРДИНАТ ОГРАНИЧИВАЮЩИЕ ВЫЛЕТ ПЕРЕТАСКИВАЕМОГО ЭЛЕМЕНТА ЗА БЛОК
    //  (ПО УМОЛЧАНИЮ interact_zadanie - РОДИТЕЛЬ ВАШЕГО БЛОКА)
    let limits = {
      top: taskWrapper.offsetTop,
      right: taskWrapper.offsetWidth + taskWrapper.offsetLeft,
      bottom: taskWrapper.offsetHeight + taskWrapper.offsetTop,
      left: taskWrapper.offsetLeft,
    };

    function moveAt(pageX, pageY) {
      draggingItem.style.left = pageX - shiftX + "px";
      draggingItem.style.top = pageY - shiftY + "px";
    }

    let clickWithoutMove = true;

    function onMouseMove(event) {
      if (clickWithoutMove) {
        draggingItem.style.position = "absolute";
        draggingItem.style.zIndex = 1000;
        document.body.appendChild(draggingItem);
      }
      let newLocation = {
        x: limits.left,
        y: limits.top,
      };
      if (event.pageX > limits.right) {
        newLocation.x = limits.right;
      } else if (event.pageX > limits.left) {
        newLocation.x = event.pageX;
      }
      if (event.pageY > limits.bottom) {
        newLocation.y = limits.bottom;
      } else if (event.pageY > limits.top) {
        newLocation.y = event.pageY;
      }

      clickWithoutMove = false;
      moveAt(newLocation.x, newLocation.y);
      if (!event.composedPath().includes(draggingItem)) {
        window.addEventListener("pointerup", moveOut);
      }
      if (event.composedPath().includes(draggingItem)) {
        window.removeEventListener("pointerup", moveOut);
      }

      draggingItem.hidden = true;
      elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      draggingItem.hidden = false;

      if (!elemBelow) return;
    }
    document.addEventListener("pointermove", onMouseMove);

    function moveOut(e) {
      dragAppend(dragBox, draggingItem, findIdx);
      window.removeEventListener("pointerup", moveOut);
      document.removeEventListener("pointermove", onMouseMove);
    }

    draggingItem.addEventListener("pointerup", onpointerup);

    function onpointerup(event) {
      draggingItem.style.cursor = "grab";
      document.removeEventListener("pointermove", onMouseMove);

      if (clickWithoutMove) {
        setTimeout(() => scaleImage(event.target), 0);
      }
      if (elemBelow) {
        if (
          elemBelow.classList.contains("dnd_imgWithShadow_dropPlace") &&
          elemBelow.attributes.getNamedItem("drop-data").value ===
            draggingItem.attributes.getNamedItem("drag-data").value
        ) {
          dropAppend(elemBelow, draggingItem);

          elemBelow.classList.add("dnd_imgWithShadow_dropPlace-animated");
          if (dragBox.children.length === 0) {
            checkingAnswerPositive(controlsBox, infoBox);
          }
        } else {
          dragAppend(dragBox, draggingItem, findIdx);
        }
      }
      draggingItem.removeEventListener("pointerup", onpointerup);
    }
  }
}
