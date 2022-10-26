import {
    renderVerticalTxtSort
} from "../utcf/individual_files/individual_scripts/renderVerticalTxtSort.js"


//шаблон для вставки в HTML
//ПОМЕНЯЙ id НА УНИКАЛЬНЫЙ
/*
<div class="trainerTaskWrapper" id="verticalTxtSort_task-1">
            <div class="verticalTxtSort_wrepper">
                <div class="verticalTxtSort_task_list"></div>
            </div>
        </div>
 */
//максимальное количество элементов:7-8
//text - содержимое блока с текстом
//audioSrc - путь к аудиофайлу(опционально)
//если не надо оставляем пустые кавычки "" БЕЗ ПРОБЕЛА!!!
//

(() => {
    const taskId = 'verticalTxtSort_task-1'

    const data = [
        {
            id: 1,
            text: '1 Береза',
            audioSrc: 'sound/007.mp3',
        },
        {
            id: 2,
            text: '2 Дуб',
            audioSrc: 'sound/008.mp3'
        },
        {
            id: 3,
            text: '3 Ель',
            audioSrc: 'sound/009.mp3'
        },
        {
            id: 4,
            text: '4 Сосна',
            audioSrc: 'sound/011.mp3'
        }
    ]

    renderVerticalTxtSort(data, taskId)
})()

