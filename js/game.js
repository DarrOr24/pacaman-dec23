'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const SUPERFOOD = '+'

const gGame = {
    score: 0,
    isOn: false
    // gPacman.isSuper = false
}
var gBoard

function onInit() {

    gBoard = buildBoard()
    console.log('gBoard:', gBoard)

    createPacman(gBoard)
    createGhosts(gBoard)
    createCherries()
    
    renderBoard(gBoard)
    gGame.isOn = true

    resetVictory()
    
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }

            if(i === 1 && j === 1 || i === 1 && j === size - 2 ||
               j === 1 && i === size - 2 || j === size - 2 && i === size - 2){
                board[i][j] = SUPERFOOD
               }
        }
    }

    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}


function updateScore(diff) {
    // MODEL
    gGame.score += diff

    //DOM
    document.querySelector('h2 span').innerText = gGame.score

}

function gameOver() {

    console.log('Game Over')
    gGame.isOn = false
    clearInterval(gIntervalGhosts)

    if(isFoodFinished()){
        var audio = new Audio('../audio/winning.mp3')
        audio.play()
        const elPlayAgainBtn = document.querySelector('.play-again')
        elPlayAgainBtn.classList.remove('hidden')

        const elVictoryMsg = document.querySelector('.victory')
        elVictoryMsg.classList.remove('hidden')
        renderCell(gPacman.location, '🤘🏼')
        return
    } 

    audio = new Audio('../audio/game-over.mp3')
    audio.play()
    
}

function isFoodFinished(){

    for (var i = 1; i < gBoard.length - 1; i++){
        for(var j = 1; j < gBoard[i].length - 1; j++){
            if(gBoard[i][j] === FOOD) return false
            
        }
    }
    return true
}

function resetVictory(){
    const elVictoryMsg = document.querySelector('.victory')
    if (!elVictoryMsg.classList.contains('hidden')) elVictoryMsg.classList.add('hidden')

    const elPlayAgainBtn = document.querySelector('.play-again')
    elPlayAgainBtn.classList.add('hidden')
}