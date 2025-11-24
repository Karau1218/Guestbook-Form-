// EXPRESS SETUP
import express from 'express';
import mysql2 from 'mysql2';
import dotenv from 'dotenv';

const app = express();
const PORT = 3006;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Load .env variables
dotenv.config();

// MySQL connection pool
const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();

// HOME PAGE
app.get('/', (req, res) => {
    res.render('index');
});

// CONTACT FORM PAGE
app.get('/contact', (req, res) => {
    res.render('contact');
});

// PROCESS CONTACT FORM - SAVE TO MYSQL
app.post('/confirm', async (req, res) => {
    // 1. Get data from the form (contact.ejs)
    const {
        fname, lname, email, message, company,
        linkedin, meet, other, mailingList, emailFormat
    } = req.body;

    try {
        // 2. Prepare SQL - Note: "job-title" is skipped because it's not in your DB
        const sql = `
            INSERT INTO contacts 
            (fname, lname, email, message, company, linkedin, meet, other, mailingList, emailFormat) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        // 3. Run Query
        await pool.execute(sql, [
            fname || null, 
            lname || null, 
            email || null, 
            message || null,
            company || null, 
            linkedin || null, 
            meet || null, 
            other || null,
            mailingList ? 1 : 0, // Convert checkbox "on" to 1
            emailFormat || null
        ]);

        // 4. Render confirmation page
        res.render('confirm', { details: { fname, lname, email, message } });

    } catch (err) {
        console.error('Error saving contact:', err);
        res.status(500).send('Error saving contact submission: ' + err.message);
    }
});

// ADMIN PAGE - SHOW ALL SUBMISSIONS
app.get('/admin', async (req, res) => {
    try {
        // FIX: Changed 'orders' to 'contacts' and removed the double "BY BY" typo
        const [rows] = await pool.query(
            'SELECT * FROM contacts ORDER BY timestamp DESC'
        );

        // FIX: We are passing the data as "contacts", not "orders"
        res.render('admin', { contacts: rows }); 

    } catch (err) {
        console.error('Admin DB error:', err);
        res.status(500).send('Error loading admin page: ' + err.message);
    }
});

// START SERVER
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});