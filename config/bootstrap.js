/**
 * Bootstrap
 *
 * An asynchronous boostrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.bootstrap = function (cb) {
    // archivo bbootstrap
    // It's very important to trigger this callack method when you are finished
    // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
    User.update({},{
        online: false
    },function(err, users){
        if(err){
            console.log("Hubo un error actualizando el esatdo online de los usuarios en el archivo bootstrap linea 19", err);
        }else{

        }
        cb();
    });

};
