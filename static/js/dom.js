// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";

export let dom = {
    init: function () {
        dom.newBoardButton();
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called

        dataHandler.getBoards(function(boards){
            dataHandler.getStatuses(function (statuses) {
                dom.showBoards(statuses, boards);
            });
        });
    },
    showBoards: function (statuses, boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also

        let cols = '';

        for (let i = 0; i < statuses.length; i++) {
            cols += (`
                <div class="board-column">
                    <div class="board-column-title">
                        ${statuses[i].title}
                    </div>
                    <div class="board-column-content"></div>
                </div>
            `);
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

        }
        ,
        loadCards: function (boardId) {
            // retrieves cards and makes showCards called
        },
        showCards: function (cards) {
            // shows the cards of a board
            // it adds necessary event listeners also
        },
        // here comes more features
  
    showBoard: function(title){
        let boardsContainer = document.querySelector('#boards');


    },
    getTitle: function () {
        let title =  prompt('Enter the new board title:');
        dataHandler.createNewBoard(title, dataHandler._api_post,dom.createBoard(title));
    },


    createBoard: function(title){


        const boardHead = `<div class="board-header"><span class="board-title">${title}</span>
                            <button class="board-add">Add Card</button><button class="board-toggle"><i class="fas fa-chevron-down"></i></button> 
                            </div>`;

        const columnNew = `<div class="board-column-title">New</div>
                                <div class="board-column-content"></div>`;

        const columnInProg = `<div class="board-column-title">In Progress</div>
                                <div class="board-column-content"></div>`;

        const columnTesting = `<div class="board-column-title">Testing</div>
                                <div class="board-column-content"></div>`;

        const columnDone = `<div class="board-column-title">Done</div>
                            <div class="board-column-content"></div>`;


        let columnList = [columnNew, columnInProg, columnTesting, columnDone];

        let columToAppend = '';

        for (let column of columnList){
            columToAppend += `<div class="board-column">${column}</div>`;
        }
        const boardColumns = `<div class="board-columns">${columToAppend}</div>`;

        const boardSection = `<section class="board">${boardHead}${boardColumns}</section>`;

        let boardsContainer = document.querySelector('.board-container');
        boardsContainer.insertAdjacentHTML("beforeend", boardSection);

    },
    newCard: function(title){

        const card = `<div class="card">
                            <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                            <div class="card-title">${title}</div>
                        </div>`


    },


    newBoardButton: function () {
        let newBoardBt = document.getElementById('new-board');
        newBoardBt.addEventListener('click', dom.getTitle);
    },
};
