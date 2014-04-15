module.exports = function (req, res, next) {

    console.log("Estoy dentro de una politica");
    //console.log(req);
    console.log("Estoy dentro de una politica");
    next();
};
