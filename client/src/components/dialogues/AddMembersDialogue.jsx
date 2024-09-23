import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material'
import React,{useState} from 'react'
import { SampleRequests } from '../../constants/SampleData'
import UserItem from '../shared/UserItem'

const AddMembersDialogue = ({ open, handleClose, isLoadingAddMember }) => {
    const [sampleMembers, setSampleMembers] = useState(SampleRequests)
    const [selectedMembers, setSelectedMembers] = useState([])
    const selectMemberHandler = (_id) => {
        setSelectedMembers((prev) => (prev.includes(_id) ? prev.filter((e) => e != _id) : [...prev, _id]))
    }

    const cancelGroup = () => {
        setSelectedMembers([])
        setSampleMembers([]);
        handleClose();
    }

    const addMemberHandler = () => {

    }
    const addMembersSubmitHandler = () => {

    }
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                Add Members
            </DialogTitle>
            <DialogContent sx={{ width: '20rem' }}>
                <Stack>
                    {
                        sampleMembers.length > 0 ? sampleMembers.map((member) => (
                            <UserItem key={member._id} isGroupMember={selectedMembers.includes(member._id)} user={member} addMembers={true} handler={selectMemberHandler} />
                        )) : <Typography>No Friends to add</Typography>
                    }
                </Stack>
                <DialogActions>
                    <Button color='error' onClick={cancelGroup}>Cancel</Button>
                    <Button disabled={isLoadingAddMember} onClick={addMembersSubmitHandler} >Add</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}

export default AddMembersDialogue