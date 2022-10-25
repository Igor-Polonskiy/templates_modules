import { renderFlipCardsMarkup } from "../utcf/individual_files/individual_scripts/renderFlipCardsMarkup.js";

// вставить в html
/*
<div class="trainerTaskWrapper" id="flipCards_1_task-1">
      <div class="flipCards_1_flipCardsWrapper"></div>
    </div>
*/

(() => {
  // это уникальный id для данного задания, который был присвоен в html
  const taskId = "flipCards_1_task-1";
  //входящие данные
  const itemsToImage = [
    {
      id: 1,
      name: "name",
      imgSrcCover: "", // если нужна картинка тыльной стороне, или ''
      imgSrcFace: "Images_1/flipCards/DOH_3-4_13_2_8.png", // если нужна картинка на лицевой стороне, или ''

      audioSrcCover: "sound/flipCards/003.mp3", // если нужен звук на тыльной стороне, или ''
      audioSrcFace: "sound/flipCards/003.mp3", // если нужен звук на лицевой стороне, или ''

      textCover: "Как зовут бабушку или дедушку?", // если нужен текст на тыльной стороне, или '', если нужен перенос строки, то вставить <br>
      textFace: "Как зовут бабушку или дедушку?", // если нужен текст на лицевой стороне, или '', если нужен перенос строки, то вставить <br>
    },
  ];

  renderFlipCardsMarkup(itemsToImage, taskId);
})();
