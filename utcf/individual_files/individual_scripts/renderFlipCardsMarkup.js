import {
  scaleImage,
  onSoundIconClick,
  resetSound,
  renderCheckPanel,
  getCheckPanelElements,
} from "../../common_files/common_scripts.js";

export function renderFlipCardsMarkup(itemsToImage, taskId) {
  const soundDataAttribute = "drop-data";
  let soundSetStates = {
    currentAudio: null,
    currentAudioIcon: null,
    isPlaying: false,
  };

  const coverId = "cover";
  const faceId = "face";

  const task = document.querySelector(`#${taskId}`);
  const listContainer = task.querySelector(".flipCards_1_flipCardsWrapper");

  listContainer.insertAdjacentHTML(
    "beforeend",
    createPictureCardsMarkup(itemsToImage)
  );
  renderCheckPanel(task, false);
  const { btnReset } = getCheckPanelElements(task);
  const cards = task.querySelectorAll(".flipCards_1_flipCard");
  const audioFiles = task.querySelectorAll(".flipCards_1_flipCard_audio");

  [...listContainer.children].forEach((el) =>
    el.addEventListener("pointerdown", onCardClick)
  );

  btnReset.addEventListener("click", onBtnResetClick);

  function createPictureCardsMarkup(items) {
    return items
      .map((item) => {
        let width;
        if (items.length === 2 || items.length === 1 || items.length === 4) {
          width = 48;
        } else width = 30;
        const isImageCover =
          item.imgSrcCover &&
          `
            <div class="zoom_open_button_white" title="Увеличить изображение">
              <div class="icon_zoomPicture whiteZoomImg"></div>
            </div>
            <img src="${item.imgSrcCover}" alt="${item.name}" class="flipCards_1_flipCardCoverImg" />
        `;
        const isSoundCover =
          item.audioSrcCover &&
          `
                    <div class="buttonPlayPausePlayPause_wrap buttonPlayPause--play" ${soundDataAttribute}='${coverId}_${item.id}${taskId}'>
                      <div class="buttonPlayPause__shape buttonPlayPause__shape--one"></div>
                      <div class="buttonPlayPause__shape buttonPlayPause__shape--two"></div>
                      <audio class="flipCards_1_flipCard_audio" id='${coverId}_${item.id}${taskId}' src="${item.audioSrcCover}">
                            Your browser does not support the <code>audio</code> element.
                          </audio>
                    </div>`;
        const isTextCover =
          item.textCover &&
          `<div class="flipCards_1_flipCardCover_text">${item.textCover}</div>`;
        const isImageFace =
          item.imgSrcFace &&
          `
            <div class="zoom_open_button_white" title="Увеличить изображение">
              <div class="icon_zoomPicture whiteZoomImg"></div>
            </div>
            <img src="${item.imgSrcFace}" alt="${item.name}" class="flipCards_1_flipCardFaceImg" />
        `;
        const isSoundFace =
          item.audioSrcFace &&
          `
                    <div class="buttonPlayPausePlayPause_wrap buttonPlayPause--play" ${soundDataAttribute}='${faceId}_${item.id}${taskId}'>
                      <div class="buttonPlayPause__shape buttonPlayPause__shape--one"></div>
                      <div class="buttonPlayPause__shape buttonPlayPause__shape--two"></div>
                      <audio class="flipCards_1_flipCard_audio" id='${faceId}_${item.id}${taskId}' src="${item.audioSrcFace}">
                            Your browser does not support the <code>audio</code> element.
                          </audio>
                    </div>`;
        const isTextFace =
          item.textFace &&
          `<div class="flipCards_1_flipCardFace_text">${item.textFace}</div>`;
        return `
                    <div
                      class="flipCards_1_flipCard"
                      style="width: ${width}%"
                    >
                    <div class="flipCards_1_flipCardCover">
                    ${isImageCover}
                    ${isSoundCover}
                    ${isTextCover}

                    </div>
                    <div class="flipCards_1_flipCardFace">
                    ${isImageFace}
                    ${isSoundFace}
                    ${isTextFace}

                        </div>
                      </div> `;
      })
      .join("");
  }

  function onBtnResetClick() {
    [...cards].forEach((el) =>
      el.classList.remove("flipCards_1_flipCards_flipped")
    );
    resetSound(soundSetStates);
  }

  function onCardClick(e) {
    if (e.target.classList.contains("zoom_open_button_white")) {
      scaleImage(e.target.nextElementSibling);
      return;
    }

    if (e.target.classList.contains("buttonPlayPausePlayPause_wrap")) {
      onSoundIconClick(e, soundSetStates, audioFiles, soundDataAttribute);
      return;
    }
    resetSound(soundSetStates);

    if (e.currentTarget.classList.contains("flipCards_1_flipCards_flipped")) {
      e.currentTarget.classList.remove("flipCards_1_flipCards_flipped");
    } else e.currentTarget.classList.add("flipCards_1_flipCards_flipped");
  }
}
