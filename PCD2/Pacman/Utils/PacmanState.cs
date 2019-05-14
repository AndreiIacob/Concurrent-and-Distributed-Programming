using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MultiplayerPacman.Utils
{
    public class PacmanState
    {
        public string GameId { get; set; }

        public int PLAYER_NUM { get; set; }
        public int PACMAN_DIRECTION { get; set; }
        public int PACMAN_DIRECTION_TRY { get; set; }
        public int PACMAN_POSITION_X { get; set; }
        public int PACMAN_POSITION_Y { get; set; }
        public int PACMAN_POSITION_STEP { get; set; }
        public int PACMAN_MOUNTH_STATE { get; set; }
        public int PACMAN_MOVING { get; set; }
        public int PACMAN_DEAD { get; set; }
        public int HIGHSCORE { get; set; }
        public int SCORE { get; set; }
        public List<string> BUBBLES_ARRAY { get; set; }
        public List<string> SUPER_BUBBLES { get; set; }


        public int GHOST_BLINKY_POSITION_X { get; set; }
        public int GHOST_BLINKY_POSITION_Y { get; set; }
        public int GHOST_BLINKY_DIRECTION { get; set; }
        public int GHOST_BLINKY_MOVING { get; set; }
        public int GHOST_BLINKY_BODY_STATE { get; set; }
        public int GHOST_BLINKY_STATE { get; set; }
        public int GHOST_BLINKY_AFFRAID_STATE { get; set; }
        public int GHOST_BLINKY_TUNNEL { get; set; }


        public int GHOST_PINKY_POSITION_X { get; set; }
        public int GHOST_PINKY_POSITION_Y { get; set; }
        public int GHOST_PINKY_DIRECTION { get; set; }
        public int GHOST_PINKY_MOVING { get; set; }
        public int GHOST_PINKY_BODY_STATE { get; set; }
        public int GHOST_PINKY_STATE { get; set; }
        public int GHOST_PINKY_AFFRAID_STATE { get; set; }
        public int GHOST_PINKY_TUNNEL { get; set; }


        public int GHOST_INKY_POSITION_X { get; set; }
        public int GHOST_INKY_POSITION_Y { get; set; }
        public int GHOST_INKY_DIRECTION { get; set; }
        public int GHOST_INKY_MOVING { get; set; }
        public int GHOST_INKY_BODY_STATE { get; set; }
        public int GHOST_INKY_STATE { get; set; }
        public int GHOST_INKY_AFFRAID_STATE { get; set; }
        public int GHOST_INKY_TUNNEL { get; set; }

        public int GHOST_CLYDE_POSITION_X { get; set; }
        public int GHOST_CLYDE_POSITION_Y { get; set; }
        public int GHOST_CLYDE_DIRECTION { get; set; }
        public int GHOST_CLYDE_MOVING { get; set; }
        public int GHOST_CLYDE_BODY_STATE { get; set; }
        public int GHOST_CLYDE_STATE { get; set; }
        public int GHOST_CLYDE_AFFRAID_STATE { get; set; }
        public int GHOST_CLYDE_TUNNEL { get; set; }

        public int GHOST_AFFRAID_COLOR { get; set; }
        public int GHOST_AFFRAID_FINISH_COLOR { get; set; }
        public int GHOST_POSITION_STEP { get; set; }
        public int GHOST_MOVING_SPEED { get; set; }
        public int GHOST_TUNNEL_MOVING_SPEED { get; set; }
        public int GHOST_AFFRAID_MOVING_SPEED { get; set; }
        public int GHOST_EAT_MOVING_SPEED { get; set; }
        public int GHOST_AFFRAID_TIME { get; set; }
        public int GHOST_EAT_TIME { get; set; }
        public int GHOST_BODY_STATE_MAX { get; set; }
    }
}
