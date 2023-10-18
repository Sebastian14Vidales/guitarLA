import { useState, useEffect } from "react";
import {
  Meta,
  Links,
  Outlet,
  Scripts,
  LiveReload,
  useRouteError,
  isRouteErrorResponse,
  Link,
} from "@remix-run/react";
import styles from "~/styles/index.css";
import Header from "~/components/header";
import Footer from "~/components/footer";

export function meta() {
  return [
    { title: "GuitarLA - Remix" },
    { charset: "utf-8" },
    { viewport: "width=device-width,initial-scale=1" },
  ];
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: "https://necolas.github.io/normalize.css/8.0.1/normalize.css",
    },
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "true",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap",
    },
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
}

export default function App() {
  
  const [carrito, setCarrito] = useState([]);

useEffect(() => {
    if (carrito?.length === 0) return;
    localStorage.setItem('carrito', JSON.stringify(carrito));
}, [carrito]);
 
// useEffect para cargar el state con info del LS
useEffect(() => {
    const carritoLS = typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("carrito")) ?? []
      : [];
    setCarrito(carritoLS);
}, []);

  const agregarCarrito = guitarra => {
    if(carrito.some(guitarraState => guitarraState.id === guitarra.id)) {
      // Sobreescribir el valor de la cantidad
      const carritoActualizado = carrito.map(guitarraState => {
        if(guitarraState.id === guitarra.id) {
          guitarraState.cantidad = guitarra.cantidad
        }
        return guitarraState
      })

      setCarrito(carritoActualizado);
    } else {
      // Agregar nuevo producto
      setCarrito([...carrito, guitarra]);
    }
  }

  const actualizarCantidad = guitarra => {
    const carritoActualizado = carrito.map(guitarraState => {
      if(guitarraState.id === guitarra.id) {
        guitarraState.cantidad = guitarra.cantidad
      }
      return guitarraState
    })
    setCarrito(carritoActualizado)
  }

    const totalCuenta = carrito.reduce((total, producto) => {
      return total + (producto.cantidad * producto.precio);
    }, 0);
 
  const eliminarGuitarra = id => {
    const eliminarProducto = carrito.filter(guitarraState => (guitarraState.id !== id));
    eliminarProducto.length === 0 && localStorage.setItem('carrito', '[]');
    setCarrito(eliminarProducto)
  }

  return (
    <Document>
      <Outlet
        context={{
          agregarCarrito,
          carrito,
          actualizarCantidad,
          totalCuenta,
          eliminarGuitarra
        }}
      />
    </Document>
  );
}

function Document({ children }) {
  return (
    <html lang="es">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

// MANEJO DE ERRORES
export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Document>
        <p className="error">
          {error.status} {error.statusText}
        </p>
        <div className="enlace-container">
          <Link className="error-enlace" to="/">
            Vuelve al Inicio
          </Link>
        </div>
      </Document>
    );
  }
}
