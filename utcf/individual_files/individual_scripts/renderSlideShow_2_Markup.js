import {
  scaleImage,
  changeSlideMoveLeft,
  changeSlideMoveRight,
} from "../../common_files/common_scripts.js";

export function renderSlideShow_2_Markup(sliderContent, taskId) {
  let isSound = false;

  const taskWrapper = document.querySelector(`#${taskId}`);
  const task2_prev = taskWrapper.querySelector(".gallery_arrow_left");
  const task2_next = taskWrapper.querySelector(".gallery_arrow_right");
  const task2_slide = taskWrapper.querySelector(".slideShow_2_task_slides");
  const numberOfimgs = taskWrapper.querySelector(".slideShow_2_task_count2");
  const count = taskWrapper.querySelector(".slideShow_2_task_count1");
  const task2_begin = taskWrapper.querySelector(".slideShow_2_task_begin");

  task2_slide.insertAdjacentHTML(
    "beforeend",
    createSliderMarkup(sliderContent)
  );

  const audioFiles = taskWrapper.querySelectorAll(".slideShow_2_task_audio");
  const slideBoxImages = taskWrapper.querySelectorAll(
    ".slideShow_2_task_slide"
  );

  const slideshowParameters = {
    currentShowImg: slideBoxImages[0], // первый слайд
    counter: 1, // начальный счетчик
  };

  task2_prev.classList.add("noDisplayElement");
  task2_next.classList.add("noDisplayElement");
  count.textContent = slideshowParameters.counter;
  numberOfimgs.textContent = sliderContent.length;

  task2_begin.addEventListener("click", onStartBtnClick);
  task2_prev.addEventListener("click", onPrevBtnClick);
  task2_next.addEventListener("click", onNextBtnClick);
  task2_slide.addEventListener("pointerdown", onImageClick);

  function onImageClick(e) {
    if (e.target.classList.contains("slideShow_2_task_img")) {
      scaleImage(e.target);
    }
  }

  function onStartBtnClick(e) {
    if (e.target.classList.contains("slideShow_2_task_start1")) {
      isSound = true;

      playCurrentSlideSound(audioFiles[slideshowParameters.counter - 1]);

      task2_begin.classList.add("visually-hidden");
      task2_next.classList.remove("noDisplayElement");
    } else if (e.target.classList.contains("slideShow_2_task_start2")) {
      task2_begin.classList.add("visually-hidden");
      task2_next.classList.remove("noDisplayElement");
    }
  }

  function playCurrentSlideSound(sound) {
    sound.play();
  }

  function createSliderMarkup(slides) {
    return slides
      .map((slide, index) => {
        const isVisible = index === 0 ? "" : "visually-hidden";
        return `
                  <div class="slideShow_2_task_slide ${isVisible}">
                      <div class='slideShow_2_task_img' style='background-image: url(${slide.imgSrc})'></div>
                      <div class="slideShow_2_task_slide_caption">${slide.text}</div>
                      <audio class="slideShow_2_task_audio" id="${slide.id}${taskId}" src="${slide.audioSrc}">Your browser does not support the
                            <code>audio</code> element.
                      </audio>
                  </div>
      `;
      })
      .join("");
  }

  function onPrevBtnClick() {
    changeSlideMoveLeft(
      slideshowParameters, // данные для слайда
      count, //блок, куда пишется цифра
      slideBoxImages, // массив слайдов
      task2_prev, // кнопка влево, которую скрыть
      task2_next // кнопка вправо, которую скрыть
    );
    if (slideshowParameters.counter > 1) {
      if (isSound) {
        resetCurrentSlideSound(audioFiles[slideshowParameters.counter]);

        playCurrentSlideSound(audioFiles[slideshowParameters.counter - 1]);
      }
    }
    if (slideshowParameters.counter === 1) {
      task2_begin.classList.remove("visually-hidden");
      task2_next.classList.add("noDisplayElement");

      resetCurrentSlideSound(audioFiles[slideshowParameters.counter - 1]);
      resetCurrentSlideSound(audioFiles[slideshowParameters.counter]);

      isSound = false;
    }
  }

  function onNextBtnClick() {
    changeSlideMoveRight(
      slideshowParameters, // данные для слайда
      count, //блок, куда пишется цифра
      slideBoxImages, // массив слайдов
      task2_prev, // кнопка влево, которую скрыть
      task2_next // кнопка вправо, которую скрыть
    );
    if (slideshowParameters.counter < slideBoxImages.length) {
      if (isSound) {
        resetCurrentSlideSound(audioFiles[slideshowParameters.counter - 2]);

        playCurrentSlideSound(audioFiles[slideshowParameters.counter - 1]);
      }
    }
  }

  function resetCurrentSlideSound(sound) {
    sound.pause();
    sound.currentTime = 0;
  }
}
