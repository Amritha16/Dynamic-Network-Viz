# Dynamic-Network-Viz
A dynamic contact network visualisation of the copenhagen network set.

## About the dataset: <br>
The dataset was a temporal contact network obtained from the copenhagen networks study.<br> https://www.nature.com/articles/s41597-019-0325-x <br>
The data is present as a temporal, weighted edge list, and each edge is described using (1) the timestamp of the beginning of the timebin in seconds, (2, 3) the IDs of users who discovered each other, (4) the measured received signal strength in dB. The study was conducted in a closed space and the bluetooth signals from the device (phones of participants) iteractions. The signals are in the range of [-100, 0], with the signal strength being inversely proportional to the distance between the interacting devices.<br>
The input dataset was of the form **(timestamp, user A, user B, rssi)** and was processed in into a json format for use in the following javascript code.

## About the visualisation: <br>
-> **Node of the node** is greater for nodes with higher degree centrality.<br>
-> **Color of the link** is darker for nodes that have come in close contact. The distance is determined by the signal strength, i.e, rssi value. <br>
-> The **stride range** will tell the range of time present displayed in the graph, eg, 1 min, 5 min, 1 hr, etc. <span style="color:orange">(I would recommend increasing the range since in a 1 min range, there's not many edges)</span><br>
-> **No.of strides/sec:** Using the corresponding buttons will increase/decrease the speed of the player
-> The number of links at each corresponding range is also displayed.<br>
-> This visualisation allows for a zoom in and zoom out too. <br>

## Additional code:
Since the existing templates from d3.js wasn't really that pretty, I switched to R's igrah package. The input file was a csv. Using some helper python code, and the positions from the igraph package, a json file was generated. And this was the file that was used by the javascript to generate a beautiful dynamic visualisation.<br>


### The visualisation was developed using Observable HQ and can be found at https://observablehq.com/@amritha16/contact-network
