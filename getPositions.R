library(igraph)
library(qgraph)
rescale = function(x,a,b,c,d){c + (x-a)/(b-a)*(d-c)}
dat=read.csv("~/Documents/Programs/W-SEIR/Automation/edgelist.csv",header=FALSE)
m = matrix(as.matrix(dat),ncol=ncol(dat),dimnames=NULL)
g = graph_from_edgelist(m, directed=FALSE)
l <- qgraph.layout.fruchtermanreingold(as_edgelist(g),area=11*(vcount(g)^3),vcount=vcount(g),repulse.rad=(vcount(g)^3.1))
l <- l*2
binded <- cbind(l, rescale(degree(g), 0, max(degree(g)) / 3, 8, 18))
write.table(binded, file="positions.csv", sep = ",", col.names = F)
#Modified Fruchterman Reingold to our needs
#l has the positions of each nodes
#plot(g,vertex.label=NA,vertex.size=rescale(degree(g), 0, max(degree(g)) / 3, 2, 6),
#            layout=l)
print("Positions of nodes obtained!")
