//login instancia del proveedor del servicio
var provider = new firebase.auth.GoogleAuthProvider();
//observando si al boton le dan click
$('#login').click(function(){
//    window.location.href="home.html"
  firebase.auth()
  .signInWithPopup(provider) //levantar una ventana pide permisos al usuario
  .then(function(result){//promesa que se ejecuta cuando se resuelve result trae informacion basica del usuario
    guardaDatos(result.user); //cada vez que haga login
    $('#inicio').hide(); //ocultar boton
    $('#perfil').show();
    $('.root').append("<img width='100px' id='img-perfil' src='"+result.user.photoURL+"'/>") //mostrar imagen
    $('#nombre').append(result.user.displayName)
  });
});

//guarda datos automaticamente
function guardaDatos(user){  //recibe user que entrega el login
  var usuario={
    uid:user.uid, //lo genera firebase
    nombre:user.displayName,
    email:user.email,
    foto:user.photoURL,
    mensaje:$('#texto').val()
  }
  firebase.database().ref("red/"+ user.uid)
  .set(usuario) //modificar llave
}

$('#env-msg').click(function(){
//    window.location.href="home.html"
  firebase.auth()
  .signInWithPopup(provider) //levantar una ventana pide permisos al usuario
  .then(function(result){//promesa que se ejecuta cuando se resuelve result trae informacion basica del usuario
    guardaDatos(result.user); //cada vez que haga login
    $('#msg').append('<div class=sec-post>'+
                     '<div class=post>'+
                    "<img width='25px' id='img-perfil' src='"+result.user.photoURL+"'/>"+
                    '<span class=text-uppercase >'+result.user.displayName+'</span>'+
                    '<p class=msg-post>'+$('#texto').val()+'</p>'+'</div>'+'</div>')
  });
});

window.onload = inicializar;

 function inicializar(){
   var formAuth=document.getElementById('form-auth');
   formAuth.addEventListener('submit',autentificar,false);
 }

 function autentificar(){
   event.preventDefault();
   var usuario=event.target.email.value;
   var contraseña=event.target.password.value;

   firebase.auth().signInWithEmailAndPassword(usuario,contraseña)
    .then(function(result){
      alert('correcto');
    })
    .catch(function(error){
      alert('incorrecto');
   });
 }



/*
$('#auth').click(function(){
  email=$('#email').val();
  password=$('#password').val();
  firebase.auth().signInWithEmailAndPassword(usuario,contraseña)
    .then(function(result){
      alert('correcto');
    })
    .catch(function(error){
     alert('incorrecto');
   });
});



*/
//escribir en base de datos
$('#guardar').click(function(){

  var usuario={  // graba en toda la rama se lo doy a firebase para ser almacenado en rama red
    uid:'FyOnfZiXLRgsnY43tmSsg1IrpRB2',
    nombre:"Patricia",
    edad:"28",
  }
    firebase.database().ref("red") //rama red
    .push(usuario);
});

/*
//aqui estoy leyendo de la base de datos
firebase.database().ref("red")
.on("child_added", function(s){  //snap: donde vienen los datoscuando se agrege un elemento en la rama
  var user=s.val();
  $('#root').append("<img width='100px' src='"+user.foto+"'/>")
})
*/
function handleFileSelect(evt) {
  var files = evt.target.files; // FileList object

  // Loop through the FileList and render image files as thumbnails.
  for (var i = 0, f; f = files[i]; i++) {
    // Only process image files.
    if (!f.type.match('image.*')) {
      continue;
    }

    var reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (function(theFile) {
      return function(e) {
        // Render thumbnail.
        var span = document.createElement('span');
        span.innerHTML = ['<img class="thumb" src="', e.target.result,
                          '" title="', escape(theFile.size), '"/>'].join('');
        document.getElementById('msg').insertBefore(span, null);
        console.log(span)
      };
    })(f);

    // Read in the image file as a data URL.
    reader.readAsDataURL(f);
  }
}

document.getElementById('files').addEventListener('change', handleFileSelect, false);
