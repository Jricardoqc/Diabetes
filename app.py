from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd

# Carregar modelo e encoders
modelo = joblib.load('modelo_final.pkl')
le_gender = joblib.load('encoder_gender.pkl')
le_smoking = joblib.load('encoder_smoking.pkl')

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json

        # Campos esperados
        expected_fields = [
            'gender', 'age', 'hypertension', 'heart_disease',
            'smoking_history', 'bmi', 'HbA1c_level', 'blood_glucose_level'
        ]

        # Verificação de campos ausentes
        missing_fields = [field for field in expected_fields if field not in data]
        if missing_fields:
            return jsonify({
                'error': f"Campos ausentes: {', '.join(missing_fields)}"
            }), 400

        # Transformação das variáveis categóricas
        try:
            gender = le_gender.transform([data['gender']])[0]
        except ValueError:
            return jsonify({
                'error': f"Valor inválido para 'gender': {data['gender']}. Valores aceitos: {list(le_gender.classes_)}"
            }), 400

        try:
            smoking_history = le_smoking.transform([data['smoking_history']])[0]
        except ValueError:
            return jsonify({
                'error': f"Valor inválido para 'smoking_history': {data['smoking_history']}. Valores aceitos: {list(le_smoking.classes_)}"
            }), 400

        # Criação do DataFrame com nomes das colunas
        input_data = pd.DataFrame([{
            'gender': gender,
            'age': float(data['age']),
            'hypertension': int(data['hypertension']),
            'heart_disease': int(data['heart_disease']),
            'smoking_history': smoking_history,
            'bmi': float(data['bmi']),
            'HbA1c_level': float(data['HbA1c_level']),
            'blood_glucose_level': float(data['blood_glucose_level'])
        }])

        # Predição
        prediction = modelo.predict(input_data)[0]

        return jsonify({
            'prediction': int(prediction),
            'diabetes': 'Sim' if prediction == 1 else 'Não'
        })

    except Exception as e:
        return jsonify({'error': f"Ocorreu um erro interno: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
