/**
 *   File : file.js
 *   Admin : yezhiyu
 *   Author : LeaFish
 *   Start : 17/1/3
 */

var express = require('express');
var app = express();

app.get('/wj',function(req,res){
    res.json({id:1,user:'王景'});
});

app.listen(8899,function(){
   console.log('start listen 8899 port');
});