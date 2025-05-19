//musica

  const music = document.getElementById("backgroundMusic");
  const toggleBtn = document.getElementById("musicToggleBtn");
  const popup = document.getElementById("musicPopup");

  let musicStarted = false;

  function startMusic(playMusic) {
    popup.style.display = "none";
    toggleBtn.style.display = "block";

    if (playMusic) {
      music.play();
      toggleBtn.textContent = "⏸";
      musicStarted = true;
    } else {
      toggleBtn.textContent = "▶";
      musicStarted = false;
    }
  }

  function toggleMusic() {
    if (!musicStarted) {
      music.play();
      toggleBtn.textContent = "⏸";
      musicStarted = true;
    } else if (!music.paused) {
      music.pause();
      toggleBtn.textContent = "▶";
    } else {
      music.play();
      toggleBtn.textContent = "⏸";
    }
  }


//countdown
const eventDate = new Date("2025-06-13T21:00:00");

function updateCountdown() {
  const now = new Date();
  const diffTime = eventDate - now;

  if (diffTime <= 0) {
    document.getElementById("dias").textContent = "0";
    document.getElementById("horas").textContent = "0";
    document.getElementById("minutos").textContent = "0";
    document.getElementById("segundos").textContent = "0";
    return;
  }

  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffTime / (1000 * 60 * 60)) % 24);
  const diffMinutes = Math.floor((diffTime / (1000 * 60)) % 60);
  const diffSeconds = Math.floor((diffTime / 1000) % 60);

  document.getElementById("dias").textContent = diffDays;
  document.getElementById("horas").textContent = diffHours;
  document.getElementById("minutos").textContent = diffMinutes;
  document.getElementById("segundos").textContent = diffSeconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);


// Galeria de fotos

$(document).ready(function(){
  $('.galeria').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1200,
    dots: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });
});



//modales

function modales (botonAbrirID, modalID, botonCerrarID) {
  const btnAbrir = document.querySelector(`#${botonAbrirID}`);
  const modal = document.querySelector(`#${modalID}`);
  const btnCerrar = document.querySelector(`#${botonCerrarID}`);

  btnAbrir?.addEventListener("click", () => modal.showModal());
  btnCerrar?.addEventListener("click", () => modal.close());
}


modales("btn-modal-maps", "modal-maps", "btn-cerrar");
modales("btn-modal-regalos", "modal-regalos", "btn-cerrar-regalos");
modales ("btn-modal-asist", "modal-asist", "btn-cerrar-asist");
modales ("btn-modal-musica", "modal-cancion", "btn-cerrar-cancion");  


// ENVIAR wsp cancion

const nombreCancion = document.querySelector('#nombreCancion');
const mensajeCancion = document.querySelector('#mensajeCancion');
const btnEnviarMusica = document.querySelector('#btnEnviarCancion');

function enviarCancion() {
  const nombre1 = nombreCancion.value.trim();
  const cancion = mensajeCancion.value.trim();

  const textoFinal = `Hola! Mi nombre es ${nombre1}.\nPara los XV de Sofía sugiero la canción: ${cancion}`;
  const url = `https://open.spotify.com/playlist/6BdvXDDQUBVfYgWLGu2KK7?si=56e115d8f0e44cfa&pt=5886f896a7f9d03ceda23f36b84bb01d${encodeURIComponent(textoFinal)}`;

  btnEnviarMusica.href = url;
}


//copiar texto


function copiarTexto(id, boton) {
  const textoEl = document.getElementById(id);
  const textoOriginal = textoEl.innerText;
  boton.disabled = true; 

  navigator.clipboard.writeText(textoOriginal)
    .then(() => {
      textoEl.innerText = "¡Copiado!";
      textoEl.style.color = "green"; 
      setTimeout(() => {
        textoEl.innerText = textoOriginal;
        textoEl.style.color = "";
        boton.disabled = false;
      }, 1500); 
    })
    .catch(err => {
      console.error("Error al copiar:", err);
      boton.disabled = false;
    });
}

//mensaje wsp

function abrirFormulario(opcion) {
  const modal = document.getElementById('modal-asist');
  modal.showModal();

  const radioSi = document.querySelector('input[name="asistencia"][value="si"]');
  const radioNo = document.querySelector('input[name="asistencia"][value="no"]');

  if (opcion === 'no') {
    radioNo.checked = true;
  } else {
    radioSi.checked = true;
  }

  controlarAsistencia();
}

function controlarAsistencia() {
  const asistenciaNo = document.querySelector('input[name="asistencia"][value="no"]').checked;
  const bloqueRestricciones = document.getElementById('bloqueRestricciones');
  const otraDiv = document.getElementById('otraRestriccion');

  if (asistenciaNo) {
    bloqueRestricciones.style.display = 'none';
    otraDiv.style.display = 'none';
  } else {
    bloqueRestricciones.style.display = 'block';
    mostrarOtraRestriccion();
  }
}

function mostrarOtraRestriccion() {
  const otraCheckbox = document.getElementById('otra');
  const otraDiv = document.getElementById('otraRestriccion');
  otraDiv.style.display = otraCheckbox.checked ? 'block' : 'none';
}

function enviarPorWsp() {
  const nombre = document.getElementById('name').value.trim();
  const mensajeExtra = document.getElementById('datoMensaje').value.trim();
  const asistencia = document.querySelector('input[name="asistencia"]:checked').value;

  let textoFinal = '';

  if (asistencia === 'no') {
    textoFinal = `Hola, mi nombre es ${nombre}.\nNo podré asistir a los XV de Sofia.${mensajeExtra ?
    '\nMensaje: ' + mensajeExtra : ''}`;
  } else {
    const checks = document.querySelectorAll('input[name="restriccion"]:checked');
    const detalleOtra = document.getElementById('detalleOtra').value.trim();
    let restricciones = [];

    checks.forEach(check => {
      if (check.value === 'otra') {
        if (detalleOtra) {
          restricciones.push('Otra: ' + detalleOtra);
        }
      } else if (check.value === 'ninguna') {
        restricciones = ['Sin restricciones alimentarias'];
      } else {
        restricciones.push(check.value);
      }
    });

    if (restricciones.includes('Sin restricciones alimentarias')) {
      restricciones = ['Sin restricciones'];
    }

    textoFinal = `Hola, confirmo mi asistencia para los XV de Sofia.
    \n*Nombre completo:* ${nombre}.\n*Alimentación:* ${restricciones.join(', ')}.${mensajeExtra ? '\n*Mensaje:* ' + mensajeExtra : ''}`;
  }

  const url = `https://api.whatsapp.com/send?phone=5491165321904&text=${encodeURIComponent(textoFinal)}`;
  document.getElementById('btnEnviarWsp').href = url;
}
