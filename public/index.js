let socket;

function setup() {
  createCanvas(windowWidth, windowHeight - 4);
  background(235);

  socket = io.connect("http://localhost:3000");

  socket.on("mouse", (data) => {
    fill(0, 0, 255);
    noStroke();
    ellipse(data.x, data.y, 20, 20);
  });
}

function mouseDragged() {
  fill(31);
  noStroke();
  ellipse(mouseX, mouseY, 20, 20);
  sendmouse(mouseX, mouseY);
}

function sendmouse(x, y) {
  let data = {
    x: x,
    y: y,
  };

  socket.emit("mouse", data);
}

document.getElementById("body");
