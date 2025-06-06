function enviarFormulario() {
  const dados = {
    gender: document.querySelector('input[name="genero"]:checked').value,
    age: Number(document.getElementById("idade").value),
    hypertension: Number(
      document.querySelector('input[name="hipertensao"]:checked').value
    ),
    heart_disease: Number(
      document.querySelector('input[name="coracao"]:checked').value
    ),
    smoking_history: document.querySelector('input[name="fuma"]:checked').value,
    bmi: Number(document.getElementById("imc").value),
    HbA1c_level: Number(document.getElementById("hba1c").value),
    blood_glucose_level: Number(document.getElementById("glicose").value),
  };

  fetch("http://127.0.0.1:5000/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  })
    .then(async (res) => {
      const texto = await res.text(); // pega o corpo como texto cru

      if (!texto) {
        throw new Error("Resposta vazia da API");
      }

      const data = JSON.parse(texto);
      console.log("Resposta da API:", data);
      alert("Diagnóstico: " + data.diabetes);
    })
    .catch((error) => {
      console.error("Erro na requisição:", error);
    });
}
document.addEventListener("DOMContentLoaded", () => {
  let slideAtual = 0;
  const slides = document.querySelectorAll(".slide");
  const anteriorBtn = document.getElementById("anterior");
  const proximoBtn = document.getElementById("proximo");

  function mostrarSlide(index) {
    slides.forEach((slide) => slide.classList.remove("ativo"));
    slideAtual = (index + slides.length) % slides.length;
    slides[slideAtual].classList.add("ativo");
  }

  anteriorBtn.addEventListener("click", () => {
    mostrarSlide(slideAtual - 1);
  });

  proximoBtn.addEventListener("click", () => {
    mostrarSlide(slideAtual + 1);
  });

  mostrarSlide(slideAtual);
});

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

const abrirBtn = document.getElementById("abrirCalculadora");
const modal = document.getElementById("modalIMC");
const fecharBtn = document.getElementById("fecharModal");

abrirBtn.onclick = () => {
  modal.style.display = "block";
};

fecharBtn.onclick = () => {
  modal.style.display = "none";
};

window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Cálculo do IMC
function calcularIMC() {
  const peso = parseFloat(document.getElementById("peso").value);
  const altura = parseFloat(document.getElementById("altura").value);

  if (!peso || !altura || altura === 0) {
    document.getElementById("resultado-imc").textContent =
      "Please enter valid values.";
    return;
  }

  const imc = peso / (altura * altura);
  let classificacao = "";

  if (imc < 18.5) classificacao = "Underweight";
  else if (imc < 24.9) classificacao = "Normal weight";
  else if (imc < 29.9) classificacao = "Overweight";
  else if (imc < 34.9) classificacao = "Obesity grade I";
  else if (imc < 39.9) classificacao = "Obesity grade II";
  else classificacao = "Obesity grade III";

  document.getElementById(
    "resultado-imc"
  ).textContent = `Your BMI is ${imc.toFixed(2)} (${classificacao})`;
}
