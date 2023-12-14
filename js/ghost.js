'use strict'

const GHOST = '👻'
var gGhosts 

var gIntervalGhosts

function createGhosts(board) {
    gGhosts = []
    createGhost(board, 3, 3)
    createGhost(board, 3, 5)
    createGhost(board, 7, 1)
    console.log('gGhosts:', gGhosts)
    clearInterval(gIntervalGhosts)
    gIntervalGhosts = setInterval(moveGhosts, 2000)
}

function createGhost(board, i, j ) {
    
    const ghost = {
        location: {
            i: i,
            j: j
        },
        currCellContent: FOOD,
        color: getRandomColor()
        // color: 'blue'
        
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function moveGhosts() {
    // DONE: loop through ghosts
    for (var i = 0; i < gGhosts.length; i++){
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    // DONE: figure out moveDiff, nextLocation, nextCell
    const moveDiff = getMoveDiff()
    
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    }

    const nextCell = gBoard[nextLocation.i][nextLocation.j]
    
    // DONE: return if cannot move
    if(nextCell === WALL || nextCell === GHOST) return


    // TODO: hitting a pacman? call gameOver
    if(nextCell ===PACMAN){
        gameOver()
        return
    }

    // TODO: moving from current location:
    // TODO: update the model (restore prev cell contents)
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // TODO: update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // TODO: Move the ghost to new location:
    // TODO: update the model (save cell contents)
    ghost.location = nextLocation
    ghost.currCellContent = nextCell
    gBoard[nextLocation.i][nextLocation.j] = GHOST
    // TODO: update the DOM
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0,  j: 1  }
        case 2: return { i: 1,  j: 0  }
        case 3: return { i: 0,  j: -1 }
        case 4: return { i: -1, j: 0  }
    }
}

function getGhostHTML(ghost) {
    // return `<span style="background-color: blue">${GHOST}</span>`
    return `<span style="background-color: ${ghost.color}">${GHOST}</span>`
}