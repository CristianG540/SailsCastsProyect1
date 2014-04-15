function classUsuario() {
    this.id = "";
    this.deleteUser = function () {
        var scope = this;
        console.log("Hola si entro y el id es: "+scope.id);
        /*$.ajax({
            type: "DELETE",
            url: "/user/",
            dataType: "json",
            data: {
                id: scope.id
            }
        })
        .done(function (data) {
            console.log(data);
        });*/
    };
}

var instUsuario = new classUsuario();

$(document).ready(function () {
    $("#btnDeleteUsr").on("click", function (evt) {
        evt.preventDefault();
        var id = $(this).attr("href");
        instUsuario.id = id;
        instUsuario.deleteUser();
    });

});
