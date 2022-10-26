import {
  renderMoveWordsIntoSentenceWithoutCopyMarkup
} from "../utcf/individual_files/individual_scripts/renderMoveWordsIntoSentenceWithoutCopyMarkup.js";


//шаблон для вставки в HTML
//ПОМЕНЯЙ id НА УНИКАЛЬНЫЙ
/**
     <div class="trainerTaskWrapper" id="task-1">
        <div class="dnd_MoveWordsNoCopy_comparePicturesWrapper">
          <div class="dnd_MoveWordsNoCopy_dropPlaceWrapper"></div>

          <div class="dnd_MoveWordsNoCopy_dragPlaceWrapper"></div>
        </div>
      </div>
 */


(() => {
   // это контейнер для данного задания, для каждого нужно будет вписывать свой id, который был присвоен в html
   const taskId = "task-1"

  // массив предложений, в которые нужно вставлять слова
  //title - заголовок для текста
  // в место предложения в поле text, куда нужно будет перетаскивать слово,
  //  вставлять значок флажка &#9873;
  const textForRender = [
    {
      id: 1,
      title: "",
      text: "I have got a lot of &#9873;",
    },
    {
      id: 2,
      title: "",

      text: "This is my &#9873;",
    },
    {
      id: 3,
      title: "",

      text: "It is  &#9873;",
    },
    {
      id: 4,
      title: "",

      text: "I like to &#9873; with my &#9873;",
    },
  ];

  // массив перетаскиваемых слов
  // в поле text указывается само перетаскиваемое слово
  // в поле tag в [] через запятую указываются номера полей для вставки (поля нумеруются по порядку сверху вниз),
  // в которые можно вставить данное слово
  const dragTextForRender = [
    {
      id: 1,
      text: "toys",
      tag: [1],
    },
    {
      id: 2,
      text: "car",
      tag: [2, 5],
    },
    {
      id: 3,
      text: "red",
      tag: [3],
    },
    {
      id: 4,
      text: "play",
      tag: [4],
    },
    {
      id: 5,
      text: "car",
      tag: [2, 5],
    },
  ];
 
  //сама функция, которая запускается, здесь ничего менять не нужно
  renderMoveWordsIntoSentenceWithoutCopyMarkup(
    textForRender,
    dragTextForRender,
    taskId
  );
})();
