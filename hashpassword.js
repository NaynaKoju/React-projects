const bcrypt = require("bcrypt");

async function hashPassword() {
  try {
    const password = "admin123"; // your plain password
    const saltRounds = 10;

    const hashed = await bcrypt.hash(password, saltRounds);
    console.log("Hashed password:", hashed);
  } catch (err) {
    console.error("Error hashing password:", err.message);
  }
}

hashPassword();
