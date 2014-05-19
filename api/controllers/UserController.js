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


    // me lleva a la vista para crear un nuevo usuario
    'new': function (req, res) {
        res.view();
    },

    //'rambo': function (req, res) {
    //    console.log("estoy en un controlador");
    //},

    // Crea la vista de perfil ( /views/show.ejs)
    'show': function (req, res, next) {
        User.findOne(req.params.id).done(function(err, user){
            if(err){ return res.serverError(err); }
            if(!user){
                console.log("No se encontraron usuarios con el ID: "+req.params.id);
                return next();
            }

            res.view({
                usuario: user
            });

        });
    },

    // Crea la vista para editar ( /views/edit.ejs)
    'edit': function (req, res, next) {
        //Busca el usuario con el id que se le envio por params
        User.findOne(req.params.id).done(function(err, user){
            if(err){ return res.serverError(err); }
            if(!user){
                console.log("No se encontraron usuarios con el ID: "+req.params.id);
                return next();
            }

            res.view({
                usuario: user
            });

        });
    },

    'index': function (req, res, next) {

        console.log(new Date());
        console.log(req.session.autenticado);

        //Consigue un array de todos los usuarios en la Coleccione User(Tabla User)
        User.find().done(function(err, users){
            if (err) { return res.serverError(err); }
            // Envia el array de usuarios a la pagina /views/index.ejs
            res.view({
                usuarios: users
            });
        });
    },

    create: function (req, res, next) {
        // Crea un usuario con los parametros enviados desde
        // el formulario sign-up --> new.ejs
        console.log(req.params.all()); // Esto me trae todos los paramatros se parece mucho al req.body pero no se cual es la diferencia
        var dataForm  = {
            'nombre'       : req.body.nombre,
            'titulo'       : req.body.titulo,
            'email'        : req.body.email,
            'password'     : req.body.password,
            'confirmacion' : req.body.confirmacion
        };

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

            //cambia el estatus de online
            user.online = true;
            user.save(function(err, user){
                if(err){
                    console.log("Error al modificar el atributo online linea 105 UserController");
                    return res.serverError(err);
                }

                //Logueo del usuario
                req.session.autenticado = true;
                req.session.Usuario = user;

                User.publishCreate(user);

                //Despues de crear correctamente un usario
                //redireciona a la accion "show" que es la qme muestra los detalles del usuario
                //desde ep1-6 //res.json(user);

                res.redirect('/user/show/'+user.id);
            });
        });

    },

    // procesa la info de la vista editar
    update: function (req, res, next) {
        var dataForm = {};
        var userId = req.params.id;

        if(req.session.Usuario.admin){
            dataForm = {
                'nombre' : req.body.nombre,
                'titulo' : req.body.titulo,
                'email'  : req.body.email,
                'admin'  : req.body.admin
            };
        }else{
            dataForm = {
                'nombre' : req.body.nombre,
                'titulo' : req.body.titulo,
                'email'  : req.body.email
            };
        }

        User.update(userId, dataForm, function(err, user){
            if(err){
                console.log("Error actualizando el id: " + userId);
                console.log(JSON.stringify(err));
                console.log("Error actualizando el id: " + userId);
                return res.redirect('/user/edit/' + userId);
            }

            res.redirect('/user/show/' + userId);
        });
    },

    destroy: function (req, res, next) {
        var userId = req.params.id;
        User.findOne(userId).done(function(err, user){
            if(err){ return res.serverError(err); }
            if(!user){ return next('El usuario no existe.'); }

            User.destroy(userId).done(function(err){
                if(err){ return res.serverError(err); }
                console.log("El usuario de id: "+userId+" Se elimino correctamente");
                User.publishDestroy(user.id);
            });
            res.redirect('/user');
        });
    },

    'subscribe': function(req, res){

        User.find(function(err,users){

            if(err){ return res.serverError(err); }

            // Subscribo este socket a el User model classroom
            User.subscribe(req.socket);

            // Subscribo este socket a el user instance rooms
            User.subscribe(req.socket, users);


            res.send(200);

        });

    },
    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to UserController)
     */
    _config: {}

};
