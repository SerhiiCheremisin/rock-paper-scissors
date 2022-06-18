import { IPlayer } from '../types/commonTypes'; 
import { figuresArray } from '../services/commonValues';

import { chooserHandler } from '../services/socket';

const twoPlayersRule = (userArr:IPlayer[]) => {
  const checkingUsers = [...userArr]
  const [firstPlayer, secondPlayer] = checkingUsers

  switch (firstPlayer.choosenFigure + secondPlayer.choosenFigure) {
    case 'RockScissors':
    case 'PaperRock':
    case 'ScissorsPaper': 
 
    const point = firstPlayer.score + 1
     const winnerPlayer = [{
      ...firstPlayer,
      score: point,
      figureIsChosen: false,
      choosenFigure: ''
     }]
     const loserPlayer = [
      {
        ...secondPlayer,
        figureIsChosen: false,
        choosenFigure: ''
      }
     ]

    const sendingArr = [...winnerPlayer, ...loserPlayer]
    chooserHandler(sendingArr);
    alert(`${firstPlayer.name} got one point`)
    break;
    
    case 'ScissorsRock':
    case 'RockPaper':
    case 'PaperScissors':

      const pointForWinner = secondPlayer.score + 1
      const winnerPlayer2 = [{
        ...secondPlayer,
        score: pointForWinner,
        figureIsChosen: false,
        choosenFigure: ''
       }]

       const loserPlayer2 = [{
        ...firstPlayer,
        figureIsChosen: false,
        choosenFigure: ''
       }]
  
      const sendingArrToBack = [...loserPlayer2, ...winnerPlayer2]
      chooserHandler(sendingArrToBack);
      alert(`${secondPlayer.name} got one point`)
      break;
  }
}

export const rulesHandler  = (userArr:IPlayer[], setNeedTocompare: Function) =>  {
  
    // Checking possible draw
  let draw = new Set()
  userArr.map(el => {
    draw.add(el.choosenFigure)
  })
  if (draw.size === figuresArray.length || draw.size === 1) {
    const coppiedArray = [...userArr].map((el:IPlayer) => {
      const coppiedObject = {
        ...el,
        figureIsChosen : false,
        choosenFigure: ''
      }
      return coppiedObject
    })
    setNeedTocompare(false);
    chooserHandler(coppiedArray);
    alert('You got draw')
    return
  } 

  //2 players rule
  setNeedTocompare(false);
  twoPlayersRule(userArr);
  //i need to add rules for 3 or more players in future
  
}

export const compareHandler = (ckeck: boolean, setNeedTocompare: Function) => {
    if (ckeck) {
    setNeedTocompare(true)
    return
     }
}
