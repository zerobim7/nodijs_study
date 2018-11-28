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


module.exports = (app, fs) => {

    app.get('/', (req, res) => {
        res.render('index', {
            title: "MY HOMEPAGE",
            length: 5
        });
    });


    app.get('/list', (req, res) => {
        fs.readFile( __dirname + "/../data/"+"user.json", 'utf8', (err, data) => {
            console.log(data);
            res.end(data);
        });
    });


    app.get('/getUser/:username', (req,res) => {
        fs.readFile( __dirname + "/../data/user.json", 'utf8', (err, data) => {
            let users = JSON.parse(data);
            res.json(users[req.params.username]);
        });
    });


    app.post('/addUser/:username', (req, res) => {

        let result = { };
        let username = req.params.username;

        //CHECK REQ VALIDITY
        if(!req.body["password"] || !req.body["name"]) {
            result["success"] = 0;
            result["error"] = "invalid request";
            res.json(result);
            return;
        }

        //LOAD DATA & CHECK DUPLICATION
        fs.readFile( __dirname + "/../data/user.json", 'utf8', (err, data) => {
            let users = JSON.parse(data);
            if(users[username]){

                //DUPLICATION FOUND
                result["success"] = 0;
                result["error"] = "duplicate";
                res.json(result);
                return;
            }

            //ADD TO DATA
            users[username] = req.body;

            //SAVE DATA , stringify mean JSON's pretty-print
            fs.writeFile( __dirname + "/../data/user.json", JSON.stringify(users, null, '\t'), "utf8", (err,data) => {
                result = {"success": 1};
                res.json(result);
            });
        });
    });

    


}