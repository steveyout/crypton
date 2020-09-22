/**
 * WalletbtcController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  walletbtc:(req,res)=> {
    let [email, password] = [req.session.email, req.session.password]
    if (email !== undefined && password !== undefined) {
      const BitGo = require('bitgo');
      let title = process.env.title
      let params = req.path
      var QRCode = require('qrcode')
      var bitgo = new BitGo.BitGo({env: process.env.Bitgo_env, accessToken: process.env.Bitgo});
      bitgo.session({}, function callback(err, session) {
        if (err) {
          throw err;
        }
      });
      Users.findOne({email:email}).exec(function (err,result){
        if (result!==undefined){
          let user=result.username
          try {
            Wallets.findOne({email:email,status:'active',coin:'btc'}).exec(function (err,result){
              if (result==undefined){
            const data = {
              "passphrase":user,
              "label":user
            };
            bitgo.coin('tbtc').wallets().generateWallet(data,function (err, response) {
              if (!err) {
                let walletid=response.wallet._wallet.receiveAddress.wallet
               let address=response.wallet._wallet.receiveAddress.address
                let url=process.env.url
                    Wallets.create(
                      {
                        email:email,
                        coin:'btc',
                        walletid:walletid,
                        address:address,
                        status:'active'
                      }).exec(function (err,results,created){
                        if (!err){
                          QRCode.toDataURL(address, {width: 300}, function (err, url) {
                            return res.view('dashboard/walletbtc', {title: title, params: params, url: url,address:address})
                          })
                          bitgo.coin('tbtc').wallets().get({ id:walletid })
                            .then(function(wallet) {
                              return wallet.addWebhook({
                                url: url,
                                type: "transaction"
                              });
                            })
                            .then(function(webhook) {
                              // print the new webhook
                              console.dir(webhook);
                            });

                        }

                    })
              }
            })
              }else {
                let address=result.address
                let url=process.env.url
                let walletId=result.walletid
                QRCode.toDataURL(address, {width: 300}, function (err, url) {
                  return res.view('dashboard/walletbtc', {title: title, params: params, url: url,address:address})
                })

              }
            })
          }catch (e) {
           throw e
          }
        }
      })
    }else {
      res.redirect('/login')
    }
  }

};

