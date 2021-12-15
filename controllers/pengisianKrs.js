const axios = require('./axios');

exports.getPengisianKrs = (req, res, next) => {
  console.log(req.session.otorisasi);
  if (req.session.otorisasi) {
    this.pengisiankrspage(req, res);
  } else {
    this.homepage(req, res);
  }
};

exports.pengisiankrspage = (req, res)  => {
  const akademik = axios.getAkademik(req.session.username, req.session.token_user)
  akademik.then(dataAkademik => {
    const resMhs = axios.getProfile(req.session.username, req.session.token_user);
    resMhs.then(dataMhs => {
      const tahun = axios.tahunAkademik(req.session.token_user);
      tahun.then(dataTahun => {
        res.render('pengisian-krs/index', {
          title: 'Pengisian KRS - Layanan Mahasiswa',
          data: req.session.data,
          dataClient: dataMhs.result[0],
          dataAkademik: dataAkademik.result,
          tahun: dataTahun.result,
          session: req.session,
          layout: '../views/layouts/templatesMhs'
        });
      });
    });
  })
}

exports.tampilpengisiankrs = (req, res)  => {
  const tahun = req.body.keyword;
  const akademik = axios.getAkademik(req.session.username, req.session.token_user)
  akademik.then(dataAkademik => {
    const resMhs = axios.getProfile(req.session.username, req.session.token_user);
    resMhs.then(dataMhs => {
      console.log(tahun);
      const akademikByTahun = axios.getAkademikByTahun(req.session.username, req.session.token_user, tahun);
      akademikByTahun.then(dataAkdTahun => {
        console.log(dataAkdTahun.result[0]);
        const kalender = axios.getKalender(req.session.token, tahun);
        kalender.then(dataKalender => {
          const tahun = axios.tahunAkademik(req.session.token_user);
          tahun.then(dataTahun => {
            res.render('pengisian-krs/tampil', {
              title: 'Pengisian KRS - Layanan Mahasiswa',
              data: req.session.data,
              dataClient: dataMhs.result[0],
              dataAkdTahun: dataAkdTahun.result[0],
              dataAkademik: dataAkademik.result,
              kalender: dataKalender.result,
              tahun: dataTahun.result,
              session: req.session,
              layout: '../views/layouts/templatesMhs'
            });
          });
        });
      })  
    })
  })
}

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


// exports.dashboardpage = (req, res, data)  => {
//   res.render('dashboard/index', {
//     title: 'Dashboard - Layanan Mahasiswa',
//     data: data,
//     session: req.session,
//     layout: '../views/layouts/templatesMhs'
//   });
// }



// exports.logout = (req, res)  => {
//   if (req.session.otorisasi) {
//     const resClient = axios.logout(req.session.token, req.session.user_token, req.session.user_username);
//     resClient.then(dataClient => { 
//       this.homepage(req, res);
//     });
//   }

// }

// exports.login = (req, res, next) => {
//   // if (typeof req.session.username === 'undefined') {
//   const resClient = axios.postClientAPI();
//   resClient.then(dataClient => {
//     const token = dataClient.result.token;
//     console.log(token);
//     const username =  req.body.username;
//     const password =  req.body.password;
//     console.log(username);
//     console.log(password);

//     const resUser = axios.postLoginUser(token, username, password);
//     req.session.token = token;
//     req.session.username = username;
//     resUser.then(dataUser => {
//       const token_user = dataUser.result.user_token;
//       const otorisasi = dataUser.result.otorisasi;
//       req.session.token_user = token_user;
//       req.session.otorisasi = otorisasi;
//       if (otorisasi) {
//         const cekPengguna = axios.kelompokPengguna(token, username);
//         cekPengguna.then(pengguna => {
//           // console.log(cekPengguna.result)
//           data = pengguna.result[0];
//           console.log(data);
//           if(pengguna.code === 200) {
//             this.dashboardpage(req, res, data);
//           } else {
//             this.homepage(req, res);
//           }
//         }).catch(err => console.log(err))
//       } else {
//         this.homepage(req, res);
//       }
//     })
//   }).catch(err => console.log(err))
 
// };

