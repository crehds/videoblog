$(() => {
  const comment = new Comment();
  $('#btnSendComment').click(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      const content = $('#comentariosContacto').val();
      if (content === '') {
        return M.toast({
          html: `El comentario no tiene contenido`,
          displayLength: 4000,
        });
      }

      comment.addComment(user.uid, user.email, content);
    } else {
      M.toast({
        html: 'Debes estar autenticado para poder enviar un comentario',
        displayLength: 4000,
      });
    }
  });
});
