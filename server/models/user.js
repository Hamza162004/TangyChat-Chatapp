import { hash } from 'bcrypt';
import mongoose , { Schema, model} from 'mongoose';


const schema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
      },
    password: {
        type: String,
        required: true,
        select: false
    },
    avatar: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    },
    bio:{
        type: String,
        required: true
    }
}, { timestamps: true });

schema.pre('save', async function(next){
    if (!this.isModified('password')) return next()
    this.password = await hash(this.password,10)
})

export const User = mongoose.models.User || model('User', schema);