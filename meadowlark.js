/**
 * Created by yezhiyu on 16/12/28.
 */
var express = require('express');
var app = express();
var fortune = require('./lib/fortune.js');

// 设置 handlebars 视图引擎
var handlebars = require('express3-handlebars')
    .create({
        defaultLayout:'main',
        helpers: {
            section: function(name, options){
                if(!this._sections) this._sections = {};
                this._sections[name] = options.fn(this);
                return null;
            } }
    });

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 3000);

app.use(function(req, res, next){
    res.locals.showTests = app.get('env') !== 'production' &&
        req.query.test === '1';
    next();
});

var formidable = require('formidable');
app.get('/contest/vacation-photo',function(req,res){ var now = new Date();
    res.render('contest/vacation-photo',{
    year: now.getFullYear(),month: now.getMonth()
});
});
app.post('/contest/vacation-photo/:year/:month', function(req, res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
        if(err) return res.redirect(303, '/error');
        console.log('received fields:'); console.log(fields);
        console.log('received files:'); console.log(files);
        res.redirect(303, '/thank-you');
    });
});

app.use(require('body-parser')());
app.get('/newsletter', function(req, res){
// 我们会在后面学到 CSRF......目前,只提供一个虚拟值
    res.render('newsletter', { csrf: 'CSRF token goes here' });
});
app.post('/process', function(req, res){
    if(req.xhr || req.accepts('json,html')==='json'){
// 如果发生错误,应该发送 { error: 'error description' }

        res.json({
            success: 'success',
            code: 200,
            data: {
                name: req.body.name,
                email: req.body.email
            }
        });
    }else{
// 如果发生错误,应该重定向到错误页面
        res.redirect(303, '/thank-you');
    }
});


app.get('/tours/hood-river', function(req, res){
    res.render('tours/hood-river');
});
app.get('/tours/request-group-rate', function(req, res){
    res.render('tours/request-group-rate');
});
app.get('/nursery-rhyme', function(req, res){
    res.render('nursery-rhyme');
});
app.get('/data/nursery-rhyme', function(req, res){
    res.json({
        animal: 'squirrel',
        bodyPart: 'tail',
        adjective: 'bushy',
        noun: 'heck',
    }); });
app.get('/', function(req, res,next){
    res.render('home');
});
app.get('/about', function(req, res,next){
    res.render('about', {
        fortune: fortune.getFortune(),
        pageTestScript: '/qa/tests-about.js'
    });
});
app.get('/fish', function(req, res,next){
    res.json(200,{"data":"fish"});
});
//定制404页面
app.use(function(req, res,next){
    res.status(404);
    res.render('404');
});
//定制500页面
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.render('500');
});
app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.' );
});

