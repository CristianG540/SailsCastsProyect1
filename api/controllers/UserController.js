/**
 * UserController
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



    'new': function (req, res) {
        res.view();
    },


    create: function (req, res, next) {
        // Crea un usuario con los parametros enviados desde
        // el formulario sign-up --> new.ejs
        console.log(req.params.all()); // Esto me trae todos los paramatros se parece mucho al req.body pero no se cual es la diferencia
        var dataForm = req.body;

        User.create(dataForm).done(function (err, user) {
            // Error handling
            if (err) {
                console.log(err);
                req.session.flash = {error: err};
                return res.redirect('/user/new');
            }

            res.json(user);

        });

    },
    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to UserController)
     */
    _config: {}

};
