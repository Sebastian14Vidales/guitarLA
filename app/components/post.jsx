import {formatearFecha} from '~/utils/helpers'
import {Link} from '@remix-run/react'

function post({ post }) {
  const { titulo, contenido, imagen, url, publishedAt } = post;
  return (
    <article className='articulo'>
      <img
        src={imagen.data.attributes.formats.small.url}
        alt={`Imagen Blog ${titulo}`}
      />
      <div className="contenido">
        <h3>{titulo}</h3>
        <p className="fecha">Publicado: {formatearFecha('es-CO', publishedAt)}</p>
        <p className="resumen">{contenido}</p>
        <Link className='leer-post' to={`/blog/${url}`}>Leer Post</Link>
      </div>
    </article>
  );
}

export default post;
