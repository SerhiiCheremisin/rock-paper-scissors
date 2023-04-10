const localServer = 'http://localhost:3000';
const usersArray = [];
const uniqueSet = new Set();

const io = require('socket.io')(8080, {
    cors: {
        origin: [`${localServer}`]
    }
});

io.on("connection", socket => {
    socket.on('addPlayer', object => {
      if (usersArray.length === 0)  {
        uniqueSet.add(object.name);
        usersArray.push(object);
        io.emit('sendArrayToFront', usersArray)
      }
      else {
        if (uniqueSet.has(object.name)){
            const filteredArray = usersArray.filter( el => el.name !== object.name);
            const uniqueArray = [...filteredArray, ...[object]];
            io.emit('sendArrayToFront', uniqueArray)
          } else {
            const uniqueArray = [...usersArray, ...[object]];
            io.emit('sendArrayToFront', uniqueArray)
          }
      }
    }) 
    socket.on('chooserHandler', mutatedArray => {
        io.emit('sendChangesToFront', mutatedArray)
    })
    socket.on('disconnect', () => {
       io.emit('sendLeftUser', socket.id)
    })
    socket.on('deactivate', () => {
        io.emit('deactivateOnFront', socket.id)
    })
})

