

let mainsec = document.getElementById("mainsection")

let username = document.getElementById("UserName")

let joinbtn = document.getElementById("joinbtn")

let usermsg = document.getElementById("UserMsg")

let sendbtn = document.getElementById("sendbtn")


let Username = ''

joinbtn.addEventListener("click", () => {

    if (username.value) {

        Username = username.value

        document.getElementById("joincont").style.display = 'none'

        mainsec.style.display = 'block'

        const socket = new WebSocket("ws://localhost:4500")

        socket.onmessage = (event) => {

            console.log(event.data)

            const data = event.data

            // invoke showchat function

            ShowChat(JSON.parse(data))

        }

        alert("chat joined successfully")

    }

    else {
        alert("Enter Name to join Chat")
    }



})


sendbtn.addEventListener("click", () => {

    const msg = {
        username: Username,
        msg: usermsg.value
    }

    const socket = new WebSocket("ws://localhost:4500")

    socket.onopen = ()=>{

        socket.send(JSON.stringify(msg))

    }

    socket.onmessage = (event) => {

        console.log(event.data)

        const data = event.data

        // invoke showchat function

        ShowChat(JSON.parse(data))

    }
})


function ShowChat(data){

    const chatbox = document.querySelector(".chatbox")

    let chats = data.map((msg)=>{
        return `<div class="texts">
                        <p>${msg.username} :-</p> <p>${msg.msg}</p>
                    </div>`
    }).join('')

    chatbox.innerHTML = chats

}
