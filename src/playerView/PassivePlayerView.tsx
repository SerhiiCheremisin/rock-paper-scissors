import { IPlayesPassiveProps } from '../types/commonTypes';

const PassivePlayerView = ( { player } : IPlayesPassiveProps) :JSX.Element => {
   
  if (player.isConnected === false)  {
    return (
        <>
        <h2>{`The Player : ${player.name} went offline, the game has done `}</h2>
        </>
    )
  }

   return(
    <>
     <h3> { `The player : ${player.name} is online now` } </h3>
      { player.figureIsChosen === false ? <h3>{`${player.name} has not chosen his figure for now`}</h3> : <h3>{`${player.name} has chosen figure that uncharted for you`}</h3> }
     <h3>{ `${player.name} score is : ${player.score} points`} </h3> 
    </>
   )


}

export default PassivePlayerView;