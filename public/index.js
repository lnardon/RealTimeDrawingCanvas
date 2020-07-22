let socket;

function setup() {
  let canvas = createCanvas(windowWidth - 75, windowHeight - 5);
  canvas.parent("canvas");
  background(245);

  socket = io.connect("http://localhost:5000");

  socket.on("mouse", (data) => {
    stroke(80, 180, 10);
    strokeWeight(10);
    line(data.x, data.y, data.x2, data.y2);
  });

  socket.on("clear", () => {
    clear();
  });
}

function mouseDragged() {
  noStroke();
  stroke(360, 40, 100);
  fill(360, 100, 100);
  strokeWeight(10);
  line(mouseX, mouseY, pmouseX, pmouseY);
  sendmouse(mouseX, mouseY, pmouseX, pmouseY);
}

function clearCanvas() {
  clear();
  socket.emit("clear");
}

function sendmouse(x, y, x2, y2) {
  let data = {
    x: x,
    y: y,
    x2: x2,
    y2: y2,
  };

  socket.emit("mouse", data);
}
