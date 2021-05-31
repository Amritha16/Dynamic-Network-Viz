import pandas as pd
import networkx as nx
import numpy as np
import datetime
#Read the file
df = pd.read_csv('your-path-to-the-copenhagen-dataset.csv')
data = df.to_numpy()

#Since igrpah accepts only an edgelist that has nodes number from 0 - n, we have to replace the original ids. 
i = 1
nodes = {}
nodes[-1] = -1
nodes[-2] = -2
for k in df['A']:
    if k not in nodes:
        nodes[k] = i
        i += 1
for k in df['B']:
    if k not in nodes:
        nodes[k] = i
        i += 1
column_to_be_added_s = []
column_to_be_added_t = []
column_to_be_added_d = []
row_to_be_deleted = []
for j in range(len(data)):
    column_to_be_added_s.append(nodes[data[j][1]])
    column_to_be_added_t.append(nodes[data[j][2]])
    column_to_be_added_d.append(datetime.timedelta(0, float(data[j][0])) + datetime.datetime(2010, 1, 1))
    if data[j][2] < 0: row_to_be_deleted.append(j) #if it's an empty scan, we needn't include it for the visualisation

result = np.column_stack((data, column_to_be_added_d, column_to_be_added_s, column_to_be_added_t))
result = np.delete(result, row_to_be_deleted, 0)

dataset = pd.DataFrame({'Source' : result[:, 5], 'Target' : result[:, 6], 'weight': result[:, 3], 
                        'time' : result[:, 4], 
                        })
#Store the updated files as edgelist (has only source and target, used by the igraph package) and the mean_of_durations file
dataset.to_csv('edgelist.csv',  columns = ['Source', 'Target'],mode = 'w', index=False, header=False)
dataset.to_csv('mean_of_durations.csv', columns = ['Source', 'Target', 'weight', 'time'], mode = 'w', index=True, header=False)
print("Preprocessing Done!")
