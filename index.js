const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./config/dbconnection');

const Payment = require('./models/Payment');

app.use('/', require('./routes/index'));

const PORT = process.env.PORT;
app.listen(PORT, err => {
	if (err) console.log('Error in running Server.');
	else console.log(`Server is up and running on Port ${PORT}`);
});