const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));  
app.use(bodyParser.json());

app.set('views', './views');
app.set('view engine', 'pug');

//get home '/' page
app.get('/', (req, res) => {
	// console.log('test for get request');
	fs.readFile('./users.json', 'utf-8', (err, data) => {
		// console.log('readFile is called');
		if (err) {
			console.log('NOOOOO');
			throw err;
		}
		//we need to parse json data
		const userData = JSON.parse(data);
		const userFiles = {allTheUsers: userData};
		// console.log(userFiles);
		//we want to render the page
		res.render('index', userFiles);
	});
});

//get search page
app.get('/search', (req, res) => {
	// console.log('test for search');
	res.render('search');
});

//post and get searchresult
app.post('/searchresult', (req, res) => {
	// console.log('post test');
	const inputFromUser = req.body.yolo;
	fs.readFile('./users.json', 'utf-8', (err, data) => {
		if (err) {
			throw err;
		}
		const userData = JSON.parse(data);
		let result = [];
		for (var i = 0; i < userData.length; i++) {
			// console.log('userdata firstname is: ' + userData[i].firstname);
			if (userData[i].firstname == inputFromUser) {
				result.push(userData[i].firstname + " " + userData[i].lastname + ", " + userData[i].email);
			} else if (userData[i].lastname == inputFromUser) {
				result.push(userData[i].firstname + " " + userData[i].lastname + ", " + userData[i].email);
			} else if (userData[i].email == inputFromUser) {
				result.push(userData[i].firstname + " " + userData[i].lastname + ", " + userData[i].email);
			}
		}
		// console.log('result is: ' + result);
		// console.log('inputfromuser is: ' + inputFromUser);
		const printResult = {allTheUsers: result};
		res.render('searchresult', printResult);
	})
})

//get page create new user
app.get('/createuser', (req, res) => {
	// console.log('test for create user');
	res.render('createuser');
});

//post and get new user
app.post('/', (req, res) => {
	// console.log('user test');
	var newUser = {}
	newUser.firstname = req.body.firstname;
	newUser.lastname = req.body.lastname;
	newUser.email = req.body.email;
	fs.readFile('./users.json', 'utf-8', (err, data) => {
		if (err) {
			throw err;
		}
		// console.log('newUser is: ' + newUser.firstname + " " + newUser.lastname + ", " + newUser.email);
		const userData = JSON.parse(data);
		// console.log(userData);
		userData.push(newUser);
		data = JSON.stringify(userData);
		// console.log(data);
		fs.writeFile('./users.json', data, function(err) {
			if(err) {
				throw err;
			}
			const userFiles = {allTheUsers: JSON.parse(data)};
			res.render('index', userFiles);
		});
	});
});

//server
app.listen(3000, () => {
	console.log('server has started');
});