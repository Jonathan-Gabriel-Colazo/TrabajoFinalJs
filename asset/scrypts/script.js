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

    const productosEncontrados = Productos.filter((producto) => {
        return producto.nombre.toLowerCase().includes(buscaProducto.toLowerCase());
    });

    if (productosEncontrados.length > 0) {
        const productoExistente = VentActual.find((producto) => producto.nombre === productosEncontrados[0].nombre);
        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            productosEncontrados[0].cantidad = 1;
            VentActual.push(productosEncontrados[0]);
        }

    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se encontró ningún producto con ese nombre',
        })
    }
}

let muestraProducto = document.getElementById('muestraProducto');

function muestraProductosEncontrados() {
    let contenidoHTML = '';
    VentActual.forEach((productoSolo) => {
        contenidoHTML += `
            <tr>
                <td>${productoSolo.nombre}</td>
                <td>${productoSolo.cantidad}</td>
                <td>${productoSolo.precio}</td>
            </tr>
        `;
    });

    muestraProducto.innerHTML = `
        <table>
            <tr>
                <td>Producto</td>
                <td>cantidad</td>
                <td>Precio</td>
            </tr>
            ${contenidoHTML}
        </table>
    `;

}

let muestraTotal = document.getElementById("muestraTotal")

function MuestraTotal() {
    let acumulador = 0;

    VentActual.forEach((productoSolo) => {
        acumulador += productoSolo.precio * productoSolo.cantidad;

    });
    muestraTotal.innerHTML = `<h2>${acumulador}</h2>`;
    muestraTotal.style.width = "300px";
    muestraTotal.style.height = "100px";
    muestraTotal.style.fontSize = "50px";
    muestraTotal.style.border = "solid 5px #000";
    muestraTotal.style.backgroundColor = "#fff";
    muestraTotal.style.textAlign = "center";
    muestraTotal.style.borderRadius = "10px";
    muestraTotal.style.position = "fixed";
    muestraTotal.style.bottom = "20px";
    muestraTotal.style.right = "20px";

    console.log(acumulador);
}



document.getElementById('buscaButton').addEventListener('click', (event) => {
    event.preventDefault();
    console.log(VentActual);
    buscarProducto();
    muestraProductosEncontrados();
    MuestraTotal();
});


function exportarPDF() {
    let doc = new jsPDF();
    let contenidoTabla = document.getElementById('muestraProducto').innerHTML;
    let total = document.getElementById('muestraTotal').innerText;


    doc.text('Ventas Actuales', 10, 10);
    doc.fromHTML(contenidoTabla, 15, 15);
    doc.text('Total: ' + total, 10, doc.autoTablepreviousfinalY + 5,);

    let nombreArchivo = 'ventas.pdf'; 
    doc.save(nombreArchivo);
}

document.getElementById("imprimeTicket").addEventListener('click',exportarPDF)



function eliminarProducto() {
    let eliminaProducto = document.getElementById('eliminaProduct').value;

    let indice = Productos.findIndex((producto) => {
        return producto.nombre.toLowerCase() === eliminaProducto.toLowerCase();
    });

    if (indice !== -1) {
        Productos.splice(indice, 1);
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: true
        })

        swalWithBootstrapButtons.fire({
            title: `Estas Seguro ?`,
            text: `deseas eliminar el producto ${eliminaProducto}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'SI, eliminar!',
            cancelButtonText: 'No, cancelar!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                    'Eliminado!',
                    `El producto ${eliminaProducto} fue eliminado`,
                    'success'
                )
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelado',
                    `el producto ${eliminaProducto} no fue eliminad`,
                    'error'
                )
            }
        })
        let buscaProducto = document.getElementById('buscaProducto').value;
        buscarProducto(buscaProducto);
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se encontró ningún producto con ese nombre',
        })
    }
}


document.getElementById('eliminaButton').addEventListener('click', eliminarProducto);
document.getElementById('deleteProducto').addEventListener('click', () => {
    formEliminaP.style.display = "flex";
});

let formEliminaP = document.getElementById('formEliminaP');
document.getElementById('ocultarEliminaP').addEventListener('click', () => {
    formEliminaP.style.display = "none";
});

