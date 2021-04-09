$(() => {
  const objAuth = new Autenticacion()

  $('#btnRegistroEmail').click(() => {
    const nombres = $('#nombreContactoReg').val();
    const email = $('#emailContactoReg').val();
    const password = $('#passwordReg').val();
    const auth = new Autenticacion();
    auth.createAccountEmailPass(email, password, nombres);
  });

  $('#btnInicioEmail').click(() => {
    const email = $('#emailSesion').val();
    const password = $('#passwordSesion').val();
    const auth = new Autenticacion()
    auth.authEmailPass(email, password)
    // auth.autEmailPass(email, password)
  });

  $('#authGoogle').click(() => objAuth.authGoogleAccount())

  $('#authFB').click(() => objAuth.authFacebookAccount())

  // $("#authTwitter").click(() => objAuth.authCuentaFacebook());

  $('#btnRegistrarse').click(() => {
    $('#modalSesion').modal('close');
    $('#modalRegistro').modal('open');
  });

  $('#btnIniciarSesion').click(() => {
    $('#modalRegistro').modal('close');
    $('#modalSesion').modal('open');
  });
});
