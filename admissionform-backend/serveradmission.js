// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/admissionDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log('MongoDB connected (admissionDB)'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Counter Schema for auto-incrementing ID
// const counterSchema = new mongoose.Schema({
//   _id: String,
//   seq: { type: Number, default: 0 }
// });
// const Counter = mongoose.model('Counter', counterSchema);

// // Get next auto-incremented ID
// async function getNextId(name) {
//   const counter = await Counter.findByIdAndUpdate(
//     name,
//     { $inc: { seq: 1 } },
//     { new: true, upsert: true }
//   );
//   return counter.seq;
// }

// // Admission Schema
// const admissionSchema = new mongoose.Schema({
//   id: { type: Number, unique: true },
//   fullName: String,
//   email: String,
//   contact: String,
//   gender: String,
//   dob: String,
//   address: String,
//   course: String,
//   qualification: String,
//   message: String
// });
// const Admission = mongoose.model('Admission', admissionSchema);

// // POST route to receive form data
// app.post('/api/admissionDB', async (req, res) => {
//   try {
//     const newId = await getNextId('admission');
//     const newAdmission = new Admission({ ...req.body, id: newId });
//     await newAdmission.save();
//     res.status(201).send({ message: 'Admission submitted successfully', id: newId });
//   } catch (error) {
//     console.error('Error saving admission:', error);
//     res.status(500).send({ error: 'Failed to submit admission' });
//   }
// });

// // Start the server
// const PORT = 3002;
// app.listen(PORT, () => {
//   console.log(`Admission backend running on port ${PORT}`);
// });


import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';

const app= express();
app.use(cors());
app.use(express.json());

//setting mysql connection
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password:'0000',
  database: 'admissionDB'
});

db.connect((err)=>{
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database');
})

//POST route to data
app.post('/api/admissionDB', (req,res) => {
  const{
    fullName, email, contact, dob, gender, address, qualification, message} = req.body;

  const sql = `INSERT INTO admission
  (fullName, email, contact, dob, gender, address, qualification, message) VALUES (?, ?, ?, ?, ?, ?, ?,?)`;

  db.query(sql, [fullName, email, contact, dob, gender, address, qualification, message],
    (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        res.status(500).send({ message: 'Submission failed' });
      } else {
        res.status(201).send({ message: 'Admission Sucessful', id: result.insertId });
      }
    });
});

// GET route to fetch all admission form data with admin verification
app.get('/api/admissionDB', (req, res) => {
  const { email, password } = req.query;

  // Hardcoded admin credentials (same as used in login)
  const adminEmail = 'admin@lbess.edu.np';
  const adminPassword = 'admin123';

  // Check if the provided email and password match admin credentials
  if (email !== adminEmail || password !== adminPassword) {
    return res.status(401).json({ message: 'Unauthorized: Invalid credentials' });
  }

  // If credentials match, fetch data from the admission table
  const sql = 'SELECT * FROM admission';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching admission data:', err);
      return res.status(500).json({ message: 'Error retrieving data' });
    }

    res.status(200).json(results); // Send all admission records as JSON
  });
});


// ✅ Start server
const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));