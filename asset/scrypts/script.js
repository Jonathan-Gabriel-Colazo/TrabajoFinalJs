
let Productos = [];

fetch('../user.json')
    .then(response => response.json())
    .then(data => {
        Productos = data.productos;
        console.log(Productos);
    })
    .catch(error => {
        console.error('Error:', error);
    });


document.getElementById('agregarProducto').addEventListener('click', () => {
    formAgregaP.style.display = "flex";
});



let formAgregaP = document.getElementById('formAgregaP');
document.getElementById('ocultarAgregaP').addEventListener('click', () => {
    formAgregaP.style.display = "none";
});




const agregarButon = document.querySelector('#agregarButon');
const formularioProducto = document.querySelector('#formAgregaP');

agregarButon.addEventListener('click', async (event) => {
    event.preventDefault();
    await postData();
})

const getData = () => {
    const datos = new FormData(formularioProducto);
    const datosProcesados = Object.fromEntries(datos.entries());
    formularioProducto.reset();
    console.log(datosProcesados)
    return datosProcesados;
}

const postData = async () => {
    const newProduct = getData();
    console.log(newProduct)
    try {
        const response = await fetch('http://localhost:3000/productos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProduct)
        });
        if (response.ok) {

            Swal.fire({
                position: 'top-end',
                icon: 'PERFECTO',
                title: 'Tu Producto se creo exitosamente ',
                showConfirmButton: false,
                timer: 5000
            })
        }
    } catch (error) {
        console.log(error);
    }
}



const VentActual = [];

function buscarProducto() {
    let buscaProducto = document.getElementById('buscaProducto').value;

    let productosEncontrados = Productos.filter((producto) => {
        return producto.nombre.toLowerCase().includes(buscaProducto.toLowerCase());
    });

    if (VentActual.some(producto => producto.id === buscaProducto )) {
        
    } else if (productosEncontrados.length > 0) {
        productosEncontrados.cantidad = 1;
        VentActual.push(...productosEncontrados); 
    } else {
        console.log('No se encontró ningún producto con ese nombre');
    }


}

let muestraProducto = document.getElementById("muestraProducto")
function muestraProductosEncontrados() {

    VentActual.forEach((productoSolo) => {
        muestraProducto.innerHTML = `
            <table>
                <tr>
                    <td>Producto</td>
                    <td>cantidad</td>
                    <td>Precio</td>
                </tr>
                <tr>
                    <td>${productoSolo.nombre}</td>
                    <td>01</td>
                    <td>${productoSolo.precio}</td>
                </tr>
            </table>
    `
    muestraProducto.append()

    });


}


document.getElementById('buscaButton').addEventListener('click', (event) => {
    event.preventDefault();
    console.log(VentActual)
    buscarProducto();
    muestraProductosEncontrados();
});




/*
function eliminarProducto() {
    let eliminaProducto = document.getElementById('eliminaProduct').value;

    let indice = listaProductos.findIndex((producto) => {
        return producto.nombre.toLowerCase() === eliminaProducto.toLowerCase();
    });

    if (indice !== -1) {
        listaProductos.splice(indice, 1);
        alert('Eliminaste el producto: ' + eliminaProducto);

        let buscaProducto = document.getElementById('buscaProducto').value;
        buscarProducto(buscaProducto);
    } else {
        console.log('No se encontró el producto');
        alert('No se encontró el producto');
    }
}


document.getElementById('eliminaButton').addEventListener('click', eliminarProducto);

let eliminaProducto = document.getElementById('eliminaProducto');
document.getElementById('ocultarEliminaP').addEventListener('click', () => {
    eliminaProducto.style.display = "none";
});*/