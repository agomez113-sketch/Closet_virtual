
// ==========================================
// PRENDAS INICIALES
// ==========================================

const prendasIniciales = [
    {
        id: 1,
        nombre: "Camisa blanca",
        categoria: "superior",
        color: "Blanco",
        estilo: "casual",
        imagen: "camisa-blanca.jpg"
    },
    {
        id: 2,
        nombre: "Jeans azul",
        categoria: "inferior",
        color: "Azul",
        estilo: "casual",
        imagen: "jeans-azul.jpg"
    },
    {
        id: 3,
        nombre: "Tenis blancos",
        categoria: "zapatos",
        color: "Blanco",
        estilo: "casual",
        imagen: "tenis-blancos.jpg"
    },
    {
    id: 4,
    nombre: "Tenis rojos",
    categoria: "zapatos",
    color: "Rojo",
    estilo: "casual",
    imagen: "tenis-rojos.jpg"
},
{
    id: 5,
    nombre: "Falda amarilla",
    categoria: "inferior",
    color: "Amarillo",
    estilo: "casual",
    imagen: "falda-amarilla.jpg"
},
{
    id: 6,
    nombre: "Botas negras",
    categoria: "zapatos",
    color: "Negro",
    estilo: "casual",
    imagen: "botas-negras.jpg"
},
{
    id: 7,
    nombre: "Sudadera gris",
    categoria: "superior",
    color: "Gris",
    estilo: "casual",
    imagen: "sudadera-gris.jpg"
},
{
    id: 8,
    nombre: "Bolsa negra",
    categoria: "accesorio",
    color: "Negro",
    estilo: "formal",
    imagen: "bolsa-negra.jpg"
},
{
    id: 9,
    nombre: "Blusa verde",
    categoria: "superior",
    color: "Verde",
    estilo: "formal",
    imagen: "blusa-verde.jpg"
}, 
{
    id: 10,
    nombre: "Gorra azul",
    categoria: "accesorio",
    color: "Azul",
    estilo: "casual",
    imagen: "gorra-azul.jpg"
},
{
    id: 11,
    nombre: "Chamarra negra",
    categoria: "superior",
    color: "Negro",
    estilo: "casual",
    imagen: "chamarra-negra.jpg"
},
{
    id: 12,
    nombre: "Pantalón negro",
    categoria: "inferior",
    color: "Negro",
    estilo: "Formal",
    imagen: "pantalon-negro.jpg"
}
];



// ==========================================
// CARGAR PRENDAS
// ==========================================

let prendasGuardadas = JSON.parse(
    localStorage.getItem("prendasCloset")
);

let prendas = prendasGuardadas && prendasGuardadas.length
    ? prendasGuardadas
    : [...prendasIniciales];


// ==========================================
// ELEMENTOS
// ==========================================

const contenedorPrendas = document.getElementById("contenedorPrendas");
const mensajeVacio = document.getElementById("mensajeVacio");
const contadorPrendas = document.getElementById("contadorPrendas");
const buscador = document.getElementById("buscarPrenda");
const filtroCategoria = document.getElementById("filtroCategoria");
const formPrenda = document.getElementById("formPrenda");


// ==========================================
// GUARDAR
// ==========================================

function guardarPrendas() {
    localStorage.setItem(
        "prendasCloset",
        JSON.stringify(prendas)
    );
}


// ==========================================
// MOSTRAR PRENDAS
// ==========================================

function mostrarPrendas() {

    contenedorPrendas.innerHTML = "";

    const textoBusqueda = buscador.value.toLowerCase();
    const categoriaSeleccionada = filtroCategoria.value;

    const prendasFiltradas = prendas.filter(prenda => {

        const coincideNombre =
            prenda.nombre.toLowerCase().includes(textoBusqueda);

        const coincideCategoria =
            categoriaSeleccionada === "todas" ||
            prenda.categoria === categoriaSeleccionada;

        return coincideNombre && coincideCategoria;
    });


    contadorPrendas.textContent =
        prendasFiltradas.length +
        (prendasFiltradas.length === 1
            ? " prenda"
            : " prendas");


    if (prendasFiltradas.length === 0) {

        mensajeVacio.style.display = "block";
        return;
    }

    mensajeVacio.style.display = "none";


    prendasFiltradas.forEach(prenda => {

        const tarjeta = document.createElement("div");

        tarjeta.className = "col-md-6 col-lg-4";


        let imagenHTML = "";

        if (prenda.imagen) {

            imagenHTML = `
                <img
                    src="${prenda.imagen}"
                    alt="${prenda.nombre}"
                    class="clothing-image"
                >
            `;

        } else {

            imagenHTML = `
                <div class="clothing-placeholder">
                    ${obtenerNombreCategoria(prenda.categoria)}
                </div>
            `;
        }


        tarjeta.innerHTML = `

            <div class="clothing-card">

                ${imagenHTML}

                <div class="clothing-info">

                    <p class="clothing-category">
                        ${obtenerNombreCategoria(prenda.categoria)}
                    </p>

                    <h3>${prenda.nombre}</h3>

                    <p class="clothing-details">
                        Color: ${prenda.color}
                    </p>

                    <p class="clothing-details">
                        Estilo: ${prenda.estilo}
                    </p>

                </div>

            </div>

        `;

        contenedorPrendas.appendChild(tarjeta);
    });
}


// ==========================================
// CATEGORÍAS
// ==========================================

function obtenerNombreCategoria(categoria) {

    if (categoria === "superior") {
        return "Parte superior";
    }

    if (categoria === "inferior") {
        return "Parte inferior";
    }

    if (categoria === "zapatos") {
        return "Zapatos";
    }

    if (categoria === "accesorios") {
        return "Accesorios";
    }

    return "Prenda";
}


// ==========================================
// AGREGAR PRENDA
// ==========================================

formPrenda.addEventListener("submit", function(event) {

    event.preventDefault();


    const nombre = document.getElementById("nombrePrenda").value;
    const categoria = document.getElementById("categoriaPrenda").value;
    const color = document.getElementById("colorPrenda").value;
    const estilo = document.getElementById("estiloPrenda").value;


    const nuevaPrenda = {

        id: Date.now(),

        nombre: nombre,

        categoria: categoria,

        color: color,

        estilo: estilo,

        imagen: ""
    };


    prendas.push(nuevaPrenda);

    guardarPrendas();

    mostrarPrendas();

    formPrenda.reset();


    const modal = bootstrap.Modal.getInstance(
        document.getElementById("modalPrenda")
    );

    if (modal) {
        modal.hide();
    }

});


// ==========================================
// BUSCAR Y FILTRAR
// ==========================================

buscador.addEventListener("input", mostrarPrendas);

filtroCategoria.addEventListener("change", mostrarPrendas);


// ==========================================
// INICIAR
// ==========================================

mostrarPrendas();
