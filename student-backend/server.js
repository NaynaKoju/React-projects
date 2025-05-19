// import express, { json } from 'express';
// import { connect, Schema, model } from 'mongoose';
// import cors from 'cors';

// const app = express();
// app.use(cors());
// app.use(json());

// // Connect to MongoDB
// connect('mongodb://localhost:27017/studentDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));

// // Define a Schema and Model
// const studentSchema = new Schema({
// //   fullName: String,
// //   email: String,
// //   contact: String,
// //   gender: String,
// //   dob: String,
// //   address: String,
// //   course: String,
// //   qualification: String,
// //   message: String
//     name: String,
//     roll: String,
//     class: String ,
//     section: String,
//     dob: String,
//     guardian: String,
//     contact: String,
//     email: String,
//     address: String,
//     admission_date: String
// });

// const Student = model('Student', studentSchema);

// // Route to receive form data
// app.post('/api/studentDB', async (req, res) => {
//   try {
//     console.log("Received form data:", req.body);
//     const newStudent = new Student(req.body);
//     await newStudent.save();
//     res.status(201).send({ message: 'Profile Created successfully' });
//   } catch (error) {
//     console.error("Error creating profile:", error);
//     res.status(500).send({ message: 'Error creating profile', error });
//   }
// });


// // Start the server
// const PORT = 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

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
  database: 'studentDB'
});

db.connect((err)=>{
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database');
})

//POST route to insert student data
app.post('/api/studentDB', (req,res) => {
  const{
    name, roll, class: studentClass, section, dob, guardian, contact, email, address, admission_date} = req.body;

  const sql = `INSERT INTO students
  (name, roll, class, section, dob, guardian, contact, email, address, admission_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [name, roll, studentClass, section, dob, guardian, contact, email, address, admission_date],
    (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        res.status(500).send({ message: 'Error saving student data' });
      } else {
        res.status(201).send({ message: 'Profile created successfully' });
      }
    });
});

// ✅ Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));