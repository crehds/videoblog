class Post {
  async crearPost(uid, emailUser, titulo, descripcion, imagenLink, videoLink) {
    try {
      const addPost = await db.collection('posts').add({
        uid: uid,
        autor: emailUser,
        titulo: titulo,
        descripcion: descripcion,
        imagenLink: imagenLink,
        videoLink: videoLink,
        fecha: firebase.firestore.FieldValue.serverTimestamp(),
      });
      console.log(`Id del post => ${addPost.id}`);
      M.toast({ html: `Id del post => ${addPost.id}`, displaylengthL: 3000 });
    } catch (error) {
      console.error(`Error creando el post => ${error}`);
      M.toast({
        html: `Error creando el post => ${error.message}`,
        displaylengthL: 3000,
      });
    }
  }

  getAllPost() {
    db.collection('posts')
      .orderBy('fecha', 'asc')
      .orderBy('titulo', 'asc')
      .onSnapshot((querySnapshot) => {
        //querySnapshot es la copia de la data luego de suscribirse a la coleccion posts
        //se usa el termino suscribirse pues cualquier cambio que suceda se nos informará
        $('#posts').empty(); //limpiamos todo los posts(front-end)
        if (querySnapshot.empty) {
          $('#posts').append(this.obtenerTemplatePostVacio());
        } else {
          querySnapshot.forEach((post) => {
            console.log(typeof post.data());
            console.log(post.data());
            let postHtml = this.obtenerPostTemplate(
              post.data().autor,
              post.data().titulo,
              post.data().descripcion,
              post.data().videoLink,
              post.data().imagenLink,
              post.data(),
              Utilidad.obtenerFecha(post.data().fecha.toDate())
            );
            $('#posts').append(postHtml);
          });
        }
      });
  }

  getPostByUser(emailUser) {
    db.collection('posts')
      .orderBy('fecha', 'asc')
      .orderBy('titulo', 'asc')
      .where('autor', '==', emailUser)
      .onSnapshot((querySnapshot) => {
        $('#posts').empty();
        if (querySnapshot.empty) {
          $('#posts').append(this.obtenerTemplatePostVacio());
        } else {
          console.log(querySnapshot);
          querySnapshot.forEach((post) => {
            console.log(post.data());
            let postHtml = this.obtenerPostTemplate(
              post.data().autor,
              post.data().titulo,
              post.data().descripcion,
              post.data().videoLink,
              post.data().imagenLink,
              Utilidad.obtenerFecha(post.data().fecha.toDate())
            );
            $('#posts').append(postHtml);
          });
        }
      });
  }

  subirImagenPost(file, uid) {
    const refStorage = firebase.storage().ref().child(`imgsPosts/${uid}/${file.name}`);
    //se manda a realizar la tarea en segundo plano
    const task = refStorage.put(file);

    //on(string para indicar que se va a observar(el estado), función que se ejecuta mientras se sube el archivo trabjando sobre una copia(snapshot), función por si algún error sucede, función cuando el archivo se subió)
    task.on(
      'state_changed',
      (snapshot) => {
        const porcentaje =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        $('.determinate').attr('style', `width: ${porcentaje}%`);
      },
      (err) => {
        M.toast({
          html: `Error subiendo archivo = > ${err.message}`,
          displayLength: 4000,
        });
      },
      () => {
        task.snapshot.ref
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            sessionStorage.setItem('imgNewPost', url);
          })
          .catch((err) => {
            M.toast({
              html: `Error obteniendo downloadURL = > ${err}`,
              displayLength: 4000,
            });
          });
      }
    );
  }

  obtenerTemplatePostVacio() {
    return `<article class="post">
      <div class="post-titulo">
          <h5>Crea el primer Post a la comunidad</h5>
      </div>
      <div class="post-calificacion">
          <a class="post-estrellita-llena" href="*"></a>
          <a class="post-estrellita-llena" href="*"></a>
          <a class="post-estrellita-llena" href="*"></a>
          <a class="post-estrellita-llena" href="*"></a>
          <a class="post-estrellita-vacia" href="*"></a>
      </div>
      <div class="post-video">
          <iframe type="text/html" width="500" height="385" src='https://www.youtube.com/embed/bTSWzddyL7E?ecver=2'
              frameborder="0"></iframe>
          </figure>
      </div>
      <div class="post-videolink">
          Video
      </div>
      <div class="post-descripcion">
          <p>Crea el primer Post a la comunidad</p>
      </div>
      <div class="post-footer container">         
      </div>
  </article>`;
  }

  obtenerPostTemplate(
    autor,
    titulo,
    descripcion,
    videoLink,
    imagenLink,
    post,
    fecha
  ) {
    console.log(post);
    if (imagenLink) {
      return `<article class="post">
            <div class="post-titulo">
                <h5>${titulo}</h5>
            </div>
            <div class="post-calificacion">
                <a class="post-estrellita-llena" href="*"></a>
                <a class="post-estrellita-llena" href="*"></a>
                <a class="post-estrellita-llena" href="*"></a>
                <a class="post-estrellita-llena" href="*"></a>
                <a class="post-estrellita-vacia" href="*"></a>
            </div>
            <div class="post-video">                
                <img id="imgVideo" src='${imagenLink}' class="post-imagen-video" 
                    alt="Imagen Video">     
            </div>
            <div class="post-videolink">
                <a href="${videoLink}" target="blank">Ver Video</a>                            
            </div>
            <div class="post-descripcion">
                <p>${descripcion}</p>
            </div>
            <div class="post-footer container">
                <div class="row">
                    <div class="col m6">
                        Fecha: ${fecha}
                    </div>
                    <div class="col m6">
                        Autor: ${autor}
                    </div>        
                </div>
            </div>
        </article>`;
    }

    return `<article class="post">
                <div class="post-titulo">
                    <h5>${titulo}</h5>
                </div>
                <div class="post-calificacion">
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-vacia" href="*"></a>
                </div>
                <div class="post-video">
                    <iframe type="text/html" width="500" height="385" src='${videoLink}'
                        frameborder="0"></iframe>
                    </figure>
                </div>
                <div class="post-videolink">
                    Video
                </div>
                <div class="post-descripcion">
                    <p>${descripcion}</p>
                </div>
                <div class="post-footer container">
                    <div class="row">
                        <div class="col m6">
                            Fecha: ${fecha}
                        </div>
                        <div class="col m6">
                            Autor: ${autor}
                        </div>        
                    </div>
                </div>
            </article>`;
  }
}
