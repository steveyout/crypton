/**
 * HomepageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  homepage:(req,res)=>{
    let title=process.env.title;
    let body=process.env.body;
    return res.view('landing/' , {title:title,body:body});

  }

};

