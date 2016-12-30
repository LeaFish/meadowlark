/**
 * Created by yezhiyu on 16/12/29.
 */
var app = require('express')();
//var http = require('http');


//app.get('/fail', function(req, res){
//    throw new Error('Nope!');
//});

app.get('/test',function(req,res){
   res.json({code:200,message:'success'})
});

//app.use(function(err, req, res, next){
//    console.error(err.stack);
//    app.status(500).render('500');
//});

app.listen(3000,function(){
    console.log('start server port 3000');
});

//http.createServer(app).listen(app.get('port'), function(){
//    console.log( 'Express started in ' + app.get('env') +
//        ' mode on http://localhost:' + app.get('port') +
//        '; press Ctrl-C to terminate.' );
//});
