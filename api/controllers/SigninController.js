/**
 * SigninController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  signin:(req,res)=> {
    let [secret, token] = [process.env.captcha_secret, req.body['h-captcha-response']];
    const {verify} = require('hcaptcha');
    verify(secret, token)
      .then((data) => {
        if (data.success == false) {
          res.send('Captcha error')
        } else {
          Users.findOne({email:req.body.email}).exec((err, re) => {
            if (re !== undefined) {
              let password=req.body.password;
              let hash=re.password
              let originalip=re.ip
              try {
                bcrypt.compare(password,hash,function (err,result){
                  if (result==true){
                    (async () => {
                      let ip = await publicIp.v4()
                      if (originalip==ip){
                        req.session.email=req.body.email
                        req.session.password=password
                        await res.send('success')
                      }else {
                        req.session.email=req.body.email
                        req.session.password=password
                        await res.send('different ip')
                      }
                    })();
                  }else {
                    res.send('invalid password')
                  }
                })
              }catch (e) {
                console.log(e);

              }

            }else {
              res.send('Account not found')
            }
          })
        }
      })
  }

};

