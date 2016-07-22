'use strict';

let canvas = document.getElementsByTagName('canvas')[0];
let context = canvas.getContext('2d');
let circle = Circle(300, 300, 10);
let trail = CircleTrail(2, 8);
circle.addPositionObserver(trail);
let controller = Controller(circle);
let obstacle = ObstacleRect(0, 0, 800, 200);

function frame(now) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  obstacle.draw(context);
  trail.draw(context);
  circle.draw(context);
  circle.update(now);
  if(obstacle.touchesCircle(circle))
    alert('ded');
  else window.requestAnimationFrame(frame);
}

window.requestAnimationFrame(frame);