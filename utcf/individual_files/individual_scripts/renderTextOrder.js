import {
  checkingAnswerPositive,
  checkingAnswerNegative,
  checkingAnswerReset,
  toggleOpacityAndEventsElement,
  renderCheckPanel,
  getCheckPanelElements,
  shuffleCards,
} from "../../common_files/common_scripts.js";

export function renderTextOrder(data, taskId) {
  let isGameStart = false;
  let targetItem;
  let draggingItem;
  let elemBelow;
  let shiftX;

  const rightData = data.flat();

  const taskWrapper = document.querySelector(`#${taskId}`);
  const sentences = taskWrapper.querySelector(
    ".wordOrderInSentences_sentences"
  );

  fillSentences();
  renderCheckPanel(taskWrapper, true);
  const { btnReset, btnTest, controlsBox, infoBox } =
    getCheckPanelElements(taskWrapper);

  // закрываем кнопку ПРОВЕРИТЬ
  toggleOpacityAndEventsElement(btnTest);

  sentences.addEventListener("pointerdown", mouseDown);
  btnReset.addEventListener("click", onBtnResetClick);
  btnTest.addEventListener("click", onBtnTestClick);

  function fillSentences() {
    data.forEach((item) => {
      let sentence = document.createElement("div");
      sentence.classList.add("wordOrderInSentences_sentence");
      shuffleCards([...item]).forEach((el) => {
        let word = document.createElement("div");
        word.classList.add("wordOrderInSentences_word");
        word.innerText = el;
        sentence.append(word);
      });
      sentences.append(sentence);
    });
  }

  function mouseDown(event) {
    if (event.button !== 0) return;
    if (event.target.classList.contains("wordOrderInSentences_word")) {
      targetItem = event.target;
      targetItem.classList.add("wordOrderInSentences_selected");
      draggingItem = event.target.cloneNode(true);
      targetItem.classList.remove("wordOrderInSentences_selected");
      targetItem.classList.add("wordOrderInSentences_selectedInSentence");

      draggingItem.style.touchAction = "none"; //ОБЯЗАТЕЛЬНОЕ УСЛОВИЕ(МОЖНО УБРАТЬ И ПРОПИСАТЬ В СТИЛЬ САМОМУ ОБЪЕКТУ)
      draggingItem.style.position = "absolute";
      draggingItem.style.zIndex = 100;

      event.target.parentElement.append(draggingItem);
      shiftX =
        event.target.parentElement.getBoundingClientRect().left +
        (event.clientX - event.target.getBoundingClientRect().left);
        moveAt(event.clientX-getComputedStyle(event.target).margin.slice(0,-2))
    } else return;

    let limits = {
      top: taskWrapper.offsetTop,
      right: taskWrapper.offsetWidth + taskWrapper.offsetLeft,
      bottom: taskWrapper.offsetHeight + taskWrapper.offsetTop,
      left: taskWrapper.offsetLeft,
    };

    draggingItem.style.cursor = "grabbing";
    // ЛИММИТЫ КООРДИНАТ ОГРАНИЧИВАЮЩИЕ ВЫЛЕТ ПЕРЕТАСКИВАЕМОГО ЭЛЕМЕНТА ЗА БЛОК
    //  (ПО УМОЛЧАНИЮ interact_zadanie - РОДИТЕЛЬ ВАШЕГО БЛОКА
    function moveAt(pageX) {
      draggingItem.style.left = pageX - shiftX + "px";
    }

    let clickWithoutMove = true;

    function onMouseMove(event) {
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
      moveAt(newLocation.x);

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

      if (
        elemBelow.classList.contains("wordOrderInSentences_word") &&
        elemBelow.innerText !== draggingItem.innerText
      ) {
        const nextElement = getNextElement(event.clientX, elemBelow);
        if (draggingItem.parentNode.contains(nextElement)) {
          targetItem.classList.add("wordOrderInSentences_selectedInSentence");
          draggingItem.parentNode.insertBefore(targetItem, nextElement);
          // открываем кнопку ПРОВЕРИТЬ
          if (!isGameStart) {
            toggleOpacityAndEventsElement(btnTest);
            isGameStart = true;
          }
        }
      }
    }

    taskWrapper.addEventListener("pointermove", onMouseMove);
    document.addEventListener("pointerup", onpointerup);

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
      taskWrapper.removeEventListener("pointermove", onMouseMove);
      // ЛОГИКА ОБРАБОТКИ ПОПАДАНИЯ НА НУЖНЫЙ БЛОК И НАОБОРОТ
      targetItem.classList.remove("wordOrderInSentences_selectedInSentence");
      draggingItem.remove();
      document.removeEventListener("pointerup", onpointerup);
    }
  }

  function getNextElement(cursorPosition, currentElement) {
    const currentElementCoord = currentElement.getBoundingClientRect();
    const currentElementCenter =
      currentElementCoord.x + currentElementCoord.width / 2;

    let nextElement =
      cursorPosition < currentElementCenter
        ? currentElement
        : currentElement.nextElementSibling;
    return nextElement;
  }

  function onBtnResetClick() {
    sentences.addEventListener("pointerdown", mouseDown);
    sentences.innerHTML = "";
    fillSentences();
    checkingAnswerReset(controlsBox, infoBox);
    // закрываем кнопку ПРОВЕРИТЬ
    if (isGameStart) {
      toggleOpacityAndEventsElement(btnTest);
      isGameStart = false;
    }
  }

  function onBtnTestClick() {
    let winVar = 0;
    let words = taskWrapper.querySelectorAll(".wordOrderInSentences_word");
    words.forEach((item, index) => {
      if (item.innerText === rightData[index]) {
        winVar++;
        item.classList.add("wordOrderInSentences_rightAnswer");
      } else {
        item.classList.add("wordOrderInSentences_wrongAnswer");
        item.style.cursor = "default";
      }
    });

    if (winVar === rightData.length) {
      checkingAnswerPositive(controlsBox, infoBox);
    } else {
      checkingAnswerNegative(controlsBox, infoBox);
    }

    sentences.removeEventListener("pointerdown", mouseDown);
  }
}
