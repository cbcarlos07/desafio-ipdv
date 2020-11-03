const realtime = io => {
    io.on('connection', socket => {
        socket.on('expired', obj => { //Nova inscrição
            socket.broadcast.emit('expired', obj)
        })
        
    })
}

export default realtime