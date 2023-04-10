import react , {useState, useEffect} from 'react';
//Material Ui
import Box from '@mui/material/Box';

import { mainColor } from '../services/commonStyles';

//Components
import PlayerBoard from '../playerView/PlayerBoard';
 
import { IPlayer, IGameBoardProps } from '../types/commonTypes';

const GameBoard = ( { usersArray, currentUser } :IGameBoardProps ):JSX.Element => {

    return (
        <Box sx={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            position: 'relative',
            backgroundColor: mainColor
        }}>
           { usersArray.map((player:IPlayer) => <PlayerBoard key={player.id} player = {player} users = {usersArray} currentUser = {currentUser}/>)}
           { usersArray.length === 1 && <h2>You are alone in the lobby right now</h2> }
        </Box>
    )
}

export default GameBoard;