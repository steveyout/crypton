/**
 * DashboardController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  dashboard:(req,res)=>{
    let [email,password]=[req.session.email,req.session.password]
    if (email!==undefined&&password!==undefined){
    let title=process.env.title
      let params=req.path
      Users.findOne({email:email}).exec(function (error,results){
        Balances.findOne({email:email}).exec(function (error,balances){
          if (balances!==undefined) {
            let [btc, bch, eth, ltc] = [balances.btc, balances.bch, balances.eth, balances.ltc]
            return res.view('dashboard/',{title:title,params:params,btc:btc,bch:bch,eth:eth,ltc:ltc});
          }
        })
        })
  }else {
      res.redirect('/login');
      console.log(email)
    }
  }

};

