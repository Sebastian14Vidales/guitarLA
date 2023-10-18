export async function getPost(){
    const respuesta = await fetch(`${process.env.API_URL}/posts?populate=imagen`);
    const datos = await respuesta.json();
    return datos;
}

export async function getPostId(url){
    const respuesta = await fetch(`${process.env.API_URL}/posts?filters[url]=${url}&populate=imagen`);
    const datos = await respuesta.json();
    return datos;
}