/**
 * isAuthenticated
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function (req, res, next) {

    // Si el usuario esta autenticado, procede a la siguiente politica,
    // o si esta es la ultima politica, procede a el controlador

    try{
        if (req.session.autenticado && req.session.Usuario.admin) {
            return next();
        }
        var noAdminError = [
            {
                nombre: 'noAdminError',
                mensaje: 'Usted debe estar logueado como administrador'
            }
        ];

        throw noAdminError;

    }catch(err){
        req.session.flash = {
            error: noAdminError
        };

        res.redirect('/session/new');
        return;
    }

    // (default res.forbidden() behavior can be overridden in `config/403.js`)
    //return res.forbidden('You are not permitted to perform this action.');
};
