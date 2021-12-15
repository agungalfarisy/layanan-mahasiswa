const axios = require('axios');
const controller = {};

// login klien
controller.postClientAPI = function () {
    const response = axios({
        method: 'post',
        url: 'https://api.unpas.ac.id/klien/login',
        data: {
          kode: '123456',
          password: '123123'
        }
    }).then((response) => response.data);
    return response;
}


//login user
controller.postLoginUser = function (token, username, password) {
    const response = axios({
        method: 'post',
        url: 'https://api.unpas.ac.id/pengguna/otorisasi',
        data: {
            token: token,
            username: username,
            password: password
        }
    }).then((response) => response.data);
    return response;
}

controller.logout = function (token, user_token, username) {
    const response = axios({
        method: 'post',
        url: 'https://api.unpas.ac.id/pengguna/logout',
        data: {
            token: token,
            user_token: user_token,
            username: username
        }
    }).then((response) => response.data);
    return response;
}


controller.kelompokPengguna = function (token, username) {
    const response = axios({
        method: 'post',
        url: 'https://api.unpas.ac.id/penggunaKelompok',
        data: {
            token: token,
            where: `id_kelompok = '221' and kode_pengguna = '${username}'`
        },
    }).then((response) => response.data);
    return response;
}


// mahasiswa/akademik/Show API
controller.statusAkademik = function (username, token) {
    const response = axios({
        method: 'get',
        url: `https://api.unpas.ac.id/mahasiswa/akademik/show`,
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}

controller.getProfile = function (username, user_token) {
    const response = axios({
        method: 'get',
        url: `https://api.unpas.ac.id/mahasiswa/profil?kode_mahasiswa=${username}&user_token=${user_token}`
    }).then((response) => response.data);
    return response;
}

controller.getAlamat = function (username, user_token) {
    const response = axios({
        method: 'get',
        url: `https://api.unpas.ac.id/mahasiswa/alamat?user_token=${user_token}&where=kode = ${username}`
    }).then((response) => response.data);
    return response;
}

controller.getKeluarga = function (username, user_token) {
    const response = axios({
        method: 'get',
        url: `https://api.unpas.ac.id/mahasiswa/keluarga?user_token=${user_token}&where=kode = ${username}`
    }).then((response) => response.data);
    return response;
}

controller.getSekolah = function (username, user_token) {
    const response = axios({
        method: 'get',
        url: `https://api.unpas.ac.id/mahasiswa/sekolah?user_token=${user_token}&where=kode = ${username}`
    }).then((response) => response.data);
    return response;
}

controller.getPerguruanTinggi = function (username, user_token) {
    const response = axios({
        method: 'get',
        url: `https://api.unpas.ac.id/mahasiswa/pt?user_token=${user_token}&where=kode = ${username}`
    }).then((response) => response.data);
    return response;
}

controller.getAkademik = function (username, user_token) {
    const response = axios({
        method: 'get',
        url: `https://api.unpas.ac.id/mahasiswa/akademik?kode_mahasiswa=${username}&user_token=${user_token}`
    }).then((response) => response.data);
    return response;
}
controller.getAkademikByTahun = function (username, user_token, tahun) {
    const response = axios({
        method: 'get',
        url: `https://api.unpas.ac.id/mahasiswa/akademik?kode_mahasiswa=${username}&user_token=${user_token}&kode_tahun_semester=${tahun}`
    }).then((response) => response.data);
    return response;
}

controller.getDpp = function (username, user_token) {
    const response = axios({
        method: 'get',
        url: `https://api.unpas.ac.id/mahasiswa/dpp`,
        data: {
            user_token: user_token,
            where: `kode_mahasiswa = ${username}`
        },
    }).then((response) => response.data);
    return response;
}

controller.getKalender = function (token, tahun) {
    const response = axios({
        method: 'get',
        url: `https://api.unpas.ac.id/situasi/kalender/show?tahun=${tahun}&token=${token}`
    }).then((response) => response.data);
    return response;
} 


controller.getKontakMhs = function (username, user_token) {
    const response = axios({
        method: 'get',
        url: `https://api.unpas.ac.id/mahasiswa/show?kode=${username}&user_token=${user_token}`
    }).then((response) => response.data);
    return response;
}

controller.jadwalKuliah = function (user_token, kode_mahasiswa, kode_tahun_semester, id_hari) {
    const response = axios({
        method: 'get',
        url: `https://api.unpas.ac.id/mahasiswa/jadwal?kode_mahasiswa=${kode_mahasiswa}&user_token=${user_token}&kode_tahun_semester=${kode_tahun_semester}&id_hari=${id_hari}`
    }).then((response) => response.data);
    return response;
}

controller.tahunAkademik = function (user_token) {
    const response = axios({
        method: 'post',
        url: `https://api.unpas.ac.id/mahasiswa/akademik`,
        data: {
            user_token: user_token,
            select: 'kode_tahun_semester'
        }
    }).then((response) => response.data);
    return response;
}





module.exports = controller;