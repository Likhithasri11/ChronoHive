const Capsule = require('../models/Capsule');

// Create a new capsule
exports.createCapsule = async (req, res) => {
  try {
    const { title, message, unlockDate } = req.body;
    const file = req.file ? req.file.filename : '';

    const newCapsule = new Capsule({
      user: req.user, // from auth middleware
      title,
      message,
      unlockDate,
      file,
    });

    await newCapsule.save();
    res.status(201).json({ msg: 'Capsule created successfully', capsule: newCapsule });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error while creating capsule' });
  }
};
// Get single capsule by ID (with unlock check)
exports.getCapsuleById = async (req, res) => {
  try {
    const capsule = await Capsule.findById(req.params.id);

    if (!capsule) return res.status(404).json({ msg: 'Capsule not found' });
    if (capsule.user.toString() !== req.user)
      return res.status(401).json({ msg: 'Unauthorized access' });

    const now = new Date();
    const isUnlockable = now >= new Date(capsule.unlockDate);

    res.json({
      capsule,
      isUnlockable,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to fetch capsule' });
  }
};
// Delete a capsule
exports.deleteCapsule = async (req, res) => {
  try {
    const capsule = await Capsule.findById(req.params.id);

    if (!capsule) return res.status(404).json({ msg: 'Capsule not found' });

    if (capsule.user.toString() !== req.user)
      return res.status(403).json({ msg: 'Not authorized to delete this capsule' });

    await capsule.deleteOne();

    res.json({ msg: 'Capsule deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error during deletion' });
  }
};
 

// Get all capsules of a user
exports.getUserCapsules = async (req, res) => {
  try {
    const capsules = await Capsule.find({ user: req.user }).sort({ createdAt: -1 });
    res.json(capsules);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to fetch capsules' });
  }
};

