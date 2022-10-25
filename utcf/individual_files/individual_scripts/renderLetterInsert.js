import {
  scaleImage,
  dropAppend,
  checkingAnswerReset,
  checkingAnswerPositive,
  addRightChoiceClass,
  addWrongChoiceClass,
  renderCheckPanel,
  getCheckPanelElements,
} from "../../../_common_files/common_scripts.js";

export function renderLetterInsert(data, taskId, dragLetters) {
  const task = document.getElementById(`${taskId}`)
  let imgSrcBox = task.querySelector(".letterInsert_img");
  let dropZone = task.querySelector(".letterInsert_drop");
  let dragZone = task.querySelector(".letterInsert_drag");

  let dataOrder = 0;
  let draggingItem;
  let elemBelow;

  start(data);
  filldragZone();
  renderCheckPanel(task, false);
  const { btnReset, controlsBox, infoBox } = getCheckPanelElements(task);

  task.addEventListener("pointerdown",  mouseDown);
  imgSrcBox.addEventListener("pointerdown", onimgSrcClick);
  btnReset.addEventListener("click", resetTask);

  function start(items) {
    items.forEach((item, index) => {
      let imgSrc = document.createElement("div");
      imgSrc.classList.add("letterInsert_imgBox");
      imgSrc.style.backgroundImage = `url(${item.imgSrc})`;
      index !== 0 && addHiddenStyle(imgSrc);
      imgSrcBox.append(imgSrc);

      const lettersArr = item.letters.map((i) => {
        let letter = document.createElement("div");
        letter.classList.add("letterInsert_letter");
        if (i.length) {
          letter.innerText = i;
        } else {
          letter.setAttribute("data-letter", item.answer);
          letter.classList.add("letterInsert_dropItem");
        }
        return letter;
      });

      let dropZoneBox = document.createElement("div");
      dropZoneBox.classList.add("letterInsert_dropBox");
      index !== 0 && addHiddenStyle(dropZoneBox);
      dropZoneBox.append(...lettersArr);
      dropZone.append(dropZoneBox);
    });
  }

  function filldragZone() {
    dragLetters.forEach((item) => {
      let letter = document.createElement("div");
      letter.classList.add("letterInsert_dragitem", "oneMultiChoice_border");
      letter.innerText = item;
      letter.setAttribute("data-letter", item);
      dragZone.append(letter);
    });
  }

  function onimgSrcClick(e) {
    if (e.target.classList.contains("letterInsert_imgBox")) {
      scaleImage(e.target);
    }
  }

  function mouseDown(event) {
    let shiftX;
    let shiftY;
    if (event.button !== 0) return;

    if (event.target.classList.contains("letterInsert_dragitem")) {
      draggingItem = document.createElement("div");
      draggingItem.classList.add(
        "letterInsert_dragitem_dropped",
        "oneMultiChoice_border"
      );
      draggingItem.innerText = event.target.getAttribute("data-letter");

      shiftX = event.clientX - event.target.getBoundingClientRect().left;
      shiftY = event.clientY - event.target.getBoundingClientRect().top;
    } else if (
      event.target.classList.contains("letterInsert_dragitem_dropped")
    ) {
      draggingItem = event.target;

      shiftX = event.clientX - draggingItem.getBoundingClientRect().left;
      shiftY = event.clientY - draggingItem.getBoundingClientRect().top;
    } else return;

    draggingItem.style.touchAction = "none"; //ОБЯЗАТЕЛЬНОЕ УСЛОВИЕ(МОЖНО УБРАТЬ И ПРОПИСАТЬ В СТИЛЬ САМОМУ ОБЪЕКТУ)
    draggingItem.style.cursor = "grabbing";

    // ЛИММИТЫ КООРДИНАТ ОГРАНИЧИВАЮЩИЕ ВЫЛЕТ ПЕРЕТАСКИВАЕМОГО ЭЛЕМЕНТА ЗА БЛОК
    //  (ПО УМОЛЧАНИЮ interact_zadanie - РОДИТЕЛЬ ВАШЕГО БЛОКА)
    let limits = {
      top: task.offsetTop,
      right: task.offsetWidth + task.offsetLeft,
      bottom: task.offsetHeight + task.offsetTop,
      left: task.offsetLeft,
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
        task.appendChild(draggingItem);
      }
      moveAt(event.pageX, event.pageY);
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
    task.addEventListener("pointerup", onpointerup);

    // КОГДА ВО ВРЕМЯ ПЕРЕТАСКИВАНИЯ КУРСОР ВЫНЕСЛИ ЗА ПРЕДЕЛЫ ОКНА БРАУЗЕРА И ОТПУСТИЛИ ЗАХВАТ ЭЛЕМЕНТА
    function moveOut(e) {
      const elemUnderPount = document.elementFromPoint(e.clientX, e.clientY);
      if (elemUnderPount !== draggingItem) {
        draggingItem.remove();
      }
      window.removeEventListener("pointerup", moveOut);
      document.removeEventListener("pointermove", onMouseMove);
    }
    // КОГДА КУРСОР В ЗОНЕ ДЛЯ ПЕРЕТАСКИВАНИЙ И ПОЛЬЗОВАТЕЛЬ ОТПУСТИЛ ЗАХВАТ ЭЛЕМЕНТА

    function onpointerup() {
      document.removeEventListener("pointermove", onMouseMove);
      // ЛОГИКА ОБРАБОТКИ ПОПАДАНИЯ НА НУЖНЫЙ БЛОК И НАОБОРОТ
      if (elemBelow) {
        if (
          elemBelow.closest(".letterInsert_dropItem") &&
          elemBelow.closest(".letterInsert_dropItem").children.length === 0
        ) {
          elemBelow = elemBelow.closest(".letterInsert_dropItem");
          dropAppend(elemBelow, draggingItem);
          checkAnswer(elemBelow);
        } else {
          draggingItem.remove();
        }
      } else {
        draggingItem.remove();
      }
      task.removeEventListener("pointerup", onpointerup);
    }
  }

  function addHiddenStyle(item) {
    item.classList.add("visually-hidden");
  }
  function removeHiddenStyle(item) {
    item.classList.remove("visually-hidden");
  }

  function resetTask() {
    dataOrder = 0;
    [...imgSrcBox.children].forEach((el, index) => {
      if (index === 0) {
        removeHiddenStyle(el);
      } else if (index < imgSrcBox.children.length) {
        addHiddenStyle(el);
      }
    });
    [...dropZone.children].forEach((el, index) => {
      if (index === 0) {
        removeHiddenStyle(el);
      } else if (index < dropZone.children.length) {
        addHiddenStyle(el);
      }
      [...el.children].forEach((elem) => {
        if (elem.dataset.letter) {
          elem.firstElementChild && elem.removeChild(elem.firstElementChild);
        }
      });
    });
    task.addEventListener("pointerdown",  mouseDown);

    draggingItem = null;
    checkingAnswerReset(controlsBox, infoBox);
  }

  function checkAnswer(dropField) {

    if (draggingItem.innerText === dropField.getAttribute("data-letter")) {
      task.removeEventListener("pointerdown",  mouseDown);

      addRightChoiceClass(draggingItem);
      dataOrder++;
      setTimeout(() => {
        if (dataOrder < data.length) {
          removeHiddenStyle(imgSrcBox.children[dataOrder]);
          addHiddenStyle(imgSrcBox.children[dataOrder - 1]);
          removeHiddenStyle(dropZone.children[dataOrder]);
          addHiddenStyle(dropZone.children[dataOrder - 1]);
          task.addEventListener("pointerdown",  mouseDown);
        } else {
          checkingAnswerPositive(controlsBox, infoBox);
        }

      }, 1000);
    } else addWrongChoiceClass(draggingItem);

  }
}
