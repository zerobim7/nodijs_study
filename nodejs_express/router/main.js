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

    //LOGIN APP
    app.get('/login/:username/:password', (req, res) => {
        let sess;
        sess = req.session;

        fs.readFile(__dirname+'/../data/user.json', 'utf8', (err, data) => {
            let users = JSON.parse(data);
            let username = req.params.username;
            let password = req.params.password;
            let result = { };

            if(!users[username]){
                //USERNAME NOT fOUND
                result["success"] = 0;
                result["error"] = "not found";
                res.json(result);
                return;
            } 

            if(users[username]["password"] == password){
                result["success"] = 1;
                sess.username = username;
                sess.name = users[username]["name"];
                res.json(result);
            } else {
                result["success"] = 0;
                result["error"] = "incorrect";
                res.json(result);
            }
        });
    });




    //LOGOUT APP
    app.get('/logout', (req, res) => {
        sess = req.session;
        if(sess.username){
            req.session.destroy((err) => {
                if(err) {
                    console.log(err);
                } else {
                    res.redirect('/');
                }
            });
        } else {
            res.redirect('/');
        }
    });





    //MAIN PAGE 
    app.get('/', (req, res) => {
        let sess = req.session;

        res.render('index', {
            title: "MY HOMEPAGE",
            length: 5,
            name: sess.name,
            username: sess.username
        });

    });





    //user.json에 있는 유저 데이터 표시
    app.get('/list', (req, res) => {
        fs.readFile( __dirname + "/../data/"+"user.json", 'utf8', (err, data) => {
            console.log(data);
            res.end(data);
        });
    });





    //user.json에 있는 유저중 username이 동일한 유저의 정보 표시
    app.get('/getUser/:username', (req,res) => {
        fs.readFile( __dirname + "/../data/user.json", 'utf8', (err, data) => {
            let users = JSON.parse(data);
            res.json(users[req.params.username]);
        });
    });





    //새로운 유저 등록
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
            console.log(users);

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

    



    //유저 정보 update
    app.put('/updateUser/:username', (req, res) => {

        let result = { } ;
        let username = req.params.username;

        //CHECK REQ VALIDITY
        if(!req.body["password"] || !req.body["name"]) {
            result["sucess"] = 0;
            result["error"] = "invalid request";
            res.json(result);
            return;
        }

        //LOAD DATA
        fs.readFile( __dirname + "/../data/user.json", 'utf8', (err, data) => {
            let users = JSON.parse(data);

            //ADD MODIFY DATA
            users[username] = req.body;

            //SAVA DATA
            fs.writeFile( __dirname + "/../data/user.json", JSON.stringify(users, null, '\t'), (err, data) => {
                result = {"success": 1};
                res.json(result);
            });
        });
    });





    //유저 정보 delete
    app.delete('/deleteUser/:username', (req, res) => {
        let result = { };

        //LOAD DATA
        fs.readFile(__dirname + "/../data/user.json", "utf8", (err, data) => {
            let users = JSON.parse(data);

            //IF NOT FOUND
            if(!users[req.params.username]){
                result["sucess"] = "none";
                result["error"] = "not found";
                res.json(result);
                return;
            }

            //DELETE FROM DATA
            delete users[req.params.username];

            //DAVE FILE
            fs.writeFile(__dirname + "/../data/user.json", JSON.stringify(users, null, '\t'), "utf8", (err, data) =>{
                result["success"] = "success";
                res.json(result);
                return;
            });
        });
    });




    
    // Q. 세션 정보가 없을시 모든 요청에 대해 로그인 화면으로 가게 세팅
    // A. app.use를 사용하시면 됩니다.
    /*
    app.use((req,res,next)=>{
        if(req.session.loged) next();
        else res.redirect("/login");
    });
    */
}