import React, {useState, useEffect, ReactNode} from 'react';
import {LoadingGame} from './GameLobby'
 // @ts-ignore
import PubSub from 'pubsub-js'
import { Outlet, Link, useLocation } from "react-router-dom";

interface UserContextShape {
}

export const LiveGameContext = React.createContext<UserContextShape>(
  {} as UserContextShape
);

const GAME_TOPIC = 'foo'

const ActiveGame = ({gameTopic, initialMessage}: {gameTopic: string, initialMessage: any}) => {
  console.log(global.gameSocket)
  const [messages, setMessages] = useState<any>(null);

  const storeMessages = (_: any, msgs: any) => {
    console.log('listening', msgs)
    setMessages(msgs);
  };

  useEffect(() => {
    console.log('messages', messages)
  }, [messages])


  useEffect(() => {
    // if no topic, early return
    console.log('subscribed to ', gameTopic)
    if (!gameTopic) {
      return;
    }
    console.log('hffi', initialMessage)
    const token = PubSub.subscribe(gameTopic, storeMessages);
    // unsubscribe on unmount
    return () => {
      PubSub.unsubscribe(token);
    };
  }, [gameTopic]);


  return <div>{JSON.stringify(messages)}</div>
}

export const GameWrapper = () => {
    const [isReady, setIsReady] = useState(false);
    const [initialMessage, setInitialMessage] = useState<any>(null)

    const {state: {type, ...rest}} = useLocation();

    console.log(rest)

    useEffect(() => {
          const urlParams = new URLSearchParams(rest);

    
          // Check if the WebSocket is already open, if so, return
          if (
            global.gameSocket &&
            global.gameSocket.readyState === WebSocket.OPEN
          ) {
            console.log("WebSocket is already open.");
            return;
          }
    
          const gameType: any = type;
          // ws://localhost:5156/SecretSips/Join?${createSearchParams(inputs)}
          const wsURL = `ws://192.168.0.123:5156/SecretSips/${gameType}?${urlParams.toString()}`; // Replace with your WebSocket URL
          global.gameSocket = new WebSocket(wsURL);
    
          global.gameSocket.addEventListener("open", () => {
            console.log("WebSocket connection opened");
            // global.gameSocket.send('Hello Server!');
            setIsReady(true);
            // Navigate to the 'create' route with parameters
          });
    
          global.gameSocket.addEventListener("message", (event: MessageEvent) => {
            console.log(`Received message: ${event.data}`);
          });
    
          global.gameSocket.addEventListener("close", () => {
            console.log("WebSocket connection closed");
          });
    
          global.gameSocket.addEventListener("error", (error: Event) => {
            setInitialMessage('connected to the thing now')
            setIsReady(true);
            setTimeout(() => {
              console.log('waiting')
              PubSub.publish(
                GAME_TOPIC,
               [ {message:"hello"}]
              );
            }, 3000)
            
            console.log('try publish')
            
          });
    
        // Close the WebSocket connection when the component unmounts
        return () => {
          if (global.gameSocket) {
            global.gameSocket.close();
          }
        };
      }, []);

    return (
        <LiveGameContext.Provider value={{}}>
        {
            !isReady ? (<LoadingGame/>): <ActiveGame gameTopic={GAME_TOPIC} initialMessage={initialMessage}/>
        }
        </LiveGameContext.Provider>
    )
}

export {}