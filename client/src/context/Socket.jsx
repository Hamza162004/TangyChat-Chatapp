import { createContext, useContext, useEffect, useMemo } from 'react'
import {io} from 'socket.io-client'
import storageService from '../service/storageService'

const SocketContext = createContext()
const API_URL = import.meta.env.VITE_API_URL;

const getSocket = ()=> useContext(SocketContext)

const SocketProvider = ({ children }) => {
    const socket = useMemo(()=> 
      io(API_URL,{
        extraHeaders:{
            'Tangy-token' : storageService.getToken()
        }
    })
  ,[storageService.getToken()])

  //   useEffect(() => {
  //     return () => {
  //         if (socket) socket.disconnect();
  //     };
  // }, [socket]);

    return (
      <SocketContext.Provider value={socket}>
        {children}
      </SocketContext.Provider>
    );
};

export {SocketProvider , getSocket}