const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  completeTask,
} = require('../controllers/taskController');

router.get('/', verifyToken, getTasks);
router.post('/', verifyToken, createTask);
router.put('/:id', verifyToken, updateTask);
router.delete('/:id', verifyToken, deleteTask);
router.patch('/:id/complete', verifyToken, completeTask);

module.exports = router;