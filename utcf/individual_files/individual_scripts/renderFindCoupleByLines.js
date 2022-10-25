import {
  checkingAnswerPositive,
  checkingAnswerNegative,
  checkingAnswerReset,
  removeActiveCardClass,
  addCheckClass,
  addRightChoiceClass,
  addWrongChoiceClass,
  onSoundIconClick,
  resetSound,
  getRandomPositionToCard,
  shuffleCards,
  toggleOpacityAndEventsElement,
  renderCheckPanel,
  getCheckPanelElements,
} from "../../common_files/common_scripts.js";

export function renderFindCoupleByLines(data, taskId) {
  const soundDataAttribute = "sound-data";
  let soundSetStates = {
    currentAudio: null,
    currentAudioIcon: null,
    isPlaying: false,
  };
  let isGameStart = false;

  const leftCol = "leftCol";
  const rightCol = "rightCol";

  let x1 = 0,
    x2 = 0,
    y1 = 0,
    y2 = 0,
    firstItem = null,
    secondItem = null,
    answers = [];

  const task = document.querySelector(`#${taskId}`);
  const table = task.querySelector(".findCoupleByLines_1_findCouple_table");
  const leftSide = task.querySelector(".findCoupleByLines_1_findCouple_left");
  const rightSide = task.querySelector(".findCoupleByLines_1_findCouple_right");

  fillTask();
  renderCheckPanel(task, true);
  const { btnReset, btnTest, controlsBox, infoBox } =
    getCheckPanelElements(task);
  // закрываем кнопку ПРОВЕРИТЬ
  toggleOpacityAndEventsElement(btnTest);

  const allAudioFiles = task.querySelectorAll(
    ".findCoupleByLines_1_findCouple_audio"
  );

  btnReset.addEventListener("click", onReloadBtnClick);
  btnTest.addEventListener("click", onCheckTaskBtnClick);
  table.addEventListener("click", startSelect);

  function playSoundsButton(soundSrc, id, column) {
    let audio = document.createElement("audio");
    audio.setAttribute("src", soundSrc);
    audio.setAttribute("id", `${column}_${id}${taskId}`);
    audio.classList.add("findCoupleByLines_1_findCouple_audio");
    let playButton_body = document.createElement("div");
    playButton_body.classList.add("buttonPlayPausePlayPause_wrap");
    playButton_body.classList.add("buttonPlayPause--play");
    playButton_body.classList.add("findCoupleByLines_1_soundIconPosition");
    playButton_body.setAttribute(
      soundDataAttribute,
      `${column}_${id}${taskId}`
    );
    let playButton_one = document.createElement("div");
    playButton_one.classList.add("buttonPlayPause__shape");
    playButton_one.classList.add("buttonPlayPause__shape--one");
    let playButton_two = document.createElement("div");
    playButton_two.classList.add("buttonPlayPause__shape");
    playButton_two.classList.add("buttonPlayPause__shape--two");

    playButton_body.append(playButton_one, playButton_two, audio);

    return playButton_body;
  }

  function fillTask() {
    createOneSide(data, leftSide, leftCol);
    createOneSide(data, rightSide, rightCol);
  }

  function createOneSide(data, placeAppend, side) {
    shuffleCards([...data]).forEach((item) => {
      let text;
      let sound;
      let word = document.createElement("div");
      word.classList.add(
        "findCoupleByLines_1_findCouple_item",
        "oneMultiChoice_border"
      );
      word.setAttribute("data-answer", item.id);
      word.setAttribute("busy", false);

      if (side === rightCol) {
        text = item.textRight;
        sound = item.audioSrc_2;
      } else {
        text = item.textLeft;
        sound = item.audioSrc;
      }

      if (sound) {
        word.append(playSoundsButton(sound, item.id, side));
      }
      if (text) {
        let div = document.createElement("div");
        div.innerText = text;
        div.classList.add("findCoupleByLines_1_findCouple_item_text");
        word.append(div);
      }

      placeAppend.append(word);
    });
  }

  function startSelect(e) {
    if (e.target.classList.contains("buttonPlayPausePlayPause_wrap")) {
      onSoundIconClick(e, soundSetStates, allAudioFiles, soundDataAttribute);
    }
    let coords2 = table.getBoundingClientRect();
    if (
      e.target.classList.contains("findCoupleByLines_1_findCouple_item") ||
      e.target.classList.contains("findCoupleByLines_1_findCouple_item_text")
    ) {
      if (!isGameStart) {
        // открываем кнопку ПРОВЕРИТЬ
        toggleOpacityAndEventsElement(btnTest);
        isGameStart = true;
      }
      let elem = e.target.closest(".findCoupleByLines_1_findCouple_item");
      if (
        elem.parentElement.classList.contains(
          "findCoupleByLines_1_findCouple_left"
        )
      ) {
        firstItem = elem;
        let coords = elem.getBoundingClientRect();

        if (elem.classList.contains("targetChoice_color")) {
          checkBusyElementAndRemove(elem);
          removeActiveCardClass(elem);

          firstItem = null;
          x1 = 0;
          x2 = 0;
        } else {
          getAllSideElementsAndRemoveClass(leftSide);
          addCheckClass(elem);

          x1 = coords.right - coords2.left;
          y1 = coords.top + coords.height / 2 - coords2.top;

          if (x2 !== 0) {
            firstItem.setAttribute("busy", true);
            secondItem.setAttribute("busy", true);
            let svg = createSvgLine(x1, y1, x2, y2, table);

            answers.push([firstItem, secondItem, svg]);
            x1 = 0;
            x2 = 0;
            y1 = 0;
            y2 = 0;
            firstItem = null;
            secondItem = null;
          }
        }
      } else if (
        elem.parentElement.classList.contains(
          "findCoupleByLines_1_findCouple_right"
        )
      ) {
        secondItem = elem;
        let coords = elem.getBoundingClientRect();
        if (elem.classList.contains("targetChoice_color")) {
          checkBusyElementAndRemove(elem);
          removeActiveCardClass(elem);

          secondItem = null;
          x1 = 0;
          x2 = 0;
        } else {
          getAllSideElementsAndRemoveClass(rightSide);
          addCheckClass(elem);
          x2 = coords.left - coords2.left;
          y2 = coords.bottom - coords.height / 2 - coords2.top;

          if (x1 !== 0) {
            firstItem.setAttribute("busy", true);
            secondItem.setAttribute("busy", true);
            let svg = createSvgLine(x1, y1, x2, y2, table);

            answers.push([firstItem, secondItem, svg]);
            x1 = 0;
            x2 = 0;
            y1 = 0;
            y2 = 0;
          }
        }
      }
    }
  }

  function getAllSideElementsAndRemoveClass(sideElement) {
    sideElement
      .querySelectorAll(".findCoupleByLines_1_findCouple_item")
      .forEach((item) => {
        if (item.getAttribute("busy") === "false") {
          removeActiveCardClass(item);
        }
      });
  }

  function checkBusyElementAndRemove(elem) {
    if (elem.getAttribute("busy") === "true") {
      let removableEl = null;
      answers.forEach((item, index) => {
        if (item.indexOf(elem) != -1) {
          removableEl = index;
          item[2].remove();

          removeActiveCardClass(item[0]);
          removeActiveCardClass(item[1]);
          item[0].setAttribute("busy", false);
          item[1].setAttribute("busy", false);

          if (firstItem) {
            removeActiveCardClass(firstItem);
          }
          if (secondItem) {
            removeActiveCardClass(secondItem);
          }
          secondItem = null;
          firstItem = null;
        }
      });

      answers.splice(removableEl, 1);
    }
  }

  function createSvgLine(x1, y1, x2, y2, table) {
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.innerHTML = `<circle r='1.2mm' cx=${x1} cy=${y1}></circle><line x1=${x1} y1=${y1} x2=${x2} y2=${y2} ></line><circle r='1.2mm' cx=${x2} cy=${y2}></circle>`;
    svg.classList.add("findCoupleByLines_1_findCouple_svg");
    table.append(svg);
    return svg;
  }

  function onReloadBtnClick() {
    task
      .querySelectorAll(".findCoupleByLines_1_findCouple_svg")
      .forEach((item) => item.remove());
    (firstItem = null), (secondItem = null), (answers = []);
    [...table.children].forEach((el) => {
      [...el.children].forEach((elem) => {
        getRandomPositionToCard(elem);
        elem.setAttribute("busy", false);
        removeActiveCardClass(elem);
      });
    });

    checkingAnswerReset(controlsBox, infoBox);

    resetSound(soundSetStates);
    table.addEventListener("click", startSelect);

    // закрываем кнопку ПРОВЕРИТЬ
    if (isGameStart) {
      toggleOpacityAndEventsElement(btnTest);
      isGameStart = false;
    }
  }

  function onCheckTaskBtnClick() {
    table.removeEventListener("click", startSelect);
    let winVar = 0;
    answers.forEach((item) => {
      if (
        item[0].getAttribute("data-answer") ===
        item[1].getAttribute("data-answer")
      ) {
        winVar++;

        addRightChoiceClass(item[0]);
        addRightChoiceClass(item[1]);
        item[2].classList.add("findCoupleByLines_1_findCouple_true_line");
      } else {
        addWrongChoiceClass(item[0]);
        addWrongChoiceClass(item[1]);
        item[2].classList.add("findCoupleByLines_1_findCouple_wrong_line");
      }
    });

    if (winVar === data.length) {
      checkingAnswerPositive(controlsBox, infoBox);
    } else {
      checkingAnswerNegative(controlsBox, infoBox);
    }
    resetSound(soundSetStates);
  }
}
