import {
    renderAlphabetSimple
} from "../utcf/individual_files/individual_scripts/renderAlphabetSimple.js"

//шаблон для вставки в HTML
//ПОМЕНЯЙ id НА УНИКАЛЬНЫЙ
/*
 <div class="trainerTaskWrapper" id="alphabetSimple_task-1">
      <div class="alphabetSimpleWrapper_simple">
        <div class="alphabetSimpleDropPlace_simple"></div>
        <div class="alphabetSimpleDragPlace_simple"></div>
      </div>
    </div>
 */

(() => {
    //id указанный в HTML
    const taskId = 'alphabetSimple_task-1'

    const data = [
        {
            id: 'al_1',
            letter: 'A a',
        },
        {
            id: 'al_2',
            letter: 'B b',
        },
        {
            id: 'al_3',
            letter: 'C c',
        },
        {
            id: 'al_4',
            letter: 'D d',
        },
        {
            id: 'al_5',
            letter: 'E e',
        },
        {
            id: 'al_6',
            letter: 'F f',
        },
        {
            id: 'al_7',
            letter: 'G g',
        },
        {
            id: 'al_8',
            letter: 'H h',
        },
        {
            id: 'al_9',
            letter: 'I i',
        },
        {
            id: 'al_10',
            letter: 'J j',
        },
        {
            id: 'al_11',
            letter: 'K k',
        },
        {
            id: 'al_12',
            letter: 'L l',
        },
        {
            id: 'al_13',
            letter: 'M m',
        },
        {
            id: 'al_14',
            letter: 'N n',
        },
        {
            id: 'al_15',
            letter: 'O o',
        },
        {
            id: 'al_16',
            letter: 'P p',
        },
        {
            id: 'al_17',
            letter: 'Q q',
        },
        {
            id: 'al_18',
            letter: 'R r',
        },
        {
            id: 'al_19',
            letter: 'S s',
        },
        {
            id: 'al_20',
            letter: 'T t',
        },
        {
            id: 'al_21',
            letter: 'U u',
        },
        {
            id: 'al_22',
            letter: 'V v',
        },
        {
            id: 'al_23',
            letter: 'W w',
        },
        {
            id: 'al_24',
            letter: 'X x',
        },
        {
            id: 'al_25',
            letter: 'Y y',
        },
        {
            id: 'al_26',
            letter: 'Z z',
        },
    ];

    renderAlphabetSimple(data, taskId)
})();
