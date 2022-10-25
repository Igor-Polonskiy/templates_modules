import {
  scaleImage,
  onSoundIconClick,
  resetSound,
  togglePointerEventElement,
} from "../../common_files/common_scripts.js";

export function renderBookMarkup(bookPages, taskId, bookDesign) {
  const newArrPages = unflat(bookPages, 2);

  const soundDataAttribute = "sound-data";
  let soundSetStates = {
    currentAudio: null,
    currentAudioIcon: null,
    isPlaying: false,
  };

  const audio_1 = "audio_1";
  const audio_2 = "audio_2";

  const taskWrapper = document.querySelector(`#${taskId}`);
  const book = taskWrapper.querySelector("#interactiveBook_book");
  const bookBox = taskWrapper.querySelector(".interactiveBook_book-background");

  book.insertAdjacentHTML("beforeend", createBooksPagesMarkup(newArrPages));

  const audioFiles = taskWrapper.querySelectorAll(".interactiveBook_audio");
  const allPagesProject = taskWrapper.getElementsByClassName(
    "interactiveBook_page_project"
  );

  book.addEventListener("pointerdown", onIconClick);

  // Присвоим нулевой странице обработчик
  allPagesProject[0].addEventListener("click", pageclick);

  // отслеживаем, открыта ли модалка и увеличенной картинкой, чтобы при ее закрытии страница не переворачивалась (при тач)
  getIsModalOpen(book);

  function getIsModalOpen(element) {
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutationRecord) {
        if (
          mutationRecord.addedNodes.length > 0 &&
          mutationRecord.addedNodes[0].localName !== "script" &&
          mutationRecord.addedNodes[0]?.style.background ===
            "rgba(0, 0, 0, 0.5)"
        ) {
          togglePointerEventElement(element);
        } else if (
          mutationRecord.removedNodes.length > 0 &&
          mutationRecord.removedNodes[0].localName !== "script" &&
          mutationRecord.removedNodes[0]?.style.background ===
            "rgba(0, 0, 0, 0.5)"
        ) {
          setTimeout(() => {
            togglePointerEventElement(element);
          }, 250);
        }
      });
    });

    const target = document.body;

    observer.observe(target, {
      childList: true,
    });
  }

  function onIconClick(e) {
    if (e.target.classList.contains("buttonPlayPausePlayPause_wrap")) {
      onSoundIconClick(e, soundSetStates, audioFiles, soundDataAttribute);
    }

    if (e.target.classList.contains("interactiveBook_enlarge_picture")) {
      scaleImage(e.target.parentElement);
    }
  }

  function pageclick(e) {
    let target = e.target;

    if (e.target.classList.contains("buttonPlayPausePlayPause_wrap")) return;

    if (e.target.classList.contains("interactiveBook_enlarge_picture")) return;

    resetSound(soundSetStates);

    while (
      !target.classList.contains("interactiveBook_page_project") &&
      target.tagName !== "body"
    ) {
      target = target.parentElement;
    }

    // Работаем дальше, только если в дереве DOM была найдена страница книги
    if (target.classList.contains("interactiveBook_page_project"))
      expertSystem(target);
  }

  // Экспертная система при щелчке по странице в google chrome
  function expertSystem(target) {
    let operation;

    if (target.classList.contains("interactiveBook_page-open")) {
      operation = "forward";
    } else {
      operation = "back";
    }

    performOperation(target, operation);
  }

  function performOperation(target, operation) {
    // Определим номер страницы в списке
    let page_number = parseInt(target.getAttribute("data-number"));

    // Удалим классы анимации у страницы
    target.classList.remove("interactiveBook_flip-right-to-left");
    target.classList.remove("interactiveBook_flip-left-to-right");

    // Объявим объект для расстановки приоритетов визуализации
    let orderPages = {};

    // Объявим массив страниц для присвоение обработки нажатия кнопки мыши
    let clickPages = [];

    switch (operation) {
      // Если пользователь идет вперед по книге
      case "forward":
        // ******** Выполним действия с размерами книги ********

        // Если это открытие первой страницы, увеличим размер книги
        if (target.classList.contains("interactiveBook_page-first")) {
          setTimeout(() => {
            bookBox.classList.add("interactiveBook_book-cover-open");
            bookBox.style.backgroundImage = `url(${bookDesign.bookSpread})`;
            book.classList.add("interactiveBook_book-position_top");
            book.classList.remove("interactiveBook_book-position_left");
          }, 250);
        }

        // Если это открытие последней страницы, уменьшим размер книги
        // и сдвинем ее расположение в центр
        if (target.classList.contains("interactiveBook_page-last")) {
          setTimeout(() => {
            bookBox.classList.remove("interactiveBook_book-cover-open");
            bookBox.style.backgroundImage = "";
            book.classList.remove("interactiveBook_book-position_top");
            book.classList.add("interactiveBook_book-position_left");
          }, 250);
        }

        // ******** Выполним действия с выбранной страницей ********

        // Удалим класс открыто и применим класс перевернуто
        target.classList.remove("interactiveBook_page-open");
        target.classList.add("interactiveBook_page-turned");

        // Применим класс анимация переворота страницы
        target.classList.add("interactiveBook_flip-right-to-left");
        // убрать/добавить скрытие контента
        setTimeout(() => {
          target.lastElementChild.classList.remove(
            "interactiveBook_pageHidden"
          );
          target.firstElementChild.classList.add("interactiveBook_pageHidden");
        }, 500);

        // ******** Выполним действия с видимостью страниц и назначим обработку событий нажатия страницы ********

        // Если это открытие первой страницы, сделаем видимой ее и вторую страницу
        if (target.classList.contains("interactiveBook_page-first")) {
          orderPages[page_number] = 600;
          orderPages[page_number + 1] = 599;
          clickPages.push(page_number);
          clickPages.push(page_number + 1);
        } else {
          // Если это открытие последней страницы, сделаем видимой ее и предыдущую ей страницу
          if (target.classList.contains("interactiveBook_page-last")) {
            orderPages[page_number] = 600;
            orderPages[page_number - 1] = 599;
            clickPages.push(page_number);
          }
          // Если это открытие страниц в середине книжки
          else {
            orderPages[page_number - 1] = 598;
            orderPages[page_number] = 600;
            orderPages[page_number + 1] = 599;
            clickPages.push(page_number);
            clickPages.push(page_number + 1);
          }
        }

        break;

      // Если пользователь идет назад по книге
      case "back":
        // ******** Выполним действия с размерами книги ********

        // Если последняя страница книги была закрыта и книгу открывают, размер книги надо увеличить
        if (target.classList.contains("interactiveBook_page-last")) {
          setTimeout(() => {
            bookBox.classList.add("interactiveBook_book-cover-open");
            bookBox.style.backgroundImage = `url(${bookDesign.bookSpread})`;
            book.classList.add("interactiveBook_book-position_top");
            book.classList.remove("interactiveBook_book-position_left");
          }, 250);
        }

        // Если первая страница книги была открыта и ее закрывают, размер книги надо уменьшить
        if (target.classList.contains("interactiveBook_page-first")) {
          setTimeout(() => {
            bookBox.classList.remove("interactiveBook_book-cover-open");
            bookBox.style.backgroundImage = "";
            book.classList.remove("interactiveBook_book-position_top");
            book.classList.remove("interactiveBook_book-position_left");
          }, 250);
        }

        // ******** Выполним действия с выбранной страницей ********

        // Удалим класс открыто и применим класс перевернуто
        target.classList.remove("interactiveBook_page-turned");
        target.classList.add("interactiveBook_page-open");

        // Применим класс анимации переворота страницы
        target.classList.add("interactiveBook_flip-left-to-right");

        // убрать/добавить скрытие контента
        setTimeout(() => {
          target.lastElementChild.classList.add("interactiveBook_pageHidden");
          target.firstElementChild.classList.remove(
            "interactiveBook_pageHidden"
          );
        }, 500);

        // ******** Выполним действия с видимостью страниц ********

        // Если первая страница книги была открыта и ее закрывают
        if (target.classList.contains("interactiveBook_page-first")) {
          orderPages[page_number] = 600;
          orderPages[page_number + 1] = 599;
          clickPages.push(page_number);
        } else {
          // Если последняя страница книги была закрыта и ее открывают
          if (target.classList.contains("interactiveBook_page-last")) {
            orderPages[page_number - 1] = 599;
            orderPages[page_number] = 600;
            clickPages.push(page_number);
            clickPages.push(page_number - 1);
          }
          // Если это возврат к началу книги ( открывает страницы в обратном направлении)
          else {
            orderPages[page_number - 1] = 599;
            orderPages[page_number] = 600;
            orderPages[page_number + 1] = 598;
            clickPages.push(page_number - 1);
            clickPages.push(page_number);
          }
        }

        break;

      default:
        break;
    }

    setZIndexPages(orderPages);
    setListenerClick(clickPages);
  }

  function setZIndexPages(orderPages) {
    const allPagesProject = taskWrapper.getElementsByClassName(
      "interactiveBook_page_project"
    );

    if (allPagesProject.length !== 0) {
      for (let y = 0; y < allPagesProject.length; y += 1) {
        allPagesProject[y].style.zIndex = (500 - (y + 1)).toString();
      }
    }

    if (typeof orderPages !== "undefined") {
      for (const [key, value] of Object.entries(orderPages)) {
        allPagesProject[key].style.zIndex = value;
      }
    }
  }

  function setListenerClick(clickPages) {
    if (typeof clickPages !== "undefined" || clickPages !== []) {
      const allPagesProject = taskWrapper.getElementsByClassName(
        "interactiveBook_page_project"
      );

      // Удалим все обработчики событий у страниц.
      // Присвоем новые если они нужны
      if (allPagesProject.length !== 0) {
        for (let y = 0; y < allPagesProject.length; y += 1) {
          // Если этой странице не требуется листенер, а у нее он был - удалим
          if (clickPages.indexOf(y) == -1) {
            allPagesProject[y].removeEventListener("click", pageclick, false);
          }
          // Если этой странице требуется листенер, а у нее его не было - присвоим
          else {
            allPagesProject[y].addEventListener("click", pageclick);
          }
        }
      }
    }
  }

  function createBooksPagesMarkup(pictures) {
    return pictures
      .map((item, index) => {
        // разметка для изображений на страницах
        const isImageLeft =
          item[0].imgSrc &&
          ` <div class="interactiveBook_picture_article" style="background-image: url(${item[0]?.imgSrc})">
                <div class="zoom_open_button_white interactiveBook_enlarge_picture" title="Увеличить изображение">
                    <div class="icon_zoomPicture whiteZoomImg"></div>
                </div>
            </div>`;
        const isImageRight =
          item[1]?.imgSrc &&
          ` <div class="interactiveBook_picture_article" style="background-image: url(${item[1]?.imgSrc})">
              <div class="zoom_open_button_white interactiveBook_enlarge_picture" title="Увеличить изображение">
                  <div class="icon_zoomPicture whiteZoomImg"></div>
              </div>
            </div>`;
        // разметка для текста на страницах
        const isTextLeft =
          item[0].text &&
          `<div class="interactiveBook_markletter interactiveBook_texts">${item[0].text}</div>`;
        const isTextRight =
          item[1]?.text &&
          `<div class="interactiveBook_markletter interactiveBook_texts">${item[1].text}</div>`;
        // разметка для звуков на страницах
        const isSoundLeft =
          item[0].audioSrc &&
          `<div class="buttonPlayPausePlayPause_wrap buttonPlayPause--play" ${soundDataAttribute}="${audio_1}${item[0].id}${taskId}">
                <div class="buttonPlayPause__shape buttonPlayPause__shape--one"></div>
                <div class="buttonPlayPause__shape buttonPlayPause__shape--two"></div>
                <audio class="interactiveBook_audio" id="${audio_1}${item[0].id}${taskId}" src="${item[0].audioSrc}">Your browser does not support the <code>audio</code> element.
                </audio>
            </div>`;
        const isSoundRight =
          item[1]?.audioSrc &&
          `<div class="buttonPlayPausePlayPause_wrap buttonPlayPause--play" ${soundDataAttribute}="${audio_1}${item[1].id}${taskId}">
                <div class="buttonPlayPause__shape buttonPlayPause__shape--one"></div>
                <div class="buttonPlayPause__shape buttonPlayPause__shape--two"></div>
                <audio class="interactiveBook_audio" id="${audio_1}${item[1].id}${taskId}" src="${item[1].audioSrc}">Your browser does not support the <code>audio</code> element.
                </audio>
          </div>`;
        const isSoundLeftTwo =
          item[0].audioSrc_2 &&
          `<div class="buttonPlayPausePlayPause_wrap buttonPlayPause--play" ${soundDataAttribute}="${audio_2}${item[0].id}${taskId}">
                <div class="buttonPlayPause__shape buttonPlayPause__shape--one"></div>
                <div class="buttonPlayPause__shape buttonPlayPause__shape--two"></div>
                <audio class="interactiveBook_audio" id="${audio_2}${item[0].id}${taskId}" src="${item[0].audioSrc_2}">Your browser does not support the <code>audio</code> element.
                </audio>
            </div>`;
        const isSoundRightTwo =
          item[1]?.audioSrc_2 &&
          `<div class="buttonPlayPausePlayPause_wrap buttonPlayPause--play" ${soundDataAttribute}="${audio_2}${item[1].id}${taskId}">
                <div class="buttonPlayPause__shape buttonPlayPause__shape--one"></div>
                <div class="buttonPlayPause__shape buttonPlayPause__shape--two"></div>
                <audio class="interactiveBook_audio" id="${audio_2}${item[1].id}${taskId}" src="${item[1].audioSrc_2}">Your browser does not support the <code>audio</code> element.
                </audio>
          </div>`;
        // разметка для изображения  на обложке
        const isCoverImage =
          item[0].imgSrc &&
          `<div class="interactiveBook_picture_article" style="background-image: url(${item[0].imgSrc})">
                <div class="zoom_open_button_white interactiveBook_enlarge_picture" title="Увеличить изображение">
                    <div class="icon_zoomPicture whiteZoomImg"></div>
                </div>
             </div>`;
        // разметка для нумерации страниц
        const evenPage = `<div class="interactiveBook_flip-page-number">${item[0]?.pageNumber}</div>`;
        const oddPage = `<div class="interactiveBook_flip-page-number">${item[1]?.pageNumber}</div>`;

        // разметка самих страниц

        if (index === 0) {
          // для обложки и 1 страницы
          return `
                        <div class="interactiveBook_page_project interactiveBook_page-first interactiveBook_page-open" data-number="${index}" style="z-index: ${
            500 - (index + 1)
          }">
                            <div class="interactiveBook_page_side_left interactiveBook_picture_cover" style="background-image: url(${
                              bookDesign.bookCover
                            })">
                                 <div class='interactiveBook_book-title'>${
                                   item[0].text
                                 }</div>
                                 ${isCoverImage}
                            </div>
                            <div class="interactiveBook_page_side_right interactiveBook_pageHidden">
                                <div class="interactiveBook_working_area">
                                    ${isImageRight}
                                    ${isSoundRight}
                                    ${isTextRight}
                                    ${isSoundRightTwo}
                                    ${oddPage}
                                </div>
                            </div>
                        </div>
                      `;
        } else if (item.length !== 1) {
          //для 2й и последующих страниц, кроме последней и обложки
          return `
                  <div class="interactiveBook_page_project interactiveBook_page-open" data-number="${index}" style="z-index: ${
            500 - (index + 1)
          }">
                      <div class="interactiveBook_page_side_left">
                          <div class="interactiveBook_working_area">
                               ${isImageLeft}
                               ${isSoundLeft}
                               ${isTextLeft}
                               ${isSoundLeftTwo}
                               ${evenPage}

                          </div>
                      </div>
                      <div class="interactiveBook_page_side_right interactiveBook_pageHidden">
                          <div class="interactiveBook_working_area">
                            ${isImageRight}
                            ${isSoundRight}
                            ${isTextRight}
                            ${isSoundRightTwo}
                            ${oddPage}
                          </div>
                      </div>
                  </div>
                          `;
        } else {
          // для последней страницы и обложки
          return `
                <div class="interactiveBook_page_project interactiveBook_page-open interactiveBook_page-last" data-number="${index}" style="z-index: ${
            500 - (index + 1)
          }">
                      <div class="interactiveBook_page_side_left">
                          <div class="interactiveBook_working_area">
                            ${isImageLeft}
                            ${isSoundLeft}
                            ${isTextLeft}
                            ${isSoundLeftTwo}
                            ${evenPage}
                          </div>
                      </div>
                      <div class="interactiveBook_page_side_right ">
                            <div class="interactiveBook_picture-coverLast" style="background-image: url(${
                              bookDesign.bookCover
                            })"></div>
                      </div>
                </div>
                      `;
        }
      })

      .join("");
  }

  function unflat(src, count) {
    const result = [];
    for (let s = 0, e = count; s < src.length; s += count, e += count)
      result.push(src.slice(s, e));
    return result;
  }
}
