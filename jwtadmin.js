const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- Ensure uploads directory exists ---
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// --- Multer storage setup ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({ storage });

// --- JWT Secret ---
const JWT_SECRET =
  "d7f1a9e5e9a36bcdb3628a7b8c4901b6e1b7f22f066f1a9c6e5b9c3d46c6f3f4a4e9a8f1f7d9a8b6c4f1d0e2f7a1b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0";

// --- MySQL connection pool ---
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "0000",
  database: "adminlogin",
});

// --- Middleware to protect admin routes ---
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch {
    return res.status(403).json({ message: "Invalid token" });
  }
};

// --- Token verification endpoint ---
app.post("/api/verifytoken", (req, res) => {
  const authHeader = req.headers["authorization"];
  console.log("Auth Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("Token verification failed:", err.message);
      return res.status(403).json({ message: "Invalid token" });
    }
    res.status(200).json({ message: "Token valid" });
  });
});



// --- Serve uploaded images statically ---
app.use("/uploads", express.static(uploadDir));

// --- Admin login ---
app.post("/api/adminlogin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.query("SELECT * FROM admins WHERE email = ?", [
      email,
    ]);
    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const admin = rows[0];
    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ email: admin.email }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// --- Public: Get page by slug ---
app.get("/api/pages/:slug", async (req, res) => {
  const slug = req.params.slug;

  try {
    const [pages] = await pool.query(
      "SELECT id FROM pages WHERE slug = ? ORDER BY id ASC",
      [slug]
    );
    if (pages.length === 0) {
      return res.status(404).json({ message: "Page not found" });
    }

    const pageId = pages[0].id;
    const [sections] = await pool.query(
      "SELECT id, title, content FROM page_sections WHERE page_id = ?",
      [pageId]
    );

    res.json(sections);
  } catch (err) {
    console.error("Error fetching page sections:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// --- Admin: Update page content ---
app.put("/api/pages/:slug", verifyToken, async (req, res) => {
  const { slug } = req.params;
  const { sections, deleteIds } = req.body;

  try {
    const [pages] = await pool.query("SELECT id FROM pages WHERE slug = ?", [
      slug,
    ]);
    if (pages.length === 0)
      return res.status(404).json({ message: "Page not found" });

    const pageId = pages[0].id;

       // DELETE the sections flagged for deletion, if any
    if (deleteIds && deleteIds.length > 0) {
      const placeholders = deleteIds.map(() => '?').join(',');
      await pool.query(
        `DELETE FROM page_sections WHERE id IN (${placeholders}) AND page_id = ?`,
        [...deleteIds, pageId]
      );
    }

    // Insert/update remaining sections
    for (const section of sections) {
  if (!section.id) {
    // New section
    await pool.query(
      "INSERT INTO page_sections (page_id, title, content) VALUES (?, ?, ?)",
      [pageId, section.title, section.content]
    );
  } else {
    // Existing section
    await pool.query(
      "UPDATE page_sections SET title = ?, content = ? WHERE id = ? AND page_id = ?",
      [section.title, section.content, section.id, pageId]
    );
  }
}
    res.json({ message: "Page sections updated successfully" });
  } catch (err) {
    console.error("Error updating page sections:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// --- Admin: Upload image ---
app.post(
  "/api/upload-image",
  verifyToken,
  upload.single("image"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    // const imageUrl = `http://localhost:3004/uploads/${req.file.filename}`;
    // res.json({ imageUrl });
    // for making it dymanic
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
   return res.json({ imageUrl });
  }
);

// --- Start server ---
app.listen(3004, () => {
  console.log("Server running on port 3004");
});
