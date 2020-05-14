// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";

export let dom = {
    init: function () {

        this.newBoardButton()
        dom.addCardListener();
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called

        dataHandler.getBoards(function (boards) {
            dataHandler.getStatuses(function (statuses) {
                dom.showBoards(statuses, boards);
            });
        });
    },
    showBoards: function (statuses, boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also

        let cols = '';
        let id = 0;
        for (let i = 0; i < statuses.length; i++) {
            cols += (`
                <div class="board-column">
                    <div class="board-column-title">
                        ${statuses[i].title}
                    </div>
                    <div  class="board-column-content" id="${id}"></div>
                </div>
            `);
            id += 1;
        }

        const boardColumns = (`
                <div class="board-columns">
                    ${cols}
                </div>
            `)


        let boardSection = ''
        for (let i = 0; i < boards.length; i++) {
            boardSection += (`
                <section class="board">
                    <div class="board-header">
                        <span class="board-title">
                            ${boards[i].title}
                        </span>
                        <button class="board-add">Add Card</button>
                        <button class="board-toggle"><i class="fas fa-chevron-down"></i></button>
                    </div>
                    ${boardColumns}
                </section>`
            )

            const boardContainer = (`
                <div class="board-container">
                    ${boardSection}
                </div>`
            );

            let boardsContainer = document.querySelector('#boards');
            boardsContainer.innerHTML = boardContainer
        }
        this.addCardListener();
    }
    ,
    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
    },


    showBoard: function (title) {
        let boardsContainer = document.querySelector('#boards');


    },

    returnTitle: function (title) {
        return title
    },


    createBoard: function (title) {


        const boardHead = `<div class="board-header"><span class="board-title">${title}</span>
                            <button  class="board-add">Add Card</button><button class="board-toggle"><i class="fas fa-chevron-down"></i></button> 
                            </div>`;

        const columnNew = `<div  class="board-column-title">New</div>
                                <div  class="board-column-content" ></div>`;

        const columnInProg = `<div class="board-column-title">In Progress</div>
                                <div class="board-column-content"></div>`;

        const columnTesting = `<div class="board-column-title">Testing</div>
                                <div class="board-column-content"></div>`;

        const columnDone = `<div class="board-column-title">Done</div>
                            <div class="board-column-content"></div>`;


        let columnList = [columnNew, columnInProg, columnTesting, columnDone];

        let columToAppend = '';

        for (let column of columnList) {
            columToAppend += `<div class="board-column">${column}</div>`;
        }
        const boardColumns = `<div class="board-columns">${columToAppend}</div>`;

        const boardSection = `<section class="board">${boardHead}${boardColumns}</section>`;

        let boardsContainer = document.querySelector('.board-container');
        boardsContainer.insertAdjacentHTML("beforeend", boardSection);


    },
    newCard: function () {

        return `<div class="card">
                            <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                            <div class="card-title">name me</div>
                        </div>`

    },
    addCardListener: function () {
        let cards = document.getElementsByClassName('board-add')
        for (let card of cards) {
            card.addEventListener('click', (event) => {
                let boardTitle = event.target.parentNode.parentNode.childNodes[1].childNodes[1].innerText;
                let targetElement = event.target.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[3];
                targetElement.innerHTML += this.newCard();
                dataHandler.createNewCard(boardTitle)
            })
        }
    },

    getTitle: function () {
        let title = prompt('Enter the new board title:');
        dataHandler.createNewBoard(title, dataHandler._api_post );
        dom.createBoard(title);

    },

    newBoardButton: function () {
        let newBoardBt = document.getElementById('new-board');
        newBoardBt.addEventListener('click', dom.getTitle);
    },
};
