import pathlib
import pickle
from tensorflow.keras.models import load_model
from sklearn.preprocessing import StandardScaler
import pandas as pd
import numpy as np

def map_y_prob_to_label(y_prob):
  labels = {
    0: {
      'aqi': 1,
      'label': 'Good'
    },
    1: {
      'aqi': 2,
      'label': 'Fair'
    },
    2: {
      'aqi': 3,
      'label': 'Moderate'
    },
    3: {
      'aqi': 4,
      'label': 'Poor'
    },
    4: {
      'aqi': 5,
      'label': 'Very Poor'
    }
  }
  arg_max = np.argmax(y_prob)
  return labels[arg_max]


def predict(co, no, no2, o3, so2, pm2_5, pm10, nh3):
  base_path = pathlib.Path(__file__).parent.absolute()
  # Load neural network.
  model_path = pathlib.Path(base_path, '..', 'models', 'model_comp_aqi.h5')
  model = load_model(model_path)
  # Load standard serilizer for preictors.
  std_scaler_path = pathlib.Path(base_path, '..', 'models', 'standard_scaler_aqi_predictors.bin')
  std_caler = pickle.load(open(std_scaler_path, 'rb'))

  X_df = pd.DataFrame({
    'co': co,
    'no': no,
    'no2': no2,
    'o3': o3,
    'so2': so2,
    'pm2_5': pm2_5,
    'pm10': pm10,
    'nh3': nh3
  })

  X = std_caler.transform(X_df)
  y_probs = model.predict(X, verbose = False)
  
  results = []
  for y_prob in y_probs:
    results.append(map_y_prob_to_label(y_prob))
  
  return results
