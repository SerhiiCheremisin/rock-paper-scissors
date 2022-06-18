import React, { useState, useEffect} from 'react';
import './App.css';
//Components
import Form from './Components/Form';
import GameBoard from './Components/GameBoard';
import Modal from './Components/Modal';
//common 
import { IPlayer } from './types/commonTypes';
import { rulesHandler , compareHandler} from './services/commonFunctions';
import { socket, chooserHandler } from './services/socket';

function App():JSX.Element {
  //App state, i have decided not to use state managment
  const [userName, setUserName] = useState<string>('');
  const [isAuth, setIsAuth] = useState <boolean>(false);
  const [usersInformation, setUsersInformation] = useState<IPlayer[]>([]);
  const [needToCompare, setNeedTocompare] = useState<boolean>(false);
  const [weGotWinner, setWeGotWinner] = useState<boolean>(false);  

  useEffect(() => {
    if (usersInformation.length < 2) {
      return
    }
    
  usersInformation.map((el:IPlayer) => {
      if (el.score === 3){
         const copy = [...usersInformation].map((el:IPlayer) => {
          if (el.score === 3) {
            const newObject = {
              ...el,
              isWinner: true,
              score: 0
            }
            return newObject
          }
          return el
         })
        chooserHandler(copy);
        setWeGotWinner(true);
        return
      }
    })

  let check = usersInformation.every(function (elem:IPlayer) {
    if (elem.figureIsChosen === true) {
      return true
    } else {
      return false
    }
  })
  compareHandler(check, setNeedTocompare)
  },[usersInformation])

  useEffect(() => {
    if(needToCompare === true){
      rulesHandler(usersInformation, setNeedTocompare)
    }
  },[needToCompare])

  //Server handlers
  socket.on('sendChangesToFront', changedUser => {
    setUsersInformation(changedUser)
  })

  socket.on('deactivateOnFront', id => {
    setWeGotWinner(false)
  })

  socket.on('sendLeftUser', id => {
    const copy = [...usersInformation].map((el:IPlayer) => {
        if (el.id === id) {
          const newObject = {
            ...el,
            isConnected : false,
            figureIsChosen: false,
            choosenFigure: ''
          }
          return newObject
        }
       const newObject = {
        ...el,
            figureIsChosen: false,
            choosenFigure: ''
       }
       return newObject
    })
    setUsersInformation(copy)
  })
  
  return (
   <>
   { !!isAuth ? <GameBoard weGotWinner = {weGotWinner} usersArray = {usersInformation} currentUser = {userName}/> : <Form setUsersInformation = {setUsersInformation} 
   setName = {setUserName} userName = {userName} setAuth = {setIsAuth} usersArray = {usersInformation}/> }
   { weGotWinner && <Modal eventHandler = {setWeGotWinner} users = {usersInformation} currentUser = {userName}/> }
   </>
  );
}

export default App;
