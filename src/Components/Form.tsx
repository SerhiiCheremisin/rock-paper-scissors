//Material Ui
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { mainColor } from '../services/commonStyles';

import { useEffect } from 'react';

import { IFormProps } from '../types/commonTypes';
import { addPlayer, socket } from '../services/socket';

const Form = ( { userName, setName, setAuth, setUsersInformation, usersArray} : IFormProps ):JSX.Element => {

 //ServerHandler
 const recieveUsers = () => socket.on('sendArrayToFront', arr => {
  setUsersInformation(arr)
})

useEffect(() => {
  if (localStorage.hasOwnProperty('gameUser')) {
    setName(String(localStorage.getItem('gameUser')));
  }
 },[])
    
  const formHandler = (e:React.FormEvent<{value : unknown}>):void => {
    e.preventDefault()
     if (userName === '') {
        alert('All field should have been filled');
        return
       }
    addPlayer(userName);  
    recieveUsers();
    setAuth(true);
    localStorage.setItem('gameUser', userName)
  }
    return(
        <Box
        component="form"
        onSubmit={(e:any) => formHandler(e)}
        sx={{
         display: 'flex',
         width:  '100%',
         height: '100vh',
         alignItems: 'center',
         justifyContent: 'center',
         backgroundColor: mainColor,
        }}
        noValidate
        autoComplete="off"
      >
          <Box sx={{ 
            border: '2px solid gray', 
            padding: 5,
            display: 'flex',
            justifyContent: 'space-between',
            width: 400
            }}>
           <TextField onChange={e => setName(e.target.value)} value={userName} id="outlined-basic" label="Outlined" variant="outlined" />
           <Button type='submit' variant="outlined">Submit the name</Button>
          </Box>
      </Box>
    )
}

export default Form;