import express from 'express';
import { createRoom, getRooms } from '../controllers/roomController.js';

const router = express.Router();

router.post('/rooms', createRoom);
router.get('/rooms', getRooms);

export default router;
