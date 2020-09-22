/**
 * RegisterController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  register:(req,res)=> {
    // eslint-disable-next-line handle-callback-err
    let vid=cryptoRandomString({length: 20});
    const {verify} = require('hcaptcha');
    let [secret, token] = [process.env.captcha_secret, req.body['h-captcha-response']];
    verify(secret, token)
      .then((data) => {
        if (data.success==false) {
          res.send('Captcha error')
        }else {
          Users.findOne({email: req.body.email}).exec((err, re) => {
            if (re === undefined) {
              try {
                (async () => {
                  let ip=await publicIp.v4()
                  iplocate(ip).then(function(results) {
                let [username, email, password] = [req.body.username, req.body.email, req.body.password];
                bcrypt.hash(password, 10, (err, hash) => {
                  // Store hash in your password DB.
                  if (!err) {
                    Balances.create({email:email}).exec((err,respo)=>{
                    Users.create({
                      username: username,
                      email: email,
                      password: hash,
                      ip:ip,
                      country:results.country,
                      country_code:results.country_code,
                      vid:vid
                    }).exec((error, result) => {
                      if (!error) {
                        sails.hooks.email.send(
                          "register",
                          {
                            vlink:req.hostname+'/verify/'+vid,
                            title:process.env.title
                          },
                          {
                            to:req.body.email,
                            subject: "Welcome"
                          },
                          function(err) {console.log(err || "It worked!");}
                        )

                        req.session.email=email
                        req.session.password=password
                        res.send('success');
                      } else {
                        console.log(error);
                      }
                    });
                    })
                  }
                });
              })
        })();
              } catch (e) {
                console.log(e);

              }
            } else {
              res.send('User exists');
            }
          })
        }
      }).catch((e)=>{
        throw e;
    })
  }

};

