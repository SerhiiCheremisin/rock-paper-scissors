import react , {useState, useEffect} from 'react';
//Material Ui
import Box from '@mui/material/Box';

//Components
import PlayerBoard from '../playerView/PlayerBoard';
 
import { IPlayer, IGameBoardProps } from '../types/commonTypes';

const GameBoard = ( { usersArray, currentUser } :IGameBoardProps ):JSX.Element => {

    return (
        <Box sx={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            position: 'relative'
        }}>
           { usersArray.map((player:IPlayer) => <PlayerBoard key={player.id} player = {player} users = {usersArray} currentUser = {currentUser}/>)}
           { usersArray.length === 1 && <h2>You are alone in the lobby right now</h2> }
        </Box>
    )
}

export default GameBoard;