import {
  scaleImage,
  dropAppend,
  dragAppend,
  checkingAnswerReset,
  checkingAnswerPositive,
  shuffleCards,
  renderCheckPanel,
  getCheckPanelElements
} from "../../common_files/common_scripts.js"


export function renderDndChangeImgByTimerMarkup(
  dropZoneElements,
  dragZoneElements,
  taskId,
  simulatorType,
) {
  let draggingItem;
  let elemBelow;
  let imgCount = 0;
  let actions = true

  const taskWrapper = document.getElementById(`${taskId}`);

  const lastImg = dropZoneElements.length - 1;

  const dropBox = taskWrapper.querySelector(".changeImgByTimer_dropPlaceWrapper");
  const dragBox = taskWrapper.querySelector(".changeImgByTimer_dragPlaceWrapper");

  dropBox.insertAdjacentHTML(
    "beforeend",
    createDropPictureCardsMarkup(shuffleCards([...dropZoneElements]))
  );
  dragBox.insertAdjacentHTML(
    "beforeend",
    createDragPictureCardsMarkup(shuffleCards([...dragZoneElements]))
  );

  renderCheckPanel(taskWrapper, false)

  const { btnReset, controlsBox, infoBox } = getCheckPanelElements(taskWrapper)

  dragBox.addEventListener("pointerdown", mouseDown);
  btnReset.addEventListener("click", onBtnResetClick);
  dropBox.addEventListener("pointerdown", onDropBoxClick);

  function onDropBoxClick(event) {
    if (!event.target.classList.contains("changeImgByTimer_dropPlaceImage")) return;
    scaleImage(event.target);
  }

  function onBtnResetClick() {
    [...dropBox.children].forEach((el, index) => {
      index === 0
        ? el.classList.remove("changeImgByTimer_visually-hidden")
        : el.classList.add("changeImgByTimer_visually-hidden");
    });

    if (!simulatorType) {
      [...dropBox.children].forEach((el, index) => {
        if (el.children[1].firstElementChild) {
          el.children[1].firstElementChild.classList.remove("changeImgByTimer_visually-hidden");
          let randomPos = Math.floor(Math.random() * 12);
          el.children[1].firstElementChild.style.order = randomPos;
          dragBox.append(el.children[1].firstElementChild);
        }

      });
    }
    actions = true
    checkingAnswerReset(controlsBox, infoBox)
    imgCount = 0;
    draggingItem = null;
  }

  function mouseDown(event) {
    if (!actions) return
    if (event.button !== 0) return;
    if (!event.target.classList.contains("changeImgByTimer_dragPlace")) return;

    draggingItem = event.target;

    // находим индекс элемента, который берем в списке отрисованных. dragBox - контейнер для перетаскиваемых элементов
    const findIdx = [...dragBox.children].findIndex(
      (el) => el === draggingItem
    );
    draggingItem.style.cursor = "grabbing";
    draggingItem.style.touchAction = "none"; //ОБЯЗАТЕЛЬНОЕ УСЛОВИЕ(МОЖНО УБРАТЬ И ПРОПИСАТЬ В СТИЛЬ САМОМУ ОБЪЕКТУ)

    let shiftX = event.clientX - draggingItem.getBoundingClientRect().left;
    let shiftY = event.clientY - draggingItem.getBoundingClientRect().top;

    // ЛИМИТЫ КООРДИНАТ ОГРАНИЧИВАЮЩИЕ ВЫЛЕТ ПЕРЕТАСКИВАЕМОГО ЭЛЕМЕНТА ЗА БЛОК
    //  (ПО УМОЛЧАНИЮ interact_zadanie - РОДИТЕЛЬ ВАШЕГО БЛОКА)
    let limits = {
      top: taskWrapper.offsetTop,
      right: taskWrapper.offsetWidth + taskWrapper.offsetLeft,
      bottom: taskWrapper.offsetHeight + taskWrapper.offsetTop,
      left: taskWrapper.offsetLeft,
    };

    // moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
      draggingItem.style.left = pageX - shiftX + "px";
      draggingItem.style.top = pageY - shiftY + "px";
    }

    elemBelow = document.elementFromPoint(event.clientX, event.clientY);
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

    // КОГДА ВО ВРЕМЯ ПЕРЕТАСКИВАНИЯ КУРСОР ВЫНЕСЛИ ЗА ПРЕДЕЛЫ ОКНА БРАУЗЕРА И ОТПУСТИЛИ ЗАХВАТ ЭЛЕМЕНТА
    function moveOut(e) {
      dragAppend(dragBox, draggingItem, findIdx);
      window.removeEventListener("pointerup", moveOut);
      document.removeEventListener("pointermove", onMouseMove);
    }
    draggingItem.addEventListener('pointerup', onpointerup)
    function onpointerup() {
      if (clickWithoutMove) {
        scaleImage(event.target)
      }
      document.removeEventListener("pointermove", onMouseMove);
      draggingItem.style.cursor = "grab";

      if (
        elemBelow.classList.contains("changeImgByTimer_dropPlacePart") &&
        draggingItem.attributes.getNamedItem("drag-data").value ===
        elemBelow.attributes.getNamedItem("drop-data").value
      ) {
        dropAppend(elemBelow, draggingItem);
        timerFunc();
      } else {
        dragAppend(dragBox, draggingItem, findIdx);
      }
      draggingItem.removeEventListener('pointerup', onpointerup)
    };
  }
  function timerFunc() {
    setTimeout(() => {
      imgChanger()
      simulatorType && addChildElement(dragBox, draggingItem);
    }, 500);
  }

  function addChildElement(place, element) {
    place.appendChild(element);
  }

  function imgChanger() {
    if (imgCount === lastImg) {
      checkingAnswerPositive(controlsBox, infoBox)
      actions = false
    }

    if (imgCount < lastImg) {
      [...dropBox.children][imgCount].classList.add("changeImgByTimer_visually-hidden");
      imgCount += 1;


      [...dropBox.children][imgCount].classList.remove("changeImgByTimer_visually-hidden");
      !simulatorType && hideDragginItem();
    }
  }

  function hideDragginItem() {
    draggingItem.classList.add("changeImgByTimer_visually-hidden");
  }

  function createDropPictureCardsMarkup(pictures) {
    return pictures
      .map((picture, index) => {
        const isVisible = index === 0 ? "" : "changeImgByTimer_visually-hidden";

        return `<div class="changeImgByTimer_dropPlace ${isVisible}">
                <div

                 style="background-image: url(${picture.imgSrc})"
                  class="changeImgByTimer_dropPlaceImage"
                >
                </div>
                <div
                  class="changeImgByTimer_dropPlacePart"
                  draggable="false"
                  drop-data=${picture.answerTag}
                ></div>
              </div>
                                      `;
      })
      .join("");
  }
  function createDragPictureCardsMarkup(pictures) {
    return pictures
      .map((picture) => {
        return `
        <div class='changeImgByTimer_dragPlace' drag-data=${picture.answerTag} style="background-image: url(${picture.imgSrc})" draggable="false">

          </div>
                                  `;
      })
      .join("");
  }
}
