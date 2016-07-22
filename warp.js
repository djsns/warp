'use strict';

let canvas = document.getElementsByTagName("canvas")[0];
let context = canvas.getContext("2d");
let circle = Circle(300, 300, 10);
let trail = CircleTrail(2, 8);
circle.addPositionObserver(trail);
let controller = Controller(circle);

function frame(now) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  trail.draw(context);
  circle.draw(context);
  circle.update(now);
  window.requestAnimationFrame(frame);
}

window.requestAnimationFrame(frame);