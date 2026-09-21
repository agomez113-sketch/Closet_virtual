// ==========================================
// CREAR ATUENDOS
// ==========================================


// ==========================================
// CARGAR PRENDAS DEL CLÓSET
// ==========================================
console.log("ATUENDOS.JS ESTÁ FUNCIONANDO");
let prendas =
    JSON.parse(
        localStorage.getItem("prendasCloset")
    ) || [];


// ==========================================
// ELEMENTOS
// ==========================================

const ocasion =
    document.getElementById("ocasion");

const estilo =
    document.getElementById("estilo");

const color =
    document.getElementById("color");

const botonCrear =
    document.getElementById("crearAtuendo");

const contenedor =
    document.getElementById("prendasAtuendo");

const mensaje =
    document.getElementById("mensajeAtuendo");


// ==========================================
// CARGAR COLORES
// ==========================================

function cargarColores() {

    const colores = [
        ...new Set(
            prendas.map(
                prenda => prenda.color
            )
        )
    ];


    colores.forEach(nombreColor => {

        const opcion =
            document.createElement("option");

        opcion.value =
            nombreColor.toLowerCase();

        opcion.textContent =
            nombreColor;

        color.appendChild(opcion);

    });

}


// ==========================================
// CREAR ATUENDO
// ==========================================

function crearAtuendo() {

    const filtroOcasión =
        ocasion.value;

    const filtroEstilo =
        estilo.value;

    const filtroColor =
        color.value;


    let disponibles =
        prendas.filter(prenda => {


            const coincideEstilo =
                filtroEstilo === "todos" ||
                prenda.estilo === filtroEstilo;


            const coincideColor =
                filtroColor === "todos" ||
                prenda.color.toLowerCase() === filtroColor;


            return coincideEstilo && coincideColor;

        });


    if (disponibles.length === 0) {

        mensaje.textContent =
            "No encontramos prendas que coincidan con tus preferencias. Intenta con otros filtros.";

        contenedor.innerHTML = "";

        return;
    }


    // ======================================
    // BUSCAR UNA PRENDA POR CATEGORÍA
    // ======================================

    const superior =
        disponibles.find(
            prenda =>
                prenda.categoria === "superior"
        );


    const inferior =
        disponibles.find(
            prenda =>
                prenda.categoria === "inferior"
        );


    const zapatos =
        disponibles.find(
            prenda =>
                prenda.categoria === "zapatos"
        );


    const accesorios =
        disponibles.find(
            prenda =>
                prenda.categoria === "accesorios"
        );


    const seleccionadas = [];


    if (superior) {
        seleccionadas.push(superior);
    }

    if (inferior) {
        seleccionadas.push(inferior);
    }

    if (zapatos) {
        seleccionadas.push(zapatos);
    }

    if (accesorios) {
        seleccionadas.push(accesorios);
    }


    // ======================================
    // MOSTRAR RESULTADO
    // ======================================

    contenedor.innerHTML = "";


    seleccionadas.forEach(prenda => {

        const tarjeta =
            document.createElement("div");

        tarjeta.className =
            "col-md-6 col-lg-3";


        tarjeta.innerHTML = `

            <div class="outfit-item">

                <div class="outfit-placeholder">

                    <span>
                        ${obtenerCategoria(prenda.categoria)}
                    </span>

                </div>

                <div class="outfit-info">

                    <h3>
                        ${prenda.nombre}
                    </h3>

                    <p>
                        ${prenda.color}
                    </p>

                    <small>
                        ${prenda.estilo}
                    </small>

                </div>

            </div>

        `;


        contenedor.appendChild(tarjeta);

    });


    if (seleccionadas.length === 0) {

        mensaje.textContent =
            "No hay suficientes prendas para crear un atuendo.";

    } else {

        mensaje.textContent =
            "Hemos creado una combinación con las prendas de tu clóset.";

    }

}


// ==========================================
// CATEGORÍA
// ==========================================

function obtenerCategoria(categoria) {

    if (categoria === "superior") {
        return "SUPERIOR";
    }

    if (categoria === "inferior") {
        return "INFERIOR";
    }

    if (categoria === "zapatos") {
        return "ZAPATOS";
    }

    if (categoria === "accesorios") {
        return "ACCESORIO";
    }

    return "PRENDA";

}


// ==========================================
// BOTÓN
// ==========================================

botonCrear.addEventListener(
    "click",
    crearAtuendo
);


// ==========================================
// INICIAR
// ==========================================

cargarColores();