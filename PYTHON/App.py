from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)
model = joblib.load("modelo_diabetes.pkl")

@app.route('/prever', methods=['POST'])
def prever():
    data = request.json

    entrada = np.array([[
        data["age"],
        data["bmi"],
        data["blood_glucose_level"],
        data["gender"],
        data["hypertension"],
        data["heart_disease"],
        data["smoking_history"]
    ]])

    resultado = int(model.predict(entrada)[0])
    return jsonify({"resultado": resultado})

if __name__ == "__main__":
    app.run(debug=True)
