// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";

export let dom = {
    init: function () {

        this.newBoardButton();
        dom.addCardListener();
        dom.cardsDragDrop();
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
                    <div  class="board-column-content" ></div>
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
        this.addCardListener();
    }
    ,
    loadCardsById: function (boardId) {

    },
    loadCards: function(board_id){
        dataHandler.getCards(function (cards) {
            dom.showCards(cards, board_id);
        })
    },
    showCards: function(cards, board_id){
        let title = cards.title;

        const card = `<div class="card">
                            <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                            <div class="card-title">${title}</div>
                        </div>`
        for (let i = 0; i < cards.length; i++) {
            if (board_id == cards[i].board_id){
                return card
        }}
    },

    cardsDragDrop: function(){
        let card;

        let empties = document.querySelectorAll('.board-column-content');
        let dragged = document.querySelectorAll('.card');

        for(let drag of dragged){
            drag.addEventListener('dragstart', dragStart);
            drag.addEventListener('dragend', dragEnd);
        }


        for (let empty of empties){
                empty.addEventListener('dragover', dragOver);
                empty.addEventListener('dragenter', dragEnter);
                empty.addEventListener('dragleave', dragLeave);
                empty.addEventListener('drop', dragDrop);
                }

        function dragStart(event) {
            card = event.toElement.parentNode;



        }
        function dragEnd() {
        }
        function dragOver(e) {
            e.preventDefault();

        }
        function dragEnter() {
        }
        function dragLeave() {

        }
        function dragDrop(event) {
            event.target.insertAdjacentElement('beforeend', card)


        }







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


        const columnList = [columnNew, columnInProg, columnTesting, columnDone];

        let columnToAppend = '';

        for (let column of columnList) {
            columnToAppend += `<div class="board-column">${column}</div>`;
        }
        const boardColumns = `<div class="board-columns">${columnToAppend}</div>`;

        const boardSection = `<section class="board">${boardHead}${boardColumns}</section>`;

        let boardsContainer = document.querySelector('.board-container');
        boardsContainer.insertAdjacentHTML("beforeend", boardSection);


    },
    newCard: function () {

        return `<div class="card">
                            <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                            <div class="card-title" draggable="true">name me</div>
                        </div>`

    },
    addCardListener: function () {
        let cards = document.getElementsByClassName('board-add')
        for (let card of cards) {
            card.addEventListener('click', (event) => {
                let boardTitle = event.target.parentNode.parentNode.childNodes[1].childNodes[1].innerText;
                let targetElement = event.target.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[3];
                targetElement.innerHTML += this.newCard();
                dom.cardsDragDrop();
                dataHandler.createNewCard(boardTitle);
            })
        }
    },

    getTitle: function () {
        let title = prompt('Enter the new board title:');
        if (title !== 'null'){
            dataHandler.createNewBoard(title, dataHandler._api_post );
            dom.createBoard(title);
        }

    },

    newBoardButton: function () {
        let newBoardBt = document.getElementById('new-board');
        newBoardBt.addEventListener('click', dom.getTitle);
    },
};
