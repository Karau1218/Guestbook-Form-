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




// TEST DATABASE ROUTE

app.get('/db-test', async(req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM contacts');
        res.send(rows);
    } catch(err) {
        console.error('Database error:', err);
    }
});

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
     const { fname, lname, email, message } = req.body;
            const fullName = `${fname} ${lname}`.trim();


    try {
        const sql = `
            INSERT INTO contacts 
  (fname, lname, email, message, company, linkedin, meet, other, mailingList, emailFormat) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

        await pool.execute(sql, [ fname,
  lname,
  email,
  message,
  company || null,
  linkedin || null,
  meet || null,
  other || null,
  mailingList ? 1 : 0,
  emailFormat || null]);

        res.render('confirm', { details: { fname, lname, email, message } });

    } catch (err) {
        console.error('Error saving contact:', err);
        res.status(500).send('Error saving contact submission.');
    }
});
app.post("/submit", async (req, res) => {
    const { name, email, message } = req.body;

    const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";

    try {
        await pool.execute(sql, [name, email, message]);
        res.render("confirmation", { name, email, message });
    } catch (err) {
        console.error(err);
        res.status(500).send("Database error");
    }
});

// ADMIN PAGE - SHOW ALL SUBMISSIONS
app.get('/admin', async (req, res) => {
    try {
        const [contacts] = await pool.query(
            'SELECT * FROM contacts ORDER BY created_at DESC'
        );

        res.render('admin', { contacts });

    } catch (err) {
        console.error('Admin DB error:', err);
    }
});



// START SERVER
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
