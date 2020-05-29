// this object contains the functions which handle the data and its reading/writing
// feel free to extend and change to fit your needs

// (watch out: when you would like to use a property/function of an object from the
// object itself then you must use the 'this' keyword before. For example: 'this._data' below)
export let dataHandler = {
    _data: {}, // it contains the boards and their cards and statuses. It is not called from outside.
    _api_get: function (url, callback) {
        // it is not called from outside
        // loads data from API, parses it and calls the callback with it

        fetch(url, {
            method: 'GET',
            credentials: 'same-origin'
        })
        .then(response => response.json())  // parse the response as JSON
        .then(json_response => callback(json_response));  // Call the `callback` with the returned object
    },
    _api_post: function (url, data, callback) {

        fetch(url,{
            method:'POST',
            cache: 'no-cache',
            credentials: "include",
            body: JSON.stringify(data),
            headers: new Headers({"content-type": "application/json"})


        })
    },

    init: function () {
    },
    getBoards: function (callback) {
        // the boards are retrieved and then the callback function is called with the boards

        // Here we use an arrow function to keep the value of 'this' on dataHandler.
        //    if we would use function(){...} here, the value of 'this' would change.
        this._api_get('/get-boards', (response) => {
            this._data = response;

            callback(response);
        });
    },


    getStatuses: function (callback) {
        this._api_get('/get-statuses', (response) => {
            this._data = response;
            callback(response);
        });
        // the statuses are retrieved and then the callback function is called with the statuses
    },

    getCards: function(callback) {
        this._api_get('/get-cards', (response) => {
            this._data = response;

            callback(response);
        })
    },


    getLastId: function(table_name, callback){
          this._api_get(`/get_${table_name}_id`, (response)=>{
                this._data = response;

                callback(response);

          })

    },


    createNewBoard: function (boardData) {
        this._api_post('http://127.0.0.1:5000/save-board', boardData);
        },

    createNewCard: function ( boardTitle, cardTitle='name me', statusId=0) {
        let cardData = {
            'cardtitle':cardTitle,
            'boardtitle':boardTitle,
            'statusid':statusId,
            }

        this._api_post('http://127.0.0.1:5000/save-card', cardData)
    },
    // here comes more features

    setNewBoardTitle: function (oldTitle, newTitle) {
       let titles = {
           'new_title': newTitle,
           'old_title': oldTitle
       }
        this._api_post('http://127.0.0.1:5000/rename-board', titles)
    },
    saveCardStatusById: function (id, status) {
        let cardDetails = {
            'id':id,
            'status':status
        }
        this._api_post('/save-card-status', cardDetails)

    },

    saveCardNameById: function (id, new_name) {
        let cardDetails = {
            'id':id,
            'name':new_name
        }
        this._api_post('/save-card-name', cardDetails)

    },

    deleteTableDataById: function (table, element_id) {

        let elementDetails = {
            'table':table,
            'id':element_id
        }

        this._api_post('/delete-element', elementDetails);

    },

    getSession: function (callback) {
        this._api_get('/get-session-details', (response) => {
            this._data = response;
            callback(response)
        })
    },

    archiveCardById: function (card_id) {

        this._api_post(`/archive_${card_id}`);

    }
};
