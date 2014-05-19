/**
 * app.js
 *
 * This file contains some conventional defaults for working with Socket.io + Sails.
 * It is designed to get you up and running fast, but is by no means anything special.
 *
 * Feel free to change none, some, or ALL of this file to fit your needs!
 */


(function (io) {

    // as soon as this file is loaded, connect automatically,
    var socket = io.connect();
    if (typeof console !== 'undefined') {
        log('Connecting to Sails.js...');
    }

    socket.on('connect', function socketConnected() {

        // Listen for Comet messages from Sails
        socket.on('message', messageReceived);

        // Me subscribo a el user model classroom y instancio room
        socket.get('/user/subscribe');

        ///////////////////////////////////////////////////////////
        // Here's where you'll want to add any custom logic for
        // when the browser establishes its socket connection to
        // the Sails.js server.
        ///////////////////////////////////////////////////////////
        log(
            'Socket is now connected and globally accessible as `socket`.\n' +
            'e.g. to send a GET request to Sails, try \n' +
            '`socket.get("/", function (response) ' +
            '{ console.log(response); })`'
        );
        ///////////////////////////////////////////////////////////


    });


    // Expose connected `socket` instance globally so that it's easy
    // to experiment with from the browser console while prototyping.
    window.socket = socket;


    // Simple log function to keep the example simple
    function log() {
        if (typeof console !== 'undefined') {
            console.log.apply(console, arguments);
        }
    }


})(

    // In case you're wrapping socket.io to prevent pollution of the global namespace,
    // you can replace `window.io` with your own `io` here:
    window.io

);
function messageReceived(message) {

    ///////////////////////////////////////////////////////////
    console.log('Nuevo mensaje desde el server ', message);
    ///////////////////////////////////////////////////////////

    //Ok, necesito rutear este mensaje al lugar indicado.

    //Este mensaje se relaciona con el modelo usuario
    if(message.model === 'user'){
        var userId = message.id;
        updateUserInDom(userId, message);
    }

}

function updateUserInDom(userId, message){

    // En que pagina estoy?
    var pagina = document.location.pathname;

    // elimino la barra finl de la ruta por si la ingresan
    pagina = pagina.replace(/(\/)$/, '');

    //Ruteo al handler de actualizacion de usuario dependiendo en q pagina me encuentre
    switch (pagina) {
        // Si estamos en la pagina de administracion ( user/index)
        case '/user':
            // Este es el mensaje que viene desde publishUpdate
            if(message.verb === 'update') {
                UserIndexPage.updateUser(userId, message);
            }
            // Este es el mensaje que viene desde publishCreate
            if(message.verb === 'create') {
                UserIndexPage.createUser(message);
            }
            // Este es el mensaje que viene desde publishDestroy
            if(message.verb === 'destroy') {
                UserIndexPage.destroyUser(userId);
            }
            break;
    }

}


////////////////////////////////////////////////////////////////////
// Logica de manipulacion del DOM
// ( Vista estilo-backbone)
////////////////////////////////////////////////////////////////////

var UserIndexPage = {
    //Actualiza el usuario, en este caso el estado de conexion
    updateUser: function(userId, message){
        var $userRow = $('tr[data-id="'+ userId +'"] td span').first();
        if (message.data.loggedIn){
            $userRow.attr('class', "glyphicon glyphicon-ok-sign");
        }else{
            $userRow.attr('class', 'glyphicon glyphicon-remove-sign');
        }
    },
    // Agrega un usuario a lista de usuarios en la pagina de administracion
    createUser: function(message){
        var obj = {
            usuario: message.data,
            _csrf: window.overlord.csrf || ''
        };

        // Inserta la plantilla en la parte inferior de la página de administración de usuarios
        $('tr:last').after(
            //Esta es la ruta del template
            JST['assets/linker/templates/addUser.ejs'](obj)
        );
    },
    // Elmina el usuario de la lista de administracion  de usuarios
    destroyUser: function(userId){
        $('tr[data-id="'+ userId +'"]').remove();
    }
};
