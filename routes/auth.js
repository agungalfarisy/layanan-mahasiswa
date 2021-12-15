const express = require('express');
const authController = require('../controllers/auth');
const statusAkademikController = require('../controllers/statusAkademik');
const jadwalKuliahController = require('../controllers/jadwalKuliah');
const pengisianKrsController = require('../controllers/pengisianKrs');
const router = express.Router();

router.get('/', authController.getHome);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/profile', authController.getProfile);
// router.post('/setup-pmb/usm-umum/edit/:id', pmbUsmUmumController.editUsmUmum);
// router.get('/setup-pmb/usm-umum/delete/:id', pmbUsmUmumController.deleteUsmUmum);

router.get('/status-akademik', statusAkademikController.getStatusAkademik);

router.get('/jadwal-kuliah', jadwalKuliahController.getJadwalKuliah);
router.post('/tampil-jadwal-kuliah', jadwalKuliahController.tampiljadwalkuliahpage);

router.get('/pengisian-krs', pengisianKrsController.getPengisianKrs);

router.post('/tampil-pengisian-krs', pengisianKrsController.tampilpengisiankrs);


module.exports = router;