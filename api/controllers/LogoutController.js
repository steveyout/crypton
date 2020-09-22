/**
 * LogoutController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  logout:(req,res)=>{
    req.session.destroy();
    res.redirect('/login');
}

};

