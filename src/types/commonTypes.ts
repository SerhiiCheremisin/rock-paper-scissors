
export interface IFormProps  {
    setName : Function,
    setAuth : Function,
    setUsersInformation: Function,
    userName: string,
    usersArray: IPlayer[]
}

export type figures = 'Rock' | 'Paper' | "Scissors" 

export interface IPlayer {
    name: string,
    id: string,
    isConnected : boolean,
    figureIsChosen: boolean,
    score: number,
    choosenFigure: string,
    isWinner: boolean
}

export interface IGameBoardProps {
    usersArray : IPlayer[],
    currentUser : string,
    weGotWinner: boolean
}

export interface IModalProps {
    eventHandler: Function,
    users: IPlayer[],
    currentUser: string
}

export interface IPlayesActiverProps {
    player : IPlayer,
    users: IPlayer[],
}

export interface IPlayesPassiveProps {
    player : IPlayer,
}