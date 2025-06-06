from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd
import os
import requests

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

MODEL_PATH = 'modelo_final_comprimido.pkl'

# Carregar modelo e encoders
modelo = joblib.load(MODEL_PATH)
le_gender = joblib.load('encoder_gender.pkl')
le_smoking = joblib.load('encoder_smoking.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get__json()
        print("📥 Dados recebidos:", data)

        expected_fields = [
            'gender', 'age', 'hypertension', 'heart_disease',
            'smoking_history', 'bmi', 'HbA1c_level', 'blood_glucose_level'
        ]

        missing_fields = [field for field in expected_fields if field not in data]
        if missing_fields:
            return jsonify({'error': f"Campos ausentes: {', '.join(missing_fields)}"}), 400

        try:
            gender = le_gender.transform([data['gender']])[0]
        except ValueError:
            return jsonify({'error': f"Valor inválido para 'gender': {data['gender']}. Valores aceitos: {list(le_gender.classes_)}"}), 400

        try:
            smoking_history = le_smoking.transform([data['smoking_history']])[0]
        except ValueError:
            return jsonify({'error': f"Valor inválido para 'smoking_history': {data['smoking_history']}. Valores aceitos: {list(le_smoking.classes_)}"}), 400

        entrada = np.array([[
            int(data["gender"]),
            float(data["age"]),
            int(data["hypertension"]),
            int(data["heart_disease"]),
            int(data["smoking_history"]),
            float(data["bmi"]),
            float(data["HbA1c_level"]),
            float(data["blood_glucose_level"])
        ]])

        print("✅ Entrada formatada:", entrada)

        prediction = modelo.predict(entrada)[0]
        print("🧠 Resultado:", prediction)

        return jsonify({
            'prediction': int(prediction),
            'diabetes': 'Sim' if prediction == 1 else 'Não'
        })

    except Exception as e:
        print("❌ Erro:", str(e))  # Log completo do erro
        return jsonify({'error': f"Ocorreu um erro interno: {str(e)}"}), 500

if __name__ == '__main__':
    import sys
    if 'gunicorn' not in sys.argv[0]:
        app.run(host='0.0.0.0', port=5000)
