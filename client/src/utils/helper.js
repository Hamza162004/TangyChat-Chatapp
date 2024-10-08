import { useEffect } from "react"

const useSocketEventHandler = (socket,handlers)=>{
    useEffect(()=>{
        Object.entries(handlers).forEach(([event,handler])=>{
            socket.on(event,handler)
        })

        return ()=>{
            Object.entries(handlers).forEach(([event,handler])=>{
                socket.off(event,handler)
            })
        }
    },[])
}

export {useSocketEventHandler}