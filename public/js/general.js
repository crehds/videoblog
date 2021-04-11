$(() => {
  $('.tooltipped').tooltip({ enterDelay: 50 });
  $('.modal').modal();
  // M.AutoInit();
  firebase.initializeApp(varConfig);
  firebase.analytics();
  // recupera datos datetime(convierte) a timestamp
  const settings = { enablePersistence: true };
  db = firebase.firestore();
  db.settings(settings);
  // Evento boton inicio sesion
  const post = new Post();
  const comment = new Comment();
  post.getAllPost();
  $('#btnInicioSesion').click(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      $('#btnInicioSesion').text('Cerrar sesion');
      return firebase
        .auth()
        .signOut()
        .then(() => {
          $('#avatar').attr('src', 'imagenes/usuario.png');

          M.toast({ html: `SignOut Correcto`, displayLength: 4000 });
        })
        .catch((error) => {
          M.toast({
            html: `Error al realizar SignOut => ${error}`,
            displayLength: 40000,
          });
        });
    }

    $('#emailSesion').val('');
    $('#passwordSesion').val('');
    $('#modalSesion').modal('open');
  });

  $('#avatar').click(() => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        $('#avatar').attr('src', 'imagenes/usuario.png');
        M.toast({ html: `SignOut correcto`, displayLength: 4000 });
      })
      .catch((error) => {
        M.toast({
          html: `Error al realizar SignOut ${error}`,
          displayLength: 4000,
        });
      });
  });

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('#btnInicioSesion').text('Salir');
      if (user.photoURL) {
        $('#avatar').attr('src', user.photoURL);
      } else {
        $('#avatar').attr('src', 'imagenes/usuario_auth.png');
      }
    } else {
      $('#btnInicioSesion').text('Iniciar Sesión');
      $('#avatar').attr('src', 'imagenes/usuario.png');
    }
  });

  

  $('#btnTodoPost').click(() => {
    $('#tituloPost').text('Posts de la Comunidad');
    post.getAllPost();
  });

  $('#btnMisPost').click(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      post.getPostByUser(user.email);
      $('#tituloPost').text('Mis posts');
    } else {
      M.toast({
        html: `Debes estar autenticado para ver tus posts`,
        displayLength: 4000,
      });
    }
  });
});
// Se registra el service worker
//   navigator.serviceWorker
//     .register('notificaciones-sw.js')
//     .then(registro => {
//       console.log('service worker registrado')
//       firebase.messaging().useServiceWorker(registro)
//     })
//     .catch(error => {
//       console.error(`Error al registrar el service worker => ${error}`)
//     })

//   const messaging = firebase.messaging()

//   // Registrar credenciales web
//   messaging.usePublicVapidKey(
//     'BNXFobbKFCs-uAVxoPSqtgtm9GrVypZwx9n2PdS6GCqynO48xgPL0vUhX5hd9xgawFTRFzvfyYe0tt8f_IcL_-w'
//   )

//   // Solicitar permisos para las notificaciones
//   messaging
//     .requestPermission()
//     .then(() => {
//       console.log('permiso otorgado')
//       return messaging.getToken()
//     })
//     .then(token => {
//       console.log('token')
//       console.log(token)
//       const db = firebase.firestore()
//       db.settings({ timestampsInSnapshots: true })
//       db
//         .collection('tokens')
//         .doc(token)
//         .set({
//           token: token
//         })
//         .catch(error => {
//           console.error(`Error al insertar el token en la BD => ${error}`)
//         })
//     })
//     .catch(error => {
//       console.error(`Permiso no otorgado => ${error}`)
//     })

//   // Obtener el token cuando se refresca
//   messaging.onTokenRefresh(() => {
//     messaging.getToken().then(token => {
//       console.log('token se ha renovado')
//       const db = firebase.firestore()
//       db.settings({ timestampsInSnapshots: true })
//       db
//         .collection('tokens')
//         .doc(token)
//         .set({
//           token: token
//         })
//         .catch(error => {
//           console.error(`Error al insertar el token en la BD => ${error}`)
//         })
//     })
//   })

//   // Recibir las notificaciones cuando el usuario esta foreground
//   messaging.onMessage(payload => {
//     console.log('mensaje en foreground')
//     Materialize.toast(
//       `Ya tenemos un nuevo post. Revísalo, se llama ${payload.data.titulo}`,
//       6000
//     )
//   })

//   const post = new Post()
//   post.consultarTodosPost()

//   // Firebase observador del cambio de estado de auth
//   firebase.auth().onAuthStateChanged(user => {
//     if (user) {
//       $('#btnInicioSesion').text('Salir')
//       if (user.photoURL) {
//         $('#avatar').attr('src', user.photoURL)
//       } else {
//         $('#avatar').attr('src', 'imagenes/usuario_auth.png')
//       }
//     } else {
//       $('#btnInicioSesion').text('Iniciar Sesión')
//       $('#avatar').attr('src', 'imagenes/usuario.png')
//     }
//   })

//   $('#btnTodoPost').click(() => {
//     $('#tituloPost').text('Posts de la Comunidad')
//     const post = new Post()
//     post.consultarTodosPost()
//   })

//   $('#btnMisPost').click(() => {
//     const user = firebase.auth().currentUser
//     if (user) {
//       const post = new Post()
//       post.consultarPostxUsuario(user.email)
//       $('#tituloPost').text('Mis Posts')
//     } else {
//       Materialize.toast(`Debes estar autenticado para ver tus posts`, 4000)
//     }
//   })
// })
