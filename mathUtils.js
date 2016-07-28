'use strict';

const mathUtils = {
  tau : 2*Math.PI,
  fitNumberIntoRange : function(x, min, max) {
    if(x < min)
      return min;
    else if(x > max)
      return max;
    else return x;
  },
}