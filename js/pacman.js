'use strict'

const PACMAN = '😀'

var gPacman

function createPacman(board) {
    // DONE: initialize gPacman...
    gPacman = {
        location: {
            i: 5,
            j: 4
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function onMovePacman(ev){

    if(!gGame.isOn) return
    
    const nextLocation = getNextLocation(ev)
    if(!nextLocation) return

    const nextCell = gBoard[nextLocation.i][nextLocation.j]
    
    if(nextCell === WALL) return

    console.log('(gPacman.isSuper):', (gPacman.isSuper))
    
    if(nextCell === GHOST){
        if(!gPacman.isSuper){
            console.log('HI')
            renderCell(gPacman.location, EMPTY)
            gPacman.location = nextLocation
            renderCell(gPacman.location, '🪦')
            gameOver()
            return
        }
        else eatingGhost(nextLocation)
    }
    
    
    if(nextCell === FOOD){
        var audio = new Audio('audio/eaten-ball.mp3')
        audio.play()
        updateScore(1)  
    }   
    
    if(nextCell === CHERRY){
        audio = new Audio('audio/cherry.mp3')
        audio.play()
        updateScore(10) 
    }    
    
    
    if(nextCell === SUPERFOOD){
        if(gPacman.isSuper) return 
        superPowerMode()   
    } 

       
     
    renderPacmanMove(nextLocation)

    if(isFoodFinished()) gameOver()
       
}

function getNextLocation(eventKeyboard) {
    // DONE: figure out nextLocation

    const nextLocation = {
      i: gPacman.location.i,
      j: gPacman.location.j,  
    }

    switch(eventKeyboard.key){
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        default:
            return null
    }

    return nextLocation
}

function superPowerMode(){
    
    var audio = new Audio('audio/super.mp3')
    audio.play()

    gPacman.isSuper = true
    const elSuperMsg = document.querySelector('.super-life')
    elSuperMsg.classList.remove('hidden')
   
    setTimeout(() => {
        gPacman.isSuper = false
        elSuperMsg.classList.add('hidden')
    }, 5000) 
    
}

function eatingGhost(nextLocation){
    var audio = new Audio('audio/ghost.mp3')
    audio.play()

    for (var i = 0 ; i < gGhosts.length; i++){
        var currGhost = gGhosts[i]
        if(currGhost.location.i === nextLocation.i && currGhost.location.j === nextLocation.j){
            gGhosts.splice(i,1)
            var returnedGhost = currGhost 
            break 
        }
    }

    setTimeout(() => {
        gGhosts.push(returnedGhost)
        gBoard[returnedGhost.location.i][returnedGhost.location.j] = GHOST
        renderCell(returnedGhost.location, getGhostHTML(returnedGhost))
        audio.play()  
    }, 5000)

}

function renderPacmanMove(nextLocation){
    //Taking care of the previous location  - if Pacman isn't super then emptying it
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    renderCell(gPacman.location, EMPTY)

    //Moving Pacman to the new location
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    gPacman.location = nextLocation

    renderCell(gPacman.location, PACMAN)
}
