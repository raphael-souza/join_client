import * as React from 'react';
import { useEffect } from 'react';
import { useActionCable, useChannel } from '@aersoftware/react-use-action-cable';

export default function ChatMessage() {
 const { actionCable } = useActionCable('ws://localhost:3000/cable');
 const { subscribe, unsubscribe, send } = useChannel(actionCable)

 useEffect(() => {
  subscribe({
    channel: 'chat_messages_channel',
    content: "content assim disse ",
    user_name: "José",
    color: "blue"
  }, {
    receive: (data) => console.log(data),
    // Custom callbacks can be added for 'initialized', 'connected', and 'disconnected' 

  })

  return () => {
    unsubscribe()
  }
 }, []);

  return (
    <div>
      <h1> ChatMessage </h1>
     
    </div>


  );
}
