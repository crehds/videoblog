class Comment {
  async addComment(uid, emailUser, content) {
    try {
      const addComment = await db.collection('comments').add({
        uid,
        emailUser,
        content,
      });
      M.toast({
        html: `Id del comment: ${addComment.id}`,
        displayLength: 4000,
      });
    } catch (error) {
      console.error(error);
      console.error(error.message);
      M.toast({
        html: `Error al crear el comentario => ${error.message}`,
        displayLength: 4000,
      });
    }
  }
}
