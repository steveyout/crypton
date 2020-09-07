/**
 * LoginController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  login:(req,res)=>{
    let title=process.env.title;
    return res.view('landing/login',{title:title});
  }

};

