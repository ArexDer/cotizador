document.addEventListener('DOMContentLoaded', function () {


    //-----------------------
    // Avaluo para cada modelo de auto
    const avaluos = {
        "Corolla": "$20,000",
        "Camry": "$30,000",
        "Civic": "$18,000",
        "Accord": "$25,000"
    };


    //-----------------------
    // Escuchar clic en los botones de tipos de vehículos
    document.getElementById('autos').addEventListener('click', function () {
        hideAllSections();
        document.querySelector('.autos-seccion').style.display = 'block';
    });

    document.getElementById('suvs').addEventListener('click', function () {
        hideAllSections();
        document.querySelector('.suvs-seccion').style.display = 'block';
    });

    document.getElementById('camionetas').addEventListener('click', function () {
        hideAllSections();
        document.querySelector('.camionetas-seccion').style.display = 'block';
    });

    document.getElementById('camiones').addEventListener('click', function () {
        hideAllSections();
        document.querySelector('.camiones-seccion').style.display = 'block';
    });

    // Función para ocultar todas las secciones de vehículos
    function hideAllSections() {
        document.querySelector('.autos-seccion').style.display = 'none';
        document.querySelector('.suvs-seccion').style.display = 'none';
        document.querySelector('.camionetas-seccion').style.display = 'none';
        document.querySelector('.camiones-seccion').style.display = 'none';
    }


    //-----------------------

    // Función para manejar la lógica de selección y mostrar la imagen
    function handleSelectionChange(marcaSelectId, modeloSelectId, continuarBtnId, carruselId, opcionesId, avaluoLabelId, entradaOpId, opcionesEntradaId) {
        const marcaSelect = document.getElementById(marcaSelectId);
        const modeloSelect = document.getElementById(modeloSelectId);
        const continuarBtn = document.getElementById(continuarBtnId);
        const carrusel = document.getElementById(carruselId);
        const opciones = document.getElementById(opcionesId);
        const avaluoLabel = document.getElementById(avaluoLabelId);
        const entradaOp = document.getElementById(entradaOpId);
        const opcionesEntrada = document.getElementById(opcionesEntradaId);
        const images = carrusel.querySelectorAll('img');

        marcaSelect.addEventListener('change', function () {
            const selectedMarca = marcaSelect.value;

            // Filtrar los modelos basados en la marca seleccionada
            Array.from(modeloSelect.options).forEach(option => {
                if (option.dataset.marca === selectedMarca || option.value === "") {
                    option.style.display = 'block';
                } else {
                    option.style.display = 'none';
                }
            });

            modeloSelect.value = "";
            toggleContinueButton();
        });


        continuarBtn.addEventListener('click', function () {
            // Ocultar los selectores y el botón "Continuar"
            marcaSelect.style.display = 'none';
            modeloSelect.style.display = 'none';
            continuarBtn.style.display = 'none';

            // Mostrar opciones, el valor del avaluo y el botón "Atrás"
            opciones.style.display = 'block';
            avaluoLabel.textContent = avaluos[modeloSelect.value];
            document.getElementById('atras-autos').style.display = 'block'; // Mostrar el botón "Atrás"
        });

        document.getElementById('atras-autos').addEventListener('click', function () {
            // Mostrar los selectores de marca y modelo y ocultar el botón "Atrás"
            marcaSelect.style.display = 'block';
            modeloSelect.style.display = 'block';
            continuarBtn.style.display = 'block';

            // Ocultar las opciones y el botón "Atrás"
            opciones.style.display = 'none';
            document.getElementById('atras-autos').style.display = 'none';
        });

       
        //-----------------------
        entradaOp.addEventListener('click', function () {
            // Ocultar las opciones de ENTRAD y SIn Entrada
            opciones.style.display = 'none';

            opcionesEntrada.style.display = "block";


            avaluoLabel.textContent = avaluos[modeloSelect.value];


        });

        //-------------------------





        modeloSelect.addEventListener('change', function () {
            const selectedModelo = modeloSelect.value;

            // Mostrar la imagen correspondiente al modelo seleccionado
            images.forEach(img => {
                img.style.display = (img.dataset.modelo === selectedModelo) ? 'block' : 'none';
            });

            toggleContinueButton();
        });

        function toggleContinueButton() {
            if (marcaSelect.value !== "" && modeloSelect.value !== "") {
                continuarBtn.style.display = 'block';
            } else {
                continuarBtn.style.display = 'none';
            }
        }
    }

    // Aplicar la función para cada sección
    handleSelectionChange('marca-autos', 'modelo-autos', 'continuar-autos', 'carrusel-autos', 'opciones-autos', 'avaluo-autos', 'con-entrada', 'entrada-opciones');
    handleSelectionChange('marca-suvs', 'modelo-suvs', 'continuar-suvs', 'carrusel-suvs');
    handleSelectionChange('marca-camionetas', 'modelo-camionetas', 'continuar-camionetas', 'carrusel-camionetas');
    handleSelectionChange('marca-camiones', 'modelo-camiones', 'continuar-camiones', 'carrusel-camiones');
});


// Get modal element
var modal = document.getElementById("myModal");

// Get button to open the modal
var openModalBtn = document.getElementById("openModal");

// Get button to close the modal
var closeModalBtn = document.getElementById("closeModal");

var formcontainer = document.getElementById("form-container");

// Open modal when "Sin entrada" button is clicked
openModalBtn.onclick = function () {
    modal.style.display = "flex";
    
    avaluoLabel.textContent = avaluos[modeloSelect.value];
}

// Close modal when "x" button is clicked
closeModalBtn.onclick = function () {
    modal.style.display = "none";
}

// Close modal if user clicks outside the modal content
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//-------------------------------------
//---- SIN ENTRADA PARTE FINAL




