export function formatearPrecio(precio) {
    const formatterPeso = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    })

    return formatterPeso.format(precio)
}

export function formatearFecha(region, valor) {
    const fechaActual = new Date();
    valor = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }
    return fechaActual.toLocaleDateString(region, valor);
}