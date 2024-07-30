import React, {useState, useEffect, ReactNode} from 'react';
import {LoadingGame} from './GameLobby'
 // @ts-ignore
import PubSub from 'pubsub-js'

interface UserContextShape {
}

export const LiveGameContext = React.createContext<UserContextShape>(
  {} as UserContextShape
);

const GAME_TOPIC = 'foo'

const ActiveGame = ({gameTopic, initialMessage}: {gameTopic: string, initialMessage: any}) => {
  console.log(global.gameSocket)
  const [errors, setErrors] = useState<any>(null);

  const storeErrors = (_: any, msgs: any) => {
    console.log('listening', msgs)
    setErrors(msgs);
  };

  useEffect(() => {
    console.log('messages', errors)
  }, [errors])


  useEffect(() => {
    // if no topic, early return
    console.log('subscribed to ', gameTopic)
    if (!gameTopic) {
      return;
    }
    console.log('hffi', initialMessage)
    const token = PubSub.subscribe(gameTopic, storeErrors);
    // unsubscribe on unmount
    return () => {
      PubSub.unsubscribe(token);
    };
  }, [gameTopic]);


  return <div>{JSON.stringify(errors)}</div>
}

export const GameWrapper = () => {
    const [isReady, setIsReady] = useState(false);
    const [initialMessage, setInitialMessage] = useState<any>(null)

    useEffect(() => {
          const Code = "Jenn";
          const UserName = "Less";
    
          const urlParams = new URLSearchParams({
            Code,
            UserName,
          });
    
          // Check if the WebSocket is already open, if so, return
          if (
            global.gameSocket &&
            global.gameSocket.readyState === WebSocket.OPEN
          ) {
            console.log("WebSocket is already open.");
            return;
          }
    
          // ws://localhost:5156/SecretSips/Join?${createSearchParams(inputs)}
          const wsURL = 'ws://192.168.0.123:5156/SecreftSips/Join?UserName=Jenn&Code=123'; // Replace with your WebSocket URL
          global.gameSocket = new WebSocket(wsURL);
    
          global.gameSocket.addEventListener("open", () => {
            console.log("WebSocket connection opened");
            global.gameSocket.send('Hello Server!');
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