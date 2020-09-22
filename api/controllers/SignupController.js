/**
 * SignupController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  signup:(req,res)=>{
    let title=process.env.title;
    return res.view('landing/register',{title:title});
  }

};

