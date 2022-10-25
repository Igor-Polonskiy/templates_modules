import {
  renderFreeField
} from "../../../_common_files/renderFreeField.js"



//шаблон для вставки в HTML
//ПОМЕНЯЙ id НА УНИКАЛЬНЫЙ
/**
 * 
   <div class="trainerTaskWrapper" id="freeField_task-1">
      <div class="freeField_wrapper task_wrapper">
        <div class="freeField_drop">

        </div>
        <div class="freeField_dragPlaceWrapper">

          <div class="scrollBar_button arrowButton_left_event">
            <div class="scrollBar_arrow scrollBar_arrow_left"></div>
          </div>

          <div class="freeField_sliderContent">
            <div class="freeField_slider_box"></div>
          </div>

          <div class="scrollBar_button arrowButton_right_event">
            <div class="scrollBar_arrow scrollBar_arrow_right"></div>
          </div>
        </div>
      </div>
    </div>
 */

(() => {
   //уникальный id тренажера
   const taskId = 'freeField_task-1'
  //если нужен фон
  const dropBackground = {
    imgSrc: 'Images_1/task10_0.png',
    size: '207px'
  }
  //перетаскиваемые объекты
  //если нужно подгонять размеры height и width, прописываем в объекте
  //в противном случае оставляем пустые кавычки(без пробела), по умолчанию размер 100Х100 пикселей
  const answers = [{
    id: 1,
    imgSrc: 'Images_1/task10_1.png',
    height: '100px',
    width: '100px'
  },
  {
    id: 2,
    imgSrc: 'Images_1/task10_2.png',
    height: '100px',
    width: '100px'

  },
  {
    id: 3,
    imgSrc: 'Images_1/task10_3.png',
    height: '50px',
    width: '100px'
  },
  {
    id: 4,
    imgSrc: 'Images_1/task10_4.png',
    height: '200px',
    width: '100px'
  },
  {
    id: 5,
    imgSrc: 'Images_1/task10_5.png',
    height: '100px',
    width: '50px'
  },
  {
    id: 6,
    imgSrc: 'Images_1/task10_6.png',
    height: '150px',
    width: '50px'
  },
  {
    id: 7,
    imgSrc: 'Images_1/task10_7.png',
    height: '100px',
    width: '200px'

  }
  ]
 
  renderFreeField(answers, taskId, dropBackground)
})();
