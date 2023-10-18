import { useLoaderData } from "@remix-run/react";
import { getPost } from "~/models/posts.server";
import ListadoBlog from "../components/listado-blog";

export function meta() {
    return [
        {title: 'GuitarLA - Nuestro Blog'},
        {description: 'GuitarLA - Blog de música y ventas'}
    ]
}

export async function loader() {
  const post = await getPost();
  return post.data;
}

function Blog() {
  const posts = useLoaderData();

  return (
      <ListadoBlog 
      posts={posts}/>
  );
}

export default Blog;
