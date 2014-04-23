/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

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
        encryptedPassword: {
            type: 'string'
        }
        ,toJSON: function () {
            /*The toObject() method will return the currently set model values only, without any of the instance methods attached. Useful if you want to change or remove values before sending to the client.*/
            var obj = this.toObject();
            console.log('antes de hacer toObect');
            console.log(this.toObject());
            console.log('antes de hacer toObect');


            delete obj.password;
            delete obj.confirmacion;
            delete obj.encryptedPassword;
            delete obj._csrf;

            return obj;
        }

    }

};
