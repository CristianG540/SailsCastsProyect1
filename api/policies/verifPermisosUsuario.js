/**
 * verifPermisosUsuario
 *
 * @module      :: Policy
 * @description :: Permite a un usuario logueado ver y editar su propio perfil
 *                 Permite al ministrador ver a todos
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function (req, res, next) {

    var sessionUserMatchesId;
    //Verifico si el id del usuario en la sesion es igual al id del usuario en los parametros de la ruta del navegador, asi un usuario sin privelegios que ingrese el id de otro usuario en la barra de navegacion no pueda acceder a el
    if(req.session.Usuario.id === req.params.id){
        sessionUserMatchesId = true;
    }

    var isAdmin = req.session.Usuario.admin;

    //Si el request id no coincide con el id del usuario
    //y no es admin
    if(!(sessionUserMatchesId || isAdmin)){
        var noDerechosError = [
            {
                nombre: 'noDerechosError',
                mensaje: 'No eres un administrador'
            }
        ];
        req.session.flash = {
            error: noDerechosError
        };
        res.redirect('session/new');
        return;
    }

    next();

};
