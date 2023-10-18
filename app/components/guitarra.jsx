import { Link } from "@remix-run/react";
import {formatearPrecio} from '~/utils/helpers'

function guitarra({guitarra}) {
    
  const {nombre, precio, imagen, descripcion, url} = guitarra

  return (
    <div className='guitarra'>
        <img src={imagen.data.attributes.formats.medium.url} alt={`Imagen ${nombre}`} />
      <div className='contenido'>
        <h3>{nombre}</h3>
        <p className='descripcion'>{descripcion}</p>
        <p className='precio'>{formatearPrecio(precio)}</p>

        <Link className="enlace" to={`/guitarras/${url}`}>Ver Producto</Link>
      </div>
    </div>
  )
}

export default guitarra