document.addEventListener("DOMContentLoaded", () => {
    const mainSwitch = document.getElementById("mainSwitch");
    const switchStatusText = document.getElementById("switchStatusText");
    const btnAbrir = document.getElementById("btnAbrir");
    const caratulaOverlay = document.getElementById("caratula-overlay");
    const mainContent = document.getElementById("main-content");
    const btnVolverCaratula = document.getElementById("btnVolverCaratula");
    const sparkOverlay = document.getElementById("sparkOverlay");
    const themeToggle = document.getElementById("themeToggle");
    const detailSection = document.getElementById("detail-section");
    const btnVolverPortafolio = document.getElementById("btnVolverPortafolio");
    const detailTitle = document.getElementById("detailTitle");
    const detailContent = document.getElementById("detailContent");

    // EFECTO DE CHISPAS EN EL CURSOR
    document.addEventListener("mousemove", (e) => {
        if (Math.random() < 0.3) { // Controla la frecuencia de las chispas
            const spark = document.createElement("div");
            spark.classList.add("spark-particle");
            spark.style.left = e.clientX + "px";
            spark.style.top = e.clientY + "px";

            // Movimiento aleatorio de dispersión de la chispa
            const randX = (Math.random() - 0.5) * 60 + "px";
            const randY = (Math.random() - 0.5) * 60 + "px";
            spark.style.setProperty("--rand-x", randX);
            spark.style.setProperty("--rand-y", randY);

            document.body.appendChild(spark);

            setTimeout(() => {
                spark.remove();
            }, 500);
        }
    });

    // Cambio de Tema Claro / Oscuro
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
        if (document.body.classList.contains("light-theme")) {
            themeToggle.innerText = "🌙 Tema";
        } else {
            themeToggle.innerText = "☀️ Tema";
        }
    });

    // Interruptor Principal de Acceso (Switch ON/OFF)
    mainSwitch.addEventListener("change", () => {
        if (mainSwitch.checked) {
            switchStatusText.innerText = "Estado: ENCENDIDO (Sistema Activo)";
            switchStatusText.classList.add("active");
            btnAbrir.removeAttribute("disabled");
            btnAbrir.classList.add("active");
        } else {
            switchStatusText.innerText = "Estado: APAGADO (Desconectado)";
            switchStatusText.classList.remove("active");
            btnAbrir.setAttribute("disabled", "true");
            btnAbrir.classList.remove("active");
        }
    });

    // Transición Animada de Cables y Chispas al Entrar
    btnAbrir.addEventListener("click", () => {
        if (!mainSwitch.checked) return;
        
        sparkOverlay.classList.add("active");

        setTimeout(() => {
            caratulaOverlay.style.display = "none";
            mainContent.classList.remove("hidden");
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 600);

        setTimeout(() => {
            sparkOverlay.classList.remove("active");
        }, 1000);
    });

    // Transición al Volver a la Carátula
    btnVolverCaratula.addEventListener("click", () => {
        sparkOverlay.classList.add("active");

        setTimeout(() => {
            caratulaOverlay.style.display = "flex";
            mainContent.classList.add("hidden");
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 600);

        setTimeout(() => {
            sparkOverlay.classList.remove("active");
        }, 1000);
    });

    // INFORMACIÓN DETALLADA PARA CADA TEMA AL HACER CLIC EN LAS IMÁGENES
    const topicsData = {
        seguridad: {
            title: "Normas de Seguridad y Protocolos en el Laboratorio de Electrónica",
            content: `
                <p>La seguridad en un taller de electrónica e informática es de carácter crítico para prevenir accidentes por descargas eléctricas, cortocircuitos o daños irreversibles en los componentes y equipos de medición.</p>
                <h3>1. Elementos de Protección Personal (EPP)</h3>
                <p>Es obligatorio el uso de calzado con suela aislante, evitar prendas holgadas que puedan engancharse en equipos rotativos o mesas de trabajo, y prescindir de accesorios metálicos (anillos, cadenas o pulseras) que actúen como conductores de alta corriente.</p>
                <h3>2. Protocolo ante Emergencias</h3>
                <p>Todo laboratorio cuenta con un interruptor termomagnético general de corte rápido (breaker principal). En caso de percance eléctrico o calentamiento anómalo en un circuito, se debe interrumpir la alimentación inmediatamente antes de manipular físicamente cualquier componente.</p>
            `
        },
        ohm: {
            title: "Estudio Profundo de la Ley de Ohm y Componentes Pasivos",
            content: `
                <p>Formulada por el físico alemán Georg Simon Ohm, esta ley es fundamental para el diseño y cálculo de sistemas electrónicos en la especialidad de Soporte e Informática.</p>
                <h3>Componentes Pasivos Principales:</h3>
                <p><strong>Resistencias de Carbón y Película Metálica:</strong> Su valor ohmico se determina mediante bandas de colores estandarizadas. El código de colores permite descifrar las primeras cifras significativas, el multiplicador y el porcentaje de tolerancia (generalmente 5% para banda dorada).</p>
                <p><strong>Disipación de Potencia:</strong> Toda resistencia disipa energía en forma de calor según la fórmula $P = V \times I$. Superar los límites de vataje provoca la destrucción térmica del componente.</p>
            `
        },
        kirchhoff: {
            title: "Análisis Avanzado de Redes mediante las Leyes de Kirchhoff",
            content: `
                <p>Cuando un circuito posee múltiples fuentes de voltaje o mallas interconectadas donde la Ley de Ohm simple no es suficiente, se aplican las dos leyes de conservación de Gustav Kirchhoff.</p>
                <h3>Aplicación Práctica:</h3>
                <p><strong>Primera Ley (Nodos):</strong> Utilizada para calcular cómo se reparte la corriente total entre las distintas ramas paralelas de una tarjeta o circuito impreso.</p>
                <p><strong>Segunda Ley (Mallas):</strong> Permite sumar algebraicamente las caídas de tensión en componentes activos y pasivos a lo largo de un camino cerrado, igualando la suma a la fuerza electromotriz total de la fuente.</p>
            `
        },
        protoboard: {
            title: "Prototipado Físico en Protoboard y Técnicas de Medición",
            content: `
                <p>La protoboard o placa de pruebas es el estándar educativo e industrial para la fase de pruebas previas al diseño esquemático en PCB (Printed Circuit Board).</p>
                <h3>Arquitectura Interna y Multímetro:</h3>
                <p>Las filas centrales están conectadas internamente en bloques de 5 puntos por columna, separados por un canal central aislante diseñado para la inserción de circuitos integrados (ICs).</p>
                <p><strong>Uso del Multímetro Digital:</strong> Para medir voltaje, el instrumento se conecta en <em>paralelo</em> respetando la polaridad DC; para medir corriente, se abre el circuito y se conecta en <em>serie</em> para que los electrones atraviesen el amperímetro.</p>
            `
        }
    };

    // Navegación a la sección de detalle al hacer clic en las imágenes
    const detailTriggers = document.querySelectorAll(".detail-trigger");
    detailTriggers.forEach(img => {
        img.addEventListener("click", () => {
            const topicKey = img.getAttribute("data-topic");
            const data = topicsData[topicKey];

            if (data) {
                sparkOverlay.classList.add("active");

                setTimeout(() => {
                    detailTitle.innerText = data.title;
                    detailContent.innerHTML = data.content;
                    mainContent.classList.add("hidden");
                    detailSection.classList.remove("hidden");
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 600);

                setTimeout(() => {
                    sparkOverlay.classList.remove("active");
                }, 1000);
            }
        });
    });

    // Botón para regresar al portafolio principal desde la sección de detalle
    btnVolverPortafolio.addEventListener("click", () => {
        sparkOverlay.classList.add("active");

        setTimeout(() => {
            detailSection.classList.add("hidden");
            mainContent.classList.remove("hidden");
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 600);

        setTimeout(() => {
            sparkOverlay.classList.remove("active");
        }, 1000);
    });

    // Interruptor para Desbloquear el Video
    const videoSwitch = document.getElementById("videoSwitch");
    const videoStatusText = document.getElementById("videoStatusText");
    const videoWrapper = document.getElementById("videoWrapper");

    videoSwitch.addEventListener("change", () => {
        if (videoSwitch.checked) {
            videoStatusText.innerText = "Estado: CIRCUITO CERRADO (Video Desbloqueado)";
            videoStatusText.classList.add("active");
            videoWrapper.classList.add("show");
        } else {
            videoStatusText.innerText = "Estado: CIRCUITO ABIERTO (Video Bloqueado)";
            videoStatusText.classList.remove("active");
            videoWrapper.classList.remove("show");
        }
    });
});