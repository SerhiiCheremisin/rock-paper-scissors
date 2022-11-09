// Material UI
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { IModalProps, IPlayer } from '../types/commonTypes';
import { chooserHandler, deactivateWinner } from '../services/socket';
import { useState, useEffect } from 'react';

const Modal = ( {eventHandler, users, currentUser} : IModalProps ): JSX.Element => {

  const [amIWinner, setAmIWinner] = useState<boolean>(false)

  useEffect(() => {
    const emptyArray = []
    users.map((el:IPlayer) => {
      if (el.name === currentUser && el.isWinner === true) {
        emptyArray.push(el)
      }
    })
    if (emptyArray.length !== 0) {
      setAmIWinner(true)
    }
  })

  const nextGameHandler = () => {
    const copyState = [...users].map((el:IPlayer) => {
      const newObject = {
        ...el,
        isWinner: false,
        score: 0,
        figureIsChosen: false,
        choosenFigure: ''
      }
      return newObject
    })
    chooserHandler(copyState);
    deactivateWinner();
    eventHandler(false);
  }
    
    const style = {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        zIndex: 1,
        bgcolor: 'white',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
      };

      return(
        <div>
        <Box>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            This match has ended
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            You can start another match or just leave
            </Typography>
            {amIWinner ? <Button onClick={nextGameHandler} variant="outlined">Next Match</Button> : <h3>Only the winner has privilege to start a new game</h3> }
          </Box>
        </Box>
      </div>
      )
}

export default Modal;