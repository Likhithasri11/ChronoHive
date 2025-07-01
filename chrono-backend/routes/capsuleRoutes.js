const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { getCapsuleById } = require('../controllers/capsuleController');
const upload = require('../middleware/upload');
const { createCapsule, getUserCapsules } = require('../controllers/capsuleController');
const { deleteCapsule } = require('../controllers/capsuleController');

router.delete('/:id', protect, deleteCapsule);


// POST /api/capsules (with file upload)
router.post('/', protect, upload.single('file'), createCapsule);

// GET /api/capsules (all capsules of user)
router.get('/', protect, getUserCapsules);

router.get('/:id', protect, getCapsuleById);

module.exports = router;




