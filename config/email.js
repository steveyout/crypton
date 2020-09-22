module.exports.email = {
  transporter:{
    host:'mail.youtmail.tk',
    port:587,
    secure:false,
    auth: {
      user:'crypton@youtmail.tk',
      pass:'crypton'
    },
    tls: {
      rejectUnauthorized: false,
    },
  },
  from:'crypton@youtmail.tk',
  testMode:false,
};
