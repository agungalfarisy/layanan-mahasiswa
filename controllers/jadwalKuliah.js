const axios = require('./axios');

exports.getJadwalKuliah = (req, res, next) => {
  console.log(req.session.otorisasi);
  if (req.session.otorisasi) {
    this.jadwalkuliahpage(req, res);
  } else {
    this.homepage(req, res);
  }
}

exports.jadwalkuliahpage = (req, res)  => {
  const tahun = axios.tahunAkademik(req.session.token_user);
  tahun.then(dataTahun => {
    const resMhs = axios.getProfile(req.session.username, req.session.token_user);
    resMhs.then(dataMhs => {
      res.render('jadwal-kuliah/index', {
        title: 'Jadwal Kuliah - Layanan Mahasiswa',
        data: req.session.data,
        session: req.session,
        tahun: dataTahun.result,
        dataClient: dataMhs.result[0],
        layout: '../views/layouts/templatesMhs'
      });
    });
  });
}

exports.tampiljadwalkuliahpage = (req, res)  => {
  const keyword = req.body.keyword;
  const senin = axios.jadwalKuliah( req.session.token_user, req.session.username, keyword, 1);
  senin.then(dataSenin => {
    const selasa = axios.jadwalKuliah( req.session.token_user, req.session.username, keyword, 2);
    selasa.then(dataSelasa => {
      const rabu = axios.jadwalKuliah( req.session.token_user, req.session.username, keyword, 3);
      rabu.then(dataRabu => {
        const kamis = axios.jadwalKuliah( req.session.token_user, req.session.username, keyword, 4);
        kamis.then(dataKamis => {
          const jumat = axios.jadwalKuliah( req.session.token_user, req.session.username, keyword, 5);
          jumat.then(dataJumat => {
            const sabtu = axios.jadwalKuliah( req.session.token_user, req.session.username, keyword, 6);
            sabtu.then(dataSabtu => {
              const tahun = axios.tahunAkademik( req.session.token_user, req.session.username, '');
              tahun.then(dataTahun => {
                const resMhs = axios.getProfile(req.session.username, req.session.token_user);
                resMhs.then(dataMhs => {
                  
                  res.render('jadwal-kuliah/tampil', {
                    title: 'Jadwal Kuliah - Layanan Mahasiswa',
                    data: req.session.data,
                    senin: dataSenin.result[0],
                    selasa: dataSelasa.result[0],
                    rabu: dataRabu.result[0],
                    kamis: dataKamis.result[0],
                    jumat: dataJumat.result[0],
                    sabtu: dataSabtu.result[0],
                    tahun: dataTahun.result,
                    dataClient: dataMhs.result[0],
                    session: req.session,
                    // links: links,
                    // messageUSM: req.flash('message'),
                    layout: '../views/layouts/templatesMhs'
                  });
                });
              });
            });
          });
        });
      });
      console.log(senin.result[0]); 
    });
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

// exports.getProfile = (req, res)  => {
//   if (req.session.otorisasi) {
//     const resClient = axios.getProfile(req.session.username, req.session.token);
//     resClient.then(dataClient => {
//       res.render('profile/index', {
//         title: 'Profil - Layanan Mahasiswa',
//         session: req.session,
//         layout: '../views/layouts/templatesMhs'
//       });
//     })
//   } else {
//     this.homepage(req, res);
//   }

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

