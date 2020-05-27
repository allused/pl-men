// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";
// import {util} from "./util";

export let dom = {
    init: function () {

        this.newBoardButton();
        //dom.addCardListener();

        dom.renameBoardListener();
        dom.cardsDragDrop();
        dataHandler.getLastId('boards', function (id) {
            let newId = parseInt(id['id']) + 1;

        })


    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getSession( function (sessionData) {
            dataHandler.getBoards(function (boards) {
                console.log(boards)
                dom.checkBoards(boards, sessionData['id']);
                console.log(boards)
                dataHandler.getStatuses(function (statuses) {
                    dataHandler.getCards(function (cards) {
                        dom.showBoards(statuses, boards, cards);
                });
            });
        });
        });
    },
    showBoards: function (statuses, boards, cards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also

        let cols = '';
        for (let i = 0; i < statuses.length; i++) {
            cols += (`
                <div class="board-column">
                    <div class="board-column-title">
                        ${statuses[i].title}
                    </div>

                    <div  class="board-column-content spawn" ></div>

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
                <section class="board" data-id="${boards[i].id}">
                    <div class="board-header">
                        <span class="board-title">
                            ${boards[i].title}
                        </span>
                        <button class="board-add">Add Card</button>
                        <button class="board-toggle"><i class="fas fa-chevron-down"></i></button>
                        <div class="board-remove"><i class="fas fa-trash-alt"></i></div>
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
        //this.addCardListener();

        for (let i = 0; i < boards.length; i++) {
            for (let j = 0; j < statuses.length; j++) {
                for (let k = 0; k < cards.length; k++) {
                    if (cards[k].board_id === boards[i].id && cards[k].status_id === j) {
                        document.getElementsByClassName('board')[i]
                            .getElementsByClassName('board-column-content')[j].innerHTML += `
                                <div class="card" draggable="true"  data-id="${cards[k].id}">
                                    <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                                    <div class="card-title" id="${cards[k].status_id}">
                                         ${cards[k].title}
                                    </div>
                                </div>`
                    }
                }
            }
        }
        dom.cardsDragDrop();
        dom.renameCard();
        dom.deleteCard();
        dom.addCardListener();
        this.renameBoardListener();
        this.closeButtonListener();
    },

    loadCardsById: function (boardId) {

    },

    cardsDragDrop: function (event) {
        let card;

        let dragged = document.querySelectorAll('.card');
        let empties = document.querySelectorAll('.board-column-content');

        for (let drag of dragged) {
            drag.addEventListener('dragstart', dragStart);
            drag.addEventListener('dragend', dragEnd);
        }


        for (let empty of empties) {
            empty.addEventListener('dragover', dragOver);
            empty.addEventListener('dragenter', dragEnter);
            empty.addEventListener('dragleave', dragLeave);
            empty.addEventListener('drop', dragDrop);
        }

        function dragStart(event) {

            card = event.toElement;


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
            let currentStatus;

            if (event.target.className == 'card') {
                event.target.parentNode.insertAdjacentElement('beforeend', card);

            } else if (event.target.className == 'card-title') {
                event.target.parentNode.parentNode.insertAdjacentElement('beforeend', card);

            } else {
                event.target.insertAdjacentElement('beforeend', card)
            }
            if (event.target.classList.value.includes('card') == true) {
                currentStatus = event.target.parentNode.parentNode.parentNode.querySelector('.board-column-title').innerText;
            } else {
                currentStatus = event.target.parentNode.querySelector('.board-column-title').innerText;
            }


            if (currentStatus == 'new') {
                card.id = 0;
            } else if (currentStatus == 'in progress') {
                card.id = 1;
            } else if (currentStatus == 'testing') {
                card.id = 2;
            } else if (currentStatus == 'done') {
                card.id = 3;
            }

            let card_id = card.dataset['id'];
            dataHandler.saveCardStatusById(card_id, card.id);
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

        const columnNew = `<div  class="board-column-title ">New</div>
                                <div  class="board-column-content spawn" ></div>`;

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

        this.renameBoardListener();

    },
    newCard: function (new_id) {
        return `<div class="card" draggable="true" id="0" data-id="${new_id}">
                            <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                            <div class="card-title">name me</div>
                        </div>`

    },


    addCardListener: function (event) {
        let cards = document.querySelectorAll('.board-add');
        let boardTitle;
        let targetElement;
        let newCard;
        for (let card of cards) {
            card.addEventListener('click', (event) => {
                boardTitle = event.target.parentNode.parentNode.querySelector('.board-title').innerText;
                targetElement = event.target.parentNode.parentNode.querySelector('.spawn');
                console.log(targetElement)

                dataHandler.getLastId('cards', function (id) {

                    
                    targetElement.insertAdjacentHTML("beforeend", dom.newCard(id));
                });

                dataHandler.createNewCard(boardTitle);

            })

        }

    },


    getTitle: function () {
        let title = prompt('Enter the new board title:');
        if (title !== 'null') {
            dataHandler.createNewBoard(title, dataHandler._api_post);
            dom.createBoard(title);
        }

    },

    newBoardButton: function () {
        let newBoardBt = document.getElementById('new-board');
        newBoardBt.addEventListener('click', dom.getTitle);
    },


    renameTitle: function (oldName) {
        let newName = prompt('Set new name to board:');
        if (newName === null) {
            return oldName
        } else {
            dataHandler.setNewBoardTitle(oldName, newName, dataHandler._api_post);
            return newName
        }
    },

    renameBoardListener: function () {
        let boardNames = document.getElementsByClassName('board-title');
        for (let bname of boardNames) {
            bname.addEventListener('click', (event) => {
                let oldName = bname.innerText;
                bname.innerText = dom.renameTitle(oldName);
            })
        }
    },

    renameCard: function () {
        let cards = document.querySelectorAll('.card-title')
        for (let card of cards) {
            card.addEventListener('click', (event) => {
                let original_name = event.target.innerText;
                let target_card_id = event.target.parentNode.dataset['id'];
                let new_name = prompt('Give a new name: ')
                if (new_name == null) {
                    event.target.innerText = original_name;
                } else {
                    event.target.innerText = new_name;
                    dataHandler.saveCardNameById(target_card_id, new_name)
                }


            })
        }
    },

    deleteCard: function () {
        let trashIconElements = document.querySelectorAll('.fa-trash-alt');
        let table;
        let targetElementId;
        let targetTableId;
        for (let icon of trashIconElements) {
            icon.addEventListener('click', event => {
                console.log()
                //It checks if there is 'card' in the target element, if yes it is a card
                //remove button, but if there is no 'card' in the element, it is a table
                if (event.target.parentNode.classList.value.includes('card') == true) {
                    targetElementId = event.target.parentNode.parentNode.dataset['id'];
                    table = 'cards';
                    dataHandler.deleteTableDataById(table, targetElementId);
                    event.target.parentNode.parentNode.remove();
                } else {
                    targetTableId = event.target.parentNode.parentNode.parentNode.dataset['id'];
                    table = 'boards';
                    dataHandler.deleteTableDataById(table, targetTableId);
                    event.target.parentNode.parentNode.parentNode.remove();
                }

            })
        }
    },



    closeButtonListener: function () {
        let closeButtons = document.getElementsByClassName('board-toggle');
        for (let closeBtn of closeButtons) {
            closeBtn.addEventListener('click', (event) => {
                let element = event.target.parentElement.parentElement
                    .getElementsByClassName('board-columns')[0];
                if (element.style.display === "none") {
                    element.style.display = "flex";
                } else {
                    element.style.display = "none";
                }
            })
        }
    },


    checkBoards: function (boards, userId) {
    for (let i = 0; i < boards.length; i++ ) {
            if (userId != boards[i]['user_id'] && boards[i]['private']) {
                boards.splice(i, 1);
            };
        };
        return boards
    },


    deleteContent: function () {
        const cards = document.querySelectorAll('.card-remove');
        const tables = document.querySelectorAll('.')
    }
};
