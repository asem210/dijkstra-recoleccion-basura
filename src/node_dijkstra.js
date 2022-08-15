
export const Graph = () =>{ 

    var sourceGraph;

    constructor()
    {
        this.sourceGraph = new Map();
    }

    function addNode (nameNode ,{nodos : [{Nodes : distance}]} ){
        sourceGraph.set(nameNode);

        for(n in nodos ){
            sourceGraph.node.set(nameNode,n.distance);
        }
        }

   



    function path(startNode,endNode) {
        var copyGraph = sourceGraph;
        var sNode = copyGraph.nodes[copyGraph.nodes.indexOf(startNode)];
        var eNode = copyGraph.nodes[copyGraph.nodes.indexOf(endNode)];
        var ALGORITHM = true;
        var TDISTANCE = 0;
        for (var n in copyGraph) {
            if (n instanceof Node) {
                n.distance = Infinity;
                n.visited = false;
            }
        }
        sNode.distance = 0;
        var unvisited = copyGraph.nodes;
        unvisited.splice(unvisited.indexOf(sNode),1);
        var path = [];
        var previous = [];
        var currentNode = sNode;
        while (ALGORITHM) {
            var connectedNodes = [];
            for (var i=0;i<currentNode.edges.length;i++) {
                var length = currentNode.edges[i].v;
                if (currentNode.edges[i].c1 != currentNode && !currentNode.edges[i].c1.visited) {
                    if (currentNode.distance+length < currentNode.edges[i].c1.distance) {
                        currentNode.edges[i].c1.distance = currentNode.distance+length;
                    }
                    connectedNodes.push(currentNode.edges[i].c1);
                } else if (currentNode.edges[i].c2 != currentNode && !currentNode.edges[i].c2.visited) {
                    if (currentNode.distance+length < currentNode.edges[i].c2.distance) {
                        currentNode.edges[i].c2.distance = currentNode.distance+length;
                    }
                    connectedNodes.push(currentNode.edges[i].c2);
                }
            }
            var bestConnected = connectedNodes.sort(function(a,b) { return a.distance-b.distance; })[0];
            unvisited.splice(unvisited.indexOf(currentNode),1);
            currentNode.visited = true;
            currentNode = best;
            path.push(currentNode);
            if (currentNode == eNode) {
                ALGORITHM = false;
                break;  
            }
        }
        return path;
    }



}

