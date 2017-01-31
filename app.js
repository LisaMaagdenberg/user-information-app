const express = require('express');
const fs = require('fs');

const app = express();

//setting views folder
app.set('views', './views');

//setting view engine
app.set('view engine', 'pug');

//do a request
app.get('/', (req, res) => {
	console.log('test for get request');
	fs.readFile('./users.json', 'utf-8', (err, data) => {
		console.log('readFile is called');
		if (err) {
			throw err;
		}
		//we need to parse json data
		const userData = JSON.parse(data);
		let userFiles = {allTheUsers: userData};
		//we want to render the page
		res.render('index', userFiles);
	});
});

app.listen(3000, () => {
	console.log('server has started');
});