// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";

export let dom = {
    init: function () {
        // This function should run once, when the page is loaded.
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
    };