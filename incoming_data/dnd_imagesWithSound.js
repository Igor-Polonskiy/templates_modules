import {
  renderDnDImagesWithSoundMarkup
} from "../../../_common_files/renderDnDImagesWithSoundMarkup.js"

//шаблон для вставки в HTML
//ПОМЕНЯЙ id НА УНИКАЛЬНЫЙ
/**
 <div class="trainerTaskWrapper" id="dnd_soundToSomething_task-1">
        <div class="dnd_soundToSomething_comparePicturesWrapper">
          <div class="dnd_soundToSomething_dropPlaceWrapper"></div>
          <div class="dnd_soundToSomething_dragPlaceWrapper"></div>
        </div>
      </div>

 */

(() => {
   // это уникальный id для данного задания, который был присвоен в html
   const taskId = "dnd_soundToSomething_task-1";
  // массив входящих картинок ( до 6 элементов),
  // поля imgSrc, text, audioSrc_2 заполняются опционально, если контента нет, оставлять ''
  // в поле answerTag вписывается слово по которому будет сверяться правильность сопоставления звука и картинки
  // поле id должно быть уникальным, т.к. по нему происходит воспроизведение звуков
  // в  audioSrc -  звуки для перетаскиваемых элементов
  // в  audioSrc_2 -  звуки для озвучки картинок
  const arrayOfElements = [
    {
      id: 1,
      name: "whistle",
      imgSrc: "Images_1/dnd_imagesWithSound/DO_3-4_26_5_12.jpg",
      audioSrc: "sound/dnd_imagesWithSound/DO_3-4_26_5_8.mp3",
      audioSrc_2: "sound/dnd_imagesWithSound/003.mp3",
      text: "Свистулька",
      answerTag: "whistle",
    },
    {
      id: 2,
      name: "balalaika",
      imgSrc: "Images_1/dnd_imagesWithSound/DO_3-4_26_5_13.jpg",
      audioSrc: "sound/dnd_imagesWithSound/DO_3-4_26_5_7.mp3",
      audioSrc_2: "sound/dnd_imagesWithSound/002.mp3",
      text: "Балалайка",
      answerTag: "balalaika",
    },
    {
      id: 3,
      name: "flute",
      imgSrc: "Images_1/dnd_imagesWithSound/DO_3-4_26_5_14.jpg",
      audioSrc: "sound/dnd_imagesWithSound/DO_3-4_26_5_11.mp3",
      audioSrc_2: "sound/dnd_imagesWithSound/006.mp3",
      text: "Свирель",
      answerTag: "flute",
    },
    {
      id: 4,
      name: "ratchet",
      imgSrc: "Images_1/dnd_imagesWithSound/DO_3-4_26_5_15.jpg",
      audioSrc: "sound/dnd_imagesWithSound/DO_3-4_26_5_9.mp3",
      audioSrc_2: "sound/dnd_imagesWithSound/004.mp3",
      text: "Трещотка",
      answerTag: "ratchet",
    },
    {
      id: 5,
      name: "spoons",
      imgSrc: "Images_1/dnd_imagesWithSound/DO_3-4_26_5_16.jpg",
      audioSrc: "sound/dnd_imagesWithSound/DO_3-4_26_5_10.mp3",
      audioSrc_2: "sound/dnd_imagesWithSound/005.mp3",
      text: "Ложки",
      answerTag: "spoons",
    },
  ];

 

  renderDnDImagesWithSoundMarkup(arrayOfElements, taskId);
})();
