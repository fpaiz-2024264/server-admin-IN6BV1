import { Router } from 'express';
import { createField, getFields } from './field.controller.js';

const router = Router();

router.post(
    '/create',
    createField
)
router.get(
    '/get',
    getFields
)
export default router;