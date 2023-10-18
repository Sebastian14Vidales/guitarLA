import { useLoaderData, useOutletContext } from "@remix-run/react";
import { getGuitarrasId } from "~/models/guitarras.server";
import { formatearPrecio } from "~/utils/helpers";
import { useState } from "react";

export async function loader({ params }) {
  const { url } = params;
  const guitarra = await getGuitarrasId(url);

  if (guitarra.data.length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "Guitarra no encontrada",
      data: {},
    });
  }

  return guitarra;
}

export function meta({ data }) {
  if (!data || !data.data || Object.keys(data).length === 0) {
    return [
      { title: "Guitarra no encontrada" },
      { description: "Venta de la guitarra no encontrada" },
    ];
  }

  return [
    { title: `GuitarLA - ${data.nombre}` },
    { description: `Venta de la guitarra ${data.nombre}` },
  ];
}

function Guitarras() {
  const {agregarCarrito} = useOutletContext();

  const guitarra = useLoaderData();
  const [cantidad, setCantidad] = useState(0);
  const { nombre, descripcion, precio, imagen } = guitarra.data[0].attributes;

  const handleSubmit = e => {
    e.preventDefault();

    if(cantidad < 1) {
      alert('Debe seleccionar una cantidad');
      return;
    }

    const guitarraSeleccionada = {
      id: guitarra.data[0].id,
      imagen: imagen.data.attributes.url,
      nombre,
      precio,
      cantidad,
      descripcion
    }
    // console.log(guitarraSeleccionada);
    agregarCarrito(guitarraSeleccionada);
  }

  return (
    <div className="guitarra">
      <img
        className="imagen"
        src={imagen.data.attributes.url}
        alt={`Imagen ${nombre}`}
      />

      <div className="contenido">
        <h3>{nombre}</h3>
        <p className="texto">{descripcion}</p>
        <p className="precio">{formatearPrecio(precio)}</p>

        <form onSubmit={handleSubmit} className="formulario">
          <label htmlFor="cantidad">Cantidad</label>

          <select  
          onChange={ e => setCantidad(+e.target.value)}
          id="cantidad">
            <option value="0">-- Seleccione --</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <input type="submit" value="Agregar al Carrito" />
        </form>
      </div>
    </div>
  );
}

export default Guitarras;
