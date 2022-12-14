const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:[true, "Please insert a number"],
    },

    email: {
        type: String,
        requered:[true, "Please add email"],
        unique: true,
        trime: true,
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please Enter a Valid Email"],
        },
        
    password :{
        type: String,
        requered: [true, "Please Add a Password "],
        minLength : [6, "Password must be up to 6 characters"],
        maxLength :[23, "Password must be more than 23 characters"]
    },

    photo: {
        type :String,
        requered :[true, "Please add a photo"],
        default:" "    
    },

    bio: {
        type : String,
        maxLength : [250, "Bio must not be more then 250 character"],
    },
       
},
       { timestamps: true,versionKey : false}
);

userSchema .pre("save",async function(next){
    if (!this.isModified("password")){
        return next();
    }

// ======== Hash password ========
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(this.password, salt);
this.password = hashedPassword;
next();

});




const User = mongoose.model("User",userSchema);
module.exports = User;