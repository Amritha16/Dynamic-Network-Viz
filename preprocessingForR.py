import pandas as pd
import networkx as nx
import numpy as np
import datetime
# df = pd.read_csv('mean_of_graph_durations.csv')
# df = pd.read_csv('hashed_Updated_Mean_graph_March_IITJ.csv')
# dfNodes = pd.read_csv('hashed_nodeLabels_85_900.csv', sep=' ')
df = pd.read_csv('/Users/amritha/Documents/Programs/W-SEIR/Data/copenhagenData.csv')
data = df.to_numpy()
print(data[0])
# dataNodes = dfNodes.to_numpy()
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
    if data[j][2] < 0: row_to_be_deleted.append(j)

result = np.column_stack((data, column_to_be_added_d, column_to_be_added_s, column_to_be_added_t))
result = np.delete(result, row_to_be_deleted, 0)
# column_to_be_added_nodes = []
# for l in range(len(dataNodes)):
#     column_to_be_added_nodes.append(nodes[dataNodes[l][0]])
# resultNodes = np.column_stack((dataNodes, column_to_be_added_nodes))

# datasetNodes = pd.DataFrame({'Node': resultNodes[:,0], 'newNode': resultNodes[:, 4], 'color': resultNodes[:, 1], 'distance': resultNodes[:, 2], 'timestamp': resultNodes[:, 3]})
# datasetNodes.to_csv('nodelist.csv', columns = ['newNode', 'color', 'distance'],index=False, header=True)

dataset = pd.DataFrame({'Source' : result[:, 5], 'Target' : result[:, 6], 'weight': result[:, 3], 
                        # 'ts_start': result[:, 3], 'ts_end' : result[:, 4], 
                        'time' : result[:, 4], 
                        # 'SourceID': result[:, 0], 'TargetID': result[:, 1]
                        })
dataset.to_csv('edgelist.csv',  columns = ['Source', 'Target'],mode = 'w', index=False, header=False)
dataset.to_csv('mean_of_durations.csv', columns = ['Source', 'Target', 'weight', 'time'], mode = 'w', index=True, header=False)
print("Preprocessing Done!")