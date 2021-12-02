// Define app using express
var express = require("express")
var app = express()
// Require database SCRIPT file
var db = require("./database.js")
// Require md5 MODULE
var md5 = require("md5")
// Require cors 
var cors = require("cors");
// Make Express use its own built-in body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Use cors
app.use(cors());

// Set server port
const HTTP_PORT = 5000
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

// Added ?
app.get("/", (req, res, next) => {
	res.json({"message":"Your API works! (200)"});
	res.status(200);
})

// READ (HTTP method GET) at root endpoint /app/
app.get("/app/", (req, res, next) => {
    res.json({"message":"Your API works! (200)"});
	res.status(200);
});

// Define other CRUD API endpoints using express.js and better-sqlite3
// CREATE a new user (HTTP method POST) at endpoint /app/new/
app.post("/app/new", (req, res) => {
	const stmt = db.prepare('INSERT INTO userinfo (user, pass, cookies, clickers) VALUES (?, ?, ?, ?)');
	const info = stmt.run(req.body.user, md5(req.body.pass), 0, 0);
	if(info.changes === 1) {
		res.status(201).json({"message":"1 record created: ID " + info.lastInsertRowid + " (201)"})
	} else {
		res.status(409).json({"message":"User exists. (409)"})
	}
});
// READ a list of all users (HTTP method GET) at endpoint /app/users/
app.get("/app/users", (req, res) => {	
	const stmt = db.prepare("SELECT * FROM userinfo").all();
	res.status(200).json(stmt);
});

// READ a single user (HTTP method GET) at endpoint /app/user/:id
app.get("/app/user/:id", (req, res) => {	
	const stmt = db.prepare("SELECT * FROM userinfo WHERE id = ?");
	const result = stmt.get(req.params.id);
	if(result === undefined) {
		res.status(404).json({"message":"User does not exists. (404)"})
	} else {
		res.status(200).json(result);
	}
});

// UPDATE a single user (HTTP method PATCH) at endpoint /app/update/user/:id
app.patch("/app/update/user/:id", (req, res) => {
	const stmt = db.prepare('UPDATE userinfo SET user = COALESCE(?,user), pass = COALESCE(?,pass) WHERE id = ?');
	const info = stmt.run(req.body.user, md5(req.body.pass), req.params.id);
	if(info.changes === 1) {
		res.status(200).json({"message":"1 record updated: ID " + req.params.id + " (200)"})
	} else {
		res.status(404).json({"message":"User does not exist. (404)"})
	}
});

// DELETE a single user (HTTP method DELETE) at endpoint /app/delete/user/:id
app.delete("/app/delete/user/:id", (req, res) => {
	const stmt = db.prepare('DELETE FROM userinfo WHERE id = ?');
	const info = stmt.run(req.params.id);
	if(info.changes === 1) {
		res.status(200).json({"message":"1 record deleted: ID " + req.params.id + " (200)"})
	} else {
		res.status(404).json({"message":"User does not exist. (404)"})
	}
});

/* 	Authenticating login information
	Input: {user: string,
			pass: string}

	Output: 
*/	
app.post("/app/login", (req, res) => {
	const stmt = db.prepare("SELECT * FROM userinfo WHERE user = ? AND pass = ?");
	const result = stmt.get(req.body.user, md5(req.body.pass));
	if(result === undefined) {
		res.status(404).json({"message":"Incorrect username or password. (404)"})
	} else {
		res.status(200).json(result);
	}
})

// UPDATE a single users cookie count at endpoint /app/update/user/:id
app.patch("/app/update/cookie/:id", (req, res) => {
	const stmt = db.prepare('UPDATE userinfo SET user = COALESCE(?,user), pass = COALESCE(?,pass), cookies = COALESCE(?, cookies), clickers = COALESCE(?, clickers) WHERE id = ?');
	const info = stmt.run(null, null, req.body.cookies, req.body.clickers, req.params.id);
	if(info.changes === 1) {
		res.status(200).json({"message":"1 record updated: ID " + req.body.cookies + " (200)"})
	} else {
		res.status(404).json({"message":"User does not exist. (404)"})
	}
});

// Default response for any other request
app.use(function(req, res){
	res.json({"message":"Endpoint not found. (404)"});
    res.status(404);
});
