$(() => {
  $('#btnModalPost').click(() => {
    $('#tituloNewPost').val('');
    $('#descripcionNewPost').val('');
    $('#linkVideoNewPost').val('');
    $('#btnUploadFile').val('');
    $('.determinate').attr('style', `width: 0%`);
    sessionStorage.setItem('imgNewPost', null);

    const user = firebase.auth().currentUser;

    //verificando que el usuario este autenticado
    if (user == null) {
      M.toast({
        html: `Para crear el post debes estar autenticado`,
        displayLength: 4000,
      });
      return;
    }

    $('#modalPost').modal('open');
  });

  $('#btnRegistroPost').click(() => {
    const post = new Post();
    //Validando que el usuario este autenticado
    //por seguridad pues se podria poner un tiempo limite para que las credenciales se borren
    // y se tenga que autenticar otra vez
    const user = firebase.auth().currentUser;

    if (user == null) {
      M.toast({
        html: `Para crear el post debes estar autenticado`,
        display: 4000,
      });
      return;
    }

    const titulo = $('#tituloNewPost').val();
    const descripcion = $('#descripcionNewPost').val();
    const videoLink = $('#linkVideoNewPost').val();
    const imagenLink =
      sessionStorage.getItem('imgNewPost') == 'null'
        ? null
        : sessionStorage.getItem('imgNewPost');

    post
      .crearPost(
        user.uid,
        user.email,
        titulo,
        descripcion,
        imagenLink,
        videoLink
      )
      .then((resp) => {
        M.toast({ html: `Post creado correctamente`, displayLength: 4000 });
        $('.modal').modal('close');
      })
      .catch((err) => {
        M.toast({ html: `Error => ${err}`, displayLength: 4000 });
      });
  });

  $('#btnUploadFile').on('change', (e) => {
    const file = e.target.files[0];
    const user = firebase.auth().currentUser;
    const post = new Post();
    post.subirImagenPost(file, user.uid);
  });
});
