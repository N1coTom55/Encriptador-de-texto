const ingresarTexto = document.getElementById("ingresarTexto");
const botonEncriptar = document.getElementById("botonEncriptar");
const botonDesencriptar = document.getElementById("botonDesencriptar");
const botonCopiar = document.getElementById("botonCopiar");
const mensajeFinal = document.getElementById("mensajeFinal");
const infoDerecha = document.getElementById("infoDerecha");
const derecha = document.getElementById("derecha");

const remplazar = [
     ["e", "enter"], 
     ["o", "ober"], 
     ["i", "imes"],
     ["a", "ai"],
     ["u", "ufat"]
];

const mostrarAlerta = (mensaje) => {
    swal("Advertencia", mensaje, "warning");
};

const validarTexto = (texto) => {
    // Convertir el texto a minúsculas
    texto = texto.toLowerCase();
    // Remover caracteres especiales y acentos
    texto = texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    // Remover letras mayúsculas
    texto = texto.replace(/[A-Z]/g, "");
    // Remover caracteres especiales
    texto = texto.replace(/[^a-z\s]/g, "");
    return texto;
};

const remplace = (nuevoValor) => {
    mensajeFinal.innerHTML = nuevoValor;
    munieco.classList.add("oculto");
    ingresarTexto.value = "";
    infoDerecha.style.display = "none";
    botonCopiar.style.display = "block";
    derecha.classList.add("ajustar");
    mensajeFinal.classList.add("ajustar");
};

const reset = () => {
    mensajeFinal.innerHTML = "";
    munieco.classList.remove("oculto");
    infoDerecha.style.display = "block";
    botonCopiar.style.display = "none";
    derecha.classList.remove("ajustar");
    mensajeFinal.classList.remove("ajustar");
    ingresarTexto.focus();
};

botonEncriptar.addEventListener("click", () => {
    let texto = ingresarTexto.value.trim();
    if (texto !== "") {
        texto = validarTexto(texto);
        function encriptar(newText) {
            for (let i = 0; i < remplazar.length; i++) {
                if (newText.includes(remplazar[i][0])) {
                    newText = newText.replaceAll(remplazar[i][0], remplazar[i][1]);
                }
            }
            return newText;
        }
        remplace(encriptar(texto));
    } else {
        swal("Lo siento", "Pero debes ingresar un texto para encriptar", "warning");
        reset();
    }
});

botonDesencriptar.addEventListener("click", () => {
    let texto = ingresarTexto.value.trim();
    if (texto !== "") {
        texto = validarTexto(texto);
        function desencriptar(newText) {
            for (let i = remplazar.length - 1; i >= 0; i--) {
                if (newText.includes(remplazar[i][1])) {
                    newText = newText.replaceAll(remplazar[i][1], remplazar[i][0]);
                }
            }
            return newText;
        }
        remplace(desencriptar(texto));
    } else {
        swal("Lo siento", "Pero debes ingresar un texto para desencriptar", "warning");
        reset();
    }
});


botonCopiar.addEventListener("click", () => {
    const texto = mensajeFinal.value.trim();
    if (texto !== "") {
        mensajeFinal.select();
        document.execCommand('copy');
        swal("Bien hecho!", "El texto fue copiado exitosamente", "success");
        reset();
    } else {
        swal("Lo siento", "No hay texto para copiar", "warning");
    }
});

ingresarTexto.addEventListener("input", () => {
    const texto = ingresarTexto.value;
    if (texto.match(/[A-ZáéíóúÁÉÍÓÚñÑ!@#$%^&*(),.?":{}|<>]/)) {
        mostrarAlerta("No se permiten letras mayúsculas, acentos ni caracteres especiales.");
        ingresarTexto.value = texto.replace(/[A-ZáéíóúÁÉÍÓÚñÑ!@#$%^&*(),.?":{}|<>]/g, "");
    }
});

