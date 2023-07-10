let User = [];

fetch('../user.json')
    .then(response => response.json())
    .then(data => {
        User = data.Usuarios;
        console.log(User);
    })
    .catch(error => {
        console.error('Error:', error);
    });


document.getElementById('nUser').addEventListener('click', () => {
    formNewUser.style.display = "flex";
});

document.getElementById('RevalidaDatos').addEventListener('click', () => {
    recuperaUsuario.style.display = "flex";
});

let plataforma = document.getElementById('plataforma')
let login = document.getElementById('Login')


function ingresoUsuario() {
    let ingAlias = document.getElementById("ingAlias").value;
    let ingPass = document.getElementById("ingPass").value;

    let acceso = false;

    User.forEach((users) => {
        if (users.alias === ingAlias && users.pass === ingPass) {
            acceso = true;
        }
    });
if (acceso) {
    plataforma.style.display = "flex" 
    login.style.display = "none"
    
} else {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Los datos no coinciden!',
    })
}
}

document.getElementById("buttonLogin").addEventListener("click", () => {
    ingresoUsuario();
})


const buttonNewUser = document.querySelector('#buttonNewUser');
const formulario = document.querySelector('#formNewUser');




const getDatos = () => {
    const datos = new FormData(formulario);
    const datosProcesados = Object.fromEntries(datos.entries());
    formulario.reset();
    console.log(datosProcesados)
    return datosProcesados;

}

const postDatos = async () => {


    const newUser = getDatos();

    try {
        const response = await fetch('http://localhost:3000/Usuarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        });
        if (response.ok) {

            Swal.fire({
                position: 'top-end',
                icon: 'PERFECTO',
                title: 'Tu Usuario se creo exitosamente ',
                showConfirmButton: false,
                timer: 1500
            })

        }

    } catch (error) {
        console.log(error);


    }

}

buttonNewUser.addEventListener('click', (event) => {
    event.preventDefault();
    postDatos();

})


function RecuperUsuario() {
    let recuAlias = document.getElementById("recuAlias").value;
    let recuEmail = document.getElementById("recuEmail").value;

    let acces = false;
    let indice = 0

    User.forEach((usuario, i) => {
        if (usuario.alias === recuAlias && usuario.email === recuEmail) {
            indice = i
            acces = true;
        }
    });

    if (acces == true) {
        Swal.fire(`Tu clave es${User[indice].pass}`);
        recuperaUsuario.style.display = "none";
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Los datos no coinciden!',

        });
        recuperaUsuario.style.display = "none";
    }

}

document.getElementById("buttonRus").addEventListener("click", () =>
    RecuperUsuario(),
    recuperaUsuario.style.display = "none",
)
