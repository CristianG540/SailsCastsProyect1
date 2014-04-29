/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 * @docs        :: Mejor documentacion aqui https://github.com/balderdashy/waterline
 * @docs        :: Mas documentacion por estos lares https://github.com/balderdashy/waterline-docs/blob/master/models.md
 */
var bcrypt = require('bcrypt');
module.exports = {

    schema: true,
    attributes: {

        /* e.g.
        nickname: 'string'
        */

        nombre: {
            type: 'string',
            required: true
        },
        titulo: {
            type: 'string'
        },
        email: {
            type: 'string',
            email: true,
            required: true,
            unique: true
        },
        admin: {
            type: 'boolean',
            defaultsTo: false
        },
        encryptedPassword: {
            type: 'string'
        }
        ,toJSON: function () {
            /*The toObject() method will return the currently set model values only, without any of the instance methods attached. Useful if you want to change or remove values before sending to the client.*/
            var obj = this.toObject();
            delete obj.password;
            delete obj.confirmacion;
            delete obj.encryptedPassword;
            delete obj._csrf;
            return obj;
        }

    },
    beforeUpdate:  function(values, next){
        console.log('beforeValidation');
        console.log(values);
        console.log('beforeValidation');
        if (typeof values.admin !== 'undefined') {
            if(values.admin === 'unchecked'){
                values.admin = false;
            }else if (values.admin[1] === 'on') {
                values.admin = true;
            }
        }
        next();
    },
    beforeCreate: function (values, next) {
        // esto chekea que el password y la confirmacion sean iguales antes de crear el registro
        if(!values.password || values.password !== values.confirmacion){
            return next({error: ["El password no coincide con la confirmacion."]});
        }
        bcrypt.hash(values.password, 10, function(err, hash){
            if(err){
                console.log("Error al encriptar la contraseña");
                return res.serverError(err);
            }
            values.encryptedPassword = hash;
            next();
        });
    }

};
