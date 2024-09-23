import multer from 'multer'

const multerUplaod = multer({
    limits:{
        fileSize: 1024 * 1024 * 5
    }
})

const SingleAvatar = multerUplaod.single('avatar')

export {SingleAvatar}