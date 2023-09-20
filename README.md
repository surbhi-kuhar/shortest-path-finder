The Shortest Path Finder is a web-based application that allows you to visualize and find the shortest path between two nodes in a graph. It uses Dijkstra's algorithm to compute the shortest path and D3.js for graph visualization. 

## Clone the Repository

To clone the Shortest Path Finder project, follow these steps:

1. Open your terminal or command prompt.

2. Navigate to the directory where you want to store the project:

```bash
  cd path/to/your/directory
```

3. Clone the repository using the following command:

```bash
git clone https://github.com/your-username/shortest-path-finder.git
```

Replace your-username with your GitHub username.

## Project Setup
Once you have cloned the repository, follow these steps to set up and run the project:

1. Navigate to the project directory:

```bash
cd shortest-path-finder
```

2. Open the 'index.html' with a browser.


## How to Use the Application

1. **Enter Number of Nodes**: Start by entering the number of nodes you want in your graph. This will determine the range of valid node IDs.

2. **Enter Edges**: Enter the edges of the graph in the format **startNode-endNode-weight**, separated by commas. For example: 0-1-5,1-2-3,0-2-10 defines three edges between nodes 0, 1, and 2, each with a specified weight.

3. **Generate Graph**: Click the "Generate Graph" button to visualize the graph based on the entered edges.

4. **Find Shortest Path**: After generating the graph, you can enter the start and end nodes in the respective input fields and click the "Find Shortest Path" button. The application will highlight the shortest path on the graph.

5. **Change Graph**: If you want to update the visualization of the graph, you can click the "Change Graph" button.

6. **Reset**: To start over or create a new graph, click the "Reset" button to clear the current graph and inputs.


## Customize and Extend
You can customize and extend the Shortest Path Finder project to add more features or modify the UI to suit your needs. The code is written in JavaScript and uses HTML and CSS for the front end, making it easy to work with.


