import React, { useCallback, useState } from "react";
import ReactFlow, {
  MiniMap,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";

const initialNodes = [];

const initialEdges = [];

const nodeColor = (node) => {};

const App = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const [text, setText] = useState("Custom Node");
  const [color, setColor] = useState("#ffcc00");

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleAddCustomNode = () => {
    const customNode = {
      id: `custom-${nodes.length + 1}`,
      data: { label: text },
      position: { x: 400, y: 200 },
      style: { backgroundColor: color, color: "black" },
    };

    setNodes([...nodes, customNode]);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div>
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          placeholder="Enter text"
        />
        <input
          type="color"
          value={color}
          onChange={handleColorChange}
          style={{ marginLeft: "10px" }}
        />
        <button onClick={handleAddCustomNode}>Add Custom Node</button>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
      </ReactFlow>
    </div>
  );
};

export default App;
