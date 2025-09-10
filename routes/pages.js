import express from 'express';
import { createPage, getPage, updatePage, getAllPages } from '../controllers/pageController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').post(protect, createPage).get(protect, getAllPages);
router.route('/:id').get(protect, getPage).put(protect, updatePage);

export default router;
