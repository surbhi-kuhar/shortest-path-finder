var array = [];

function convertStringToArray(edges) {
  var triplets = edges.split(",");
  var minNodeId = Infinity;
  var maxNodeId = -Infinity;

  for (var i = 0; i < triplets.length; i++) {
    var triplet = triplets[i].split("-");

    if (triplet.length === 3) {
      var startNode = parseInt(triplet[0]);
      var endNode = parseInt(triplet[1]);
      var weight = parseInt(triplet[2]);

      if (!isNaN(startNode) && !isNaN(endNode) && !isNaN(weight)) {
        array.push([startNode, endNode, weight]);
        // Update min and max node IDs
        minNodeId = Math.min(minNodeId, startNode, endNode);
        maxNodeId = Math.max(maxNodeId, startNode, endNode);
      }
    }
  }

  // Check if nodes don't start from 0
  if (minNodeId !== 0) {
    alert("Nodes should start from 0. Please correct the node IDs.");
    array = []; // Clear the array to prevent graph construction
  }
}

function generateGraph(edges) {
  // Get the width and height of the container

  d3.select("#graph-container").selectAll("svg").remove();

  var containerWidth = 700;
  var containerHeight = 500;

  // Extract unique nodes from the first two elements of the edges
  var uniqueNodes = [...new Set(edges.map((edge) => edge.slice(0, 2)).flat())];

  // Create an SVG element within the container
  var svg = d3
    .select("#graph-container")
    .append("svg")
    .attr("width", containerWidth)
    .attr("height", containerHeight);

  // Define the positions of nodes and their names based on unique nodes
  var nodesData = uniqueNodes.map(function (id) {
    return {
      id: id,
      x: Math.random() * containerWidth,
      y: Math.random() * containerHeight,
      name: id.toString(),
    };
  });

  // Create nodes as circles with specified positions
  var nodeRadius = 30;
  var nodeElements = svg
    .selectAll(".node")
    .data(nodesData)
    .enter()
    .append("g")
    .attr("class", "node");

  // Add circles for nodes
  nodeElements
    .append("circle")
    .attr("r", nodeRadius)
    .attr("cx", function (d) {
      return d.x;
    })
    .attr("cy", function (d) {
      return d.y;
    });

  // Add text labels for nodes with customized color
  nodeElements
    .append("text")
    .text(function (d) {
      return d.name;
    })
    .attr("x", function (d) {
      // Calculate the x position to center the text
      return d.x - this.getBBox().width / 2;
    })
    .attr("y", function (d) {
      // Calculate the y position to center the text
      return d.y + this.getBBox().height / 2;
    })
    .attr("dy", ".35em") // Vertical alignment
    .style("font-size", function (d) {
      // Calculate and set the font size based on the node radius
      return calculateFontSize(nodeRadius) + "px";
    })
    .style("font-weight", "100");

  // Create links (edges) connecting nodes
  // Create links (edges) connecting nodes
  var linkElements = svg
    .selectAll(".link")
    .data(edges)
    .enter()
    .append("line")
    .attr("class", "link")
    .attr("x1", function (d) {
      var sourceNode = nodesData.find((node) => node.id === d[0]);
      return sourceNode ? sourceNode.x : 0;
    })
    .attr("y1", function (d) {
      var sourceNode = nodesData.find((node) => node.id === d[0]);
      return sourceNode ? sourceNode.y : 0;
    })
    .attr("x2", function (d) {
      var targetNode = nodesData.find((node) => node.id === d[1]);
      return targetNode ? targetNode.x : 0;
    })
    .attr("y2", function (d) {
      var targetNode = nodesData.find((node) => node.id === d[1]);
      return targetNode ? targetNode.y : 0;
    })
    .attr("marker-end", "url(#arrow)");

  svg
    .append("defs")
    .selectAll("marker")
    .data(["arrow"])
    .enter()
    .append("marker")
    .attr("id", function (d) {
      return d;
    })
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 18) // Adjust the position of the arrowhead
    .attr("refY", 0)
    .attr("markerWidth", 8)
    .attr("markerHeight", 8)
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M0,-5L10,0L0,5");

  var edgeTextElements = svg
    .selectAll(".edge-text")
    .data(edges)
    .enter()
    .append("text")
    .attr("class", "edge-text")
    .attr("x", function (d) {
      var sourceNode = nodesData.find((node) => node.id === d[0]);
      var targetNode = nodesData.find((node) => node.id === d[1]);
      if (sourceNode && targetNode) {
        return (sourceNode.x + targetNode.x) / 2;
      } else {
        return 0; // Handle the case where either source or target node is missing
      }
    })
    .attr("y", function (d) {
      var sourceNode = nodesData.find((node) => node.id === d[0]);
      var targetNode = nodesData.find((node) => node.id === d[1]);
      if (sourceNode && targetNode) {
        return (sourceNode.y + targetNode.y) / 2 - 10;
      } else {
        return 0; // Handle the case where either source or target node is missing
      }
    })
    .style("fill", "black")
    .style("font-weight", "bold")
    .text(function (d) {
      return d[2];
    });

  function calculateFontSize(nodeRadius) {
    // You can adjust this factor to control the font size relative to the node size
    const fontSizeFactor = 0.4;
    return nodeRadius * fontSizeFactor;
  }
}

function createAdjacencyList(edges, numNodes) {
  const adj = new Array(numNodes).fill([]).map(() => []);

  for (const edge of edges) {
    const [startNode, endNode, weight] = edge;
    adj[startNode].push([endNode, weight]);
  }

  return adj;
}

var n;

function generate() {
  n = document.getElementById("nodes").value;
  var edges = document.getElementById("edges").value;

  document.getElementById("nodes").value = "";
  document.getElementById("edges").value = "";

  console.log(n);
  console.log(edges);

  convertStringToArray(edges);
  console.log(array);
  // adj = createAdjacencyList(array, n);
  if (array.length != 0) {
    generateGraph(array);

    document.getElementsByClassName("center")[0].style.display = "none";

    document.getElementById("graph-container").style.display = "block";
    document.getElementsByClassName("change-graph")[0].style.display = "block";

    document.getElementById("dijk-in").style.display = "block";
    document.getElementById("dijk-in").style.display = "flex";
    document.getElementById("dijk-in").style.justifyContent = "center";
    document.getElementById("dijk-in").style.alignItems = "center";
    document.getElementById("find-btn").style.display = "block";
    document.getElementsByClassName("back")[0].style.display = "block";
  }
}

function changeGraph() {
  // Remove the existing SVG elements from the graph-container
  d3.select("#graph-container").selectAll("svg").remove();

  generateGraph(array);
}

function convertArrayToMap(array) {
  const map = new Map();

  for (const [startNode, endNode, weight] of array) {
    if (!map.has(startNode)) {
      map.set(startNode, []);
    }
    if (!map.has(endNode)) {
      map.set(endNode, []);
    }

    map.get(startNode).push([endNode, weight]);
  }

  return map;
}

function find() {
  var start = document.getElementById("startNode").value;
  var end = document.getElementById("endNode").value;

  if (isNaN(start) || isNaN(end)) {
    alert("Either start or end is not a valid number");
    d3.selectAll(".node circle").style("fill", null);
    d3.selectAll(".link").style("stroke", null);
  } else if (start == end) {
    alert("Enter different start and end nodes");
  } else {
    const map = convertArrayToMap(array);
    console.log(map);

    if (!map.has(parseInt(start)) || !map.has(parseInt(end))) {
      alert("Enter a valid start and end node");
      d3.selectAll(".node circle").style("fill", null);
      d3.selectAll(".link").style("stroke", null);
    } else {
      dijkstra(map, parseInt(start), n, parseInt(end));
    }
  }
  document.getElementById("startNode").value = "";
  document.getElementById("endNode").value = "";
}

// problem with number of nodes.

function highlightShortestPath(shortestPath) {
  d3.selectAll(".node circle").style("fill", null);
  d3.selectAll(".link").style("stroke", null);

  // Highlight nodes and edges on the shortest path
  d3.selectAll(".node")
    .filter((d) => shortestPath.includes(d.id))
    .select("circle")
    .style("fill", "green");

  for (let i = 0; i < shortestPath.length - 1; i++) {
    const source = shortestPath[i];
    const target = shortestPath[i + 1];

    d3.selectAll(".link")
      .filter((d) => d[0] === source && d[1] === target)
      .style("stroke", "red");
  }
}

function dijkstra(map, S, n, E) {
  console.log("Inside dijkstra :" + n);
  const dist = [];

  for (var i = 0; i < n; i++) {
    dist.push(Number.MAX_SAFE_INTEGER);
  }

  console.log("Initial dist:", dist);

  const s = new Set();
  dist[S] = 0;
  s.add([0, S]);

  const predecessors = new Array(n).fill(null);

  while (s.size > 0) {
    const top = [...s][0];

    const weight = top[0];
    const topnode = top[1];

    s.delete(top);

    if (!map.has(topnode)) {
      // Skip if the node is not in the map
      continue;
    }

    for (const [nextNode, edgeWeight] of map.get(topnode)) {
      if (weight + edgeWeight < dist[nextNode]) {
        const record = Array.from(s).find(([d, n]) => n === nextNode);
        if (record !== undefined) {
          s.delete(record);
        }
        dist[nextNode] = weight + edgeWeight;
        s.add([dist[nextNode], nextNode]);

        predecessors[nextNode] = topnode;
      }
    }
  }

  console.log("Final dist:", dist);

  // Check if the destination node is unreachable
  if (dist[E] === Number.MAX_SAFE_INTEGER) {
    d3.selectAll(".node circle").style("fill", null);
    d3.selectAll(".link").style("stroke", null);
    console.log("No path found from " + S + " to " + E);
    return;
  }

  console.log(`Shortest distance from ${S} to ${E} is ${dist[E]}`);

  const shortestPath = [];
  let currentNode = E;

  while (currentNode !== S) {
    shortestPath.unshift(currentNode);
    currentNode = predecessors[currentNode];
  }

  shortestPath.unshift(S); // Include the source node

  console.log("Shortest path:", shortestPath);
  highlightShortestPath(shortestPath);
}

function back() {
  // Remove the existing SVG elements from the graph-container
  d3.select("#graph-container").selectAll("svg").remove();

  // Clear the edges array
  array = [];

  // Hide the graph container and related elements
  document.getElementById("graph-container").style.display = "none";
  document.getElementsByClassName("change-graph")[0].style.display = "none";
  document.getElementById("dijk-in").style.display = "none";
  document.getElementById("find-btn").style.display = "none";
  document.getElementsByClassName("back")[0].style.display = "none";

  // Show the center div
  document.getElementsByClassName("center")[0].style.display = "block";
  document.getElementsByClassName("center")[0].style.display = "flex";
  document.getElementsByClassName("center")[0].style.justifyContent = "center";
  document.getElementsByClassName("center")[0].style.alignItems = "center";

  // Clear input fields
  document.getElementById("nodes").value = "";
  document.getElementById("edges").value = "";
  document.getElementById("startNode").value = "";
  document.getElementById("endNode").value = "";
}
