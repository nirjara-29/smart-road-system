import express from "express";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import { allowRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get(
  "/me",
  authenticateUser,
  (req, res) => {
    res.json({
      message: "Authenticated successfully",
      user: req.user,
    });
  }
);

router.get(
  "/admin",
  authenticateUser,
  allowRoles("ADMIN"),
  (req, res) => {
    res.json({ message: "Welcome Admin" });
  }
);
console.log("authenticateUser value:", authenticateUser);


export default router;
