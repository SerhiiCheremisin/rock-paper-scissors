//Material Ui
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { boxStyles } from '../services/commonStyles';
import { IPlayesActiverProps, IPlayer } from '../types/commonTypes';

import { figuresArray } from '../services/commonValues';
import { chooserHandler } from '../services/socket';

const ActivePlayerView = ( { player, users } : IPlayesActiverProps ) :JSX.Element => {

    const figureChooserHandler = (value:string, figure:string ):void => {
        const coppiedArray:any = [...users].map((el:IPlayer) => {
           if (el.id === player.id) {
             const copyOfObject = {
                 ...el,
                 choosenFigure: figure,
                 figureIsChosen: true
             }  
             return copyOfObject
           }
           return el
        })
        chooserHandler(coppiedArray)
     }

    return (
        <>
          <h2>{`Player: ${player.name} (it's you)`}</h2>
          <h3>  { `Your score is : ${player.score} points`} </h3>
            { player.figureIsChosen ? <h3>{`You has chosen your figure, wait for the opponent`}</h3> : <h3>{`Choose your figure below:`}</h3>}
         <Stack spacing={30} direction="row">
            {figuresArray.map((figure:string, id:number) => {
               return (
                <Box
                 sx={boxStyles}
                 key={id}
                 onClick={(e:any) => figureChooserHandler(e.target.value , figure)}>
                  <img src={`/images/${figure.toLowerCase()}.png`} alt={`${figure}`} />
                  </Box>
               )
            })}
         </Stack>
         { player.figureIsChosen === true && <h3>{`Your choice is: ${player.choosenFigure}`}</h3> }
         { player.figureIsChosen === true && <Box sx={[boxStyles, {marginLeft: '43%'}]}> <img src={`/images/${player.choosenFigure.toLowerCase()}.png`} alt={`${player.choosenFigure}`} /> </Box> }
        </>
    )
}

export default ActivePlayerView;