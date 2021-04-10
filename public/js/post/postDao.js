class PostDAO {
  add(post, id) {
    db.collection('posts').doc(id).set({
      titulo: post.titulo,
      descripcion: post.descripcion,
      autor: post.autor,
      fecha: firebase.firestore.FieldValue.serverTimestamp(),
    });

    console.log('Se crea post');
  }
}
