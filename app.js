// Get the express package 
const express = require('express');

// Instantiate an express (web) app
const app = express();

// Define a port number for the app to listen on
const PORT = 3006;

// Tell the app to encode data into JSON format
app.use(express.urlencoded({ extended: false }));
app.use(express.static ('public'));

// Set your view (templating) engine to "EJS"
// (We use a templating engine to create dynamic web pages)
app.set('view engine', 'ejs');

// for storing submissions
let orders = [];

// Define a "default" route, 
// e.g. jshmo.greenriverdev.com/reservation-app/
app.get('/', (req, res) => {
	// Log message to the server's console
	console.log("Hello, world - server!");

    // Return home page
    res.render('index');
});

// Contact form page
app.get('/contact', (req, res) => {
  res.render('contact');
});


// Define a "confirm" route, using the POST method
app.post('/confirm', (req, res) => {
    // Get the data from the form that was submitted
    // from the body of the request object
    let details = req.body;
    details.timestamp = new Date().toLocaleString(); // for the timestamp


    orders.push(details) // this is so the admin can see the submissions from the form

    // Display the confirm page, pass the data
    res.render('confirm', {details});
})

// for admin route -submissions:
app.get('/admin', (req, res) => {
    res.render('admin', {orders }); // for showing data in admin ejs
})

// Tell the app to listen for requests on the designated port
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
});
