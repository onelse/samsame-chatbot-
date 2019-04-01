/*const express = require('express');
const router = express.Router();
module.exports = router;

router.get('/', function(req, res) {
    res.send('삼육대학교');
});

router.get('/keyboard', function (req, res) {
    res.send({
        "type" : "buttons",
        "buttons" : ["입학", "장학", "학사"]
     }
    );
});

router.post('/message', function(req, res){
  const user = {
        user_key: req.body.user_key,
        type: req.body.type,
        content: req.body.content
    };
  console.log(user.user_key, user.type, user.content);
  var msg = user.content;
  res.send({
          "message": {
                "text": msg
            },
      });
});

router.post('/friend', function(req, res){
  const new_user = {
    user_key : req.body.user_key,
  };
  console.log(`${new_user.user_key}님이 채팅방에 참가했습니다.`);
  if(new_user.user_key === "test"){
    return res.set({
              'content-type': 'application/json'
            }).send(JSON.stringify({success: true}));
  }
});

router.delete('/friend/:user_key', function(req, res){
  const user_key = req.params.user_key;
  console.log(`${user_key}님이 채팅방을 차단했습니다.`);
  
  res.set({
    'content-type': 'application/json'
  }).send(JSON.stringify({success: true}));
});

router.delete('/chat_room/:user_key', function(req, res){
  const user_key = req.params.user_key;
  console.log(`${user_key}님이 채팅방에서 나갔습니다.`);
  
  res.set({
    'content-type': 'application/json'
  }).send(JSON.stringify({success: true}));
});*/