var express = require("express");
var router = express.Router();
var db = require("../db");

//카드에 도서등록
router.post("/insert", function (req, res) {
  const uid = req.body.uid;
  const bid = req.body.bid;
  let sql='select * from cart where uid=? and bid=?';
  db.get().query(sql,[uid,bid], function(err,rows){
    if(rows.length==0){
        sql='insert into cart(uid,bid) values(?,?)';
        db.get().query(sql,[uid,bid],function(err){
            res.send('0');
        })
    }else{
        sql='update cart set qnt=qnt+1 where uid=? and bid=?';
        db.get().query(sql,[uid,bid], function(err){
            res.send('1');
        })

    }
  })
});

module.exports = router;
