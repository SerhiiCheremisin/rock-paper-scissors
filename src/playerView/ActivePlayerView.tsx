//Material Ui
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { IPlayesActiverProps, IPlayer } from '../types/commonTypes';

import { figuresArray } from '../services/commonValues';
import { chooserHandler } from '../services/socket';

const ActivePlayerView = ( { player, users } : IPlayesActiverProps ) :JSX.Element => {

    const figureChooserHandler = (value:string):void => {
        const coppiedArray:any = [...users].map((el:IPlayer) => {
           if (el.id === player.id) {
             const copyOfObject = {
                 ...el,
                 choosenFigure: value,
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
            { player.figureIsChosen ? <h3>{`You has chosen your figure, wait for the opponent`}</h3> : <h3>{`Choose your figure below:`}</h3>}
            { `Your score is : ${player.score} points`}
         <Stack spacing={5} direction="row">
            {figuresArray.map((el:string, id:number) => {
               return (
                <Button key={id} onClick={(e:any) => figureChooserHandler(e.target.value)} value={el} variant="contained">{`${el}`}</Button>
               )
            })}
         </Stack>
         { player.figureIsChosen === true && <h3>{`Your choice is: ${player.choosenFigure}`}</h3> }
        </>
    )
}

export default ActivePlayerView;