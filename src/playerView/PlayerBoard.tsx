//Material Ui
import Box from '@mui/material/Box';

//Components
import ActivePlayerView from './ActivePlayerView';
import PassivePlayerView from './PassivePlayerView';

import React , {useState, useEffect} from 'react';

const PlayerBoard = ( {...props} ):JSX.Element => {

const { player, users, currentUser } = props;

const [isActivePlayer, setIsActivePlayer] = useState<boolean>(false);

useEffect(() => {
 if (player.name !== currentUser) {
   setIsActivePlayer(true)
}    
},[])

    return(
        <Box sx={{
            display: 'flex',
            gap: 3,
            flexDirection: 'column',
            width: '48%',
            height: '90vh',
            border: '2px solid black',
            padding: '10px 15px',
            boxShadow: '-2px -10px 17px 5px rgba(0,0,0,0.44)',
        }}>
      { !isActivePlayer ? <ActivePlayerView player={player} users={users} /> : <PassivePlayerView player = {player} /> }
        </Box>
    )
}

export default PlayerBoard;
