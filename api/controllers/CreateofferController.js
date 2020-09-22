/**
 * CreateofferController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  createoffer: (req, res) => {
    let [email, password] = [req.session.email, req.session.password]
    if (email !== undefined && password !== undefined) {
      let title = process.env.title
      let params = req.path
      return res.view('dashboard/createoffer', {title: title, params: params});

    } else {
      res.redirect('/login');
      console.log(email)
    }

  }
}


