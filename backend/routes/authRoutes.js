const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const router = express.Router();

const {
    register,
    login,
    sessionCheck
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/session-check", verifyToken, sessionCheck);
module.exports = router;