$(document).ready(function(){

    // Validate
	// http://bassistance.de/jquery-plugins/jquery-plugin-validation/
	// http://docs.jquery.com/Plugins/Validation/
	// http://docs.jquery.com/Plugins/Validation/validate#toptions

    $('#formNewUser').validate({
        rules: {
            nombre: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            password: {
                minlength: 5,
                required: true
            },
            confirmacion: {
                minlength: 5,
                equalTo: "#password"
            }
        },
        success: function(element){
            element
                .text('OK!').addClass('valid');
        }
    });

    $(".form-signin").removeAttr("novalidate");

});
