import { createContext, useContext, useMemo } from 'react'
import {io} from 'socket.io-client'
import storageService from '../service/storageService'

const SocketContext = createContext()
const API_URL = import.meta.env.VITE_API_URL;
const token = storageService.getToken()

const getSocket = ()=> useContext(SocketContext)

const SocketProvider = ({ children }) => {
    const socket = useMemo(()=> io(API_URL,{
        extraHeaders:{
            'Tangy-token' : token
        }
    }),[])

    return (
      <SocketContext.Provider value={socket}>
        {children}
      </SocketContext.Provider>
    );
};

export {SocketProvider , getSocket}