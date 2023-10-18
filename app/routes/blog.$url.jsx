import { useLoaderData } from "@remix-run/react";
import { formatearFecha } from "~/utils/helpers";
import { getPostId } from "~/models/posts.server";

export function meta() {
    return [
        {title: 'GuitarLA - Nuestro Blog'},
        {description: 'GuitarLA - Blog de música y ventas'}
    ]
}

export async function loader({ params }) {
  const { url } = params;
  const post = await getPostId(url);

  if (post.data.length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "Entrada no encontrado",
      data: {},
    });
  }

  return post;
}

function Post() {
  const post = useLoaderData();
  const { titulo, contenido, imagen, publishedAt } = post?.data[0]?.attributes;
  return (
    <article className="post">
      <div className="contenedor-imagen">
        <img
          src={imagen?.data?.attributes?.url}
          alt={`Imagen Blog ${titulo}`}
        />
      </div>
      <div className="contenido">
        <h3>{titulo}</h3>
        <p className="fecha">
          Publicado: {formatearFecha("es-CO", publishedAt)}
        </p>
        <p className="texto">{contenido}</p>
      </div>
    </article>
  );
}

export default Post;
