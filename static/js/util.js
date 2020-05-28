

export let util = {
    checkBoards: function (boards, userId) {
    for (let i = 0; i < boards.length; i++ ) {
            if (userId != boards[i]['user_id'] & boards[i]['private']) {
                boards.splice(i, 1);
            };
            console.log(boards)
        };
    }
}