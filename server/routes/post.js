import express from 'express';
import { createPost, getAllPosts, deletePost } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/create', createPost);
router.get('/all', getAllPosts);
router.delete('/:id', deletePost);

export default router;