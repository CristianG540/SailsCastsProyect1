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

    //'rambo': function (req, res) {
    //    console.log("estoy en un controlador");
    //},

    'show': function (req, res, next) {
        User.findOne(req.params.id).done(function(err, user){
            if(err){ return next(err); }
            if(!user){
                console.log("No se encontraron usuarios con el ID: "+req.params.id);
                return next();
            }

            res.view({
                usuario: user
            });

        });
    },

    create: function (req, res, next) {
        // Crea un usuario con los parametros enviados desde
        // el formulario sign-up --> new.ejs
        console.log(req.params.all()); // Esto me trae todos los paramatros se parece mucho al req.body pero no se cual es la diferencia
        var dataForm = req.body;

        User.create(dataForm).done(function (err, user) {
            // manejo de errores
            if (err) {
                console.log(err);
                req.session.flash = {
                    error: err
                };
                // si hay un error redireciona de nuevo la pagina de inicio de sesion
                return res.redirect('/user/new');
            }
            //Despues de crear correctamente un usario
            //redireciona a la accion "show" que es la qme muestra los detalles del usuario
            //desde ep1-6 //res.json(user);

            res.redirect('/user/show/'+user.id);

        });

    },
    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to UserController)
     */
    _config: {}

};
