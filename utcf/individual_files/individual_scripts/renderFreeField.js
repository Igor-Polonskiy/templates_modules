import {
  onBtnLeftClick,
  onBtnRightClick,
  changeStyles,
  showArrows,
  getRandomPositionToCard,
  getBlocksSizes,
  renderCheckPanel,
  getCheckPanelElements,
  shuffleCards,
  dragAppend,
  scaleImage
} from "../../../_common_files/common_scripts.js"


export function renderFreeField(answers, taskId, dropBackground) {
  const taskWrapper = document.getElementById(`${taskId}`)
  const dropZone = taskWrapper.querySelector('.freeField_drop')
  const answersWrapper = taskWrapper.querySelector('.freeField_slider_box')
  const leftBtn = taskWrapper.querySelector('.arrowButton_left_event');
  const rightBtn = taskWrapper.querySelector('.arrowButton_right_event');
  renderCheckPanel(taskWrapper, false)
  const { btnReset } = getCheckPanelElements(taskWrapper)

  let sliderSet = {
    sliderItemWidth: 0,
    sliderSize: 0,
    sliderWrapperSize: answersWrapper.offsetParent.clientWidth,
    sliderShift: 0
  }
 
  taskWrapper.addEventListener('pointerdown', mouseDown)
  btnReset.addEventListener('click', resetTask)

  leftBtn.addEventListener('click', LeftClick);
  rightBtn.addEventListener('click', RightClick);

  if (dropBackground.imgSrc) {
    dropZone.style.backgroundImage = `url(${dropBackground.imgSrc})`;
    dropZone.style.backgroundSize = dropBackground.size
  }
  
  fillAnswerField()
  getBlocksSizes(sliderSet, answersWrapper)
  showArrows(sliderSet, leftBtn, rightBtn);

  let draggingItem;
  let elemBelow;

  function fillAnswerField() {
    shuffleCards(answers).forEach(item => {
      let answer = document.createElement('div')
      answer.classList.add('freeField_answer')
      answer.style.backgroundImage = `url(${item.imgSrc})`
      if (item.height && item.width) {
        answer.style.height = item.height
        answer.style.width = item.width
      } else {
        answer.style.height = '100px'
        answer.style.width = '100px'
      }
      answersWrapper.append(answer)
    })
  }

  function resetTask(){
    let pics = taskWrapper.querySelectorAll('.freeField_answer')
    pics.forEach(item => {
      changeStyles(item)
      getRandomPositionToCard(item)
      item.style.position = "initial ";

      answersWrapper.append(item)
    })
    sliderSet.sliderShift = 0;
    getBlocksSizes(sliderSet, answersWrapper)
    showArrows(sliderSet, leftBtn, rightBtn);

  }

  function mouseDown(event) {
    if (event.button !== 0) return;
    if (!event.target.classList.contains("freeField_answer")) return;

    draggingItem = event.target;
    // находим индекс элемента, который берем в списке отрисованных. answersWrapper - контейнер для перетаскиваемых элементов
    const findIdx = [...answersWrapper.children].findIndex(
      (el) => el === draggingItem
    );
    draggingItem.style.touchAction = "none";
    draggingItem.style.cursor = "grabbing";
    let shiftX = event.clientX - draggingItem.getBoundingClientRect().left;
    let shiftY = event.clientY - draggingItem.getBoundingClientRect().top;
    // ЛИММИТЫ КООРДИНАТ ОГРАНИЧИВАЮЩИЕ ВЫЛЕТ ПЕРЕТАСКИВАЕМОГО ЭЛЕМЕНТА ЗА БЛОК
    //  (ПО УМОЛЧАНИЮ interact_zadanie - РОДИТЕЛЬ ВАШЕГО БЛОКА)
    let limits = {
      top: taskWrapper.offsetTop,
      right: taskWrapper.offsetWidth + taskWrapper.offsetLeft,
      bottom: taskWrapper.offsetHeight + taskWrapper.offsetTop,
      left: taskWrapper.offsetLeft,
    };

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
      draggingItem.style.left = pageX - shiftX + "px";
      draggingItem.style.top = pageY - shiftY + "px";
    }

    elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    let clickWithoutMove = true;

    function onMouseMove(event) {
      if(clickWithoutMove){
        draggingItem.style.position = "absolute";
        draggingItem.style.zIndex = 1000;
        document.body.appendChild(draggingItem);
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
    function moveOut(e) {
      dragAppend(answersWrapper, draggingItem, findIdx);
      window.removeEventListener("pointerup", moveOut);
      document.removeEventListener("pointermove", onMouseMove);
    }
    draggingItem.addEventListener("pointerup", onpointerup);

    function onpointerup(e) {
      document.removeEventListener("pointermove", onMouseMove);
      draggingItem.style.cursor = "grab";
      if (clickWithoutMove) {
        //dragAppend(answersWrapper, draggingItem, findIdx);
        scaleImage(e.target)
        draggingItem.removeEventListener("pointerup", onpointerup);

         document.removeEventListener("pointermove", onMouseMove);
      } else {
        if (elemBelow && elemBelow.closest(".freeField_drop")) {
          elemBelow = elemBelow.closest(".freeField_drop")
          draggingItem.style.zIndex = 0;
          elemBelow.append(draggingItem)
        } else {
          dragAppend(answersWrapper, draggingItem, findIdx);
          draggingItem.style.position = "initial ";

        }
      }

      draggingItem.removeEventListener("pointerup", onpointerup);

      sliderSet.sliderSize = answersWrapper.scrollWidth;
      showArrows(sliderSet, leftBtn, rightBtn);
    };

  }

  function LeftClick() {
    onBtnLeftClick(sliderSet, answersWrapper, leftBtn, rightBtn)
  }

  function RightClick() {
    onBtnRightClick(sliderSet, answersWrapper, leftBtn, rightBtn)
  }

}