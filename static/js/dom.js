// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";

export let dom = {
    init: function () {
        dom.newBoardButton();
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function (boards) {
            dom.showBoards(boards);
        });
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also

        let boardList = '';

        for (let board of boards) {
            boardList += `
                <li>${board.title}</li>
            `;
        }

        const outerHtml = `
            <ul class="board-container">
                ${boardList}
            </ul>
        `;

        let boardsContainer = document.querySelector('#boards');
        boardsContainer.insertAdjacentHTML("beforeend", outerHtml);
    },
    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
    },
    showCards: function (cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
    },
    showBoard: function(title){
        let boardsContainer = document.querySelector('#boards');


    },
    getTitle: function () {
        let title =  prompt('Enter the new board title:');
        dom.createBoard(title);
        return title
    },
    createBoard: function(title){


        const boardHead= `<div class="board-header"><span class="board-title">${title} </span>
                            <button class="board-add">Add Card</button>
                            <button class="board-toggle"><i class="fas fa-chevron-down"></i></button> 
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


    newBoardButton: function () {
        let newBoardBt = document.getElementById('new-board');
        newBoardBt.addEventListener('click', dom.getTitle);
    },
};
