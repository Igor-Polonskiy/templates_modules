import {
    renderSudoku
} from "../utcf/individual_files/individual_scripts/renderSudoku.js"

//шаблон для вставки в HTML
//ПОМЕНЯЙ id НА УНИКАЛЬНЫЙ
/**
 <div class="trainerTaskWrapper" id="dnd_sudoku_task-1">
            <div class="dnd_sudoku_dropZone"></div>
            <div class="dnd_sudoku_answers"> </div>
        </div>

 */


(() => {
    //индивидуальный id как в html
    const taskId = 'dnd_sudoku_task-1'
    //данные для заполнения верхнего поля: заполняетя по строчно - каждый массив - одна строка
    //в каждом объекте заполняется только одно из полей - либо картинка, либо номер для совпадения
    const data = [
        [
            {
                imgSrc: 'Images_1/task1_1.png',
                data_number: ''
            },
            {
                imgSrc: 'Images_1/task1_3.png',
                data_number: ''
            },
            {
                imgSrc: 'Images_1/task1_2.png',
                data_number: ''
            },
            {
                imgSrc: 'Images_1/task1_1.png',
                data_number: ''
            },
            {
                imgSrc: 'Images_1/task1_2.png',
                data_number: ''
            },
            {
                imgSrc: 'Images_1/task1_3.png',
                data_number: ''
            },

        ],
        [
            {
                imgSrc: 'Images_1/task1_3.png',
                data_number: ''
            },
            {
                imgSrc: '',
                data_number: '2'
            },
            {
                imgSrc: '',
                data_number: '1'
            },
            {
                imgSrc: 'Images_1/task1_3.png',
                data_number: ''
            },
            {
                imgSrc: '',
                data_number: '1'
            },
            {
                imgSrc: '',
                data_number: '2'
            },

        ],
        [
            {
                imgSrc: 'Images_1/task1_2.png',
                data_number: ''
            },
            {
                imgSrc: '',
                data_number: '1'
            },
            {
                imgSrc: '',
                data_number: '3'
            },
            {
                imgSrc: '',
                data_number: '2'
            },
            {
                imgSrc: '',
                data_number: '3'
            },
            {
                imgSrc: '',
                data_number: '1'
            },

        ],
    ]
    //данный для поля с перетаскиваемыми элементами - все поля обязательные
    const answers = [{
        id: 1,
        data: '1',
        imgSrc: 'Images_1/task1_1.png'
    },
    {
        id: 2,
        data: '2',
        imgSrc: 'Images_1/task1_2.png'
    },
    {
        id: 3,
        data: '3',
        imgSrc: 'Images_1/task1_3.png'

    }
    ]


    renderSudoku(data, answers, taskId)
})();

