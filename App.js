// import "./App.css";
// import { useEffect } from "react";
// import { fabric } from "fabric";

// function App() {
//   useEffect(() => {
//     const canvas = new fabric.Canvas("canvas");
//     canvas.setHeight(window.innerHeight);
//     canvas.setWidth(window.innerWidth);
//     canvas.isDrawingMode = true;
//     canvas.freeDrawingBrush.width = 3;
//     canvas.freeDrawingBrush.color = "#0052cc";
//   }, []);

//   return (<div>hello world
//     <h1>hello</h1>
//     <canvas id="canvas" />
//   </div> );
// }

// import React, { useRef, useEffect, useState } from 'react';

// function App() {
//   const canvasRef = useRef(null);
//   const [colorIndex, setColorIndex] = useState(0);
//   const [colors, setColors] = useState([]);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');
//     context.lineWidth = 5;
//     context.lineJoin = 'round';
//     context.lineCap = 'round';
//     context.strokeStyle = colors[colorIndex];
//     let isDrawing = false;
//     let lastX = 0;
//     let lastY = 0;
//     function draw(e) {
//       if (!isDrawing) return;
//       context.beginPath();
//       context.moveTo(lastX, lastY);
//       context.lineTo(e.offsetX, e.offsetY);
//       context.stroke();
//       [lastX, lastY] = [e.offsetX, e.offsetY];
//     }
//     canvas.addEventListener('mousemove', draw);
//     canvas.addEventListener('mousedown', (e) => {
//       isDrawing = true;
//       [lastX, lastY] = [e.offsetX, e.offsetY];
//     });
//     canvas.addEventListener('mouseup', () => isDrawing = false);
//     canvas.addEventListener('mouseout', () => isDrawing = false);
//     return () => {
//       canvas.removeEventListener('mousemove', draw);
//       canvas.removeEventListener('mousedown', (e) => {
//         isDrawing = true;
//         [lastX, lastY] = [e.offsetX, e.offsetY];
//       });
//       canvas.removeEventListener('mouseup', () => isDrawing = false);
//       canvas.removeEventListener('mouseout', () => isDrawing = false);
//     }
//   }, [colorIndex, colors]);

//   function generateColors(width) {
//     const colors = [];
//     for (let i = 0; i < 4; i++) {
//       const r = Math.floor(Math.random() * 255);
//       const g = Math.floor(Math.random() * 255);
//       const b = Math.floor(Math.random() * 255);
//       const color = `rgb(${r}, ${g}, ${b})`;
//       colors.push(color);
//     }
//     setColors(colors);
//   }

//   function handleWidthChange(event) {
//     const width = parseInt(event.target.value);
//     generateColors(width);
//   }

//   function handleColorChange() {
//     setColorIndex((colorIndex + 1) % 4);
//   }

//   function handleEraser() {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');
//     context.lineWidth = parseInt(document.getElementById("brushWidth").value);
//     context.strokeStyle = "#ffffff";
//   }

//   return (
//     <div>
//       <input type="range" min="1" max="50" step="1" id="brushWidth" onChange={handleWidthChange} />
//       <button onClick={handleColorChange}>Switch Color</button>
//       <button onClick={handleEraser}>Eraser</button>
//       <canvas ref={canvasRef} width={500} height={500} />
//     </div>
//   );
// }

// export default PaintingApp;
// import React, { useState } from 'react';
// import './App.css';

// function App() {
//   const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
//   const [pointerWidth, setPointerWidth] = useState(10);
//   const [isEraserSelected, setIsEraserSelected] = useState(false);

//   const handleColorChange = (color) => {
//     setIsEraserSelected(false);
//     setBackgroundColor(color);
//   };

//   const handleWidthChange = (event) => {
//     setPointerWidth(event.target.value);
//   };

//   const handleEraserClick = () => {
//     setIsEraserSelected(true);
//     setBackgroundColor('#FFFFFF');
//   };

//   return (
//     <div className="App" style={{ backgroundColor: backgroundColor, cursor: isEraserSelected ? 'url(/eraser-cursor.png), auto' : 'url(/plus-cursor.png) 10 10, auto' }}>
//       <div className="color-buttons">
//         <button className="color-button black" onClick={() => handleColorChange('#000000')}></button>
//         <button className="color-button green" onClick={() => handleColorChange('#00FF00')}></button>
//         <button className="color-button yellow" onClick={() => handleColorChange('#FFFF00')}></button>
//         <button className="color-button blue" onClick={() => handleColorChange('#0000FF')}></button>
//         <button className="color-button red" onClick={() => handleColorChange('#FF0000')}></button>
//       </div>
//       <div className="pointer">
//         <input type="range" min="1" max="100" value={pointerWidth} onChange={handleWidthChange} />
//       </div>
//       <div className="eraser">
//         <button className="eraser-button" onClick={handleEraserClick}></button>
//       </div>
//     </div>
//   );
// }


// import React, { useState, useEffect, useRef } from 'react';
// import './App.css';

// function App() {
//   const [color, setColor] = useState('#000000');
//   const [pointerWidth, setPointerWidth] = useState(10);
//   const [isEraserSelected, setIsEraserSelected] = useState(false);
//   const canvasRef = useRef(null);
//   const contextRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     const context = canvas.getContext('2d');
//     context.scale(2, 2);
//     context.lineCap = 'round';
//     context.strokeStyle = color;
//     context.lineWidth = pointerWidth;
//     contextRef.current = context;
//   }, [color, pointerWidth]);

//   const handleColorChange = (color) => {
//     setIsEraserSelected(false);
//     setColor(color);
//     contextRef.current.strokeStyle = color;
//   };

//   const handleWidthChange = (event) => {
//     setPointerWidth(event.target.value);
//     contextRef.current.lineWidth = event.target.value;
//   };

//   const handleEraserClick = () => {
//     setIsEraserSelected(true);
//     setColor('#FFFFFF');
//     contextRef.current.strokeStyle = '#FFFFFF';
//   };

//   const startDrawing = ({ nativeEvent }) => {
//     const { offsetX, offsetY } = nativeEvent;
//     contextRef.current.beginPath();
//     contextRef.current.moveTo(offsetX, offsetY);
//   };

//   const continueDrawing = ({ nativeEvent }) => {
//     if (isEraserSelected) {
//       const { offsetX, offsetY } = nativeEvent;
//       contextRef.current.clearRect(offsetX - pointerWidth / 2, offsetY - pointerWidth / 2, pointerWidth, pointerWidth);
//     } else {
//       const { offsetX, offsetY } = nativeEvent;
//       contextRef.current.lineTo(offsetX, offsetY);
//       contextRef.current.stroke();
//     }
//   };

//   return (
//     <div className="App">
//       <div className="toolbar">
//         <div className="color-picker">
//           <label htmlFor="color-picker">Color:</label>
//           <input
//             id="color-picker"
//             type="color"
//             value={color}
//             onChange={(event) => handleColorChange(event.target.value)}
//           />
//         </div>
//         <div className="width-slider">
//           <label htmlFor="width-slider">Width:</label>
//           <input
//             id="width-slider"
//             type="range"
//             min="1"
//             max="50"
//             value={pointerWidth}
//             onChange={handleWidthChange}
//           />
//         </div>
//         <button className="eraser-button" onClick={handleEraserClick}>
//           Eraser
//         </button>
//       </div>
//       <canvas
//         onMouseDown={startDrawing}
//         onMouseMove={continueDrawing}
//         ref={canvasRef}
//       />
//     </div>
//   );
// }


// import React, { useState, useEffect, useRef } from 'react';
// import './App.css';
// import { IconButton } from '@material-ui/core';
// import { ColorLens, Clear } from '@material-ui/icons';

// function App() {
//   const [color, setColor] = useState('#000000');
//   const [pointerWidth, setPointerWidth] = useState(10);
//   const [isEraserSelected, setIsEraserSelected] = useState(false);
//   const canvasRef = useRef(null);
//   const contextRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     const context = canvas.getContext('2d');
//     context.scale(2, 2);
//     context.lineCap = 'round';
//     context.strokeStyle = color;
//     context.lineWidth = pointerWidth;
//     contextRef.current = context;
//   }, [color, pointerWidth]);

//   const handleColorChange = (color) => {
//     setIsEraserSelected(false);
//     setColor(color);
//     contextRef.current.strokeStyle = color;
//   };

//   const handleWidthChange = (event) => {
//     setPointerWidth(event.target.value);
//     contextRef.current.lineWidth = event.target.value;
//   };

//   const handleEraserClick = () => {
//     setIsEraserSelected(true);
//     setColor('#FFFFFF');
//     contextRef.current.strokeStyle = '#FFFFFF';
//     contextRef.current.lineWidth = pointerWidth;
//   };

//   const startDrawing = ({ nativeEvent }) => {
//     const { offsetX, offsetY } = nativeEvent;
//     contextRef.current.beginPath();
//     contextRef.current.moveTo(offsetX, offsetY);
//     canvasRef.current.style.cursor = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23000\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Ccircle cx=\'12\' cy=\'12\' r=\'8\'/%3E%3C/svg%3E") 0 15, auto';
//   };

//   const continueDrawing = ({ nativeEvent }) => {
//     if (isEraserSelected) {
//       const { offsetX, offsetY } = nativeEvent;
//       contextRef.current.clearRect(offsetX - pointerWidth / 2, offsetY - pointerWidth / 2, pointerWidth, pointerWidth);
//     } else {
//       const { offsetX, offsetY } = nativeEvent;
//       contextRef.current.lineTo(offsetX, offsetY);
//       contextRef.current.stroke();
//     }
//   };

//   const endDrawing = () => {
//     canvasRef.current.style.cursor = 'default';
//   };

//   return (
//     <div className="App">
//       <div className="toolbar">
//         <div className="color-picker">
//           <label htmlFor="color-picker">Color:</label>
//           <input
//             id="color-picker"
//             type="color"
//             value={color}
//             onChange={(event) => handleColorChange(event.target.value)}
//           />
//         </div>
//         <div className="width-slider">
//           <label htmlFor="width-slider">Width:</label>
//           <input
//             id="width-slider"
//             type="range"
//             min="1"
//             max="50"
//             value={pointerWidth}
//             onChange={handleWidthChange}
//           />
//         </div>
//         <IconButton className="eraser-button" onClick={handleEraserClick}>
//           <Clear fontSize="large" />
//         </IconButton>
//       </div>
//       <canvas
//         onMouseDown={startDrawing}
//         onMouseMove={continueDrawing}
//         onMouseUp={endDrawing}
//         ref={canvasRef}/>
//         </div>
//         );
//   }
        
      


// import React, { useRef, useEffect, useState } from 'react';
// import { IconButton } from '@material-ui/core';
// import { ColorLens, Clear } from '@material-ui/icons';

// function App() {
//   const canvasRef = useRef(null);
//   const [colorIndex, setColorIndex] = useState(0);
//   const [colors, setColors] = useState([]);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');
//     context.lineWidth = 5;
//     context.lineJoin = 'round';
//     context.lineCap = 'round';
//     context.strokeStyle = colors[colorIndex];
//     let isDrawing = false;
//     let lastX = 0;
//     let lastY = 0;
//     function draw(e) {
//       if (!isDrawing) return;
//       context.beginPath();
//       context.moveTo(lastX, lastY);
//       context.lineTo(e.offsetX, e.offsetY);
//       context.stroke();
//       [lastX, lastY] = [e.offsetX, e.offsetY];
//     }
//     canvas.addEventListener('mousemove', draw);
//     canvas.addEventListener('mousedown', (e) => {
//       isDrawing = true;
//       [lastX, lastY] = [e.offsetX, e.offsetY];
//     });
//     canvas.addEventListener('mouseup', () => (isDrawing = false));
//     canvas.addEventListener('mouseout', () => (isDrawing = false));
//     return () => {
//       canvas.removeEventListener('mousemove', draw);
//       canvas.removeEventListener('mousedown', (e) => {
//         isDrawing = true;
//         [lastX, lastY] = [e.offsetX, e.offsetY];
//       });
//       canvas.removeEventListener('mouseup', () => (isDrawing = false));
//       canvas.removeEventListener('mouseout', () => (isDrawing = false));
//     };
//   }, [colorIndex, colors]);

//   useEffect(() => {
//     // Generate initial colors on mount
//     generateColors(5);
//   }, []);
//   function generateColors() {
//     const colors = [
//       '#000000', // black
//       '#00ff00', // green
//       '#ffff00', // yellow
//       '#0000ff', // blue
//       '#ff0000', // red
//     ];
//     setColors(colors);
//   }

//   // function generateColors(numColors) {
//   //   const colors = [];
//   //   const step = 360 / numColors;
//   //   for (let i = 0; i < numColors; i++) {
//   //     const hue = (step * i) % 360;
//   //     const color = `hsl(${hue}, 80%, 50%)`;
//   //     colors.push(color);
//   //   }
//   //   setColors(colors);
//   // }

//   function handleWidthChange(event) {
//     const width = parseInt(event.target.value);
//     generateColors(width);
//   }

//   function handleColorChange() {
//     setColorIndex((colorIndex + 1) % colors.length);
//   }

//   function handleEraser() {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');
//     context.lineWidth = parseInt(document.getElementById('brushWidth').value);
//     context.strokeStyle = '#ffffff';
//   }

//   return (
//     <div>
//       <div style={{ display: 'flex', alignItems: 'center' }}>
//         <ColorLens style={{ color: colors[colorIndex], marginRight: '10px' }} />
//         <select id="brushWidth" onChange={handleWidthChange} value={colors.length}>
//           {[...Array(10).keys()].map((i) => (
//             <option key={i + 1} value={i + 1}>
//               {i + 1}
//             </option>
//           ))}
//         </select>
//         <IconButton onClick={handleColorChange}>
//           <ColorLens />
//         </IconButton>
//         <IconButton onClick={handleEraser}>
//           <Clear />
//         </IconButton>
//       </div>
//       <canvas
//         ref={canvasRef}
//         style={{ border: '1px solid black' }}
//         width={window.innerWidth}
//         height={window.innerHeight - 50}/>
//         </div>
//         );
//   }
      




// import React, { useRef, useEffect, useState } from 'react';
// import { IconButton } from '@material-ui/core';
// import { ColorLens, Clear } from '@material-ui/icons';

// function App() {
//   const canvasRef = useRef(null);
//   const [colorIndex, setColorIndex] = useState(0);
//   const [colors, setColors] = useState([]);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');
//     context.lineWidth = 5;
//     context.lineJoin = 'round';
//     context.lineCap = 'round';
//     context.strokeStyle = colors[colorIndex];
//     let isDrawing = false;
//     let lastX = 0;
//     let lastY = 0;
//     function draw(e) {
//       if (!isDrawing) return;
//       context.beginPath();
//       context.moveTo(lastX, lastY);
//       context.lineTo(e.offsetX, e.offsetY);
//       context.stroke();
//       [lastX, lastY] = [e.offsetX, e.offsetY];
//     }
//     canvas.addEventListener('mousemove', draw);
//     canvas.addEventListener('mousedown', (e) => {
//       isDrawing = true;
//       [lastX, lastY] = [e.offsetX, e.offsetY];
//     });
//     canvas.addEventListener('mouseup', () => (isDrawing = false));
//     canvas.addEventListener('mouseout', () => (isDrawing = false));
//     return () => {
//       canvas.removeEventListener('mousemove', draw);
//       canvas.removeEventListener('mousedown', (e) => {
//         isDrawing = true;
//         [lastX, lastY] = [e.offsetX, e.offsetY];
//       });
//       canvas.removeEventListener('mouseup', () => (isDrawing = false));
//       canvas.removeEventListener('mouseout', () => (isDrawing = false));
//     };
//   }, [colorIndex, colors]);

//   useEffect(() => {
//     // Generate initial colors on mount
//     generateColors(['#000000', '#008000', '#FFFF00', '#0000FF', '#FF0000']);
//   }, []);

//   function generateColors(colors) {
//     setColors(colors);
//   }

//   function handleColorChange() {
//     setColorIndex((colorIndex + 1) % colors.length);
//   }

//   function handleEraser() {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');
//     context.lineWidth = parseInt(document.getElementById('brushWidth').value);
//     context.strokeStyle = '#ffffff';
//   }

//   return (
//     <div>
//       <div style={{ display: 'flex', alignItems: 'center' }}>
//         <ColorLens style={{ color: colors[colorIndex], marginRight: '10px' }} />
//         <select id="brushWidth" onChange={handleEraser}>
//           <option value={5}>5</option>
//         </select>
//         <IconButton onClick={handleColorChange}>
//           <ColorLens />
//         </IconButton>
//         <IconButton onClick={handleEraser}>
//           <Clear />
//         </IconButton>
//       </div>
//       <canvas
//         ref={canvasRef}
//         style={{ border: '1px solid black' }}
//         width={window.innerWidth}
//         height={window.innerHeight - 50}
//       />
//     </div>
//   );
// }


        
// import React, { useRef, useEffect, useState } from 'react';
// import { IconButton } from '@material-ui/core';
// import { ColorLens, Clear } from '@material-ui/icons';

// function App() {
//   const canvasRef = useRef(null);
//   const [colorIndex, setColorIndex] = useState(0);
//   const [colors, setColors] = useState([]);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');
//     context.lineWidth = 5;
//     context.lineJoin = 'round';
//     context.lineCap = 'round';
//     context.strokeStyle = colors[colorIndex];
//     let isDrawing = false;
//     let lastX = 0;
//     let lastY = 0;
//     function draw(e) {
//       if (!isDrawing) return;
//       context.beginPath();
//       context.moveTo(lastX, lastY);
//       context.lineTo(e.offsetX, e.offsetY);
//       context.stroke();
//       [lastX, lastY] = [e.offsetX, e.offsetY];
//     }
//     canvas.addEventListener('mousemove', draw);
//     canvas.addEventListener('mousedown', (e) => {
//       isDrawing = true;
//       [lastX, lastY] = [e.offsetX, e.offsetY];
//     });
//     canvas.addEventListener('mouseup', () => (isDrawing = false));
//     canvas.addEventListener('mouseout', () => (isDrawing = false));
//     return () => {
//       canvas.removeEventListener('mousemove', draw);
//       canvas.removeEventListener('mousedown', (e) => {
//         isDrawing = true;
//         [lastX, lastY] = [e.offsetX, e.offsetY];
//       });
//       canvas.removeEventListener('mouseup', () => (isDrawing = false));
//       canvas.removeEventListener('mouseout', () => (isDrawing = false));
//     };
//   }, [colorIndex, colors]);

//   useEffect(() => {
//     // Generate initial colors on mount
//     generateColors();
//   }, []);

//   function generateColors() {
//     const colors = ['#000000', '#008000', '#FFFF00', '#0000FF', '#FF0000'];
//     setColors(colors);
//   }

//   function handleColorChange(index) {
//     setColorIndex(index);
//   }

//   function handleEraser() {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');
//     context.lineWidth = parseInt(document.getElementById('brushWidth').value);
//     context.strokeStyle = '#ffffff';
//   }

//   return (
//     <div>
//       <div style={{ display: 'flex', alignItems: 'center' }}>
//         <ColorLens style={{ color: colors[colorIndex], marginRight: '10px' }} />
//         <select id="brushWidth" onChange={(e) => generateColors(e.target.value)} value={colors.length}>
//           {[...Array(10).keys()].map((i) => (
//             <option key={i + 1} value={i + 1}>
//               {i + 1}
//             </option>
//           ))}
//         </select>
//         <IconButton onClick={handleEraser}>
//           <Clear />
//         </IconButton>
//       </div>
//       <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
//         {colors.map((color, index) => (
//           <div key={color} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
//             <div style={{ backgroundColor: color, width: '20px', height: '20px', margin: '10px' }} onClick={() => handleColorChange(index)}></div>
//             {/* <span >{color}</span> */}
//           </div>
//         ))}
//       </div><div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
//   <canvas ref={canvasRef} width={500} height={500} style={{ border: '1px solid black' }}></canvas>
// </div>
// </div>
// );
// }

// import React, { useEffect, useRef, useState } from 'react';
// import { fabric } from 'fabric';

// function App() {
//   const canvasRef = useRef(null);
//   const [brushColor, setBrushColor] = useState('#000000');
//   const [brushWidth, setBrushWidth] = useState(5);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [isErasing, setIsErasing] = useState(false);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     const context = canvas.getContext('2d');
//     const fabricCanvas = new fabric.Canvas(canvas);

//     // Set up canvas background color
//     context.fillStyle = '#ffffff';
//     context.fillRect(0, 0, canvas.width, canvas.height);

//     // Set up drawing options
//     fabricCanvas.freeDrawingBrush.color = brushColor;
//     fabricCanvas.freeDrawingBrush.width = brushWidth;

//     // Event listener for mouse down event
//     fabricCanvas.on('mouse:down', function (options) {
//       if (isErasing) {
//         fabricCanvas.isDrawingMode = false;
//         fabricCanvas.remove(...fabricCanvas.getObjects());
//         setIsDrawing(false);
//       } else {
//         setIsDrawing(true);
//         fabricCanvas.isDrawingMode = true;
//       }
//     });

//     // Event listener for mouse up event
//     fabricCanvas.on('mouse:up', function (options) {
//       setIsDrawing(false);
//     });

//     // Event listener for mouse move event
//     fabricCanvas.on('mouse:move', function (options) {
//       if (!isDrawing) return;
//       fabricCanvas.renderAll();
//     });

//     // Clean up event listeners
//     return () => {
//       fabricCanvas.off('mouse:down');
//       fabricCanvas.off('mouse:up');
//       fabricCanvas.off('mouse:move');
//     };
//   }, [brushColor, brushWidth, isDrawing, isErasing]);

//   function handleBrushColorChange(e) {
//     setBrushColor(e.target.value);
//   }

//   function handleBrushWidthChange(e) {
//     setBrushWidth(parseInt(e.target.value));
//   }

//   function handleEraserToggle() {
//     setIsErasing(!isErasing);
//   }

//   return (
//     <div>
//       <canvas ref={canvasRef} />
//       <div>
//         <button onClick={handleEraserToggle}>
//           {isErasing ? 'Drawing' : 'Erasing'}
//         </button>
//         <input
//           type="color"
//           value={brushColor}
//           onChange={handleBrushColorChange}
//         />
//         <input
//           type="range"
//           min="1"
//           max="50"
//           value={brushWidth}
//           onChange={handleBrushWidthChange}
//         />
//       </div>
//     </div>
//   );
// }




// import React, { useRef, useEffect, useState } from 'react';
// import { IconButton } from '@material-ui/core';
// import { ColorLens, Clear } from '@material-ui/icons';

// function App() {
//   const canvasRef = useRef(null);
//   const [colorIndex, setColorIndex] = useState(0);
//   const [colors, setColors] = useState([]);
//   const [brushWidth, setBrushWidth] = useState(5);
//   const [isEraser, setIsEraser] = useState(false);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');
//     context.lineWidth = brushWidth;
//     context.lineJoin = 'round';
//     context.lineCap = 'round';
//     context.strokeStyle = colors[colorIndex];
//     let isDrawing = false;
//     let lastX = 0;
//     let lastY = 0;
//     function draw(e) {
//       if (!isDrawing) return;
//       context.beginPath();
//       context.moveTo(lastX, lastY);
//       context.lineTo(e.offsetX, e.offsetY);
//       context.stroke();
//       [lastX, lastY] = [e.offsetX, e.offsetY];
//     }
//     canvas.addEventListener('mousemove', draw);
//     canvas.addEventListener('mousedown', (e) => {
//       isDrawing = true;
//       [lastX, lastY] = [e.offsetX, e.offsetY];
//     });
//     canvas.addEventListener('mouseup', () => (isDrawing = false));
//     canvas.addEventListener('mouseout', () => (isDrawing = false));
//     return () => {
//       canvas.removeEventListener('mousemove', draw);
//       canvas.removeEventListener('mousedown', (e) => {
//         isDrawing = true;
//         [lastX, lastY] = [e.offsetX, e.offsetY];
//       });
//       canvas.removeEventListener('mouseup', () => (isDrawing = false));
//       canvas.removeEventListener('mouseout', () => (isDrawing = false));
//     };
//   }, [colorIndex, colors, brushWidth]);

//   useEffect(() => {
//     // Generate initial colors on mount
//     generateColors();
//   }, []);

//   function generateColors() {
//     const colors = ['#000000', '#008000', '#FFFF00', '#0000FF', '#FF0000'];
//     setColors(colors);
//   }

//   function handleColorChange(index) {
//     setColorIndex(index);
//     setIsEraser(false);
//   }

//   function handleEraser() {
//     setIsEraser(true);
//   }

//   function handleBrushWidthChange(e) {
//     setBrushWidth(parseInt(e.target.value));
//   }

//   return (
//     <div style={{ position: 'relative', height: '100vh' }}>
//       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'absolute', top: '20px', left: '20px', zIndex: '2', padding: '20px', color: '#ffffff' }}>
//         <h1 style={{ marginBottom: '10px' }}>Drawing App</h1>
//         <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
//           {colors.map((color, index) => (
//             <IconButton key={index} onClick={() => handleColorChange(index)}>
//               <ColorLens style={{ color: color }} />
//             </IconButton>
//           ))}
//           <IconButton onClick={handleEraser}>
//             <Clear style={{ color: isEraser ? '#ffffff' : '#000000' }} />
//           </IconButton>
//         </div>
//         <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
//           <label htmlFor="brushWidthRange">Brush Width:</label>
//       <input 
//         type="range" 
//         id="brushWidthRange" 
//         min="1" 
//         max="50" 
//         value={brushWidth} 
//         onChange={handleBrushWidthChange} 
//         style={{marginLeft: '10px'}}
//       />
//     </div>
//   </div>
//   <canvas ref={canvasRef} style={{ position: 'absolute', top: '0', left: '0', zIndex: '1', width: '100%', height: '100%' }}></canvas>
// </div>);
// }



// import React, { useRef, useEffect, useState } from 'react';
// import { IconButton } from '@material-ui/core';
// import { ColorLens, Clear } from '@material-ui/icons';

// function App() {
//   const canvasRef = useRef(null);
//   const [colorIndex, setColorIndex] = useState(0);
//   const [colors, setColors] = useState([]);
//   const [brushWidth, setBrushWidth] = useState(5);
//   const [isEraser, setIsEraser] = useState(false);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');
//     context.lineWidth = brushWidth;
//     context.lineJoin = 'round';
//     context.lineCap = 'round';
//     context.strokeStyle = colors[colorIndex];
//     let isDrawing = false;
//     let lastX = 0;
//     let lastY = 0;

//     function draw(e) {
//       if (!isDrawing) return;
//       context.beginPath();
//       context.moveTo(lastX, lastY);
//       context.lineTo(e.offsetX, e.offsetY);
//       context.stroke();
//       [lastX, lastY] = [e.offsetX, e.offsetY];
//     }

//     function startDrawing(e) {
//       isDrawing = true;
//       [lastX, lastY] = [e.offsetX, e.offsetY];
//     }

//     function stopDrawing() {
//       isDrawing = false;
//     }

//     canvas.addEventListener('mousemove', draw);
//     canvas.addEventListener('mousedown', startDrawing);
//     canvas.addEventListener('mouseup', stopDrawing);
//     canvas.addEventListener('mouseout', stopDrawing);
//     return () => {
//       canvas.removeEventListener('mousemove', draw);
//       canvas.removeEventListener('mousedown', startDrawing);
//       canvas.removeEventListener('mouseup', stopDrawing);
//       canvas.removeEventListener('mouseout', stopDrawing);
//     };
//   }, [colorIndex, colors, brushWidth]);

//   useEffect(() => {
//     // Generate initial colors on mount
//     generateColors();
//   }, []);

//   function generateColors() {
//     const colors = ['#000000', '#008000', '#FFFF00', '#0000FF', '#FF0000'];
//     setColors(colors);
//   }

//   function handleColorChange(index) {
//     setColorIndex(index);
//     setIsEraser(false);
//   }

//   function handleEraser() {
//     setIsEraser(true);
//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');
//     context.strokeStyle = "#ffffff";
//   }

//   function handleBrushWidthChange(e) {
//     setBrushWidth(parseInt(e.target.value));
//   }

//   return (
//     <div className="App">
      
//       <div className="controls">
//         <div className="color-controls">
//           {colors.map((color, index) => (
//             <IconButton key={index} onClick={() => handleColorChange(index)}>
//               <ColorLens style={{ color: color }} />
//             </IconButton>
//           ))}
//         </div>
//         <div className="brush-controls">
//           <input type="range" min="1" max="50" value={brushWidth} onChange={handleBrushWidthChange} />
//           <IconButton onClick={handleEraser}>
//             <Clear style={{ color: isEraser ? '#ffffff' : '#000000' }} />
//           </IconButton>
//         </div>
//       </div>
//       <canvas ref={canvasRef} className="canvas" width={window.innerWidth} height={window.innerHeight} />
//     </div>
//   );
// }

import React, { useRef, useEffect, useState } from 'react';
import { IconButton } from '@material-ui/core';
import { ColorLens, Clear, Brush } from '@material-ui/icons';
import './App.css';

function App() {
  const canvasRef = useRef(null);
  const [colorIndex, setColorIndex] = useState(0);
  const [colors, setColors] = useState([]);
  const [brushWidth, setBrushWidth] = useState(5);
  const [isEraser, setIsEraser] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.lineWidth = brushWidth;
    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.strokeStyle = colors[colorIndex];
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    function draw(e) {
      if (!isDrawing) return;
      context.beginPath();
      context.moveTo(lastX, lastY);
      context.lineTo(e.offsetX, e.offsetY);
      context.stroke();
      [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    function startDrawing(e) {
      isDrawing = true;
      [lastX, lastY] = [e.offsetX, e.offsetY];
      canvas.style.cursor = 'url("https://i.imgur.com/YQ6NwI7.png"), auto';
    }

    function stopDrawing() {
      isDrawing = false;
      canvas.style.cursor = 'crosshair';
    }

    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    return () => {
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseout', stopDrawing);
    };
  }, [colorIndex, colors, brushWidth]);

  useEffect(() => {
    // Generate initial colors on mount
    generateColors();
  }, []);

  function generateColors() {
    const colors = ['#000000', '#008000', '#FFFF00', '#0000FF', '#FF0000'];
    setColors(colors);
  }

  function handleColorChange(index) {
    setColorIndex(index);
    setIsEraser(false);
    canvasRef.current.style.cursor = 'url("https://i.imgur.com/8MRcc7V.png"), auto';
  }

  function handleEraser() {
    setIsEraser(true);
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.strokeStyle = '#ffffff';
    canvas.style.cursor = 'url("https://i.imgur.com/XxEKmf8.png"), auto';
  }

  function handleBrushWidthChange(e) {
    setBrushWidth(parseInt(e.target.value));
  }

  return (
    <div className="App">
      <div className="controls">
        <div className="color-controls">
          {colors.map((color, index) => (
            <IconButton key={index} onClick={() => handleColorChange(index)}>
              <ColorLens style={{ color: color, border: colorIndex === index ? '2px solid #000' : 'none' }} />
            </IconButton>
          ))}
        </div>
        <div className="brush-controls">
          <IconButton onClick={() => setIsEraser(false)}>
            <Brush style={{ color: '#000000', border: isEraser ? '2px solid #000' : 'none' }} />
          </IconButton>
          <input type="range" min="1" max="50" value={brushWidth} onChange={handleBrushWidthChange} />
<IconButton onClick={handleEraser}>
<Clear style={{ color: '#000000' }} />
</IconButton>
</div>
</div>
<canvas ref={canvasRef} width={800} height={600} />
</div>
);
}



export default App;







