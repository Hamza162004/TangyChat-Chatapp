import mongoose, { Schema, Types, model} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const schema = new Schema({
    sender: {
        type: Types.ObjectId,
        ref : 'User',
        required : true,
    },
    chat: {
        type: Types.ObjectId,
        ref : 'Chat',
        required : true,
    },
    content: {
        type: String,
    },
    attachments:[
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    readBy: [
        {
            type: Types.ObjectId,
            ref: 'User',
            required : true
        }
    ]
    
}, { timestamps: true });

schema.plugin(mongoosePaginate);


export const Message = mongoose.models.Message || model('Message', schema);