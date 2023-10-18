import { useOutletContext } from "@remix-run/react";
import styles from "../styles/carrito.css";
import { formatearPrecio } from "~/utils/helpers";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
}

export function meta() {
  return [
    { title: "GuitarLA - Carrito" },
    { description: "Venta de guitarras" },
  ];
}

function Carrito() {
  const { carrito, actualizarCantidad, totalCuenta, eliminarGuitarra } = useOutletContext();

  return (
    <main className="contenedor">
      <h1 className="heading">Carrito de compras</h1>

      <div className="contenido">
        <div className="carrito">
          <h2>Articulos</h2>
          {carrito?.length === 0
            ? "Agregue artículos"
            : carrito?.map((producto) => (
                <div key={producto.id} className="producto">
                  <div>
                    <img
                      src={producto.imagen}
                      alt={`Producto ${producto.nombre}`}
                    />
                  </div>
                  <div className="carrito-informacion">
                    <p className="nombre">{producto.nombre}</p>
                    <p className="descripcion">{producto.descripcion}</p>
                    <p className="precio">
                      Precio: <span>{formatearPrecio(producto.precio)}</span>
                    </p>
                    <p className="subtotal">
                      Subtotal:{" "}
                      <span>
                        {formatearPrecio(producto.precio * producto.cantidad)}
                      </span>
                    </p>
                    <div className="cantidad">
                      <p>Cantidad:</p>
                      <select
                        value={producto.cantidad}
                        onChange={(e) =>
                          actualizarCantidad({
                            cantidad: +e.target.value,
                            id: producto.id,
                          })
                        }
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                  </div>
                  <div className="conte-boton">
                    <button onClick={() => eliminarGuitarra(producto.id)} type="button" className="boton-eliminar">
                      X
                    </button>
                  </div>
                </div>
              ))}
        </div>
        <aside className="resumen">
          <h3>Resumen del Pedido</h3>
          <p>Total a pagar: {formatearPrecio(totalCuenta)} </p>
        </aside>
      </div>
    </main>
  );
}

export default Carrito;
