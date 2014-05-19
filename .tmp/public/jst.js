this["JST"] = this["JST"] || {};

this["JST"]["assets/linker/templates/addUser.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<tr data-id="' +
((__t = ( usuario.id )) == null ? '' : __t) +
'" data-model="user">\n    ';
 if (usuario.online) { ;
__p += '\n    <td><span class="glyphicon glyphicon-ok-sign"></span></td>\n    ';
 } else { ;
__p += '\n    <td><span class="glyphicon glyphicon-remove-sign"></span></td>\n    ';
 } ;
__p += '\n    <td>' +
__e( usuario.id ) +
'</td>\n    <td>' +
__e( usuario.nombre ) +
'</td>\n    <td>' +
__e( usuario.titulo ) +
'</td>\n    <td>' +
__e( usuario.email ) +
'</td>\n    ';
 if (usuario.admin) { ;
__p += '\n    <td><img src="/images/admin.png" alt="admin"></td>\n    ';
 } else { ;
__p += '\n    <td><img src="/images/pawn.png" alt="user"></td>>\n    ';
 } ;
__p += '\n    <td><a href="/user/show/' +
__e( usuario.id ) +
'" class="btn btn-small btn-primary">Mostrar</a></td>\n    <td><a href="/user/edit/' +
__e( usuario.id ) +
'" class="btn btn-small btn-warning">Editar</a></td>\n    <td>\n        <form action="/user/destroy/' +
__e( usuario.id ) +
'" method="POST">\n            <input value="delete" name="_method" id="_method" type="hidden" />\n            <input type="hidden" name="_csrf" value="' +
((__t = ( _csrf )) == null ? '' : __t) +
'" />\n            <input type="submit" class="btn btn-sm btn-danger" value="Eliminar"/>\n        </form>\n    </td>\n</tr>\n';

}
return __p
};
