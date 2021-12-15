const axios = require('./axios');

exports.getHome = (req, res, next) => {
  console.log(req.session.otorisasi);
  if (req.session.otorisasi) {
    this.dashboardpage(req, res, req.session.data);
  } else {
    this.homepage(req, res);
  }
};

exports.homepage = (req, res)  => {
  res.render('index', {
    title: 'Home - Layanan Mahasiswa',
    // dataUSM: arr,
    session: req.session,
    // links: links,
    // messageUSM: req.flash('message'),
    layout: '../views/layouts/templates'
  });
}

exports.dashboardpage = (req, res, data)  => {
  const resClient = axios.getProfile(req.session.username, req.session.token_user);
  resClient.then(dataClient => {
    res.render('dashboard/index', {
      title: 'Dashboard - Layanan Mahasiswa',
      data: data,
      dataClient: dataClient.result[0],
      session: req.session,
      layout: '../views/layouts/templatesMhs'
    });
  });
}

exports.getProfile = (req, res)  => {
  if (req.session.otorisasi) {
    const resClient = axios.getProfile(req.session.username, req.session.token_user);
    resClient.then(dataClient => {
      const resAlm = axios.getAlamat(req.session.username, req.session.token_user);
      resAlm.then(dataAlamat => {
        const resKeluarga = axios.getKeluarga(req.session.username, req.session.token_user);
        resKeluarga.then(dataKeluarga => {
          const resSekolah = axios.getSekolah(req.session.username, req.session.token_user);
          resSekolah.then(dataSekolah => {
            const resPt = axios.getPerguruanTinggi(req.session.username, req.session.token_user);
            resPt.then(dataPt => {
            // console.log(dataMhs.result);
              res.render('profile/index', {
                title: 'Profil - Layanan Mahasiswa',
                alamat: dataAlamat.result[0],
                pt: dataPt.result[0],
                keluarga: dataKeluarga.result[0],
                sekolah: dataSekolah.result[0],
                dataClient: dataClient.result[0],
                data: req.session.data,
                session: req.session,
                layout: '../views/layouts/templatesMhs'
              });
            });
          });
        });
      })
    })
  } else {
    this.homepage(req, res);
  }
}



exports.logout = (req, res)  => {
  if (req.session.otorisasi) {
    const resClient = axios.logout(req.session.token, req.session.user_token, req.session.user_username);
    resClient.then(dataClient => { 
      this.homepage(req, res);
    });
  }

}

exports.login = (req, res, next) => {
  // if (typeof req.session.username === 'undefined') {
  const resClient = axios.postClientAPI();
  resClient.then(dataClient => {
    const token = dataClient.result.token;
    const username =  req.body.username;
    const password =  req.body.password;

    const resUser = axios.postLoginUser(token, username, password);
    req.session.token = token;
    req.session.username = username;
    resUser.then(dataUser => {
      const token_user = dataUser.result.user_token;
      const otorisasi = dataUser.result.otorisasi;
      req.session.token_user = token_user;
      req.session.otorisasi = otorisasi;
      if (otorisasi) {
        const cekPengguna = axios.kelompokPengguna(token, username);
        cekPengguna.then(pengguna => {
          // console.log(cekPengguna.result)
          data = pengguna.result[0];
          req.session.data = data;
          console.log(data);
          if(pengguna.code === 200) {
            this.dashboardpage(req, res, data);
          } else {
            this.homepage(req, res);
          }
        }).catch(err => console.log(err))
      } else {
        this.homepage(req, res);
      }
    })
  }).catch(err => console.log(err))
 
};

