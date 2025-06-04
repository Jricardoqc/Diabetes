const botao = document.querySelectorAll(".botao");

botao.forEach((botao) => {
  botao.addEventListener("mouseenter", () => {
    botao.style.background = "#2088FF";
    botao.style.transform = "scale(1.05)";
  });

  botao.addEventListener("mouseleave", () => {
    botao.style.background = "#1259aa";
    botao.style.transform = "scale(1)";
  });
});
function enviarFormulario() {
  const dados = {
    gender: document.querySelector('input[name="genero"]:checked').value,
    age: Number(document.getElementById("idade").value),
    hypertension: Number(document.querySelector('input[name="hipertensao"]:checked').value),
    heart_disease: Number(document.querySelector('input[name="coracao"]:checked').value),
    smoking_history: document.querySelector('input[name="fuma"]:checked').value,
    bmi: Number(document.getElementById("imc").value),
    HbA1c_level: Number(document.getElementById("hba1c").value),
    blood_glucose_level: Number(document.getElementById("glicose").value)
  };

  fetch("https://diabetes-jp84.onrender.com/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados)
  })
    .then((res) => {
      if (!res.ok) {
        return res.json().then(err => { throw err; });
      }
      return res.json();
    })
    .then((data) => {
      alert("Resultado: " + data.diabetes);
    })
    .catch((err) => {
      console.error("Erro na requisição:", err);
      alert("Erro: " + (err.error || "Erro ao enviar dados"));
    });
}

const openBtn = document.getElementById('openPopup');
const closeBtn = document.getElementById('closePopup');
const popup = document.getElementById('popup');

openBtn.addEventListener('click', () => {
  popup.classList.remove('popup-hidden');
  popup.classList.add('popup-visible');
});

closeBtn.addEventListener('click', () => {
  popup.classList.remove('popup-visible');
  popup.classList.add('popup-hidden');
});

// Fecha o pop-up se clicar fora do conteúdo
popup.addEventListener('click', (e) => {
  if (e.target === popup) {
    popup.classList.remove('popup-visible');
    popup.classList.add('popup-hidden');
  }
});
