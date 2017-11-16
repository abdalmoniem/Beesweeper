// AbdAlMoniem AlHifnawy
// This is a modified veriosn of Daniel Shiffman's Code: Minesweeper

// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Minesweeper
// Video: https://youtu.be/LFU5ZlrR21E

function make2DArray(cols, rows) {
   var arr = new Array(cols);
   for (var i = 0; i < arr.length; i++) {
      arr[i] = new Array(rows);
   }
   return arr;
}

var grid;
var cols;
var rows;
var w = 30;

var totalBees = 30;

var prg;
var btn;

function setup() {
   createCanvas(501, 501);
   cols = floor(width / w);
   rows = floor(height / w);

   prg = createP('GAME OVER!');
   btn = createButton('Try Again');
   btn.mousePressed(restartGame);

   restartGame();
}

function gameOver() {
   for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
         grid[i][j].revealed = true;
      }
   }

   prg.show();
   btn.show();
}

function restartGame() {
   grid = make2DArray(cols, rows);
   for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
         grid[i][j] = new Cell(i, j, w);
      }
   }

   // Pick totalBees spots
   var options = [];
   for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
         options.push([i, j]);
      }
   }


   for (var n = 0; n < totalBees; n++) {
      var index = floor(random(options.length));
      var choice = options[index];
      var i = choice[0];
      var j = choice[1];
      // Deletes that spot so it's no longer an option
      options.splice(index, 1);
      grid[i][j].bee = true;
   }


   for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
         grid[i][j].countBees();
      }
   }

   prg.hide();
   btn.hide();
}

function mousePressed() {
   for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
         if (grid[i][j].contains(mouseX, mouseY)) {
            grid[i][j].reveal();

            if (grid[i][j].bee) {
               gameOver();
            }

         }
      }
   }
}

function draw() {
   background(255);
   for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
         grid[i][j].show();
      }
   }
}