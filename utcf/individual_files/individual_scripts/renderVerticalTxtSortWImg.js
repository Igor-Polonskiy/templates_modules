import {
    resetSound,
    onSoundIconClick,
    scaleImage,
    checkingAnswerReset,
    checkingAnswerNegative,
    checkingAnswerPositive,
    shuffleCards,
    addRightChoiceClass,
    addWrongChoiceClass,
    removeActiveCardClass,
    toggleOpacityAndEventsElement,
    renderCheckPanel,
    getCheckPanelElements
} from "../../common_files/common_scripts.js"


export function renderVerticalTxtSortWImg(data, taskId) {
    const taskWrapper = document.querySelector(`#${taskId}`)
    // функция для рендера панели проверки
    renderCheckPanel(taskWrapper, true);
    const { btnReset, btnTest, controlsBox, infoBox } =
        getCheckPanelElements(taskWrapper);
    const sort_list = taskWrapper.querySelector('.verticalTxtSort_img_task_list')
    const images = taskWrapper.querySelector('.verticalTxtSort_img_list')

    let isGameStart = false;
    const soundDataAttribute = "drop-data";
    let soundSetStates = {
        currentAudio: null,
        currentAudioIcon: null,
        isPlaying: false,
    };

    images.insertAdjacentHTML(
        'beforeend',
        createImagesMarkup(data)
    );

    sort_list.insertAdjacentHTML(
        'beforeend',
        createListMarkup(shuffleCards([...data])),
    );

    shuffleTracing()

    let audioFiles = taskWrapper.querySelectorAll(".verticalTxtSort_img_audio");
    // закрываем кнопку ПРОВЕРИТЬ
    toggleOpacityAndEventsElement(btnTest);
    let targetItem
    let draggingItem;
    let elemBelow;
    let shiftY

    taskWrapper.addEventListener('pointerdown', mousDownListner)
    btnReset.addEventListener('click', resetTask)
    taskWrapper.addEventListener("click", onIconClick);
    btnTest.addEventListener('click', checkingTask)
    images.addEventListener('pointerdown', onImagesCLick)

    function onImagesCLick(e) {
        if (e.target.tagName === 'IMG') {
            scaleImage(e.target)
        }
    }

    function onIconClick(e) {
        if (e.target.classList.contains("buttonPlayPausePlayPause_wrap")) {
            onSoundIconClick(e, soundSetStates, audioFiles, soundDataAttribute);
        }
    }

    function mousDownListner(e) {
        if (e.target.classList.contains('verticalTxtSort_img_task_item')) {
            mouseDown(e)
        }
    }

    function shuffleTracing() {
        let winVar = 0
        let cards = taskWrapper.querySelectorAll('.verticalTxtSort_img_task_item')

        cards.forEach((item, index) => {
            if (index + 1 === +item.getAttribute('data-id')) {
                winVar++
            }
        })
        if (winVar === data.length) {
            resetTask()
        }
    }

    function mouseDown(event) {
        if (event.button === 2) return;
        if (event.target.classList.contains('verticalTxtSort_img_task_item')) {
            targetItem = event.target
            targetItem.classList.add('verticalTxtSort_img_selected')
            draggingItem = event.target.cloneNode(true)
            //draggingItem = event.target;
            draggingItem.style.touchAction = 'none'; //ОБЯЗАТЕЛЬНОЕ УСЛОВИЕ(МОЖНО УБРАТЬ И ПРОПИСАТЬ В СТИЛЬ САМОМУ ОБЪЕКТУ) 

            draggingItem.style.position = 'absolute';
            draggingItem.style.zIndex = 100;

            event.target.parentElement.append(draggingItem);
            shiftY = event.target.parentElement.getBoundingClientRect().top + (event.clientY - event.target.getBoundingClientRect().top);
            moveAt(event.pageY);
        }

        draggingItem.style.cursor = 'grabbing';
        let limits = {
            top: taskWrapper.offsetTop,
            right: taskWrapper.offsetWidth + taskWrapper.offsetLeft,
            bottom: taskWrapper.offsetHeight + taskWrapper.offsetTop,
            left: taskWrapper.offsetLeft,
        };

        function moveAt(pageY) {
            draggingItem.style.top = pageY + document.body.getBoundingClientRect().top - shiftY + 'px';
        }

        elemBelow = document.elementFromPoint(event.clientX, event.clientY);

        let clickWithoutMove = true;

        function onMouseMove(event) {
            clickWithoutMove = false
            // открываем кнопку ПРОВЕРИТЬ
            if (!isGameStart) {
                toggleOpacityAndEventsElement(btnTest);
                isGameStart = true;
            }

            let newLocation = {
                x: limits.left,
                y: limits.top,
            };
            if (event.pageX > limits.right) {
                newLocation.x = limits.right;
            } else if (event.pageX > limits.left) {
                newLocation.x = event.pageX;
            }
            if (event.pageY > limits.bottom) {
                newLocation.y = limits.bottom;
            } else if (event.pageY > limits.top) {
                newLocation.y = event.pageY;
            }

            moveAt(newLocation.y);

            draggingItem.style.visibility = 'hidden'
            elemBelow = document.elementFromPoint(event.clientX, event.clientY);
            draggingItem.style.visibility = 'visible';
            if (!elemBelow) return;

            if (elemBelow.classList.contains('verticalTxtSort_img_task_item') && elemBelow.innerText !== draggingItem.innerText) {
                const nextElement = getNextElement(event.clientY, elemBelow);
                if (draggingItem.parentNode.contains(nextElement)) {
                    draggingItem.parentNode.insertBefore(targetItem, nextElement)
                }
            }

            function getNextElement(cursorPosition, currentElement) {
                const currentElementCoord = currentElement.getBoundingClientRect();
                const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;
                let nextElement = (cursorPosition < currentElementCenter) ?
                    currentElement :
                    currentElement.nextElementSibling;
                return nextElement;
            };
        }

        taskWrapper.addEventListener('pointermove', onMouseMove);
        document.addEventListener('pointerup', onpointerup)

        // КОГДА КУРСОР В ЗОНЕ ДЛЯ ПЕРЕТАСКИВАНИЙ И ПОЛЬЗОВАТЕЛЬ ОТПУСТИЛ ЗАХВАТ ЭЛЕМЕНТА

        function onpointerup() {
            taskWrapper.removeEventListener('pointermove', onMouseMove);
            // ЛОГИКА ОБРАБОТКИ ПОПАДАНИЯ НА НУЖНЫЙ БЛОК И НАОБОРОТ
            draggingItem.remove()
            targetItem.classList.remove('verticalTxtSort_img_selected')
            document.removeEventListener('pointerup', onpointerup)
        }
    };

    function resetTask() {

        resetSound(soundSetStates)
        taskWrapper.addEventListener('pointerdown', mousDownListner);
        let answers = taskWrapper.querySelectorAll('.verticalTxtSort_img_task_item')
        shuffleCards([...answers]).forEach(item => {
            sort_list.append(item)
            removeActiveCardClass(item)
        })
        shuffleTracing()
        checkingAnswerReset(controlsBox, infoBox)
        // закрываем кнопку ПРОВЕРИТЬ
        if (isGameStart) {
            toggleOpacityAndEventsElement(btnTest);
            isGameStart = false;
        }
    }

    function checkingTask() {
        resetSound(soundSetStates)
        let winVar = 0
        let elements = taskWrapper.querySelectorAll('.verticalTxtSort_img_task_item')
        elements.forEach((item, index) => {
            if (index + 1 === +item.getAttribute('data-id')) {
                winVar++
                addRightChoiceClass(item)
            } else addWrongChoiceClass(item)
            item.style.cursor = 'default'
        })

        if (winVar === data.length) {
            checkingAnswerPositive(controlsBox, infoBox)
        } else {
            checkingAnswerNegative(controlsBox, infoBox)
        }
        taskWrapper.removeEventListener('pointerdown', mousDownListner);
    }

    function createListMarkup(data) {
        return data
            .map(picture => {

                const isSound =
                    picture.audioSrc &&
                    `
                          <div class="buttonPlayPausePlayPause_wrap buttonPlayPause--play" ${soundDataAttribute}="${picture.id}${taskId}">
                            <div class="buttonPlayPause__shape buttonPlayPause__shape--one"></div>
                            <div class="buttonPlayPause__shape buttonPlayPause__shape--two"></div>
                            <audio class="verticalTxtSort_img_audio" id='${picture.id}${taskId}' src=${picture.audioSrc} style="display:none !important">
                                  Your browser does not support the <code>audio</code> element.
                                </audio>
                          </div>`

                return `
                <div class="verticalTxtSort_img_task_item  oneMultiChoice_border" data-id=${picture.id}>
                   ${isSound}
                   ${picture.text}
                </div>
                `
            })
            .join('');
    }

    function createImagesMarkup(data) {
        return data
            .map(picture => {
                return `
                <div class="verticalTxtSort_img_item " data-id=${picture.id}>
                  <img src="${picture.imageSrc}">
                </div>
                `
            })
            .join('');
    }
}