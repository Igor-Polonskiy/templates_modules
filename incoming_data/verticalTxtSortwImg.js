import {
    renderVerticalTxtSortWImg
} from "../utcf/individual_files/individual_scripts/renderVerticalTxtSortWImg.js"



//шаблон для вставки в HTML
//ПОМЕНЯЙ id НА УНИКАЛЬНЫЙ
/*
<div class="trainerTaskWrapper" id="verticalTxtSort_task-1">
            <div class="verticalTxtSort_img_wrepper">
                <div class="verticalTxtSort_img_list"></div>
                <div class="verticalTxtSort_img_task_list"></div>
            </div>
        </div>
*/

//максимальное количество элементов:7-8
//text - содержимое блока с текстом
//audioSrc - путь к аудиофайлу(опционально)
//если не надо оставляем пустые кавычки "" БЕЗ ПРОБЕЛА!!!
//imageSrc - путь к картинке для сопоставления
(() => {
    const taskId = 'verticalTxtSort_task-1'

    const data = [
        {
            id: 1,
            text: '1 Береза pifowfp pofk w pwo isefh suyfg  aiuwueyf oiawue iluawe powe foiweu woeuf wo;eiuf awpeo;ifu waope9ifu awoefiu awoeiifuu awoeifu ',
            audioSrc: 'sound/007.mp3',
            imageSrc: 'Images_1/DOH_3-4_7_1_2.png'
        },
        {
            id: 2,
            text: '2 Дуб',
            audioSrc: 'sound/008.mp3',
            imageSrc: 'Images_1/DOH_3-4_7_1_3.png'

        },
        {
            id: 3,
            text: '3 Ель',
            audioSrc: 'sound/009.mp3',
            imageSrc: 'Images_1/DOH_3-4_7_1_4.png'

        },
        {
            id: 4,
            text: '4 Сосна',
            audioSrc: 'sound/011.mp3',
            imageSrc: 'Images_1/DOH_3-4_7_1_2.png'

        }
    ]

    renderVerticalTxtSortWImg(data, taskId)
})()

