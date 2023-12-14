// 'use strict'

const CHERRY = '🍒'
var gCherries 

var gIntervalCherries

function createCherries() {
    clearInterval(gIntervalCherries)
    gIntervalCherries = setInterval(addCherry, 15000)
}

function addCherry() {
    
    var pos = getRandomEmptyCellPosition()
    if(!pos) return
    gBoard[pos.i][pos.j] = CHERRY
    renderCell(pos, CHERRY)
     
    
}