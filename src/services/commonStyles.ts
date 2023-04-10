
export const boxStyles: Object = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 150,
    backgroundColor: 'teal',
    cursor: 'pointer',
    borderRadius: '10%',
    transition: 'all .5s ease',
    transform: "scale(1)",
    '&:hover': {
      backgroundColor: '#d5bdaf',
      transform: "scale(1.1)"
    },
    '&:active': {
        transform: "scale(0.9)",
        backgroundColor: '#d6ccc2' 
    } 
 }

 export const mainColor:string = '#f7e7ce'