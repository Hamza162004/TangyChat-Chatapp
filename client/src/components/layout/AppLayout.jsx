import React, { useState,useContext } from 'react'
import Title from '../shared/Title';
import { Grid } from '@mui/material';
import SideMenu from './SideMenu';
import ChatList from '../specifics/ChatList';
import { SampleChat } from '../../constants/SampleData';
import { useParams } from 'react-router-dom';
import Profile from '../specifics/Profile';
import Friends from '../specifics/Friends';
import NewGroup from '../specifics/NewGroup';
import GroupList from '../specifics/GroupList'
import { AppContext } from '../../context/SideMenuStates';


const AppLayout = () => (WrappedComponents)=> {
    return (props) =>{
        const params = useParams()
        const chatId = params.chatId

        const {
            isProfile, setIsProfile,
            isChatList, setIsChatList,
            isFriends, setIsFriends,
            isNewGroup, setIsNewGroup,
            isGroup, setIsGroup
          } = useContext(AppContext);

        const handleDeleteChat = (e ,_id,groupChat)=>{
            e.preventDefault()
            console.log('Delete Chat',_id,groupChat)
        }

        return (
            <>
                <Title/>
                <Grid container height={'100vh'}>
                    <SideMenu isGroup={isGroup} setIsGroup={setIsGroup} isNewGroup={isNewGroup} setIsNewGroup={setIsNewGroup} isChatList={isChatList} isProfile={isProfile} isFriends={isFriends} setIsFriends={setIsFriends} setIsChatList={setIsChatList} setIsProfile={setIsProfile} />
                    <Grid item height={'100%'} overflow={'hidden'} sm={3.2} sx={{display:{
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
                    <Grid item xs={10} sm={8} bgcolor={'white'} height={'100%'}>
                        <WrappedComponents {...props}/>
                    </Grid>
                </Grid>
                
            </>
        );
    };
  
}

export default AppLayout