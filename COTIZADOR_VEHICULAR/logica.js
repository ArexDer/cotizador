document.addEventListener("DOMContentLoaded", () => {
    //-----------------------

    //VARIABLES A USAR EN LA LOGICA
    let avaluoActual = 0;
    let imagenSeleccionada = "";

    let porcentajeGlobal = null;
    let mesesGlobal = null;

    let estimadoGlobal = 0;

    function reiniciarVariables() {
        avaluoActual = 0;
        imagenSeleccionada = "";
        porcentajeGlobal = null;
        mesesGlobal = null;
        estimadoGlobal = 0;
        console.log("Variables reiniciadas");
    }


    const vehicles = document.querySelectorAll(".vehicle");

    const autoSection = document.getElementById("detalle-vehiculo-autos");
    const suvSection = document.getElementById("detalle-vehiculo-suvs");
    const camionetaSection = document.getElementById(
        "detalle-vehiculo-camionetas"
    );
    const camionesSection = document.getElementById("detalle-vehiculo-camiones");

    const opcionesSection = document.getElementById("opciones-vehiculo"); 
    const marcaSelect = document.getElementById("marca");
    const modeloSelect = document.getElementById("modelo");
    const autoImagen = document.getElementById("auto-imagen"); 
    const continuarBtn = document.getElementById("continuar");
    const precioInput = document.getElementById("precio"); 

    //.-de cada seccion de autos, suvs, camionetas, camiones
    const marcaSuvsSelect = document.getElementById("marca-suvs");
    const modeloSuvsSelect = document.getElementById("modelo-suvs");
    const suvImagen = document.getElementById("suv-imagen");
    const continuarSUVSBtn = document.getElementById('continuarSuvs');
    const precioSuvsInput = document.getElementById("precio-suvs");


    const provinciaSelect = document.getElementById("provincia");
    const agenciaSelect = document.getElementById("agencia");


    //ARREGLO DE MODELOS VEHICULARES
    const modelos = {
        toyota: [
            {
                tipo: "autos",
                nombre: "Corolla",
                imagen:
                    "https://mir-s3-cdn-cf.behance.net/projects/404/0c9602128298101.Y3JvcCw4NTM0LDY2NzUsMCw2MzM.jpg",
                precio: 20000,
            },
            {
                tipo: "autos",
                nombre: "Yaris",
                imagen:
                    "https://automobiles.honda.com/-/media/Honda-Automobiles/Vehicles/2025/civic-sedan/non-VLP/10-Family/MY25_Civic_Family_Card_Jelly_2x.png?sc_lang=en",
                precio: 18000,
            },
            {
                tipo: "camionetas",
                nombre: "Hilux",
                imagen:
                    "https://yokomotor.com.co/toyota/wp-content/uploads/sites/2/2024/03/Yokomotor-toyota-hilux-24-diesel-at-super-blanco.webp",
                precio: 40000,
            },
        ],
        honda: [
            {
                tipo: "autos",
                nombre: "Civic",
                imagen:
                    "https://automobiles.honda.com/-/media/Honda-Automobiles/Vehicles/2025/civic-sedan/non-VLP/10-Family/MY25_Civic_Family_Card_Jelly_2x.png?sc_lang=en",
                precio: 22000,
            },
            {
                tipo: "autos",
                nombre: "Accord",
                imagen:
                    "https://automobiles.honda.com/-/media/Honda-Automobiles/Vehicles/2025/civic-sedan/non-VLP/10-Family/MY25_Civic_Family_Card_Jelly_2x.png?sc_lang=en",
                precio: 25000,
            },
        ],
        chevrolet: [
            {
                tipo: "suvs",
                nombre: "TAHOE",
                imagen:
                    "https://www.chevrolet.com.ec/content/dam/chevrolet/south-america/ecuador/espanol/index/crossovers-and-suvs/showroom-drp/2022-tahoe-flyout.jpg?imwidth=419",
                precio: 32000,
            },
            {
                tipo: "suvs",
                nombre: "GROVEE",
                imagen:
                    "https://www.chevrolet.com.ec/content/dam/chevrolet/south-america/ecuador/espanol/index/crossovers-and-suvs/showroom-drp/2022-groove-flyout.jpg?imwidth=419",
                precio: 44000,
            },
            {
                tipo: "suvs",
                nombre: "TRAILBLAZER",
                imagen:
                    "https://www.chevrolet.com.ec/content/dam/chevrolet/south-america/ecuador/espanol/index/crossovers-and-suvs/showroom-drp/2022-trailblazer-flyout.jpg?imwidth=419",
                precio: 36000,
            },
        ],
    };

    //..............


    //ARREGLO DE LAS AGENCIAS EN LAS PROVINCIAS.
    const agencias = {
        Pichincha: [{ nombre: "Quito Matriz" }, { nombre: "Quito Guajalo" }],
        Santo_Domingo: [{ nombre: "Santo Domingo" }],
        Esmeraldas: [{ nombre: "Esmeraldas" }],
        Manabi: [
            { nombre: "Manta 1" },
            { nombre: "Manta 2" },
            { nombre: "Manta 3" },
            { nombre: "Portoviejo" },
        ],
        El_Oro: [{ nombre: "Machala" }],
        Guayas: [{ nombre: "Guayaquil Centro" }, { nombre: "Guayaquil Norte" }],
    };

    //---------------------------

    // MOSTRAR LA SECCION DE VEHICULOS SELECCIONADOS AUTOS, SUVS, CAMIONETAS, CAMION
    vehicles.forEach((vehicle) => {
        vehicle.addEventListener("click", () => {

          

            const selectedVehicle = vehicle.querySelector("p").textContent;

            if (selectedVehicle === "Autos") {
                reiniciarVariables();
                autoSection.style.display = "flex"; // Mostrar la sección
                suvSection.style.display = "none";
                camionetaSection.style.display = "none";
                camionesSection.style.display = "none";

                opcionesSection.style.display = "none"; // Ocultar la sección de opciones si estaba abierta

                // Actualizar los modelos cuando se selecciona una marca
                marcaSelect.addEventListener("change", () => {
                    const marcaSeleccionada = marcaSelect.value;
                   
                    modeloSelect.innerHTML =
                        '<option value="">Selecciona un modelo</option>'; // Limpiar modelos anteriores
                    modeloSelect.disabled = false; // Habilitar selector de modelo

                    if (marcaSeleccionada) {
                        // Filtrar modelos de la marca seleccionada que sean del tipo 'autos'
                        const modelosFiltrados = modelos[marcaSeleccionada].filter(
                            (modelo) => modelo.tipo === "autos"
                        );

                        // Crear las opciones de modelos filtrados
                        modelosFiltrados.forEach((modelo) => {
                            const option = document.createElement("option");
                            option.value = modelo.nombre;
                            option.textContent = modelo.nombre;
                            modeloSelect.appendChild(option);
                        });

                        if (modelosFiltrados.length === 0) {
                            modeloSelect.disabled = true; // Si no hay modelos del tipo seleccionado, deshabilitar el selector
                            continuarBtn.style.display = "none"; // Ocultar el botón de continuar
                        }
                    } else {
                        modeloSelect.disabled = true; // Deshabilitar si no se selecciona una marca
                        continuarBtn.style.display = "none"; // Ocultar el botón de continuar
                    }
                });
                


            } else if (selectedVehicle === "SUVs") {
                reiniciarVariables();
                suvSection.style.display = "flex";
                autoSection.style.display = "none";
                camionetaSection.style.display = "none";
                camionesSection.style.display = "none";
                opcionesSection.style.display = "none";

                //-------
                // Actualizar los modelos cuando se selecciona una marca
                marcaSuvsSelect.addEventListener("change", () => {
                    const marcaSeleccionada = marcaSuvsSelect.value;
                   
                    modeloSuvsSelect.innerHTML =
                        '<option value="">Selecciona un modelo</option>'; // Limpiar modelos anteriores
                    modeloSuvsSelect.disabled = false; // Habilitar selector de modelo

                    if (marcaSeleccionada) {
                        // Filtrar modelos de la marca seleccionada que sean del tipo 'autos'
                        const modelosFiltrados = modelos[marcaSeleccionada].filter(
                            (modelo) => modelo.tipo === "suvs"
                        );

                        // Crear las opciones de modelos filtrados
                        modelosFiltrados.forEach((modelo) => {
                            const option = document.createElement("option");
                            option.value = modelo.nombre;
                            option.textContent = modelo.nombre;
                            modeloSuvsSelect.appendChild(option);
                        });

                        if (modelosFiltrados.length === 0) {
                            modeloSuvsSelect.disabled = true; // Si no hay modelos del tipo seleccionado, deshabilitar el selector
                            continuarSUVSBtn.style.display = "none"; // Ocultar el botón de continuar
                        }
                    } else {
                        modeloSuvsSelect.disabled = true; // Deshabilitar si no se selecciona una marca
                        continuarSUVSBtn.style.display = "none"; // Ocultar el botón de continuar
                    }
                });
                
                //-------
            } else if (selectedVehicle === "Camionetas") {
                camionetaSection.style.display = "flex";

                autoSection.style.display = "none";
                suvSection.style.display = "none";
                camionesSection.style.display = "none";
                opcionesSection.style.display = "none";

                //------------
            } else if (selectedVehicle === "Camiones") {
                camionesSection.style.display = "flex";

                camionetaSection.style.display = "none";

                autoSection.style.display = "none";
                suvSection.style.display = "none";

                opcionesSection.style.display = "none";
            }
        });
    });

    //+++++++++++++
    // SELECCION DE LAS AGENCIAS...
    provinciaSelect.addEventListener("change", () => {
        const provinciaSeleccionada = provinciaSelect.value;
        agenciaSelect.innerHTML = '<option value="">Selecciona un agencia</option>'; 
        agenciaSelect.disabled = false; 

        if (provinciaSeleccionada) {
            agencias[provinciaSeleccionada].forEach((agencia) => {
                const option = document.createElement("option");
                option.value = agencia.nombre;
                option.textContent = agencia.nombre;
                agenciaSelect.appendChild(option);
            });
        } else {
            modeloSelect.disabled = true;
            continuarBtn.style.display = "none"; 
        }
    });

    //++++++++++++

    // Mostrar el botón de continuar, actualizar la imagen y el precio cuando se selecciona un modelo
    modeloSelect.addEventListener("change", () => {
        const marcaSeleccionada = marcaSelect.value;
        const modeloSeleccionado = modeloSelect.value;

        if (modeloSeleccionado) {
            continuarBtn.style.display = "flex"; // Mostrar el botón de continuar

            // Buscar la imagen y el precio correspondientes al modelo seleccionado
            const modelo = modelos[marcaSeleccionada].find(
                (m) => m.nombre === modeloSeleccionado
            );
            if (modelo) {
                autoImagen.src = modelo.imagen; // Actualizar la imagen
                precioInput.value = modelo.precio; // Actualizar el precio

                // Actualizar variables globales
                avaluoActual = precioInput.value;
                // Asignar el precio a la variable global
                imagenSeleccionada = modelo.imagen; // Asignar la imagen a la variable global
            }
        } else {
            continuarBtn.style.display = "none"; // Ocultar el botón de continuar si no se selecciona un modelo
        }
    });

    //-----------suvs modelo imagen :
    modeloSuvsSelect.addEventListener("change", () => {
        const marcaSeleccionada = marcaSuvsSelect.value;
        const modeloSeleccionado = modeloSuvsSelect.value;

        if (modeloSeleccionado) {
            continuarSUVSBtn.style.display = "block"; // Mostrar el botón de continuar

            // Buscar la imagen y el precio correspondientes al modelo seleccionado
            const modelo = modelos[marcaSeleccionada].find(
                (m) => m.nombre === modeloSeleccionado
            );
            if (modelo) {
                suvImagen.src = modelo.imagen; // Actualizar la imagen
                precioSuvsInput.value = modelo.precio; // Actualizar el precio

                // Actualizar variables globales
                avaluoActual = precioSuvsInput.value;
                // Asignar el precio a la variable global
                imagenSeleccionada = modelo.imagen; // Asignar la imagen a la variable global
            }
        } else {
            continuarSUVSBtn.style.display = "none"; // Ocultar el botón de continuar si no se selecciona un modelo
        }
    });


    //---- IMAGENES DE LOS VEHICULOS DE CADA SECCION

    // con esto hago que si se me muestre el valor del vehiculo seleccionado en la variable global.
    avaluoActual = avaluoActual;
    /*
    ----------
    --------
    */
    //CONTINUAR LUEGO DE LA SELECCION DE MARCA Y MODELO 
    //AUTOS
    
    continuarBtn.addEventListener("click", () => {
        // Ocultar la parte de los selectores de marca y modelo
        document.getElementById("selectores").style.display = "none";

        // Mostrar la parte de los botones "Con Entrada" y "Sin Entrada" en la misma columna derecha
        document.getElementById("opciones-vehiculo").style.display = "flex";
    });

    //SUVS
    continuarSUVSBtn.addEventListener("click", () => {
        // Ocultar la parte de los selectores de marca y modelo
        document.getElementById("selectores-suvs").style.display = "none";

        // Mostrar la parte de los botones "Con Entrada" y "Sin Entrada" en la misma columna derecha
        document.getElementById("opciones-vehiculo-suvs").style.display = "flex";
    });


    //----------------------------------------------
    //PARTES CON ENTRADA



    //FUNCION GLOBAL DE CALCULOS DE PORCENTAJES Y MESES
    function actualizarCalculos(precioVehiculo, porcentajeEntrada, mesesPlazo, ids,estimadoFuncion) {
        // Asignar los valores a las variables globales
    
        porcentajeGlobal = porcentajeEntrada;

        mesesGlobal = mesesPlazo;
        
    
        // Verificar si el precio del vehículo es válido
        if (isNaN(precioVehiculo) || precioVehiculo <= 0) {
            console.log("El valor del vehículo no está definido o es inválido.");
            return;
        }
    
        // Verificar si los valores de porcentaje y meses son válidos
        if (isNaN(porcentajeEntrada) || isNaN(mesesPlazo)) {
            console.log("Porcentaje o meses no seleccionados correctamente.");
            return;
        }
    
        // Cálculo del valor de la entrada
        const valorEntrada = (porcentajeEntrada / 100) * precioVehiculo;
    
        // Definir tasas de interés según el plazo en meses
        const interesesPorMeses = {
            24: 5.5,
            36: 5.84,
            48: 4.38,
            60: 3.5,
            72: 2.92,
        };
    
        // Obtener la tasa de interés según los meses seleccionados
        const tasaInteres = interesesPorMeses[mesesPlazo] / 100;
    
        // Cálculo del monto financiado
        const montoFinanciado = precioVehiculo - valorEntrada;
    
        // Cálculo del valor total a pagar con interés
        const valorTotalConInteres = montoFinanciado * (1 + tasaInteres);
        tasaAdministrativaGlobal = valorTotalConInteres;
    
        // Cálculo de las cuotas mensuales
        const cuotasMensuales = valorTotalConInteres / mesesPlazo;

        estimadoGlobal=cuotasMensuales;
    
        // Actualizar los campos de salida con los resultados calculados
        document.getElementById(ids.precioPorcentaje).value = valorEntrada.toFixed(2);
        document.getElementById(ids.precioMeses).value = valorTotalConInteres.toFixed(2);
        document.getElementById(ids.estimado).value = cuotasMensuales.toFixed(2);
    }
    
    


    /*
    --------------
    --------------
    */
    //llamada a la funcion  de calculos de porcentajes y meses
    
    //AUTOS
    document.getElementById("con-entrada").addEventListener("click", () => {
        document.getElementById("precio-vehiculo-con-entrada").value = avaluoActual;
        const precioVehiculo = parseFloat(document.getElementById("precio-vehiculo-con-entrada").value);
        console.log(avaluoActual);
    
        document.getElementById("porcentaje").addEventListener("change", () => {
            const porcentajeEntrada = parseFloat(document.getElementById("porcentaje").value);
            const mesesPlazo = parseInt(document.getElementById("meses-plazo").value);
            
            // Llamada con los IDs correctos
            actualizarCalculos(precioVehiculo, porcentajeEntrada, mesesPlazo, {
                precioPorcentaje: "precio-porcentaje",
                precioMeses: "precio-meses",
                estimado: "estimado"
            });
        });
    
        document.getElementById("meses-plazo").addEventListener("change", () => {
            const porcentajeEntrada = parseFloat(document.getElementById("porcentaje").value);
            const mesesPlazo = parseInt(document.getElementById("meses-plazo").value);
            
            actualizarCalculos(precioVehiculo, porcentajeEntrada, mesesPlazo, {
                precioPorcentaje: "precio-porcentaje",
                precioMeses: "precio-meses",
                estimado: "estimado"
            });
        });
    
        document.getElementById("opciones-vehiculo").style.display = "none";
        document.getElementById("opciones-con-entrada").style.display = "flex";
    });


    
    


   

    //SUVS
    document.getElementById("con-entrada-suvs").addEventListener("click", () => {

        document.getElementById("precio-vehiculo-con-entrada-suvs").value = avaluoActual;
        const precioVehiculo = parseFloat(document.getElementById("precio-vehiculo-con-entrada-suvs").value);
        console.log(avaluoActual);
    
        document.getElementById("porcentaje-suvs").addEventListener("change", () => {
            const porcentajeEntrada = parseFloat(document.getElementById("porcentaje-suvs").value);
            const mesesPlazo = parseInt(document.getElementById("meses-plazo-suvs").value);
            
            // Llamada con los IDs correctos
            actualizarCalculos(precioVehiculo, porcentajeEntrada, mesesPlazo, {
                precioPorcentaje: "precio-porcentaje-suvs",
                precioMeses: "precio-meses-suvs",
                estimado: "estimado-suvs"
            });
        });
    
        document.getElementById("meses-plazo-suvs").addEventListener("change", () => {
            const porcentajeEntrada = parseFloat(document.getElementById("porcentaje-suvs").value);
            const mesesPlazo = parseInt(document.getElementById("meses-plazo-suvs").value);
            
            actualizarCalculos(precioVehiculo, porcentajeEntrada, mesesPlazo, {
                precioPorcentaje: "precio-porcentaje-suvs",
                precioMeses: "precio-meses-suvs",
                estimado: "estimado-suvs"
            });
        });


      
    
        document.getElementById("opciones-vehiculo-suvs").style.display = "none";
        document.getElementById("opciones-con-entrada-suvs").style.display = "flex";
    });

    
    
    
    

    function mostrarPopup() {
        document.getElementById("popup").style.display = "flex";

    }

    document.getElementById("sin-entrada").addEventListener("click", () => {
        mostrarPopup();
        document.getElementById("imagen-carro").src = imagenSeleccionada;
        // Asignar el valor al campo de "precio-vehiculo-con-entrada"
        document.getElementById("precio-vehiculo-pop").value = avaluoActual;
    });


    //ENTRADA AL POPUP DE AUTOS,SUVS,CAMIONETAS,CAMIONES
    document
        .getElementById("continuar-con-entrada")
        .addEventListener("click", () => {
            mostrarPopup();
            document.getElementById("imagen-carro").src = imagenSeleccionada;
            // Asignar el valor al campo de "precio-vehiculo-con-entrada"
            document.getElementById("precio-vehiculo-pop").value = avaluoActual;
            
        });

        //SUVS

        document
        .getElementById("continuar-con-entrada-suvs")
        .addEventListener("click", () => {
            mostrarPopup();
            document.getElementById("imagen-carro").src = imagenSeleccionada;
            // Asignar el valor al campo de "precio-vehiculo-con-entrada"
            document.getElementById("precio-vehiculo-pop").value = avaluoActual;
        });




    var closePopBtn = document.getElementById("cerrarPop");

    closePopBtn.onclick = function () {
        document.getElementById("popup").style.display = "none";
        
    };

    // Ocultar contenido inicial del popup y mostrar el PDF
    document.getElementById("boton-cotizar").addEventListener("click", () => {
        // Ocultar el contenido inicial del popup
        document.querySelector(".popup-formulario").style.display = "none";
        document.querySelector("h2").style.display = "none";
        document.getElementById("imagen-carro").style.display = "none";
        document.getElementById("precio-vehiculo-pop").style.display = "none";

        document.getElementById("auto-sin-entrada-pdf").src = imagenSeleccionada;
        document.getElementById("auto-sin-entrada-pdf").style.display = "block";

        // Mostrar el contenido de PDF
        document.getElementById("pdf").style.display = "block";

        document.getElementById("precio-vehiculo-pdf").value = avaluoActual;
        document.getElementById("meses-F").value = mesesGlobal;
        document.getElementById("porcentaje-F").value = porcentajeGlobal;

        switch (mesesGlobal) {
            case 24:
                document.getElementById("tasa-F").value = 5.5;
                break;
            case 36:
                document.getElementById("tasa-F").value = 5.84;
                break;
            case 48:
                document.getElementById("tasa-F").value = 4.38;
                break;
            case 60:
                document.getElementById("tasa-F").value = 3.5;
                break;
            case 72:
                document.getElementById("tasa-F").value = 2.92;
                break;
            default:
                console.log(
                    "El tiempo de meses no coincide con ninguno de los valores definidos"
                );
        }

        document.getElementById("cuota-F").value = estimadoGlobal;
       


        document.getElementById("boton-cotizar").style.display = "none";
    });

    // Cerrar popup
    var closePopBtn = document.getElementById("cerrarPop");

    closePopBtn.onclick = function () {
        document.getElementById("popup").style.display = "none";
    };

    //´´´´´´´´´´´´´´´´´´´´´´
    // Suponiendo que tienes un input de nombre que el usuario llena
    const nombreInput = document.getElementById("nombre"); // El input donde se ingresa el nombre
    const thankYouMessage = document.getElementById("thankYouMessage");

    // Función para actualizar el mensaje de agradecimiento
    function actualizarMensaje() {
        const nombre = nombreInput.value || "Usuario"; // Nombre por defecto si el campo está vacío
        thankYouMessage.textContent = `Gracias por Cotizar (${nombre})`;
    }

    // Escuchar el cambio en el input y actualizar el mensaje
    nombreInput.addEventListener("input", actualizarMensaje);
});
