export async function getGuitarras(){
    const respuesta = await fetch(`${process.env.API_URL}/guitarras?populate=imagen`);
    const datos = await respuesta.json();

    return datos;
}

export async function getGuitarrasId(url){
    const respuesta = await fetch(`${process.env.API_URL}/guitarras?filters[url]=${url}&populate=imagen`);
    const datos = await respuesta.json();
    return datos;
}
