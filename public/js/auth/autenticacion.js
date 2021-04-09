class Autenticacion {
  authEmailPass(email, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (result.user.emailVerified) {
          $('#avatar').attr('src', 'imagenes/usuario_auth.png');
          M.toast({
            html: `Bienvenido ${result.user.displayName}`,
            displayLength: 5000,
          });
        } else {
          firebase.auth().signOut();
          M.toast({
            html: `Porfavor realiza la verificacion de la cuenta`,
            displayLength: 5000,
          });
        }
      });

    $('.modal').modal('close');
  }

  createAccountEmailPass(email, password, nombres) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user.updateProfile({
          displayName: nombres,
        });

        const configuration = {
          url: 'http://localhost:5500/public',
        };

        result.user.sendEmailVerification(configuration).catch((error) => {
          console.error(error);
          M.toast({ html: error.message, displayLength: 4000 });
        });

        firebase.auth().signOut();

        M.toast({
          html: `Bienvenido ${nombres}, debes realizar el proceso de verificación`,
          displayLength: 4000,
        });

        $('.modal').modal('close');
      })
      .catch((error) => {
        console.error(error);
        M.toast({ html: error.message, displayLength: 4000 });
      });
  }

  authGoogleAccount() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        $('#avatar').attr('src', result.user.photoURL);
        $('.modal').modal('close');
        M.toast({
          html: `Bienvenido ${result.user.displayName}`,
          displayLength: 4000,
        });
      })
      .catch((error) => {
        console.error(error);
        M.toast({
          html: `Error al autenticarse con google: ${error.message}`,
          displayLength: 4000,
        });
      });
  }

  authFacebookAccount() {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        $('#avatar').attr('src', result.user.photoURL);
        $('.modal').modal('close');
        M.toast({
          html: `Bienvenido ${result.user.displayName}`,
          displayLength: 4000,
        });
      })
      .catch((error) => {
        console.error(error);
        M.toast({
          html: `Error al autenticarse con facebook: ${error.message}`,
          displayLength: 4000,
        });
      });
  }
  // autEmailPass (email, password) {
  //   firebase.auth().signInWithEmailAndPassword(email, password).then(result => {
  //     if (result.user.emailVerified) {
  //       $('#avatar').attr('src', 'imagenes/usuario_auth.png')
  //       Materialize.toast(`Bienvenido ${result.user.displayName}`, 5000)
  //     } else {
  //       firebase.auth().signOut()
  //       Materialize.toast(
  //         `Por favor realiza la verificación de la cuenta`,
  //         5000
  //       )
  //     }
  //   })

  //   $('.modal').modal('close')
  // }

  // crearCuentaEmailPass (email, password, nombres) {
  //   firebase
  //     .auth()
  //     .createUserWithEmailAndPassword(email, password)
  //     .then(result => {
  //       result.user.updateProfile({
  //         displayName: nombres
  //       })

  //       const configuracion = {
  //         url: 'https://blogeekplatzi-4836b.firebaseapp.com/'
  //       }

  //       result.user.sendEmailVerification(configuracion).catch(error => {
  //         console.error(error)
  //         Materialize.toast(error.message, 4000)
  //       })

  //       firebase.auth().signOut()

  //       Materialize.toast(
  //         `Bienvenido ${nombres}, debes realizar el proceso de verificación`,
  //         4000
  //       )

  //       $('.modal').modal('close')
  //     })
  //     .catch(error => {
  //       console.error(error)
  //       Materialize.toast(error.message, 4000)
  //     })
  // }

  // authCuentaGoogle () {
  //   const provider = new firebase.auth.GoogleAuthProvider()

  //   firebase.auth().signInWithPopup(provider).then(result => {
  //     $('#avatar').attr('src', result.user.photoURL)
  //     $('.modal').modal('close')
  //     Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000)
  //   })
  //   .catch(error =>{
  //     console.error(error)
  //     Materialize.toast(`Error al autenticarse con google: ${error} `, 4000)
  //   })
  // }

  // authCuentaFacebook () {
  //   const provider = new firebase.auth.FacebookAuthProvider();

  //   firebase.auth().signInWithPopup(provider).then(result => {
  //     $('#avatar').attr('src', result.user.photoURL)
  //     $('.modal').modal('close')
  //     Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000)
  //   })
  //   .catch(error =>{
  //     console.error(error)
  //     Materialize.toast(`Error al autenticarse con facebook: ${error} `, 4000)
  //   })
  // }

  // authTwitter () {
  //   // TODO: Crear auth con twitter
  // }
}
