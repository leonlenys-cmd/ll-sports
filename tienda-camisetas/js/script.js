// ===== NÚMERO DE WHATSAPP (CÁMBIALO AQUÍ) =====
// Formato internacional sin + ni espacios. Ej: 584121234567
const NUMERO_WHATSAPP = "584121234567";

// Lista de productos
const productos = [
    // ===== CAMISETAS =====
    {
        nombre: "Camiseta Local",
        precio: "$25",
        categoria: "camisetas",
        imagen: "img/camisetas/camiseta-local.jpg"
    },
    {
        nombre: "Camiseta Visitante",
        precio: "$25",
        categoria: "camisetas",
        imagen: "img/camisetas/camiseta-visitante.jpg"
    },
    {
        nombre: "Camiseta Tercera",
        precio: "$28",
        categoria: "camisetas",
        imagen: "img/camisetas/camiseta-tercera.jpg"
    },

    // ===== COMPRESIÓN =====
    {
        nombre: "Camiseta de Compresión",
        precio: "$18",
        categoria: "compresion",
        imagen: "img/compresion/camiseta-compresion.jpg"
    },
    {
        nombre: "Medias de Compresión Alta",
        precio: "$15",
        categoria: "compresion",
        imagen: "img/compresion/compresion-alta.jpg"
    },
    {
        nombre: "Medias de Compresión Media",
        precio: "$12",
        categoria: "compresion",
        imagen: "img/compresion/compresion-media.jpg"
    },

    // ===== ROPA DEPORTIVA =====
    {
        nombre: "Pantalón Deportivo",
        precio: "$20",
        categoria: "ropa",
        imagen: "img/ropa/pantalon-deportivo.jpg"
    },
    {
        nombre: "Buzo Entrenamiento",
        precio: "$30",
        categoria: "ropa",
        imagen: "img/ropa/buzo-entrenamiento.jpg"
    },

    // ===== MEDIAS =====
    {
        nombre: "Medias Deportivas Clásicas",
        precio: "$8",
        categoria: "medias",
        imagen: "img/medias/medias-deportivas.jpg"
    },
    {
        nombre: "Medias Tobilleras",
        precio: "$6",
        categoria: "medias",
        imagen: "img/medias/medias-tobilleras.jpg"
    }
];

// Carrito (selección)
let seleccion = [];

// Función para mostrar productos
function mostrarProductos(filtro) {
    const grid = document.getElementById("grid-productos");
    grid.innerHTML = "";

    const filtrados = filtro === "todos"
        ? productos
        : productos.filter(p => p.categoria === filtro);

    filtrados.forEach((p, indice) => {
        const tarjeta = document.createElement("div");
        tarjeta.className = "tarjeta";
        tarjeta.innerHTML = `
            <img src="${p.imagen}" alt="${p.nombre}">
            <div class="info">
                <h3>${p.nombre}</h3>
                <p class="categoria">${p.categoria}</p>
                <p class="precio">${p.precio}</p>
                <button data-indice="${indice}">Añadir</button>
            </div>
        `;
        grid.appendChild(tarjeta);
    });

    // Asignar evento a los botones
    document.querySelectorAll(".tarjeta button").forEach(boton => {
        boton.addEventListener("click", () => {
            agregarAlCarrito(parseInt(boton.dataset.indice));
        });
    });
}

// Agregar producto al carrito
function agregarAlCarrito(indice) {
    const producto = productos[indice];
    seleccion.push(producto);
    actualizarCarrito();
}

// Actualizar contador y botón
function actualizarCarrito() {
    document.getElementById("contador-carrito").textContent = seleccion.length;
    document.getElementById("total-en-carrito").textContent = seleccion.length;
}

// Enviar por WhatsApp
document.getElementById("enviar-whatsapp").addEventListener("click", (evento) => {
    evento.preventDefault();

    if (seleccion.length === 0) {
        alert("Primero selecciona al menos un producto.");
        return;
    }

    // Construir el mensaje
    let mensaje = "Hola LL Sports 👋, estoy interesado en estos productos:\n\n";
    seleccion.forEach((p, i) => {
        mensaje += `${i + 1}. ${p.nombre} - ${p.precio}\n`;
    });
    mensaje += "\nDeseo más detalles. ¡Gracias!";

    // Abrir WhatsApp
    const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
});

// Filtros
document.querySelectorAll(".filtro").forEach(boton => {
    boton.addEventListener("click", () => {
        document.querySelectorAll(".filtro").forEach(b => b.classList.remove("activo"));
        boton.classList.add("activo");
        mostrarProductos(boton.dataset.filtro);
    });
});

// Cargar todos al inicio
mostrarProductos("todos");