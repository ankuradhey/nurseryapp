var db = require('../db.js');


var boards = {
    getAll: function(done) {
        db.get().query(
                'select board_id, board_name from board_master where board_status = "1"  ',
                function(err, rows) {
                    if (err)
                        return done(err);
                    done(null, rows);
                });
    },
    getOne: function(boardId, done) {
        db.get().query(
                'select board_id, board_name from board_master where board_id = "'+boardId+'" and board_status != "2"  ',
                function(err, rows) {
                    if (err)
                        return done(err);
                    done(null, rows);
                });
    },
    addBoard: function(boardName, done) {

        //check if board already exists
        this.checkBoard(boardName, function(err, rows) {
            if (err)
                return done(err);
            if (rows && rows.length)
                return done('Record already exists');
            else
                db.get().query('insert into board_master set board_name = "' + boardName + '", board_status = "1"; ', function(err, rows) {
                    if (err)
                        return done(err)
                    return done(null, rows);
                });
        })
    },
    checkBoard: function(boardName, done) {
        db.get().query('select * from board_master where board_name = "' + boardName + '" ', function(err, rows) {
            if (err)
                return done(err);
            return done(null, rows);
        })
    },
    deleteBoard: function(boardId, done) {
        console.log('update board_master set board_status = "2" where board_id = "' + boardId + '" ');
        db.get().query('update board_master set board_status = "2" where board_id = "' + boardId + '" ', function(err, rows) {
            if (err)
                return done(err);
            return done(null, rows);
        })
    },
    updateBoard: function(boardId, boardParams, done) {
        var query = 'update board_master set'
        var arr = [];
        var _count = 0;
        for (var i in boardParams) {
            if (_count + 1 == Object.keys(boardParams).length)
                query += '  ' + i + ' = ' + '"' + boardParams[i] + '"';
            else
                query += ' ' + i + ' = ' + '"' + boardParams[i] + '",';
            _count++;
        }
        
        query += ' where board_id = '+boardId;
        console.log(query);
        
        db.get().query(query, function(err, rows) {
            if (err)
                return done(err)
            return done(null, rows);
        });
    },
}

module.exports = boards;