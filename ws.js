
const {WebSocketServer} = require('ws')

const wss = new WebSocketServer({port : 4500 })

const clients = new Set()

const data = []

wss.on("connection" , (socket)=>{

    console.log("a new connection made.")

    clients.add(socket)

    socket.on("message", (msg)=>{

        console.log("client say : " + msg)

        msg = JSON.parse(msg)

        data.push(msg)

        for(let client of clients){

            client.send(JSON.stringify(data))
        }

    })

    socket.send(JSON.stringify(data))


})