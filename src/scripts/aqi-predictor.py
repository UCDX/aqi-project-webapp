import pathlib
import datetime
import lib.aqi_by_components as aqi_by_components
import lib.common as common
import numpy as np
import matplotlib.pyplot as plt


def main():
  co = [223.64]
  no = [0.00]
  no2 = [0.80]
  o3 = [67.95]
  so2 = [0.63]
  pm2_5 = [10.64]
  pm10 = [21.97]
  nh3 = [0.00]
  
  args = common.parse_command_line_args()

  if args['--mode'] == 'by_comps':
    results = aqi_by_components.predict(
      co=args['--co'],
      no=args['--no'],
      no2=args['--no2'],
      o3=args['--o3'],
      so2=args['--so2'],
      pm2_5=args['--pm2_5'],
      pm10=args['--pm10'],
      nh3=args['--nh3'])
    print(results)
  elif args['--mode'] == 'generate_random_sample':
    n_sample = int(args['--sample-size'])
    generated_data = {
      'co': np.random.normal(np.float64(args['--co'][0]), np.float64(args['--co'][1]), n_sample).tolist(),
      'no': np.random.normal(np.float64(args['--no'][0]), np.float64(args['--no'][1]), n_sample).tolist(),
      'no2': np.random.normal(np.float64(args['--no2'][0]), np.float64(args['--no2'][1]), n_sample).tolist(),
      'o3': np.random.normal(np.float64(args['--o3'][0]), np.float64(args['--o3'][1]), n_sample).tolist(),
      'so2': np.random.normal(np.float64(args['--so2'][0]), np.float64(args['--so2'][1]), n_sample).tolist(),
      'pm2_5': np.random.normal(np.float64(args['--pm2_5'][0]), np.float64(args['--pm2_5'][1]), n_sample).tolist(),
      'pm10': np.random.normal(np.float64(args['--pm10'][0]), np.float64(args['--pm10'][1]), n_sample).tolist(),
      'nh3': np.random.normal(np.float64(args['--nh3'][0]), np.float64(args['--nh3'][1]), n_sample).tolist()
    }
    results = aqi_by_components.predict(
      co=generated_data['co'],
      no=generated_data['no2'],
      no2=generated_data['no2'],
      o3=generated_data['o3'],
      so2=generated_data['so2'],
      pm2_5=generated_data['pm2_5'],
      pm10=generated_data['pm10'],
      nh3=generated_data['nh3'])
    
    x_data = range(n_sample)
    y_data = []
    for row in results:
      y_data.append(row['aqi'])
    plt.plot(x_data, y_data)
    plt.scatter(x_data, y_data)
    time_series_fig_path = pathlib.Path(common.ROOT_DIR, 'tmp', str(datetime.datetime.now().timestamp()) + '.png')
    plt.savefig(time_series_fig_path)

    output = {
      'generated_sample': generated_data,
      'predicted_labels': results,
      'time_series_fig_path': time_series_fig_path
    }
    print(output)
  else:
    print('No action. Root dir:', common.ROOT_DIR.resolve())


if __name__ == '__main__':
  main()
