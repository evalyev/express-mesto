const router = require('express').Router();
const {getUsers, getUserById, updateProfile, updateAvatar, getThisUser} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.get('/me', getThisUser);

router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);


module.exports = router;