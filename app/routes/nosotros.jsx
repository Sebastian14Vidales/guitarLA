import imagen from "../../public/img/nosotros.jpg";
import styles from "~/styles/nosotros.css";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
    {
      rel: "preload",
      href: imagen,
      as: "image",
    },
  ];
}

export function meta() {
  return [
    { title: "GuitarLA - Nosotros" },
    { charset: "utf-8" },
    { viewport: "width=device-width,initial-scale=1" },
  ];
}

function Nosotros() {
  return (
    <main className="contenedor nosotros">
      <h2 className="heading">Nosotros</h2>
      <div className="contenido">
        <img src={imagen} alt="Imagen sobre nosotros" />

        <div>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa
            voluptate pariatur esse voluptatibus consectetur, reiciendis culpa
            delectus asperiores ipsam iure illum nesciunt sed adipisci suscipit
            dolorum doloremque deleniti similique aliquid ut quae iste quam
            tenetur assumenda?{" "}
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa
            voluptate pariatur esse voluptatibus consectetur, reiciendis culpa
            delectus asperiores ipsam iure illum nesciunt sed adipisci suscipit
            dolorum doloremque deleniti similique aliquid ut quae iste quam
            tenetur assumenda?{" "}
          </p>
        </div>
      </div>
    </main>
  );
}

export default Nosotros;
