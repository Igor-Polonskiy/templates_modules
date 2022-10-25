import {
  scaleImage,
  onSoundIconClick,
  resetSound,
  changeSlideMoveLeft,
  changeSlideMoveRight,
} from "../../common_files/common_scripts.js";

export function renderSlideShow_1(sliderContent, taskId) {
  const soundDataAttribute = "sound-data";
  let soundSetStates = {
    currentAudio: null,
    currentAudioIcon: null,
    isPlaying: false,
  };
  const taskWrapper = document.querySelector(`#${taskId}`);
  const leftBtn = taskWrapper.querySelector(".gallery_arrow_left");
  const rightBtn = taskWrapper.querySelector(".gallery_arrow_right");
  const sliderBox = taskWrapper.querySelector(".slideShow_1_Content");
  const actualSlideNum = taskWrapper.querySelector(
    ".slideShow_1_Counter-actual"
  );
  const allSlideNum = taskWrapper.querySelector(".slideShow_1_Counter");

  sliderBox.insertAdjacentHTML(
    "beforeend",
    createPictureCardsMarkup(sliderContent)
  );

  const slideBoxImages = taskWrapper.querySelectorAll(".slideShow_1_Box");
  const audioFiles = taskWrapper.querySelectorAll(".slideShow_1_audio");

  allSlideNum.textContent = sliderContent.length;
  leftBtn.classList.add("noDisplayElement");

  const slideshowParameters = {
    currentShowImg: slideBoxImages[0], // первый слайд
    counter: 1, // начальный счетчик
  };

  actualSlideNum.textContent = slideshowParameters.counter;

  leftBtn.addEventListener("click", onSlideshowBtnLeftClick);
  rightBtn.addEventListener("click", onSlideshowBtnRightClick);
  sliderBox.addEventListener("pointerdown", onSliderContentClick);

  function onSliderContentClick(e) {
    if (e.target.classList.contains("slideShow_1_ImgBox")) {
      scaleImage(e.target);
    }
    if (e.target.classList.contains("buttonPlayPausePlayPause_wrap")) {
      onSoundIconClick(e, soundSetStates, audioFiles, soundDataAttribute);
    }
  }

  function createPictureCardsMarkup(pictures) {
    return pictures
      .map((picture, index) => {
        const isVisible = index === 0 ? "" : "visually-hidden";

        const isSoundOne =
          picture.audioSrc &&
          `<div class="buttonPlayPausePlayPause_wrap buttonPlayPause--play slideShow_1_audio_image" ${soundDataAttribute}="${picture.id}${taskId}">
          <div class="buttonPlayPause__shape buttonPlayPause__shape--one"></div>
          <div class="buttonPlayPause__shape buttonPlayPause__shape--two"></div>
          <audio class="slideShow_1_audio" id="${picture.id}${taskId}" src="${picture.audioSrc}">
                Your browser does not support the <code>audio</code> element.
              </audio>
        </div>`;

        const isText =
          picture.text && `<div class="slideShow_1_Text">${picture.text}</div>`;

        return `<div class='slideShow_1_Box ${isVisible}'>
                    <div class='slideShow_1_ImgBox' style='background-image: url(${picture.imgSrc})'></div>
                    ${isSoundOne}
                    ${isText}
                    </div>
                    `;
      })
      .join("");
  }

  function onSlideshowBtnLeftClick(e) {
    resetSound(soundSetStates);

    changeSlideMoveLeft(
      slideshowParameters, // данные для слайда
      actualSlideNum, //блок, куда пишется цифра
      slideBoxImages, // массив слайдов
      leftBtn, // кнопка влево, которую скрыть
      rightBtn // кнопка вправо, которую скрыть
    );
  }

  function onSlideshowBtnRightClick(e) {
    resetSound(soundSetStates);

    changeSlideMoveRight(
      slideshowParameters, // данные для слайда
      actualSlideNum, //блок, куда пишется цифра
      slideBoxImages, // массив слайдов
      leftBtn, // кнопка влево, которую скрыть
      rightBtn // кнопка вправо, которую скрыть
    );
  }
}
