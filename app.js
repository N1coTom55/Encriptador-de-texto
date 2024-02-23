const ingresarTexto = document.getElementById("ingresarTexto");
const botonEncriptar = document.getElementById("botonEncriptar");
const botonDesencriptar = document.getElementById("botonDesencriptar");
const botonCopiar = document.getElementById("botonCopiar");
const mensajeFinal = document.getElementById("mensajeFinal");
const infoDerecha = document.getElementById("infoDerecha");
const derecha = document.getElementById("derecha");

// e - enter
// o - ober
// i - imes
// a - ai
// u - ufat

let remplazar = [
     ["e", "enter"], 
     ["o", "ober"], 
     ["i", "imes"],
     ["a", "ai"],
     ["u", "ufat"]
]

const remplace = (nuevoValor) => {
    mensajeFinal.innerHTML = nuevoValor;
    munieco.classList.add("oculto");
    ingresarTexto.value = "";
    infoDerecha.style.display = "none";
    botonCopiar.style.display = "block";
    derecha.classList.add("ajustar");
    mensajeFinal.classList.add("ajustar")
}

const reset = () => {
    mensajeFinal.innerHTML = "";
    munieco.classList.remove("oculto");
    infoDerecha.style.display = "block";
    botonCopiar.style.display = "none";
    derecha.classList.remove("ajustar");
    mensajeFinal.classList.remove("ajustar");
    ingresarTexto.focus();
}


botonEncriptar.addEventListener("click", () => {
    const texto = ingresarTexto.value.toLowerCase()
    if(texto != ""){
        function encriptar(newText){
            for(let i = 0; i < remplazar.length; i++){
                if(newText.includes(remplazar[i][0])){
                    newText = newText.replaceAll(remplazar[i][0], remplazar[i][1])
                };
            }
            return newText
        }
    } else {
        swal("Lo siento", "Pero debes ingresar un texto para encriptar", "warning");
        reset();
    }
    // const textoEncriptado = encriptar(texto)
    remplace(encriptar(texto));
});

botonDesencriptar.addEventListener("click", () => {
    const texto = ingresarTexto.value.toLowerCase();
    if(texto != ""){
        function desencriptar(newText){
            for(let i = 0; i < remplazar.length; i++){
                if(newText.includes(remplazar[i][1])){
                    newText = newText.replaceAll(remplazar[i][1], remplazar[i][0])
                }
            }
            return newText
        }
    } else {
        swal("Lo siento", "Pero debes ingresar un texto para desencriptar", "warning");
        reset();
    }
    remplace(desencriptar(texto));
})

botonCopiar.addEventListener("click", () => {
    let texto = mensajeFinal;
    // navigator.clipboard.writeText(texto.value);
    texto.select();
    document.execCommand('copy');
    swal("Bien hecho!", "El texto fue copiado exitosamente", "success");
    reset();

})