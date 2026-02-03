import admin from "../firebaseAdmin.js";
import pool from "../config/db.js";

export const authenticateUser = async (req, res, next) => {
  try {
     console.log("🔐 Authorization header:", req.headers.authorization);
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
     console.log("❌ No Bearer token");
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    console.log("🔐 Token received (first 30 chars):", token.slice(0, 30));

    // 1️⃣ Verify Firebase token
    const decoded = await admin.auth().verifyIdToken(token);
console.log("✅ Token verified. UID:", decoded.uid);

    const firebaseUid = decoded.uid;
    const email = decoded.email;

    // 2️⃣ Find user in DB
    let result = await pool.query(
      "SELECT * FROM users WHERE firebase_uid = $1",
      [firebaseUid]
    );

    let user;

    // 3️⃣ First login → create user
    if (result.rows.length === 0) {
      const insert = await pool.query(
        `INSERT INTO users (firebase_uid, email, role)
         VALUES ($1, $2, 'CITIZEN')
         RETURNING *`,
        [firebaseUid, email]
      );
      user = insert.rows[0];
    } else {
      user = result.rows[0];
    }

    // 4️⃣ Attach user to request
    req.user = user;
    next();

  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ message: "Authentication failed" });
  }
};
