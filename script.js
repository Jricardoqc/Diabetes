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
