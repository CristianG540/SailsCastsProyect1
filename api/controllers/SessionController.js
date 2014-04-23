/**
 * SessionController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {


    'new': function(req, res){
        console.log(req.session);
        res.view('session/new');
    },
    create: function(req, res){
        var dataForm = req.body;

        if(!dataForm.email || !dataForm.password){
            var emailPasswordRequiredError = [{nombre: 'emailPasswordRequiredError', mensaje: 'Debes ingresar un email y un password'}];

            req.session.flash = {
                error: emailPasswordRequiredError
            };

            res.redirect('/session/new');
            return;
        }

        /*User.findOneByEmail(dataForm.email).done(function(err, user){

        });   */
    },
    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to SessionController)
     */
    _config: {}


};
