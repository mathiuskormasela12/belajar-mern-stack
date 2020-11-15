// ===== import all modules
const express					= require('express');
const upload					= require('express-fileupload');

// import all controllers
const appController		= require('../controllers/appController');

// init router
const router					= express.Router();

// setup upload
router.use(upload({
	createParentPath: true
}));

router.get('/', appController.start);
router.post('/login', appController.login);
router.use(appController.middleware);
router.post('/register', appController.register);
router.post('/add', appController.add);
router.delete('/delete/:id', appController.remove);
router.put('/edit', appController.edit);
router.get('/siswa', appController.getAllSiswa);
router.get('/siswa/:id', appController.getSiswaById);

module.exports = router;
