let socket;

function setup() {
  let canvas = createCanvas(windowWidth - 75, windowHeight - 5);
  canvas.parent("canvas");
  background(245);

  socket = io.connect("http://localhost:5000");

  socket.on("mouse", (data) => {
    fill(255, 120, 120);
    noStroke();
    ellipse(data.x, data.y, 10, 10);
  });

  socket.on("clear", () => {
    clear();
  });
}

function mouseDragged() {
  noStroke();
  stroke(360, 40, 100);
  fill(360, 100, 100);
  strokeWeight(20);
  line(mouseX, mouseY, pmouseX, pmouseY);
  sendmouse(mouseX, mouseY);
}

function clearCanvas() {
  clear();
  socket.emit("clear");
}

function sendmouse(x, y) {
  let data = {
    x: x,
    y: y,
  };

  socket.emit("mouse", data);
}
