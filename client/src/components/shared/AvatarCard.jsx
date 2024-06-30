import { Avatar, AvatarGroup, Stack,Box } from '@mui/material'
import React from 'react'
import { transformImage } from '../../libs/Features'

const AvatarCard = ({avatar=[],max=4}) => {
  return (
    <Stack direction={'row'} spacing={0.5}>
        <AvatarGroup max={max}>
            <Box width={'5rem'} height={'3rem'} >
            {
                avatar.map((i ,index)=>(
                    <Avatar src={transformImage(i,100)}  key={Math.random()*index} alt={`Avatar ${index}`} sx={{width:'3rem',height:'3rem',border:'2px solid white',position:'absolute',left:{xs:`${index+0.5}rem` , sm:`${index+1}rem`}}} />
                ))
                
            }
            </Box>

        </AvatarGroup>
    </Stack>
  )
}

export default AvatarCard