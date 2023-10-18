import { useLoaderData } from "@remix-run/react";
import { getGuitarras } from "~/models/guitarras.server";
import { getPost } from "~/models/posts.server";
import { getCurso } from "~/models/curso.server";
import ListadoGuitarras from "../components/listado-guitarras";
import ListadoBlog from "../components/listado-blog";
import Curso from "../components/curso";
import stylesGuitarras from "~/styles/guitarras.css";
import stylesBlog from "~/styles/blog.css";
import stylesCurso from "~/styles/curso.css";

export function meta() {}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: stylesGuitarras,
    },
    {
      rel: "stylesheet",
      href: stylesBlog,
    },
    {
      rel: "stylesheet",
      href: stylesCurso,
    },
  ];
}

export async function loader() {
  // promises en paralelo
  const [guitarras, posts, curso] = await Promise.all([getGuitarras(), getPost(), getCurso()]);
  // const guitarras = await getGuitarras(); se finaliza este
  // const posts = await getPost(); y se empieza con este
  return {
    guitarras: guitarras.data,
    posts: posts.data,
    curso: curso.data
  };
}

function Index() {
  const { guitarras, posts, curso } = useLoaderData();

  return (
    <>
      <main className="contenedor">
        <ListadoGuitarras guitarras={guitarras} />
      </main>
      <Curso
      curso={curso.attributes}
      />
      <section className="contenedor">
        <ListadoBlog posts={posts} />
      </section>
    </>
  );
}

export default Index;
