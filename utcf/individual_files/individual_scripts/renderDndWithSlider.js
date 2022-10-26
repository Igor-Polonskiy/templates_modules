import {
  onBtnRightClick,
  onBtnLeftClick,
  getBlocksSizes,
  showArrows,
  resetSound,
  onSoundIconClick,
  scaleImage,
  dropAppend,
  dragAppend,
  getRandomPositionToCard,
  checkingAnswerReset,
  checkingAnswerNegative,
  checkingAnswerPositive,
  shuffleCards,
  addRightChoiceClass,
  addWrongChoiceClass,
  removeActiveCardClass,
  toggleOpacityAndEventsElement,
  renderCheckPanel,
  getCheckPanelElements,
} from "../../common_files/common_scripts.js";


export function renderDndWithSlider(
  dropCards,
  dragCards,
  taskId,
  rightAnswerCount
) {
  let draggingItem;
  let elemBelow;
  let isGameStart = false;
  let maxQuantity = 0;
  const dropId = "drop";
  const dragId = "drag";
  const taskWrapper = document.getElementById(`${taskId}`)
  const arrayOfDropElementsLength = dropCards.length;
  switch (arrayOfDropElementsLength) {
    case 1:
      maxQuantity = 21;
      break;
    case 2:
      maxQuantity = 9;
      break;
    case 3:
      maxQuantity = 6;
      break;
    case 4:
      maxQuantity = 4;
      break;
    case 5:
      maxQuantity = 3;
      break;
    case 6:
      maxQuantity = 3;

      break;

    default:
      break;
  }

  const dropBox = taskWrapper.querySelector(".withSlider_dropPlaceWrapper");
  const answersWrapper = taskWrapper.querySelector(".withSlider_slider_box");
  const leftBtn = taskWrapper.querySelector(".arrowButton_left_event");
  const rightBtn = taskWrapper.querySelector(".arrowButton_right_event");

  const soundDataAttribute = "sound-data";
  let soundSetStates = {
    currentAudio: null,
    currentAudioIcon: null,
    isPlaying: false,
  };

  dropBox.insertAdjacentHTML(
    "beforeend",
    createDropPictureCardsMarkup(shuffleCards([...dropCards]))
  );
  answersWrapper.insertAdjacentHTML(
    "beforeend",
    createDragPictureCardsMarkup(shuffleCards([...dragCards]))
  );
  renderCheckPanel(taskWrapper, true);
  const { btnReset, btnTest, controlsBox, infoBox } =
    getCheckPanelElements(taskWrapper);

  const audioFiles = taskWrapper.querySelectorAll(".withSlider_dndIWS_audio");

  let sliderSet = {
    sliderItemWidth: 0,
    sliderSize: 0,
    sliderWrapperSize: answersWrapper.offsetParent.clientWidth,
    sliderShift: 0,
  };

  getBlocksSizes(sliderSet, answersWrapper);
  showArrows(sliderSet, leftBtn, rightBtn);

  // закрываем кнопку ПРОВЕРИТЬ
  toggleOpacityAndEventsElement(btnTest);

  taskWrapper.addEventListener("pointerdown", mouseDown);
  btnReset.addEventListener("click", onBtnResetClick);
  btnTest.addEventListener("click", onBtnTestClick);
  leftBtn.addEventListener("click", LeftClick);
  rightBtn.addEventListener("click", RightClick);
  dropBox.addEventListener("pointerdown", onDropBoxClick);
  taskWrapper.addEventListener("click", onIconClick);

  function onDropBoxClick(event) {
    if (!event.target.classList.contains("withSlider_dropPicture")) return;
    scaleImage(event.target);
  }

  function onIconClick(e) {
    if (e.target.classList.contains("buttonPlayPausePlayPause_wrap")) {
      onSoundIconClick(e, soundSetStates, audioFiles, soundDataAttribute);
    }
  }

  function LeftClick() {
    onBtnLeftClick(sliderSet, answersWrapper, leftBtn, rightBtn);
  }

  function RightClick() {
    onBtnRightClick(sliderSet, answersWrapper, leftBtn, rightBtn);
  }

  function onBtnResetClick() {
    resetSound(soundSetStates);
    [...dropBox.children].forEach((item) => {
      if (item.children.length > 1) {
        [...item.children[1].children].forEach((el) => {
          getRandomPositionToCard(el);
          removeActiveCardClass(el);
          answersWrapper.appendChild(el);
        });
      }
    });
    getBlocksSizes(sliderSet, answersWrapper);
    showArrows(sliderSet, leftBtn, rightBtn);

    checkingAnswerReset(controlsBox, infoBox);
    draggingItem = null;
    taskWrapper.addEventListener("pointerdown", mouseDown);
    // закрываем кнопку ПРОВЕРИТЬ
    if (isGameStart) {
      toggleOpacityAndEventsElement(btnTest);
      isGameStart = false;
    }
  }
  function onBtnTestClick() {
    resetSound(soundSetStates);
    let winVar = 0;
    [...dropBox.children].forEach((item) => {
      if (item.children[1].children.length > 0) {
        [...item.children[1].children].forEach((el) => {
          if (
            item.children[1].attributes.getNamedItem("drop-data").value ===
            el.attributes.getNamedItem("drag-data").value
          ) {
            winVar += 1;
            addRightChoiceClass(el);
          } else addWrongChoiceClass(el);
        });
      }
    });
    // if (winVar === dragCards.length) {
    if (winVar === rightAnswerCount) {
      checkingAnswerPositive(controlsBox, infoBox);
    } else {
      checkingAnswerNegative(controlsBox, infoBox);
    }
    taskWrapper.removeEventListener("pointerdown", mouseDown);
  }

  function mouseDown(event) {
    if (event.button !== 0) return;

    if (event.target.classList.contains("withSlider_dragPicture")) {
      draggingItem = event.target.parentElement;
    } else if (event.target.classList.contains("withSlider_dragPicture_box")) {
      draggingItem = event.target;
    } else if (event.target.classList.contains("withSlider_dragPicture_text")) {
      draggingItem = event.target.parentElement;
    } else return;

    const findIdx = [...answersWrapper.children].findIndex(
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

      draggingItem.style.visibility = "hidden";
      elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      draggingItem.style.visibility = "visible";

      if (!elemBelow) return;
    }
    document.addEventListener("pointermove", onMouseMove);

    // КОГДА ВО ВРЕМЯ ПЕРЕТАСКИВАНИЯ КУРСОР ВЫНЕСЛИ ЗА ПРЕДЕЛЫ ОКНА БРАУЗЕРА И ОТПУСТИЛИ ЗАХВАТ ЭЛЕМЕНТА
    function moveOut(e) {
      dragAppend(answersWrapper, draggingItem, findIdx);

      window.removeEventListener("pointerup", moveOut);
      document.removeEventListener("pointermove", onMouseMove);
    }
    draggingItem.addEventListener("pointerup", onpointerup);

    function onpointerup(event) {
      document.removeEventListener("pointermove", onMouseMove);
      draggingItem.style.cursor = "grab";
      if (!clickWithoutMove) {
        if (
          elemBelow.classList.contains("withSlider_dropPlace_imageBox") &&
          elemBelow.children.length < maxQuantity
        ) {
          dropAppend(elemBelow, draggingItem);
          // открываем кнопку ПРОВЕРИТЬ
          if (!isGameStart) {
            toggleOpacityAndEventsElement(btnTest);
            isGameStart = true;
          }
        } else if (
          elemBelow.classList.contains("withSlider_dragPicture") &&
          elemBelow.parentElement.parentElement.tagName !== "BODY" &&
          !elemBelow.parentElement.parentElement.classList.contains(
            "withSlider_slider_box"
          ) &&
          elemBelow.parentElement.parentElement.children.length < maxQuantity
        ) {
          dropAppend(elemBelow.parentElement.parentElement, draggingItem);
        } else if (
          elemBelow.classList.contains("buttonPlayPausePlayPause_wrap") &&
          elemBelow.parentElement.parentElement.classList.contains(
            "withSlider_dropPlace_imageBox"
          ) &&
          elemBelow.parentElement.parentElement.children.length < maxQuantity
        ) {
          dropAppend(elemBelow.parentElement.parentElement, draggingItem);
        } else if (
          elemBelow.classList.contains("withSlider_dragPicture_text") &&
          elemBelow.parentElement.parentElement.classList.contains(
            "withSlider_dropPlace_imageBox"
          ) &&
          elemBelow.parentElement.parentElement.children.length < maxQuantity
        ) {
          dropAppend(elemBelow.parentElement.parentElement, draggingItem);
        } else {
          dragAppend(answersWrapper, draggingItem, findIdx);
        }
        sliderSet.sliderSize = answersWrapper.scrollWidth;
        showArrows(sliderSet, leftBtn, rightBtn);
      } else if (event.target.classList.contains("withSlider_dragPicture")) {
        scaleImage(event.target);
      }

      draggingItem.removeEventListener("pointerup", onpointerup);
    }
  }

  function createDropPictureCardsMarkup(pictures) {
    let widthPic = 100 / dropCards.length - 2;
    return pictures
      .map((picture) => {
        const isImage =
          picture.imgSrc &&
          `<img
                   class="withSlider_dropPicture"
                   src=${picture.imgSrc}
                   alt=${picture.name}

                   draggable="false"
                   />`;
        const isSound =
          picture.audioSrc &&
          `
                      <div class="buttonPlayPausePlayPause_wrap buttonPlayPause--play" ${soundDataAttribute}="${dropId}_${picture.id}${taskId}">
                        <div class="buttonPlayPause__shape buttonPlayPause__shape--one"></div>
                        <div class="buttonPlayPause__shape buttonPlayPause__shape--two"></div>
                        <audio class="withSlider_dndIWS_audio" id="${dropId}_${picture.id}${taskId}" src=${picture.audioSrc} style="display:none !important">
                              Your browser does not support the <code>audio</code> element.
                            </audio>
                      </div>`;
        const isText =
          picture.text &&
          `<div class="withSlider_dropPicture_text" style="text-align: center">${picture.text}</div>`;

        return `<div class="withSlider_dropPlace" style="width: ${widthPic}%;">
            <div class="withSlider_dropPicture_box"  style="width: 100%;">
               ${isImage}
               ${isSound}
               ${isText}
            </div>
            <div drop-data=${picture.answerTag} class="withSlider_dropPlace_imageBox" style="width: 100%; "></div>
              </div>`;
      })
      .join("");
  }
  function createDragPictureCardsMarkup(pictures) {
    return pictures
      .map((picture) => {
        const isImage =
          picture.imgSrc &&
          `<img
                   class="withSlider_dragPicture"
                   src=${picture.imgSrc}
                   alt=${picture.name}
                   draggable="false"
                   />`;
        const isSound =
          picture.audioSrc &&
          `           <div class="buttonPlayPausePlayPause_wrap buttonPlayPause--play" ${soundDataAttribute}="${dragId}_${picture.id}${taskId}">
                        <div class="buttonPlayPause__shape buttonPlayPause__shape--one"></div>
                        <div class="buttonPlayPause__shape buttonPlayPause__shape--two"></div>
                        <audio class="withSlider_dndIWS_audio" id="${dragId}_${picture.id}${taskId}" src=${picture.audioSrc} style="display:none !important">
                              Your browser does not support the <code>audio</code> element.
                            </audio>
                      </div>`;
        const isText =
          picture.text &&
          `<div class="withSlider_dragPicture_text" style="text-align: center">${picture.text}</div>`;
        return `<div
                class="withSlider_dragPicture_box oneMultiChoice_border"
                draggable="false"
                drag-data=${picture.answerTag}
              >
               ${isImage}
               ${isSound}
               ${isText}
              </div>`;
      })
      .join("");
  }
}
