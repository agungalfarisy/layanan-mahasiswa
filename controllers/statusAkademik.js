const axios = require('./axios');

exports.getStatusAkademik = (req, res, next) => {
  console.log(req.session.otorisasi);
  if (req.session.otorisasi) {
    this.statusakademikpage(req, res);
  } else {
    this.homepage(req, res);
  }
};

exports.statusakademikpage = (req, res)  => {
  const akademik = axios.getAkademik(req.session.username, req.session.token_user)
  akademik.then(dataAkademik => {
    const resMhs = axios.getProfile(req.session.username, req.session.token_user);
    resMhs.then(dataMhs => {
      const resDpp = axios.getDpp(req.session.username, req.session.token_user);
      resDpp.then(dataDpp => {
        res.render('status-akademik/index', {
          title: 'Status Akademik - Layanan Mahasiswa',
          data: req.session.data,
          dataClient: dataMhs.result[0],
          dpp: dataDpp.result[0],
          dataAkademik: dataAkademik.result,
          session: req.session,
          layout: '../views/layouts/templatesMhs'
        });
      });
    });
  })
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
};
