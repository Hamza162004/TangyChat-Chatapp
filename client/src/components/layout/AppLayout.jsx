import React, { useState } from 'react'
import Title from '../shared/Title';
import { Grid } from '@mui/material';
import SideMenu from './SideMenu';
import Header from './Header';
import ChatList from '../specifics/ChatList';
import { SampleChat } from '../../constants/SampleData';
import { useParams } from 'react-router-dom';
import Profile from '../specifics/Profile';
import Friends from '../specifics/Friends';
import NewGroup from '../specifics/NewGroup';
import GroupList from '../specifics/GroupList'

const AppLayout = () => (WrappedComponents)=> {
    return (props) =>{
        const params = useParams()
        const chatId = params.chatId

        const [isProfile,setIsProfile] = useState(false)
        const [isChatList,setIsChatList] = useState(false)
        const [isFriends,setIsFriends] = useState(false)
        const [isNewGroup,setIsNewGroup] =useState(false)
        const [isGroup,setIsGroup] =useState(false)

        const handleDeleteChat = (e ,_id,groupChat)=>{
            e.preventDefault()
            console.log('Delete Chat',_id,groupChat)
        }

        return (
            <>
                <Title/>
                <Grid container height={'100vh'}>
                    <SideMenu isGroup={isGroup} setIsGroup={setIsGroup} isNewGroup={isNewGroup} setIsNewGroup={setIsNewGroup} isChatList={isChatList} isProfile={isProfile} isFriends={isFriends} setIsFriends={setIsFriends} setIsChatList={setIsChatList} setIsProfile={setIsProfile} />
                    <Grid item sm={3} sx={{display:{
                        xs:'none' , sm:'block'
                    },borderRight:'1px solid black'}}>
                        {
                            isChatList && (
                                <ChatList chats={SampleChat}  chatId={chatId} handleDeleteChat={handleDeleteChat} />    
                            )     
                        }
                        {
                            isProfile && (
                                <Profile/>
                            )
                        }
                        {
                            isFriends && (
                                <>
                                    <Friends/>
                                </>
                            )
                        }
                        {
                            isGroup && (
                                <GroupList chats={SampleChat} chatId={chatId} />
                            )
                        }
                        {
                            isNewGroup && (
                                <NewGroup/>
                            )
                        }
                    </Grid>
                    <Grid item xs={10} sm={8.2} bgcolor={'white'}>
                        <WrappedComponents {...props}/>
                    </Grid>
                </Grid>
                
            </>
        );
    };
  
}

export default AppLayout