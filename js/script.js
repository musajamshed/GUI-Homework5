/*
File: script.js
GUI Assignment: Homework 5
Musa Jamshed, UMass Lowell Computer Science, Musa_Jamshed@student.uml.edu
Last Modified: December 22, 2022
Description: Scrabble with Drag-and-Drop
*/

// object for information of all the tiles
var tiles =  [
	{"letter":"A", "value":1,  "amount":9, "image" : "img/letter/Scrabble_Tile_A.jpg"},
	{"letter":"B", "value":3,  "amount":2, "image" : "img/letter/Scrabble_Tile_B.jpg"},
	{"letter":"C", "value":3,  "amount":2, "image" : "img/letter/Scrabble_Tile_C.jpg"},
	{"letter":"D", "value":2,  "amount":4, "image" : "img/letter/Scrabble_Tile_D.jpg"},
	{"letter":"E", "value":1,  "amount":12, "image" : "img/letter/Scrabble_Tile_E.jpg"},
	{"letter":"F", "value":4,  "amount":2, "image" : "img/letter/Scrabble_Tile_F.jpg"},
	{"letter":"G", "value":2,  "amount":3, "image" : "img/letter/Scrabble_Tile_G.jpg"},
	{"letter":"H", "value":4,  "amount":2, "image" : "img/letter/Scrabble_Tile_H.jpg"},
	{"letter":"I", "value":1,  "amount":9, "image" : "img/letter/Scrabble_Tile_I.jpg"},
	{"letter":"J", "value":8,  "amount":1, "image" : "img/letter/Scrabble_Tile_J.jpg"},
	{"letter":"K", "value":5,  "amount":1, "image" : "img/letter/Scrabble_Tile_K.jpg"},
	{"letter":"L", "value":1,  "amount":4, "image" : "img/letter/Scrabble_Tile_L.jpg"},
	{"letter":"M", "value":3,  "amount":2, "image" : "img/letter/Scrabble_Tile_M.jpg"},
	{"letter":"N", "value":1,  "amount":6, "image" : "img/letter/Scrabble_Tile_N.jpg"},
	{"letter":"O", "value":1,  "amount":8, "image" : "img/letter/Scrabble_Tile_O.jpg"},
	{"letter":"P", "value":3,  "amount":2, "image" : "img/letter/Scrabble_Tile_P.jpg"},
	{"letter":"Q", "value":10, "amount":1, "image" : "img/letter/Scrabble_Tile_Q.jpg"},
	{"letter":"R", "value":1,  "amount":6, "image" : "img/letter/Scrabble_Tile_R.jpg"},
	{"letter":"S", "value":1,  "amount":4, "image" : "img/letter/Scrabble_Tile_S.jpg"},
	{"letter":"T", "value":1,  "amount":6, "image" : "img/letter/Scrabble_Tile_T.jpg"},
	{"letter":"U", "value":1,  "amount":4, "image" : "img/letter/Scrabble_Tile_U.jpg"},
	{"letter":"V", "value":4,  "amount":2, "image" : "img/letter/Scrabble_Tile_V.jpg"},
	{"letter":"W", "value":4,  "amount":2, "image" : "img/letter/Scrabble_Tile_W.jpg"},
	{"letter":"X", "value":8,  "amount":1, "image" : "img/letter/Scrabble_Tile_X.jpg"},
	{"letter":"Y", "value":4,  "amount":2, "image" : "img/letter/Scrabble_Tile_Y.jpg"},
	{"letter":"Z", "value":10, "amount":1, "image" : "img/letter/Scrabble_Tile_Z.jpg"},
	{"letter":"Blank", "value":0,  "amount":2, "image" : "img/letter/Scrabble_Tile_Blank.jpg"}
]

// object holding the board itself */
var board = [
    { "type": "blank", "letterMultiplier": 1, "wordMultiplier": 1, "image": "img/tiles/blank.png"},
    { "type": "blank", "letterMultiplier": 1, "wordMultiplier": 1, "image": "img/tiles/blank.png"},
    { "type": "doubleW","letterMultiplier": 1, "wordMultiplier": 2, "image": "img/tiles/double_word.png"},
    { "type": "blank", "letterMultiplier": 1, "wordMultiplier": 1, "image": "img/tiles/blank.png"},
    { "type": "blank", "letterMultiplier": 1, "wordMultiplier": 1, "image": "img/tiles/blank.png"},
    { "type": "blank", "letterMultiplier": 1, "wordMultiplier": 1, "image": "img/tiles/blank.png"},
    { "type": "doubleL", "letterMultiplier": 1, "wordMultiplier": 2, "image": "img/tiles/double_letter.png"},

]

var highestScore = 0;
letterArray = [];

// main
$(document).ready(function(){

    boardImage();
    restart();
    
});

// prints image of the letter tile
function letterImage(){
    $("#rack").empty();
    for(let i = 0; i < 7; ++i){
        const randIndex = Math.floor(Math.random() * 27);
        $("#rack").append("<img id = 'letter" + i + "' class = 'letterTile' letter = '" + tiles[randIndex].letter + "' src = '" + tiles[randIndex].image + "' />");
    }
}

// prints out a set board and sets the index of each tile that is placed
function boardImage(){
    for(let i = 0; i < 7; ++i){
        $("#board").append("<img id = 'boardtile "+ i + "'class = 'board' index = '"+ i +"'type = '" + board[i].type + "'src = '" + board[i].image + "' />");
    }
}

// make the letters draggable from the rack
function makeTileDraggable () {
    $(".letterTile").draggable({
        snapMode: 'inner',
    });
}

// functionlaity for letter tiles to be dropped
function makeBoardDroppable () {
    $(".board").droppable({
        accept: '.letterTile',
        drop: addLetter
    });
}

// used when dragging tiles back into the rack 
function makeRackDroppable () {
    $('#rack').droppable({
        accept: '.letterTile',
        drop: rackDrop,
    });
}

// add letter to the array and save where it's placed on the board by index
function addLetter(event, ui){
    ui.draggable.position ({
        of: $(this),
    });

    const id = ui.draggable.attr('letter');
    const type = $(this).attr('type');
    const index = $(this).attr('index');

    letterArray[id] = {index, type}

    console.log(letterArray[id]);
}

// append the pic back to the rack when the tile is put back
function rackDrop(event, ui){
    const letter = ui.draggable.attr('letter');
    const id = ui.draggable.attr('id');
    
    console.log(letterArray[letter]);
    delete letterArray[letter];

    ui.draggable.remove();

    $("#rack").append("<img id = 'letter" + id + "' class = 'letterTile' letter = '" + letter + "' src = 'img/letter/Scrabble_Tile_" + letter + ".jpg' />");

    makeTileDraggable();
}

// calculate score of all tiles on the board, save board position, and construct word
function score() {
    let position = [];
    let wArray = new Array();
    console.log(Object.keys(letterArray));

    for (const key of Object.keys( letterArray )) {
        const pos = Number (letterArray[key]['index']);
        position.push (pos);
        wArray[pos] = key;
    }

    position = position.sort(function(a, b) {return a - b;});

    var score = calculateScore ();

    if(highestScore < score){
        highestScore = score;
    }

    restart();

    $("#score").text(score);
    $("#highScore").text(highestScore);

}

// checks the board tile type and adds to score
function calculateScore () {
    let score = 0;
    for (const key of Object.keys (letterArray)) {
        const tileType = letterArray[key]['type'];
        const value = getLetterValue (key);
        
        if (tileType == 'doubleL'){
            score += value * 2;
        }
        else if (tileType == 'doubleW'){
            score += value * 2;
        }
        else{
            score += value;
        }
    }
    return score;
}

// gets a letter's value
function getLetterValue (letter) {
    const obj = tiles.filter ((val) => val.letter == letter)[0];
    return obj.value;
}

// called when user wants to refresh
function restart(){
    letterArray = [];
    letterImage();
    makeTileDraggable();
    makeBoardDroppable();
    makeRackDroppable();
}
