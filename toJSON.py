#in the format
"""
{
    "node": [
        {
            "id": "0",
            "position": {
             "x": "477.03848",
             "y": "-25.933804"
            }
            "size": {
             "value": "19.714287"
            },
            "color": "0",
            "distance": "1"
        }
    ]
    "links": [
       {
          "id": "8489",
          "source": "0",
          "target": "29",
          "attvalues": {
             "attvalue": [
                {
                   "for": "ts_start",
                   "value": "2020-07-22 10:27:54"
                },
                {
                   "for": "ts_end",
                   "value": "2020-07-22 10:30:57"
                }
             ]
          }
        }
    ]
}"""
import csv
import json
import numpy as np
import pandas as pd
# df = pd.read_csv('IITJpos.csv', names = ['Source', 'x', 'y', 'd', 'dist'])
csvfileNode = open('IITJpos.csv', 'r')
jsonfile1 = open('covid19-new/data/mean_of_graph_durationsIITJ.json', 'w')
csvfileLink = open('/Users/amritha/Desktop/IITJ_meanGraph_15Mar-15Apr_hashed.csv')

# dfNodes = pd.read_csv('nodelist.csv')
# dataNodes = dfNodes.to_numpy()
# nodeDict = {}
# for i in range(len(dataNodes)):
#     nodeDict[int(dataNodes[i][0])] = {'color': dataNodes[i][1], 'distance': dataNodes[i][2]}
# # print(nodeDict)



jsonfile1.write("{\"node\":[")
first = True
for row in csv.reader(csvfileNode, delimiter=','):
    if first:
        first = False
    else:
        jsonfile1.write(",") 
    # if int(row[0]) in nodeDict: color, dist = nodeDict[int(row[0])]['color'], nodeDict[int(row[0])]['distance']; 
    # else: color, dist = 0, -1
    d = {"id" : row[0], "position" : {"x": row[1], "y": row[2]}, "size" : {"value": row[4]}, "color": {"value": row[3]}}
    json.dump(d, jsonfile1)
 
jsonfile1.write("],\"links\":[")
first, i = True, 0
for row in csv.reader(csvfileLink, delimiter=','):
    # if row[0] in df.Source and row[1] in df.Source:
    i += 1
    if first:
        first = False
    else:
        jsonfile1.write(",") 
    d = {"id": i, "source": row[0], "target": row[1], "weight": row[2],
        "attvalues": 
            { "attvalue": [{
                "for": "ts_start",
                "value": row[3]
                },
                {
                "for": "ts_end",
                "value": row[4]
                }
            ]} 
        }
    json.dump(d, jsonfile1)
jsonfile1.write("]}")
print("JSON ready!")
