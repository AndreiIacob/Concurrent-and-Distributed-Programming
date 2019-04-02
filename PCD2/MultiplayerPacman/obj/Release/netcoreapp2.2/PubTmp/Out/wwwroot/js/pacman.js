var PACMAN_DIRECTION = 3;
var PACMAN_DIRECTION_TRY = -1;
var PACMAN_DIRECTION_TRY_TIMER = null;
var PACMAN_DIRECTION_TRY_CANCEL = 1000;
var PACMAN_POSITION_X = 276;  // 276  30 518 128 128 278 418 422
var PACMAN_POSITION_Y = 416; // 416 520 522 258 100  98  98 258
var PACMAN_POSITION_STEP = 2;
var PACMAN_MOUNTH_STATE = 3;
var PACMAN_MOUNTH_STATE_MAX = 6;
var PACMAN_SIZE = 16;
var PACMAN_MOVING = false;
var PACMAN_MOVING_TIMER = -1;
var PACMAN_MOVING_SPEED = 15;
var PACMAN_CANVAS_CONTEXT = null;
var PACMAN_EAT_GAP = 15;
var PACMAN_GHOST_GAP = 20;
var PACMAN_FRUITS_GAP = 15;
var PACMAN_KILLING_TIMER = -1;
var PACMAN_KILLING_SPEED = 70;
var PACMAN_RETRY_SPEED = 2100;
var PACMAN_DEAD = false;

var START_POSITIONS_X = [276, 30, 518, 128, 128, 278, 418, 422];
var START_POSITIONS_Y = [416, 522, 522, 258, 100, 98, 98, 258];
var START_PACMAN_DIRECTION = [3, 4, 4, 3, 3, 2, 2, 2];

var PLAYER_NUM = 0;
var MAX_PLAYER_NUM = 7;
var PACMEN_DIRECTION = [];
var PACMEN_DIRECTION_TRY = [];
var PACMEN_DIRECTION_TRY_TIMER = [];
var PACMEN_POSITION_X = [];
var PACMEN_POSITION_Y = [];
var PACMEN_POSITION_STEP = [];
var PACMEN_MOUNTH_STATE = [];
var PACMEN_MOVING = [];
var PACMEN_MOVING_TIMER = [];
var PACMEN_KILLING_TIMER = [];
var PACMEN_DEAD = [];

function initPacman() { 
    console.log("Starting");
	var canvas = document.getElementById('canvas-pacman');
	canvas.setAttribute('width', '550');
	canvas.setAttribute('height', '550');
	if (canvas.getContext) { 
		PACMAN_CANVAS_CONTEXT = canvas.getContext('2d');
	}
}
function resetPacman() { 
	stopPacman();

    PACMAN_DIRECTION = START_PACMAN_DIRECTION[PLAYER_NUM];
	PACMAN_DIRECTION_TRY = -1;
	PACMAN_DIRECTION_TRY_TIMER = null;
    PACMAN_POSITION_X = START_POSITIONS_X[PLAYER_NUM];
    PACMAN_POSITION_Y = START_POSITIONS_Y[PLAYER_NUM];
	PACMAN_MOUNTH_STATE = 3;
	PACMAN_MOVING = false;
	PACMAN_MOVING_TIMER = -1;
	PACMAN_KILLING_TIMER = -1;
	PACMAN_DEAD = false;
	PACMAN_SUPER = false;
}

function addPacman() {
    PACMEN_DIRECTION.push(PACMAN_DIRECTION);
    PACMEN_DIRECTION_TRY.push(PACMAN_DIRECTION_TRY);
    PACMEN_DIRECTION_TRY_TIMER.push(PACMAN_DIRECTION_TRY_TIMER);
    PACMEN_POSITION_X.push(PACMAN_POSITION_X);
    PACMEN_POSITION_Y.push(PACMAN_POSITION_Y);
    PACMEN_POSITION_STEP.push(PACMAN_POSITION_STEP);
    PACMEN_MOUNTH_STATE.push(PACMAN_MOUNTH_STATE);
    PACMEN_MOVING.push(PACMAN_MOVING);
    PACMEN_MOVING_TIMER.push(PACMAN_MOVING_TIMER);
    PACMEN_KILLING_TIMER.push(PACMAN_KILLING_TIMER);
    PACMEN_DEAD.push(PACMAN_DEAD);
}

function addNewPacman() {
    if (PACMEN_DIRECTION.length <= MAX_PLAYER_NUM) {
        PLAYER_NUM = PACMEN_DIRECTION.length;

        PACMAN_DIRECTION = 3;
        PACMAN_DIRECTION_TRY = -1;
        PACMAN_DIRECTION_TRY_TIMER = null;
        PACMAN_POSITION_X = START_POSITIONS_X[PLAYER_NUM];
        PACMAN_POSITION_Y = START_POSITIONS_Y[PLAYER_NUM];
        PACMAN_MOUNTH_STATE = 3;
        PACMAN_MOVING = false;
        PACMAN_MOVING_TIMER = -1;
        PACMAN_KILLING_TIMER = -1;
        PACMAN_DEAD = false;
        PACMAN_SUPER = false;

        PACMEN_DIRECTION.push(PACMAN_DIRECTION);
        PACMEN_DIRECTION_TRY.push(PACMAN_DIRECTION_TRY);
        PACMEN_DIRECTION_TRY_TIMER.push(PACMAN_DIRECTION_TRY_TIMER);
        PACMEN_POSITION_X.push(PACMAN_POSITION_X);
        PACMEN_POSITION_Y.push(PACMAN_POSITION_Y);
        PACMEN_POSITION_STEP.push(PACMAN_POSITION_STEP);
        PACMEN_MOUNTH_STATE.push(PACMAN_MOUNTH_STATE);
        PACMEN_MOVING.push(PACMAN_MOVING);
        PACMEN_MOVING_TIMER.push(PACMAN_MOVING_TIMER);
        PACMEN_KILLING_TIMER.push(PACMAN_KILLING_TIMER);
        PACMEN_DEAD.push(PACMAN_DEAD);
    }
}

function setCurPacmanVars(number) {
    PLAYER_NUM = number;
    PACMAN_DIRECTION = PACMEN_DIRECTION[number];
    PACMAN_DIRECTION_TRY = PACMEN_DIRECTION_TRY[number];
    PACMAN_DIRECTION_TRY_TIMER = PACMEN_DIRECTION_TRY_TIMER[number];
    PACMAN_POSITION_X = PACMEN_POSITION_X[number];
    PACMAN_POSITION_Y = PACMEN_POSITION_Y[number];
    PACMAN_POSITION_STEP = PACMEN_POSITION_STEP[number];
    PACMAN_MOUNTH_STATE = PACMEN_MOUNTH_STATE[number];
    PACMAN_MOVING = PACMEN_MOVING[number];
    PACMAN_MOVING_TIMER = PACMEN_MOVING_TIMER[number];
    PACMAN_KILLING_TIMER = PACMEN_KILLING_TIMER[number];
    PACMAN_DEAD = PACMEN_DEAD[number];
}

function getPacmenObj() {
    var pacmen;

    pacmen = {
        "PLAYER_NUM": PLAYER_NUM,
        "PACMAN_DIRECTION": PACMEN_DIRECTION[PLAYER_NUM],
        "PACMAN_DIRECTION_TRY": PACMEN_DIRECTION_TRY[PLAYER_NUM],
        "PACMAN_POSITION_X": PACMEN_POSITION_X[PLAYER_NUM],
        "PACMAN_POSITION_Y": PACMEN_POSITION_Y[PLAYER_NUM],
        "PACMAN_POSITION_STEP": PACMEN_POSITION_STEP[PLAYER_NUM],
        "PACMAN_MOUNTH_STATE": PACMEN_MOUNTH_STATE[PLAYER_NUM],
        "PACMAN_MOVING": PACMEN_MOVING[PLAYER_NUM],
        "PACMAN_DEAD": PACMEN_DEAD[PLAYER_NUM],
        "HIGHSCORE": HIGHSCORE,
        "SCORE": SCORE,
        "BUBBLES_ARRAY": BUBBLES_ARRAY,
        "SUPER_BUBBLES": SUPER_BUBBLES,
    };

    if (PLAYER_NUM === 0) {
        var ghosts;

        ghosts = {
            "GHOST_BLINKY_POSITION_X": GHOST_BLINKY_POSITION_X,
            "GHOST_BLINKY_POSITION_Y": GHOST_BLINKY_POSITION_Y,
            "GHOST_BLINKY_DIRECTION": GHOST_BLINKY_DIRECTION,
            "GHOST_BLINKY_MOVING": GHOST_BLINKY_MOVING,
            "GHOST_BLINKY_BODY_STATE": GHOST_BLINKY_BODY_STATE,
            "GHOST_BLINKY_STATE": GHOST_BLINKY_STATE,
            "GHOST_BLINKY_AFFRAID_STATE": GHOST_BLINKY_AFFRAID_STATE,
            "GHOST_BLINKY_TUNNEL": GHOST_BLINKY_TUNNEL,

            "GHOST_PINKY_POSITION_X": GHOST_PINKY_POSITION_X,
            "GHOST_PINKY_POSITION_Y": GHOST_PINKY_POSITION_Y,
            "GHOST_PINKY_DIRECTION": GHOST_PINKY_DIRECTION,
            "GHOST_PINKY_MOVING": GHOST_PINKY_MOVING,
            "GHOST_PINKY_BODY_STATE": GHOST_PINKY_BODY_STATE,
            "GHOST_PINKY_STATE": GHOST_PINKY_STATE,
            "GHOST_PINKY_AFFRAID_STATE": GHOST_PINKY_AFFRAID_STATE,
            "GHOST_PINKY_TUNNEL": GHOST_PINKY_TUNNEL,

            "GHOST_INKY_POSITION_X": GHOST_INKY_POSITION_X,
            "GHOST_INKY_POSITION_Y": GHOST_INKY_POSITION_Y,
            "GHOST_INKY_DIRECTION": GHOST_INKY_DIRECTION,
            "GHOST_INKY_MOVING": GHOST_INKY_MOVING,
            "GHOST_INKY_BODY_STATE": GHOST_INKY_BODY_STATE,
            "GHOST_INKY_STATE": GHOST_INKY_STATE,
            "GHOST_INKY_AFFRAID_STATE": GHOST_INKY_AFFRAID_STATE,
            "GHOST_INKY_TUNNEL": GHOST_INKY_TUNNEL,

            "GHOST_CLYDE_POSITION_X": GHOST_CLYDE_POSITION_X,
            "GHOST_CLYDE_POSITION_Y": GHOST_CLYDE_POSITION_Y,
            "GHOST_CLYDE_DIRECTION": GHOST_CLYDE_DIRECTION,
            "GHOST_CLYDE_MOVING": GHOST_CLYDE_MOVING,
            "GHOST_CLYDE_BODY_STATE": GHOST_CLYDE_BODY_STATE,
            "GHOST_CLYDE_STATE": GHOST_CLYDE_STATE,
            "GHOST_CLYDE_AFFRAID_STATE": GHOST_CLYDE_AFFRAID_STATE,
            "GHOST_CLYDE_TUNNEL": GHOST_CLYDE_TUNNEL,

            "GHOST_AFFRAID_COLOR": GHOST_AFFRAID_COLOR,
            "GHOST_AFFRAID_FINISH_COLOR": GHOST_AFFRAID_FINISH_COLOR,
            "GHOST_POSITION_STEP": GHOST_POSITION_STEP,
            "GHOST_MOVING_SPEED": GHOST_MOVING_SPEED,
            "GHOST_TUNNEL_MOVING_SPEED": GHOST_TUNNEL_MOVING_SPEED,
            "GHOST_AFFRAID_MOVING_SPEED": GHOST_AFFRAID_MOVING_SPEED,
            "GHOST_EAT_MOVING_SPEED": GHOST_EAT_MOVING_SPEED,
            "GHOST_AFFRAID_TIME": GHOST_AFFRAID_TIME,
            "GHOST_EAT_TIME": GHOST_EAT_TIME,
            "GHOST_BODY_STATE_MAX": GHOST_BODY_STATE_MAX,
        };

        for (var key in ghosts) {
            pacmen[key] = ghosts[key];
        }
    }

    return pacmen;
}

function setPacmenByProps(props) {
    PLAYER_NUM = props["PLAYER_NUM"];

    PLAYER_NUM = props["PLAYER_NUM"];
    PACMAN_DIRECTION = props["PACMAN_DIRECTION"];
    PACMAN_DIRECTION_TRY = props["PACMAN_DIRECTION_TRY"];
    PACMAN_POSITION_X = props["PACMAN_POSITION_X"];
    PACMAN_POSITION_Y = props["PACMAN_POSITION_Y"];
    PACMAN_POSITION_STEP = props["PACMAN_POSITION_STEP"];
    PACMAN_MOUNTH_STATE = props["PACMAN_MOUNTH_STATE"];
    PACMAN_MOVING = props["PACMAN_MOVING"];
    PACMAN_DEAD = props["PACMAN_DEAD"];
    BEST_SCORE = props["BEST_SCORE"];
    BUBBLES_ARRAY = props["BUBBLES_ARRAY"];


    if ("GHOST_BLINKY_CANVAS_CONTEXT" in props) {
        GHOST_BLINKY_CANVAS_CONTEXT = props["GHOST_BLINKY_CANVAS_CONTEXT"];
        GHOST_BLINKY_POSITION_X = props["GHOST_BLINKY_POSITION_X"];
        GHOST_BLINKY_POSITION_Y = props["GHOST_BLINKY_POSITION_Y"];
        GHOST_BLINKY_DIRECTION = props["GHOST_BLINKY_DIRECTION"];
        GHOST_BLINKY_COLOR = props["GHOST_BLINKY_COLOR"];
        GHOST_BLINKY_MOVING = props["GHOST_BLINKY_MOVING"];
        GHOST_BLINKY_BODY_STATE = props["GHOST_BLINKY_BODY_STATE"];
        GHOST_BLINKY_STATE = props["GHOST_BLINKY_STATE"];
        GHOST_BLINKY_AFFRAID_STATE = props["GHOST_BLINKY_AFFRAID_STATE"];
        GHOST_BLINKY_TUNNEL = props["GHOST_BLINKY_TUNNEL"];

        GHOST_PINKY_CANVAS_CONTEXT = props["GHOST_PINKY_CANVAS_CONTEXT"];
        GHOST_PINKY_POSITION_X = props["GHOST_PINKY_POSITION_X"];
        GHOST_PINKY_POSITION_Y = props["GHOST_PINKY_POSITION_Y"];
        GHOST_PINKY_DIRECTION = props["GHOST_PINKY_DIRECTION"];
        GHOST_PINKY_COLOR = props["GHOST_PINKY_COLOR"];
        GHOST_PINKY_MOVING = props["GHOST_PINKY_MOVING"];
        GHOST_PINKY_BODY_STATE = props["GHOST_PINKY_BODY_STATE"];
        GHOST_PINKY_STATE = props["GHOST_PINKY_STATE"];
        GHOST_PINKY_AFFRAID_STATE = props["GHOST_PINKY_AFFRAID_STATE"];
        GHOST_PINKY_TUNNEL = props["GHOST_PINKY_TUNNEL"];

        GHOST_INKY_CANVAS_CONTEXT = props["GHOST_INKY_CANVAS_CONTEXT"];
        GHOST_INKY_POSITION_X = props["GHOST_INKY_POSITION_X"];
        GHOST_INKY_POSITION_Y = props["GHOST_INKY_POSITION_Y"];
        GHOST_INKY_DIRECTION = props["GHOST_INKY_DIRECTION"];
        GHOST_INKY_COLOR = props["GHOST_INKY_COLOR"];
        GHOST_INKY_MOVING = props["GHOST_INKY_MOVING"];
        GHOST_INKY_BODY_STATE = props["GHOST_INKY_BODY_STATE"];
        GHOST_INKY_STATE = props["GHOST_INKY_STATE"];
        GHOST_INKY_AFFRAID_STATE = props["GHOST_INKY_AFFRAID_STATE"];
        GHOST_INKY_TUNNEL = props["GHOST_INKY_TUNNEL"];

        GHOST_CLYDE_CANVAS_CONTEXT = props["GHOST_CLYDE_CANVAS_CONTEXT"];
        GHOST_CLYDE_POSITION_X = props["GHOST_CLYDE_POSITION_X"];
        GHOST_CLYDE_POSITION_Y = props["GHOST_CLYDE_POSITION_Y"];
        GHOST_CLYDE_DIRECTION = props["GHOST_CLYDE_DIRECTION"];
        GHOST_CLYDE_COLOR = props["GHOST_CLYDE_COLOR"];
        GHOST_CLYDE_MOVING = props["GHOST_CLYDE_MOVING"];
        GHOST_CLYDE_BODY_STATE = props["GHOST_CLYDE_BODY_STATE"];
        GHOST_CLYDE_STATE = props["GHOST_CLYDE_STATE"];
        GHOST_CLYDE_AFFRAID_STATE = props["GHOST_CLYDE_AFFRAID_STATE"];
        GHOST_CLYDE_TUNNEL = props["GHOST_CLYDE_TUNNEL"];

        GHOST_AFFRAID_COLOR = props["GHOST_AFFRAID_COLOR"];
        GHOST_AFFRAID_FINISH_COLOR = props["GHOST_AFFRAID_FINISH_COLOR"];
        GHOST_POSITION_STEP = props["GHOST_POSITION_STEP"];
        GHOST_MOVING_SPEED = props["GHOST_MOVING_SPEED"];
        GHOST_TUNNEL_MOVING_SPEED = props["GHOST_TUNNEL_MOVING_SPEED"];
        GHOST_AFFRAID_MOVING_SPEED = props["GHOST_AFFRAID_MOVING_SPEED"];
        GHOST_EAT_MOVING_SPEED = props["GHOST_EAT_MOVING_SPEED"];
        GHOST_AFFRAID_TIME = props["GHOST_AFFRAID_TIME"];
        GHOST_EAT_TIME = props["GHOST_EAT_TIME"];
        GHOST_BODY_STATE_MAX = props["GHOST_BODY_STATE_MAX"];
    }
}

function setPacmenVars(number) {
    PACMEN_DIRECTION[number] = PACMAN_DIRECTION;
    PACMEN_DIRECTION_TRY[number] = PACMAN_DIRECTION_TRY;
    PACMEN_DIRECTION_TRY_TIMER[number] = PACMAN_DIRECTION_TRY_TIMER;
    PACMEN_POSITION_X[number] = PACMAN_POSITION_X;
    PACMEN_POSITION_Y[number] = PACMAN_POSITION_Y;
    PACMEN_POSITION_STEP[number] = PACMAN_POSITION_STEP;
    PACMEN_MOUNTH_STATE[number] = PACMAN_MOUNTH_STATE;
    PACMEN_MOVING[number] = PACMAN_MOVING;
    PACMEN_MOVING_TIMER[number] = PACMAN_MOVING_TIMER;
    PACMEN_KILLING_TIMER[number] = PACMAN_KILLING_TIMER;
    PACMEN_DEAD[number] = PACMAN_DEAD;
}

function getPacmanCanevasContext() { 
	return PACMAN_CANVAS_CONTEXT;
}

function stopPacman() { 
	if (PACMAN_MOVING_TIMER != -1) { 
		clearInterval(PACMAN_MOVING_TIMER);
		PACMAN_MOVING_TIMER = -1;
		PACMAN_MOVING = false;
	}
	if (PACMAN_KILLING_TIMER != -1) { 
		clearInterval(PACMAN_KILLING_TIMER);
		PACMAN_KILLING_TIMER = -1;
	}
}

function pausePacman() { 
	if (PACMAN_DIRECTION_TRY_TIMER != null) { 
		PACMAN_DIRECTION_TRY_TIMER.pause();
	}
	
	if ( PACMAN_MOVING_TIMER != -1 ) { 
		clearInterval(PACMAN_MOVING_TIMER);
		PACMAN_MOVING_TIMER = -1;
		PACMAN_MOVING = false;
	}
}
function resumePacman() { 
	if (PACMAN_DIRECTION_TRY_TIMER != null) { 
		PACMAN_DIRECTION_TRY_TIMER.resume();
	}
	movePacman();
}

function tryMovePacmanCancel() { 
	if (PACMAN_DIRECTION_TRY_TIMER != null) { 
		PACMAN_DIRECTION_TRY_TIMER.cancel();
		PACMAN_DIRECTION_TRY = -1;
		PACMAN_DIRECTION_TRY_TIMER = null;
	}
}
function tryMovePacman(direction) { 
	PACMAN_DIRECTION_TRY = direction;
	PACMAN_DIRECTION_TRY_TIMER = new Timer('tryMovePacmanCancel()', PACMAN_DIRECTION_TRY_CANCEL);
}

function movePacman(direction) {

	if (PACMAN_MOVING === false) { 
		PACMAN_MOVING = true;
		drawPacman();
		PACMAN_MOVING_TIMER = setInterval('movePacman()', PACMAN_MOVING_SPEED);
	}
	
	var directionTry = direction;
	var quarterChangeDirection = false;
	
	if (!directionTry && PACMAN_DIRECTION_TRY != -1) { 
		directionTry = PACMAN_DIRECTION_TRY;
	}
	
	if ((!directionTry || PACMAN_DIRECTION !== directionTry)) { 
	
		if (directionTry) { 
			if (canMovePacman(directionTry)) { 
				if (PACMAN_DIRECTION + 1 === directionTry || PACMAN_DIRECTION - 1 === directionTry || PACMAN_DIRECTION + 1 === directionTry || (PACMAN_DIRECTION === 4 && directionTry === 1) || (PACMAN_DIRECTION === 1 && directionTry === 4) ) { 
					quarterChangeDirection = true;
				}
				PACMAN_DIRECTION = directionTry;
				tryMovePacmanCancel();
			} else { 
				if (directionTry !== PACMAN_DIRECTION_TRY) { 
					tryMovePacmanCancel();
				}
				if (PACMAN_DIRECTION_TRY === -1) { 
					tryMovePacman(directionTry);
				}
			}
		}

		if (canMovePacman(PACMAN_DIRECTION)) { 
			erasePacman();
			
			if (PACMAN_MOUNTH_STATE < PACMAN_MOUNTH_STATE_MAX) { 
				PACMAN_MOUNTH_STATE ++; 
			} else { 
				PACMAN_MOUNTH_STATE = 0; 
			}
						
			var speedUp = 0;
			if (quarterChangeDirection) { 
				speedUp = 6;
			}
			
			if ( PACMAN_DIRECTION === 1 ) { 
				PACMAN_POSITION_X += PACMAN_POSITION_STEP + speedUp;
			} else if ( PACMAN_DIRECTION === 2 ) { 
				PACMAN_POSITION_Y += PACMAN_POSITION_STEP + speedUp;
			} else if ( PACMAN_DIRECTION === 3 ) { 
				PACMAN_POSITION_X -= PACMAN_POSITION_STEP + speedUp;
			} else if ( PACMAN_DIRECTION === 4 ) { 
				PACMAN_POSITION_Y -= (PACMAN_POSITION_STEP + speedUp);
			}
			
			if ( PACMAN_POSITION_X === 2 && PACMAN_POSITION_Y === 258 ) { 
				PACMAN_POSITION_X = 548;
				PACMAN_POSITION_Y = 258;
			} else if ( PACMAN_POSITION_X === 548 && PACMAN_POSITION_Y === 258 ) { 
				PACMAN_POSITION_X = 2;
				PACMAN_POSITION_Y = 258;
			}
			
			drawPacman();
			
			if ((PACMAN_MOUNTH_STATE) === 0 || (PACMAN_MOUNTH_STATE) === 3) { 
				testBubblesPacman();
				testGhostsPacman();
				testFruitsPacman();
			}
		} else { 
			stopPacman();
		}
	} else if (direction && PACMAN_DIRECTION === direction) { 
		tryMovePacmanCancel();
	}
}

function canMovePacman(direction) { 
	
	var positionX = PACMAN_POSITION_X;
	var positionY = PACMAN_POSITION_Y;
	
	if (positionX === 276 && positionY === 204 && direction === 2) return false;
	
	if ( direction === 1 ) { 
		positionX += PACMAN_POSITION_STEP;
	} else if ( direction === 2 ) { 
		positionY += PACMAN_POSITION_STEP;
	} else if ( direction === 3 ) { 
		positionX -= PACMAN_POSITION_STEP;
	} else if ( direction === 4 ) { 
		positionY -= PACMAN_POSITION_STEP;
	}
	
	for (var i = 0, imax = PATHS.length; i < imax; i ++) { 
	
		var p = PATHS[i];
		var c = p.split("-");
		var cx = c[0].split(",");
		var cy = c[1].split(",");
	
		var startX = cx[0];
		var startY = cx[1];
		var endX = cy[0];
		var endY = cy[1];

		if (positionX >= startX && positionX <= endX && positionY >= startY && positionY <= endY) { 
			return true;
		}
	}
	
	return false;
}

function drawPacman() { 
    var ctx = getPacmanCanevasContext();
    var isplayer = true;
    if (isplayer)
        ctx.fillStyle = "#fff200";
    else
        ctx.fillStyle = "#ff3a5b";
	ctx.beginPath();
	
	var startAngle = 0;
	var endAngle = 2 * Math.PI;
	var lineToX = PACMAN_POSITION_X;
	var lineToY = PACMAN_POSITION_Y;
	if (PACMAN_DIRECTION === 1) { 
		startAngle = (0.35 - (PACMAN_MOUNTH_STATE * 0.05)) * Math.PI;
		endAngle = (1.65 + (PACMAN_MOUNTH_STATE * 0.05)) * Math.PI;
		lineToX -= 8;
	} else if (PACMAN_DIRECTION === 2) { 
		startAngle = (0.85 - (PACMAN_MOUNTH_STATE * 0.05)) * Math.PI;
		endAngle = (0.15 + (PACMAN_MOUNTH_STATE * 0.05)) * Math.PI;
		lineToY -= 8;
	} else if (PACMAN_DIRECTION === 3) { 
		startAngle = (1.35 - (PACMAN_MOUNTH_STATE * 0.05)) * Math.PI;
		endAngle = (0.65 + (PACMAN_MOUNTH_STATE * 0.05)) * Math.PI;
		lineToX += 8;
	} else if (PACMAN_DIRECTION === 4) { 
		startAngle = (1.85 - (PACMAN_MOUNTH_STATE * 0.05)) * Math.PI;
		endAngle = (1.15 + (PACMAN_MOUNTH_STATE * 0.05)) * Math.PI;
		lineToY += 8;
	}
	ctx.arc(PACMAN_POSITION_X, PACMAN_POSITION_Y, PACMAN_SIZE, startAngle, endAngle, false);
	ctx.lineTo(lineToX, lineToY);
	ctx.fill();
	ctx.closePath();
}

function erasePacman() { 

	var ctx = getPacmanCanevasContext();
	ctx.clearRect( (PACMAN_POSITION_X - 2) - PACMAN_SIZE, (PACMAN_POSITION_Y - 2) - PACMAN_SIZE, (PACMAN_SIZE * 2) + 5, (PACMAN_SIZE * 2) + 5);
}

function killPacman() { 
	playDieSound();

	LOCK = true;
	PACMAN_DEAD = true;
	stopPacman();
	stopGhosts();
	pauseTimes();
	stopBlinkSuperBubbles();
	PACMAN_KILLING_TIMER = setInterval('killingPacman()', PACMAN_KILLING_SPEED);
}
function killingPacman() { 
	if (PACMAN_MOUNTH_STATE > -12) { 
		erasePacman();
		PACMAN_MOUNTH_STATE --;
		drawPacman();
	} else { 
		clearInterval(PACMAN_KILLING_TIMER);
		PACMAN_KILLING_TIMER = -1;
		erasePacman();
		if (LIFES > 0) { 
			lifes(-1);
			setTimeout('retry()', (PACMAN_RETRY_SPEED));
		} else { 
			gameover();
		}
	}
}

function testGhostsPacman() { 
	testGhostPacman('blinky');
	testGhostPacman('pinky');
	testGhostPacman('inky');
	testGhostPacman('clyde');

}
function testGhostPacman(ghost) { 
	eval('var positionX = GHOST_' + ghost.toUpperCase() + '_POSITION_X');
	eval('var positionY = GHOST_' + ghost.toUpperCase() + '_POSITION_Y');
		
	if (positionX <= PACMAN_POSITION_X + PACMAN_GHOST_GAP && positionX >= PACMAN_POSITION_X - PACMAN_GHOST_GAP && positionY <= PACMAN_POSITION_Y + PACMAN_GHOST_GAP && positionY >= PACMAN_POSITION_Y - PACMAN_GHOST_GAP ) { 
		eval('var state = GHOST_' + ghost.toUpperCase() + '_STATE');
		if (state === 0) { 
			killPacman();
		} else if (state === 1) { 
			startEatGhost(ghost);
		}
	}
}
function testFruitsPacman() { 
	
	if (FRUIT_CANCEL_TIMER != null) { 
		if (FRUITS_POSITION_X <= PACMAN_POSITION_X + PACMAN_FRUITS_GAP && FRUITS_POSITION_X >= PACMAN_POSITION_X - PACMAN_FRUITS_GAP && FRUITS_POSITION_Y <= PACMAN_POSITION_Y + PACMAN_FRUITS_GAP && FRUITS_POSITION_Y >= PACMAN_POSITION_Y - PACMAN_FRUITS_GAP ) { 
			eatFruit();
		}
	}
}

function eraseBubbles() {
    for (var i = 0, imax = BUBBLES_ARRAY.length; i < imax; i++) {
        var bubble = BUBBLES_ARRAY[i];
        var bubbleParams = bubble.split(";");
        var testX = parseInt(bubbleParams[0].split(",")[0]);
        var testY = parseInt(bubbleParams[0].split(",")[1]);

        if (bubbleParams[4] !== "0") {
            var type = bubbleParams[3];

            eraseBubble(type, testX, testY);
            if (type === "s") {
                setSuperBubbleOnXY(testX, testY, "1");
            }
        }
    }
}

function testBubblesPacman() { 
	
	var r = { x: PACMAN_POSITION_X - ( PACMAN_SIZE / 2 ), y: PACMAN_POSITION_Y - ( PACMAN_SIZE / 2 ) , width: ( PACMAN_SIZE * 2 ), height: ( PACMAN_SIZE * 2 ) };
		
	for (var i = 0, imax = BUBBLES_ARRAY.length; i < imax; i ++) { 
		var bubble = BUBBLES_ARRAY[i];
		
		var bubbleParams = bubble.split( ";" );
		var testX = parseInt(bubbleParams[0].split( "," )[0]);
		var testY = parseInt(bubbleParams[0].split( "," )[1]);
		var p = { x: testX, y: testY };
		
		if ( isPointInRect( p, r ) ) { 
			
			if ( bubbleParams[4] === "0" ) { 
				var type = bubbleParams[3];
							
				eraseBubble( type, testX, testY );
				BUBBLES_ARRAY[i] = bubble.substr( 0, bubble.length - 1 ) + "1"
				
				if ( type === "s" ) { 
					setSuperBubbleOnXY( testX, testY, "1" );
					score( SCORE_SUPER_BUBBLE );
					playEatPillSound();
					affraidGhosts();
				} else { 
					score( SCORE_BUBBLE );
					playEatingSound();
				}
				BUBBLES_COUNTER --;
				if ( BUBBLES_COUNTER === 0 ) { 
					win();
				}
			} else { 
				stopEatingSound();
			}
			return;
		}
	}
}