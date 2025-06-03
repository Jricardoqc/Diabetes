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
    age: Number(document.getElementById("idade").value),
    bmi: Number(document.getElementById("imc").value),
    blood_glucose_level: Number(document.getElementById("glicose").value),
    gender: Number(
      document.querySelector('input[name="genero"]:checked').value
    ),
    hypertension: Number(
      document.querySelector('input[name="hipertensao"]:checked').value
    ),
    heart_disease: Number(
      document.querySelector('input[name="coracao"]:checked').value
    ),
    smoking_history: Number(
      document.querySelector('input[name="fuma"]:checked').value
    ),
  };

  fetch("http://localhost:5000/prever", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  })
    .then((res) => res.json())
    .then((data) => {
      const resultado =
        data.resultado === 1
          ? "Alto risco de diabetes"
          : "Baixo risco de diabetes";
      alert("Resultado: " + resultado);
    });
}
