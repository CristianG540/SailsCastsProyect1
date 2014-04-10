/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

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

  }

};
