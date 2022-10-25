import {
  renderMoveWordsIntoSentenceWithCopyMarkup
} from "../../../_common_files/renderMoveWordsIntoSentenceWithCopyMarkup.js";



//шаблон для вставки в HTML
//ПОМЕНЯЙ id НА УНИКАЛЬНЫЙ
/**
/**
     <div class="trainerTaskWrapper" id="task-1">
        <div class="dnd_MoveWordsWithCopy_comparePicturesWrapper">
          <div class="dnd_MoveWordsWithCopy_dropPlaceWrapper"></div>

          <div class="dnd_MoveWordsWithCopy_dragPlaceWrapper"></div>
        </div>
      </div>
 */

(() => {
   // это контейнер для данного задания, для каждого нужно будет вписывать свой id, который был присвоен в html
   const taskId = "task-1"
  // массив предложений, в которые нужно вставлять слова
  // в место предложения в поле text, куда нужно будет перетаскивать слово,
  //  вставлять значок флажка &#9873;

  const textForRender = [
    {
      id: 1,
      text: "On Sunday &#9873; &#9873;",
    },
    {
      id: 2,
      text: "&#9873; &#9873; on Sunday",
    },
    {
      id: 3,
      text: "&#9873; &#9873; on Monday",
    },
    {
      id: 4,
      text: "On Monday &#9873; &#9873;",
    },
    {
      id: 5,
      text: "On Tuesday &#9873; &#9873;",
    },
    {
      id: 6,
      text: "&#9873; &#9873; on Tuesday",
    },
    {
      id: 7,
      text: "&#9873; &#9873; on Wednesday",
    },
    {
      id: 8,

      text: "On Wednesday &#9873; &#9873;",
    },
    {
      id: 9,
      text: "&#9873; &#9873; on Thursday",
    },
    {
      id: 10,
      text: "On Thursday &#9873; &#9873;",
    },
    {
      id: 11,
      text: "On Friday &#9873; &#9873;",
    },
    {
      id: 12,
      text: "&#9873; &#9873; on Friday",
    },
    {
      id: 13,
      text: "On Saturday &#9873; &#9873;",
    },
    {
      id: 14,
      text: "&#9873; &#9873; 	on Saturday",
    },
  ];

  // массив перетаскиваемых слов
  // в поле text указывается само перетаскиваемое слово
  // в поле answerTag в [] через запятую указываются номера полей для вставки (поля нумеруются по порядку сверху вниз),
  // в которые можно вставить данное слово
  const dragTextForRender = [
    {
      id: 1,
      text: "I",
      answerTag: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27],
    },
    {
      id: 2,
      text: "do homework",
      answerTag: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28],
    },
    {
      id: 3,
      text: "do sports",
      answerTag: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28],
    },
    {
      id: 4,
      text: "eat ice-cream",
      answerTag: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28],
    },
    {
      id: 5,
      text: "feed birds",
      answerTag: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28],
    },
    {
      id: 6,
      text: "go home",
      answerTag: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28],
    },
    {
      id: 7,
      text: "go to school",
      answerTag: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28],
    },
    {
      id: 8,
      text: "have fun",
      answerTag: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28],
    },
    {
      id: 9,
      text: "I have school",
      answerTag: [0],
    },
    {
      id: 10,
      text: "learn English",
      answerTag: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28],
    },
    {
      id: 11,
      text: "meet friends",
      answerTag: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28],
    },
    {
      id: 12,
      text: "play computer games",
      answerTag: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28],
    },
    {
      id: 13,
      text: "read books",
      answerTag: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28],
    },
    {
      id: 14,
      text: "sleep all day long",
      answerTag: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28],
    },
    {
      id: 15,
      text: "watch cartoons",
      answerTag: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28],
    },
  ];
 

  //сама функция, которая запускается, здесь ничего менять не нужно
  renderMoveWordsIntoSentenceWithCopyMarkup(
    textForRender,
    dragTextForRender,
    taskId
  );
})();
