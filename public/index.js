let socket;
let tool = "brush";

function setup() {
  let canvas = createCanvas(windowWidth - 75, windowHeight - 5);
  canvas.parent("canvas");
  background(255);

  socket = io.connect("http://localhost:5000");

  socket.on("mouse", (data) => {
    if (data.tool === "brush") {
      stroke(80, 180, 10);
      strokeWeight(10);
      line(data.x, data.y, data.x2, data.y2);
    } else {
      stroke(255);
      strokeWeight(10);
      line(data.x, data.y, data.x2, data.y2);
    }
  });

  socket.on("clear", () => {
    clear();
  });
}

function mouseDragged() {
  if (tool === "brush") {
    noStroke();
    stroke(360, 40, 100);
    fill(360, 100, 100);
    strokeWeight(10);
    line(mouseX, mouseY, pmouseX, pmouseY);
    sendmouse("brush", mouseX, mouseY, pmouseX, pmouseY);
  } else {
    stroke(255);
    strokeWeight(10);
    line(mouseX, mouseY, pmouseX, pmouseY);
    sendmouse("eraser", mouseX, mouseY, pmouseX, pmouseY);
  }
}

function setToolType(type) {
  tool = type;
}

function clearCanvas() {
  clear();
  socket.emit("clear");
}

function sendmouse(tool, x, y, x2, y2) {
  let data = {
    tool: tool,
    x: x,
    y: y,
    x2: x2,
    y2: y2,
  };

  socket.emit("mouse", data);
}
