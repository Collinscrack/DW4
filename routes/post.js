import { Router } from 'express';
import {
  postPost,
  getPosts,
  getPost,
  updatePost,
  deletePost
} from '../controller/postController.js';

const router = Router();

router.post('/', postPost);
router.get('/', getPosts);
router.get('/:id', getPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;
