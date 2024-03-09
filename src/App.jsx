import { useEffect, useState } from "react"
import Message from "./components/message"
import { socket } from "./socket"

function App() {

  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    document.getElementById("input-message").value = ""
    setMessages(prevMessages => [...prevMessages, { content: message, mine: true }])
    socket.emit("new message", message)
    setMessage("")
    document.getElementById("input-message").scrollIntoView()
  }

  useEffect(() => {
    socket.on('connect', () => {
      console.log("Connected!")
    })

    socket.on('new message', (new_message) => {
      setMessages(prevMessages => [...prevMessages, { content: new_message, mine: false }])
    })

  }, [])
  return (
    <div className="min-h-screen flex flex-col items-center py-5 px-3 w-full md:max-w-[500px] lg:max-w-[500px]">
      <h1 className="text-4xl text-center">My real time chat!</h1>
      <div className="flex flex-col h-[750px] justify-end w-full">
        <div id="main-content" className="overflow-y-auto w-full mt-6 rounded-3xl flex flex-col gap-6 p-3">
          {
            messages.map((message, index) => (
              <Message content={message.content} mine={message.mine} id={index} key={index} />
            ))
          }
        </div>
      </div>
      <div className="w-full">
        <form action="" className="w-full flex" onSubmit={handleSubmit}>
          <input id="input-message" placeholder="Write your message here..." onChange={e => { setMessage(e.target.value) }} type="text" name="message" className="w-full rounded-full px-2 shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-800
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500" />
          <button className="ml-3" type="submit">
            <svg fill="#FFFFFF" width="20px" height="20px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M476.59,227.05l-.16-.07L49.35,49.84A23.56,23.56,0,0,0,27.14,52,24.65,24.65,0,0,0,16,72.59V185.88a24,24,0,0,0,19.52,23.57l232.93,43.07a4,4,0,0,1,0,7.86L35.53,303.45A24,24,0,0,0,16,327V440.31A23.57,23.57,0,0,0,26.59,460a23.94,23.94,0,0,0,13.22,4,24.55,24.55,0,0,0,9.52-1.93L476.4,285.94l.19-.09a32,32,0,0,0,0-58.8Z" /></svg>
          </button>
        </form>
      </div>
    </div>
  )
}

export default App
