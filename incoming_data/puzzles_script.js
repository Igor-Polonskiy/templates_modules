import {
    renderPuzzle
} from "../../../_common_files/renderPuzzle.js"


//шаблон для вставки в HTML
//ПОМЕНЯЙ id НА УНИКАЛЬНЫЙ
/**
 *  <div class="trainerTaskWrapper" id="pazzle_task-1">
            <div class="wordPazzleWrapper">
                <div class="wordPazzle_dropWrapper oneMultiChoice_border">
                </div>
                <div class="wordPazzle_letters">
                </div>
            </div>
            <div style="display: none;"></div>
           
        </div>
 */

(() => {
    const taskId = 'pazzle_task-1'
    // Входящие данные:
    // важно соблюдать синтаксис, слово оборачивать одинарными ковычками и ставить между ними запятые

    const lettersPuzzle = ['robot', 'table', 'cat', 'red', 'doll'];

    renderPuzzle(taskId, lettersPuzzle)
})()
