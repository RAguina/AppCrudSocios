//Despues de muchas horas intentando hacerlo andar quedo a mejorar. Pero las funciones basicas andan.

window.onload = inicio;

var btnAgregarSocio = document.getElementById('btnAgregar');
var btnListar = document.getElementById('btnListar');
var btnCuotaPagada = document.getElementById('btnCuotaPagada');
var btnInputBuscarSocio = document.getElementById('inputBuscarSocio');
var btnBuscar = document.getElementById('btnBuscar');
var btnBorrar = document.getElementById('btnBorrar');
var btnModificar = document.getElementById('btnModificar');

var socio={};
var socios = [];
var index= -1;

socios = JSON.parse(localStorage.getItem('LSsocios'));

function inicio(){
    btnAgregarSocio.addEventListener('click',agregarSocio);
    btnListar.addEventListener('click',listar);
    btnBuscar.addEventListener('click',buscarSocio);
    btnCuotaPagada.addEventListener('click',pagarCuota);
    btnBorrar.addEventListener('click',borrarSocio);
    btnModificar.addEventListener('click',modificarSocio);
    cargarDatos();
}


function agregarSocio() {
    socio = {};
    var txtNombre = document.getElementById("inputNombreSocio");
    socio.nombre = txtNombre.value;
    txtNombre.value = "";

    var txtApellido = document.getElementById("inputApellidoSocio");
    socio.apellido = txtApellido.value;
    txtApellido.value = "";
    
    var txtDireccion = document.getElementById("inputDireccionSocio");
    socio.direccion = txtDireccion.value;
    txtDireccion.value = "";
    
    var txtCategoria = document.getElementById("inputCategoriaSocio");
    socio.categoria = txtCategoria.value;
    txtCategoria.value = "";
    
    
    
    socio.cuotaPagada = false;


    socios.push(socio);
    localStorage.setItem('LSsocios', JSON.stringify(socios));
    listar();
    
}

function listar(event){
    event.preventDefault();
    cargarDatos();
    var lista = document.getElementById("tabla"); //Carga el objeto div con id "lista" en la variable lista
	lista.innerHTML = ""; // Limpiamos la lista antes de actualizarla

    if (socios.length === 0) {
        lista.innerHTML = "<p>No hay socios registrados.</p>";
        return;
    }
	lista.innerHTML += `
	        <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Categoría</th>
                <th>Cuota Pagada</th>
            </tr>   
	`;

    socios.forEach(socio => {
        lista.innerHTML += `
        <tr>
            <th>${socio.nombre} </th>
            <th>${socio.apellido}</th>
            <th>${socio.categoria}</th>
            <th>${socio.cuotaPagada ? 'Sí' : 'No'}</th>
        </tr>
        `;
    });
}

function buscarSocio(event){
    event.preventDefault();
   var socioBuscado = socios.find((socio)=>{
    if (socio.apellido === btnInputBuscarSocio.value){
        return 1
    }
    });
    index = socios.findIndex(function(socio) {
    return socio.apellido === btnInputBuscarSocio.value;
    });
    if (socioBuscado === null) {
        alert("El socio no se encuentra");
      } else {
        var txtNombre = document.getElementById("inputNombreSocio");
        var txtApellido = document.getElementById("inputApellidoSocio");
        var txtDireccion = document.getElementById("inputDireccionSocio");
        var txtCategoria = document.getElementById("inputCategoriaSocio");
        txtNombre.value = socioBuscado.nombre;
        txtApellido.value = socioBuscado.apellido;
        txtDireccion.value = socioBuscado.direccion;
        txtCategoria.value = socioBuscado.categoria;
      }
}

function borrarSocio() {
    if (index >= 0 && index < socios.length) {
        socios.splice(index, 1);
        localStorage.setItem('LSsocios', JSON.stringify(socios));
        listar();
    } else {
        console.log('No se ha seleccionado un socio para borrar');
    }
}

function modificarSocio(){

    if (index >= 0 && index < socios.length) {
        var txtNombre = document.getElementById("inputNombreSocio");
        console.log('Nombre ingresado:', txtNombre.value);
        socios[index].nombre = txtNombre.value;
        txtNombre.value = "";

        var txtApellido = document.getElementById("inputApellidoSocio");
        socios[index].apellido = txtApellido.value;
        txtApellido.value = "";
        
        var txtDireccion = document.getElementById("inputDireccionSocio");
        socios[index].direccion = txtDireccion.value;
        txtDireccion.value = "";
        
        var txtCategoria = document.getElementById("inputCategoriaSocio");
        socios[index].categoria = txtCategoria.value;
        txtCategoria.value = "";
        
        localStorage.setItem('LSsocios', JSON.stringify(socios));
        listar();
    } else {
        console.log('No se ha seleccionado un socio para modificar los datos');
    }
}


function cargarDatos() {
    if (localStorage.getItem('LSsocios')) {
        socios = JSON.parse(localStorage.getItem('LSsocios'));
    }
}

function pagarCuota(){
    if (index >= 0 && index < socios.length) {
        socios[index].cuotaPagada = true;
        localStorage.setItem('LSsocios', JSON.stringify(socios));
        listar();
    } else {
        console.log('No se ha seleccionado un socio para pagar la cuota');
    }
}
