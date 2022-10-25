import {
    dropAppend,
    dragAppend,
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
} from "../../../_common_files/common_scripts.js"

export function renderAlphabetSimple(data, taskId) {
    const taskWrapper = document.querySelector(`#${taskId}`);

    const alphabetDropPlace = taskWrapper.querySelector('.alphabetSimpleDropPlace_simple');
    const alphabetDragPlace = taskWrapper.querySelector('.alphabetSimpleDragPlace_simple');
    
    let isGameStart = false;
    data.forEach((elem) => {
        const dropPalce = document.createElement('div');
        dropPalce.classList.add('alphabetSimpleCard_drop');
        dropPalce.style.display = 'block';
        dropPalce.setAttribute('drop-data', elem.id);
        alphabetDropPlace.appendChild(dropPalce);
    });

    shuffleCards(data).forEach((elem) => {
        const div = document.createElement('div');
        div.classList.add('alphabetSimpleCard_drag');
        div.classList.add('oneMultiChoice_border');
        div.setAttribute('drag-data', elem.id);
        div.append(elem.letter);
        alphabetDragPlace.appendChild(div);
    });

    renderCheckPanel(taskWrapper, true)
    const {btnReset,btnTest,controlsBox,infoBox}=getCheckPanelElements(taskWrapper) 

    const letterCard_drop = document.querySelectorAll('.alphabetSimpleCard_drop');

    // закрываем кнопку ПРОВЕРИТЬ
    toggleOpacityAndEventsElement(btnTest);

    taskWrapper.addEventListener('pointerdown', mouseDown)

    let draggingItem;
    let elemBelow;
    let shiftX;
    let shiftY;

    btnTest.addEventListener('click', taskChecking)
    btnReset.addEventListener('click', resetTask)

    function mouseDown(event) {
        if (event.button !== 0) return;
        if (event.target.classList.contains('alphabetSimpleCard_drag')) {
            draggingItem = event.target;
        } else return

        const findIdx = [...alphabetDragPlace.children].findIndex(
            (el) => el === draggingItem
        );

        draggingItem.classList.remove('alphabetSimpleCard_drag_active')

        const elemDraggingStartPlace = alphabetDragPlace;  //элемент первоначального расположения перетаскиваемых фигур (стартовое состояние)

        draggingItem.style.touchAction = 'none'; //ОБЯЗАТЕЛЬНОЕ УСЛОВИЕ(МОЖНО УБРАТЬ И ПРОПИСАТЬ В СТИЛЬ САМОМУ ОБЪЕКТУ) 
        draggingItem.style.cursor = 'grabbing';
        shiftX = event.clientX - event.target.getBoundingClientRect().left;
        shiftY = event.clientY - event.target.getBoundingClientRect().top;

        // ЛИММИТЫ КООРДИНАТ ОГРАНИЧИВАЮЩИЕ ВЫЛЕТ ПЕРЕТАСКИВАЕМОГО ЭЛЕМЕНТА ЗА БЛОК
        let limits = {
            top: taskWrapper.offsetTop,
            right: taskWrapper.offsetWidth + taskWrapper.offsetLeft,
            bottom: taskWrapper.offsetHeight + taskWrapper.offsetTop,
            left: taskWrapper.offsetLeft,
        };

        draggingItem.style.position = 'absolute';
        draggingItem.style.zIndex = 1000;
        document.body.appendChild(draggingItem);

        moveAt(event.pageX, event.pageY);

        function moveAt(pageX, pageY) {
            draggingItem.style.left = pageX - shiftX + 'px';
            draggingItem.style.top = pageY - shiftY + 'px';
        }

        elemBelow = document.elementFromPoint(event.clientX, event.clientY);

        let clickWithoutMove = true;
        function onMouseMove(event) {
            let newLocation = {
                x: limits.left,
                y: limits.top
            };
            if (event.pageX > limits.right) {
                newLocation.x = limits.right;
            }
            else if (event.pageX > limits.left) {
                newLocation.x = event.pageX;
            }
            if (event.pageY > limits.bottom) {
                newLocation.y = limits.bottom;
            }
            else if (event.pageY > limits.top) {
                newLocation.y = event.pageY;
            }

            clickWithoutMove = false
            moveAt(newLocation.x, newLocation.y);

            if (!event.path.includes(draggingItem)) {
                window.addEventListener('pointerup', moveOut);
            }

            draggingItem.style.visibility = 'hidden';
            elemBelow = document.elementFromPoint(event.clientX, event.clientY);
            draggingItem.style.visibility = 'visible';

            if (!elemBelow) return;
        }

        document.addEventListener('pointermove', onMouseMove);

        // КОГДА ВО ВРЕМЯ ПЕРЕТАСКИВАНИЯ КУРСОР ВЫНЕСЛИ ЗА ПРЕДЕЛЫ ОКНА БРАУЗЕРА И ОТПУСТИЛИ ЗАХВАТ ЭЛЕМЕНТА
        function moveOut(e) {
            const elemUnderPount = document.elementFromPoint(e.clientX, e.clientY);
            if (elemUnderPount !== draggingItem) {
                dragAppend(elemDraggingStartPlace, draggingItem, findIdx)
            }
            window.removeEventListener('pointerup', moveOut);
            document.removeEventListener('pointermove', onMouseMove);
        }
        draggingItem.addEventListener("pointerup", onpointerup);

        // КОГДА КУРСОР В ЗОНЕ ДЛЯ ПЕРЕТАСКИВАНИЙ И ПОЛЬЗОВАТЕЛЬ ОТПУСТИЛ ЗАХВАТ ЭЛЕМЕНТА
        function onpointerup() {
            draggingItem.style.cursor = 'grab';
            if (clickWithoutMove) {
                dragAppend(elemDraggingStartPlace, draggingItem, findIdx)
            }
            document.removeEventListener('pointermove', onMouseMove);

            // ЛОГИКА ОБРАБОТКИ ПОПАДАНИЯ НА НУЖНЫЙ БЛОК И НАОБОРОТ
            if (elemBelow.classList.contains('alphabetSimpleCard_drop')) {
                draggingItem.classList.add('alphabetSimpleCard_drag_active')
                dropAppend(elemBelow, draggingItem)
                // открываем кнопку ПРОВЕРИТЬ
                if (!isGameStart) {
                    toggleOpacityAndEventsElement(btnTest);
                    isGameStart = true;
                }

            }
            else {
                dragAppend(elemDraggingStartPlace, draggingItem, findIdx)
            }
            draggingItem.removeEventListener("pointerup", onpointerup);

        };


    };

    function resetTask() {
        checkingAnswerReset(controlsBox, infoBox)
        letterCard_drop.forEach(elem => {
            if (elem.firstChild) {
                elem.firstChild.classList.remove('alphabetSimpleCard_drag_active')
                removeActiveCardClass(elem.firstChild)
                dragAppend(alphabetDragPlace, elem.firstChild)
            }
        })
        taskWrapper.addEventListener('pointerdown', mouseDown)
        // скрываем кнопку ПРОВЕРИТЬ
        if (isGameStart) {
            toggleOpacityAndEventsElement(btnTest);
            isGameStart = false;
        }
    }

    function taskChecking() {
        taskWrapper.removeEventListener('pointerdown', mouseDown)
        let winCount = 0;
        letterCard_drop.forEach(elem => {
            if (!!elem.firstChild?.attributes.getNamedItem("drag-data").value && elem.attributes.getNamedItem("drop-data").value === elem.firstChild.attributes.getNamedItem("drag-data").value) {
                winCount++
                addRightChoiceClass(elem.firstChild)
            } else if (elem.firstChild) {
                addWrongChoiceClass(elem.firstChild)

            }
        })
        if (winCount === data.length) {
            checkingAnswerPositive(controlsBox, infoBox)
        }
        else {
            checkingAnswerNegative(controlsBox, infoBox)
        }
    }

}