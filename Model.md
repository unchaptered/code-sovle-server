# Model

1. UserModel
2. RoomModel

## UserModel

```javascript
userSchema = new mongoose.Schema({
    userSort: { type:String, enum: ['ADMIN', 'MENTEE', 'MENTO'], defualt:'MENTEE', required:true },

    emial: { type: String, unique: true, required: true },
    username: { type: String, required:true, minLength:3, maxLength:20 },
    password: {type: String, required:true, minLength:8, maxLength:20 },

    ipConnection: [{ type: String }],

    snsConnection: [{ 
        tokenSort: { type:String, enum: [ 'GOOGLE', 'KAKAO', 'NAVER', 'GITHUB' ]},
        tokenValue: { type:String }
    }],

    emailAuthentication: [{
        isAuth: { type: Boolean, default: false, required: true },
        authDate: { type: Date, default: new Date(), required: true }
    }],

    rooms: [{ type:ObjectId, required:true, ref:'Room' }]

});
```