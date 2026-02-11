import { Router } from 'express';
import { createField, getFields } from './field.controller.js';
import { uploadFieldImage } from '../../middlewares/file-uploader.js';
import { cleanUploaderFileOnFinish } from '../../middlewares/delete-file-on-error.js';
import { validateCreateField } from '../../middlewares/validateCreateField.js';
const router = Router();

router.post(
    '/create',
    uploadFieldImage.single("image"),
    cleanUploaderFileOnFinish,
    validateCreateField,
    createField
)
router.get(
    '/get',
    getFields
)
export default router;