import React from 'react'

const Message = ({ mine, content, hour }) => {
  return (
    <div className={`w-full flex ${mine ? "justify-end" : "justify-start"}`}>
        <div className={`max-w-[90%] px-3 py-1 box-border rounded-2xl ${mine ? "bg-gradient-to-r from-amber-500 to-pink-500 rounded-ee-none" : "bg-gradient-to-r from-fuchsia-500 to-cyan-500 rounded-es-none"}`}>
            <p>{content}</p>
        </div>
    </div>
  )
}

export default Message