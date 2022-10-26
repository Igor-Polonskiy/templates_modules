import {
    dropAppend,
    checkingAnswerReset,
    checkingAnswerNegative,
    checkingAnswerPositive,
    addRightChoiceClass,
    addWrongChoiceClass,
    toggleOpacityAndEventsElement,
    renderCheckPanel,
    getCheckPanelElements,
    scaleImage
} from "../../common_files/common_scripts.js"



export function renderSudoku(data, answers, taskId) {
    const taskWrapper = document.getElementById(`${taskId}`)
    const answersWrapper = taskWrapper.querySelector('.dnd_sudoku_answers')
    const dropZone = taskWrapper.querySelector('.dnd_sudoku_dropZone')
    let isGameStart = false;
    let draggingItem;
    let elemBelow;

    fillTask();
    const dropeitems = taskWrapper.querySelectorAll('.dnd_sudoku_dropeitem')

    renderCheckPanel(taskWrapper, true)
    const { btnReset, btnTest, controlsBox, infoBox } = getCheckPanelElements(taskWrapper)
    
    // закрываем кнопку ПРОВЕРИТЬ
    toggleOpacityAndEventsElement(btnTest);

    btnReset.addEventListener('click', onResetClick)
    btnTest.addEventListener('click', оnTestClick)
    taskWrapper.addEventListener('pointerdown', mouseDown)
    taskWrapper.addEventListener('pointerdown', imageClick)

    function imageClick(e) {
        if (e.target.parentElement.classList.contains('dnd_sudoku_imgWrapper') && !e.target.classList.contains('dnd_sudoku_answer_drop')) {
            scaleImage(e.target)
        }
    }

    function mouseDown(event) {
        let shiftX;
        let shiftY;
        if (event.button !== 0) return;

        if (event.target.classList.contains("dnd_sudoku_answer")) {
            draggingItem = document.createElement("div");
            draggingItem.classList.add(
                "dnd_sudoku_answer_drop",
                "oneMultiChoice_border"
            );
            draggingItem.setAttribute('data-number', event.target.getAttribute('data-number'))
            draggingItem.style.backgroundImage = `url(${answers[event.target.getAttribute('data-number') - 1].imgSrc})`

            shiftX = event.clientX - event.target.getBoundingClientRect().left;
            shiftY = event.clientY - event.target.getBoundingClientRect().top;
        } else if (
            event.target.classList.contains("dnd_sudoku_answer_drop")
        ) {
            draggingItem = event.target;

            shiftX = event.clientX - draggingItem.getBoundingClientRect().left;
            shiftY = event.clientY - draggingItem.getBoundingClientRect().top;
        } else return;

        draggingItem.style.touchAction = "none"; //ОБЯЗАТЕЛЬНОЕ УСЛОВИЕ(МОЖНО УБРАТЬ И ПРОПИСАТЬ В СТИЛЬ САМОМУ ОБЪЕКТУ)
        draggingItem.style.cursor = "grabbing";

        // ЛИММИТЫ КООРДИНАТ ОГРАНИЧИВАЮЩИЕ ВЫЛЕТ ПЕРЕТАСКИВАЕМОГО ЭЛЕМЕНТА ЗА БЛОК
        //  (ПО УМОЛЧАНИЮ interact_zadanie - РОДИТЕЛЬ ВАШЕГО БЛОКА)
        let limits = {
            top: taskWrapper.offsetTop,
            right: taskWrapper.offsetWidth + taskWrapper.offsetLeft,
            bottom: taskWrapper.offsetHeight + taskWrapper.offsetTop,
            left: taskWrapper.offsetLeft,
        };

        function moveAt(pageX, pageY) {
            draggingItem.style.left = pageX - shiftX + "px";
            draggingItem.style.top = pageY - shiftY + "px";
        }

        let clickWithoutMove = true;

        function onMouseMove(event) {
            if (clickWithoutMove) {
                draggingItem.style.touchAction = "auto";
                draggingItem.style.position = "absolute";
                draggingItem.style.zIndex = 1000;
                taskWrapper.appendChild(draggingItem);
                draggingItem.style.touchAction = "none";

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

            clickWithoutMove = false;
            moveAt(newLocation.x, newLocation.y);

            if (!event.composedPath().includes(draggingItem)) {
                window.addEventListener("pointerup", moveOut);
            }
            if (event.composedPath().includes(draggingItem)) {
                window.removeEventListener("pointerup", moveOut);

            }

            draggingItem.style.visibility = "hidden";
            elemBelow = document.elementFromPoint(event.clientX, event.clientY);
            draggingItem.style.visibility = "visible";
            if (!elemBelow) return;
        }

        document.addEventListener("pointermove", onMouseMove);
        taskWrapper.addEventListener("pointerup", onpointerup);

        // КОГДА ВО ВРЕМЯ ПЕРЕТАСКИВАНИЯ КУРСОР ВЫНЕСЛИ ЗА ПРЕДЕЛЫ ОКНА БРАУЗЕРА И ОТПУСТИЛИ ЗАХВАТ ЭЛЕМЕНТА
        function moveOut(e) {
            const elemUnderPount = document.elementFromPoint(e.clientX, e.clientY);
            if (elemUnderPount !== draggingItem) {
                draggingItem.remove();
            }
            window.removeEventListener("pointerup", moveOut);
            document.removeEventListener("pointermove", onMouseMove);
        }
        // КОГДА КУРСОР В ЗОНЕ ДЛЯ ПЕРЕТАСКИВАНИЙ И ПОЛЬЗОВАТЕЛЬ ОТПУСТИЛ ЗАХВАТ ЭЛЕМЕНТА

        function onpointerup(e) {
            draggingItem.style.cursor = 'grab'
            document.removeEventListener("pointermove", onMouseMove);
            const elemUnderPount = document.elementFromPoint(e.clientX, e.clientY);
            if (elemUnderPount !== draggingItem) {
                draggingItem.remove();
            }

            // ЛОГИКА ОБРАБОТКИ ПОПАДАНИЯ НА НУЖНЫЙ БЛОК И НАОБОРОТ
            if (clickWithoutMove) {
                scaleImage(e.target)
            } else {
                if (elemBelow) {
                    if (
                        elemBelow.closest(".dnd_sudoku_dropeitem") &&
                        elemBelow.closest(".dnd_sudoku_dropeitem").children.length === 0 &&
                        elemBelow.closest(`#${taskId}`)
                    ) {
                        elemBelow = elemBelow.closest(".dnd_sudoku_dropeitem");
                        dropAppend(elemBelow, draggingItem);

                        elemBelow = null
                        // открываем кнопку ПРОВЕРИТЬ
                        if (!isGameStart) {
                            toggleOpacityAndEventsElement(btnTest);
                            isGameStart = true;
                        }
                    } else {
                        draggingItem.remove();
                    }
                } else {
                    draggingItem.remove();
                }
            }

            taskWrapper.removeEventListener("pointerup", onpointerup);
        }
    }

    function onResetClick() {
        taskWrapper.addEventListener('pointerdown', mouseDown);
        draggingItem = null

        dropeitems.forEach(item => {

            if (item.children.length) {
                [...item.children][0].remove()
            }
            checkingAnswerReset(controlsBox, infoBox)
        })
        // закрываем кнопку ПРОВЕРИТЬ
        if (isGameStart) {
            toggleOpacityAndEventsElement(btnTest);
            isGameStart = false;
        }
    }

    function оnTestClick() {
        let winVar = 0

        dropeitems.forEach(item => {
            if (item.children.length) {
                if ([...item.children][0].getAttribute('data-number') === item.getAttribute('data-number')) {
                    winVar++
                    addRightChoiceClass([...item.children][0])
                } else addWrongChoiceClass([...item.children][0])

            }
        })
        taskWrapper.removeEventListener('pointerdown', mouseDown);

        if (winVar === dropeitems.length) {
            checkingAnswerPositive(controlsBox, infoBox)
        } else {
            checkingAnswerNegative(controlsBox, infoBox)
        }
    }
    function fillTask() {
        data.forEach(item => {
            let row = document.createElement('div')
            row.classList.add('dnd_sudoku_drop')
            item.forEach(el => {
                let cell = document.createElement('div')
                cell.classList.add('dnd_sudoku_imgWrapper')
                if (el.imgSrc) {
                    let img = document.createElement('img')
                    img.src = el.imgSrc
                    cell.append(img)
                } else {
                    cell.classList.add('dnd_sudoku_dropeitem')
                    cell.setAttribute('data-number', el.data_number)
                }
                row.append(cell)
            })
            dropZone.append(row)
        })

        answers.forEach(item => {
            let answer = document.createElement('div')
            answer.classList.add('dnd_sudoku_answer')
            answer.setAttribute('data-number', item.data)
            answer.style.backgroundImage = `url(${item.imgSrc})`
            answersWrapper.append(answer)
        })
    }
}