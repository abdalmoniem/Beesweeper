// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Minesweeper
// Video: https://youtu.be/LFU5ZlrR21E

function Cell(i, j, w) {
   this.i = i;
   this.j = j;
   this.x = i * w;
   this.y = j * w;
   this.w = w;
   this.neighborCount = 0;

   this.bee = false;
   this.revealed = false;
   angleMode(DEGREES);
}

Cell.prototype.show = function() {
   stroke(0);
   noFill();
   rect(this.x, this.y, this.w, this.w);
   if (this.revealed) {
      if (this.bee) {
         fill(255, 255, 0);
         push();
         translate(this.x + this.w * 0.5, this.y + this.w * 0.5);
         rotate(30);
         // ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
         ellipse(0, 0, this.w * 0.4, this.w * 0.8);
         pop();
      } else {
         fill(200);
         rect(this.x, this.y, this.w, this.w);
         if (this.neighborCount > 0) {
            textAlign(CENTER);
            fill(0);
            textSize(w * 0.5);
            text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w * 0.7);
         }
      }
   }
}

Cell.prototype.countBees = function() {
   if (this.bee) {
      this.neighborCount = -1;
      return;
   }
   var total = 0;
   for (var xoff = -1; xoff <= 1; xoff++) {
      var i = this.i + xoff;
      if (i < 0 || i >= cols) continue;

      for (var yoff = -1; yoff <= 1; yoff++) {
         var j = this.j + yoff;
         if (j < 0 || j >= rows) continue;

         var neighbor = grid[i][j];
         if (neighbor.bee) {
            total++;
         }
      }
   }
   this.neighborCount = total;
}

Cell.prototype.contains = function(x, y) {
   return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}

Cell.prototype.reveal = function() {
   this.revealed = true;
   if (this.neighborCount == 0) {
      // flood fill time
      this.floodFill();
   }
}

Cell.prototype.floodFill = function() {
   for (var xoff = -1; xoff <= 1; xoff++) {
      var i = this.i + xoff;
      if (i < 0 || i >= cols) continue;

      for (var yoff = -1; yoff <= 1; yoff++) {
         var j = this.j + yoff;
         if (j < 0 || j >= rows) continue;

         var neighbor = grid[i][j];
         // Note the neighbor.bee check was not required.
         // See issue #184
         if (!neighbor.revealed) {
            neighbor.reveal();
         }
      }
   }
}