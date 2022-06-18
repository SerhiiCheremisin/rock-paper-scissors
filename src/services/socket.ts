import { io } from "socket.io-client";
import { IPlayer } from '../types/commonTypes';


const playerChunk = {
    isConnected : true,
    figureIsChosen: false,
    score: 0,
    choosenFigure: '',
    isWinner: false
}

export const socket = io("http://localhost:8080");


export const addPlayer = (name:string) => socket.emit('addPlayer', {...playerChunk, name: `${name}`, id: `${socket.id}`});

export const chooserHandler = (players: IPlayer[]) => socket.emit('chooserHandler', players);

export const deactivateWinner = () => socket.emit('deactivate')
