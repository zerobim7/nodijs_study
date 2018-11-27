/*
module.exports = function(app)
{
     app.get('/',function(req,res){
        res.render('index.html')
     });
     app.get('/about',function(req,res){
        res.render('about.html');
    });
}
*/


module.exports = (app) => {
    app.get('/', (req, res) => {
        res.render('index.html');
    });

    app.get('/about', (req, res) => {
        res.render('about.html');
    });
}