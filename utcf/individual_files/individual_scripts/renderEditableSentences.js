import {
  checkingAnswerPositive,
  checkingAnswerNegative,
  checkingAnswerReset,
  addRightChoiceClass,
  addWrongChoiceClass,
  toggleOpacityAndEventsElement,
  renderCheckPanel,
  getCheckPanelElements,
} from "../../common_files/common_scripts.js";

export function renderEditableSentences(data, taskId) {
  let isGameStart = false;
  const statusTrue = "true";
  const statusFalse = "false";

  const task = document.querySelector(`#${taskId}`);
  const sentences = task.querySelector(
    ".editableSentences_textChanging_sentences"
  );

  fillSentences();

  renderCheckPanel(task, true);
  const { btnReset, btnTest, controlsBox, infoBox } =
    getCheckPanelElements(task);
  // закрываем кнопку ПРОВЕРИТЬ
  toggleOpacityAndEventsElement(btnTest);

  btnReset.addEventListener("click", onReloadBtnClick);
  btnTest.addEventListener("click", onCheckTaskBtnClick);
  sentences.addEventListener("keydown", onChangeSentence);

  function onChangeSentence(e) {
    // открываем кнопку ПРОВЕРИТЬ
    if (!isGameStart) {
      toggleOpacityAndEventsElement(btnTest);
      isGameStart = true;
    }
  }

  function onReloadBtnClick() {
    checkingAnswerReset(controlsBox, infoBox);
    sentences.innerHTML = "";
    fillSentences();
    sentences.addEventListener("keydown", onChangeSentence);

    // закрываем кнопку ПРОВЕРИТЬ
    if (isGameStart) {
      toggleOpacityAndEventsElement(btnTest);
      isGameStart = false;
    }
  }

  function onCheckTaskBtnClick() {
    let winVar = 0;
    [...sentences.children].forEach((elem, index) => {
      let winCount = 0;
      [...elem.children].forEach((child, idx) => {
        child.contentEditable = "false";
        if (
          (data[index][idx].status === statusTrue &&
            data[index][idx].word.toLowerCase() ===
              child.innerText.toLowerCase().trim()) ||
          (data[index][idx].status === statusFalse &&
            data[index][idx].rightWord.toLowerCase() ===
              child.innerText.toLowerCase().trim())
        ) {
          winCount += 1;
        }
      });
      if (winCount === elem.children.length) {
        winVar += 1;
        addRightChoiceClass(elem);
      } else addWrongChoiceClass(elem);
    });

    if (winVar === data.length) {
      checkingAnswerPositive(controlsBox, infoBox);
    } else {
      checkingAnswerNegative(controlsBox, infoBox);
    }
    sentences.removeEventListener("keydown", onChangeSentence);
  }

  function fillSentences() {
    data.forEach((item) => {
      let sentence = document.createElement("div");

      sentence.classList.add(
        "editableSentences_textChanging_sentence",
        "oneMultiChoice_border"
      );
      item.forEach((i) => {
        let span = document.createElement("span");
        span.classList.add("editableSentences_textChanging_word");
        if (i.status === statusFalse) {
          span.setAttribute("data-answer", i.rightWord);
        }
        span.contentEditable = "true";
        span.innerText = i.word;
        sentence.append(span);
      });
      sentences.append(sentence);
    });
  }
}
