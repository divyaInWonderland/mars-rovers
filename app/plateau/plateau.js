'use strict';

angular.module('app.plateau', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/plateau', {
    templateUrl: 'plateau/plateau.html',
    controller: 'PlateauCtrl'
  });
}])

.controller('PlateauCtrl', ['$scope', function PlateauCtrl(sc) {

    function RoverPosition(posX, posY, orientation) {
        this.posX = posX,
        this.posY = posY,
        this.orientation = orientation,
        this.getFullPosition = function() {
            return this.posX + " " + this.posY + " " + this.orientation;
        }
    }

    sc.roversPosArr = [];
    var currentIndex = 0;
    var delay = 0;
    var marginXLines = 0;
    var marginYLines = 0;

    var canvas = document.getElementById("plateau");
    var board = canvas.getContext("2d");

    function drawGrid(inputGridUpperRight) {
         //BOARD DIMENSIONS
         var xLine = 0;
         var yLine = 0;
         //GETTING CANVAS
         board.beginPath();
         board.clearRect(0, 0, canvas.width, canvas.height);
         board.strokeStyle ='black';
         board.styleWidth = 1;

         for (var i=0; i <= 500; i=i+(500/marginXLines) )
         {
            board.moveTo(i,0);
            board.lineTo(i, 500);
            board.stroke();
         }
         for (var j=0; j <= 500; j=j+(500/marginYLines))
         {
            board.moveTo(0,j);
            board.lineTo(500, j);
            board.stroke();
         }

    }

    sc.startMission = async function startMission() {
        var inputs = sc.inputExpedition.split("\n");
        var upperCoordinates = inputs[0].split(" ");
        marginXLines = upperCoordinates[0];
        marginYLines = upperCoordinates[1];
        drawGrid();
        for (var i=1; i < inputs.length; i=i+2) {
           var initialPosition = inputs[i];
           delay = delay + 500;
           await timeoutInitialise(initialPosition);
           await move(inputs[i+1].split(""));
        }
    }

    function timeoutInitialise(initialPosition) {
       setTimeout(initialiseRover, delay, initialPosition);
    }
    function move(instructions) {
        for (var j=0; j < instructions.length; j++) {
          delay = delay + 500;
          timeoutMove(instructions[j], delay, j==instructions.length-1);
      }
    }

    function timeoutMove(instruction, delay, increaseIndex) {
        setTimeout(moveRover, delay, instruction, increaseIndex);
    }

    function addRoverPositionObject(initialPosition) {
        var coordinates = initialPosition.split(" ");
        sc.roversPosArr[currentIndex] = new RoverPosition(coordinates[0], coordinates[1], coordinates[2]);
    }

     async function initialiseRover(initialPosition) {
        addRoverPositionObject(initialPosition);
        placeRover();
      }

    function placeRover() {
        var posX =  sc.roversPosArr[currentIndex].posX * (500/marginXLines);
        var posY =  (marginYLines - sc.roversPosArr[currentIndex].posY) * (500/marginYLines);
        var orientation = sc.roversPosArr[currentIndex].orientation;

        switch (orientation) {
            case 'E':
                board.drawImage(rocket_e, posX - 23, posY -27);
                break;
            case 'W':
                board.drawImage(rocket_w, posX - 23, posY - 27);
                break;
            case 'N':
                board.drawImage(rocket_n, posX - 27, posY - 23);
                break;
            case 'S':
                board.drawImage(rocket_s, posX - 27, posY - 23);
                break;
            default :
            console.log("What?")
        }
    }

     function moveRover(instruction, increaseIndex) {
       sc.$apply(function(){changePosition(instruction);});
       drawGrid();
       placeRover();
       if(increaseIndex){
            currentIndex++;
       }
     }

    function changePosition(instruction) {
       switch (instruction) {
               case 'L':
                   goingLeft();
                   break;
               case 'R':
                   goingRight();
                   break;
               case 'M':
                   goingForward();
                   break;
               default :
               console.log("Wrong instruction?")
       }

    }

    function goingLeft() {
        var roverPos = sc.roversPosArr[currentIndex];
        switch(roverPos.orientation) {
             case 'N':
             roverPos.orientation = 'W';
             break;
             case 'S':
             roverPos.orientation = "E";
             break;
             case 'W':
             roverPos.orientation = "S";
             break;
             case 'E':
             roverPos.orientation = "N";
             break;
             default:
                console.log('Wrong cardinal point');
        }
    }

    function goingRight() {
        var roverPos = sc.roversPosArr[currentIndex];
        switch(roverPos.orientation) {
             case 'N':
             roverPos.orientation = 'E';
             break;
             case 'S':
             roverPos.orientation = "W";
             break;
             case 'W':
             roverPos.orientation = "N";
             break;
             case 'E':
             roverPos.orientation = "S";
             break;
             default:
                console.log('Wrong cardinal point');
        }
    }

    function goingForward() {
        var roverPos = sc.roversPosArr[currentIndex];
        switch(roverPos.orientation) {
             case 'N':
             roverPos.posY = parseInt(roverPos.posY) + 1;
             break;
             case 'S':
             roverPos.posY = roverPos.posY - 1;
             break;
             case 'W':
             roverPos.posX = roverPos.posX - 1;
             break;
             case 'E':
             roverPos.posX = parseInt(roverPos.posX) + 1;
             break;
             default:
                console.log('Wrong cardinal point');
        }
    }

}]);