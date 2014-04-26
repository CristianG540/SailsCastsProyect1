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

var bcrypt = require('bcrypt');

module.exports = {


    'new': function (req, res, next) {
        console.log(req.session);
        res.view('session/new');
    },
    create: function (req, res, next) {
        var dataForm = req.body;

        if (!dataForm.email || !dataForm.password) {
            var emailPasswordRequiredError = [
                {
                    nombre: 'emailPasswordRequiredError',
                    mensaje: 'Debes ingresar un email y un password'
                }
            ];

            req.session.flash = {
                error: emailPasswordRequiredError
            };

            res.redirect('/session/new');
            return;
        }
        // Busco el usuario usando la direccion email con Dynamic finders de waterline
        User.findOneByEmail(dataForm.email).done(function (err, user) {
            if (err) {
                return res.serverError(err);
            }

            //si no se encuentra el usuario...
            if (!user) {
                var noCuentaError = [
                    {
                        nombre: 'noCuenta',
                        mensaje: 'La direccion de correo: "' + dataForm.email + '" no se encuentra.'
                    }
                ];
                req.session.flash = {
                    error: noCuentaError
                };
                res.redirect('/session/new');
                return;
            }
            // Comparo el password que se ingreso en el formulario con el password encriptado del usuario de la base de datos que me trajo la busqueda
            bcrypt.compare(dataForm.password, user.encryptedPassword, function (err, val) {
                if (err) {
                    console.log("Error al comparar el password en bcrypt");
                    return res.serverError(err);
                }
                //si el password del formulario no es igual al de la base datos ...
                if (val === false) {
                    var errPassword = [
                        {
                            nombre: 'errPassword',
                            mensaje: 'La combinacion usario contraseña es incorrecta'
                        }
                    ];
                    req.session.flash = {
                        error: errPassword
                    };
                    res.redirect('/session/new');
                    return;
                }

                //Logueo del usuario
                req.session.autenticado = true;
                req.session.Usuario = user;

                // si el usuario es administrador lo redirecciono a la lista de usuarios ( /views/user/index.ejs)
                // esto es usado en conjunto con config/policies.js
                if(req.session.Usuario.admin){
                    res.redirect('/user');
                    return;
                }

                //redirecciono a la pagina de perfil del usuario ( /views/user/show.ejs)
                res.redirect('/user/show/' + user.id);
            });

        });
    },
    destroy: function(req, res, next){
        // Termino la sesion (log out)
        req.session.destroy();

        // Redirecciono al la pagina de inicio de sesion
        res.redirect('/session/new');
    },
    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to SessionController)
     */
    _config: {}


};
