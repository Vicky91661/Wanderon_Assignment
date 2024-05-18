const jwt = require('jsonwebtoken');
const {z} = require("zod")
const bcrypt = require('bcrypt');

const {User,Account} = require("../db");
const  JWT_SECRET  = process.env.JWT_SECRET;
const {saltRounds} = require("../config/config");

const userSignin =z.object({
    username:z.string().email().min(3, { message: "username must be 3 or more characters long" })
    .max(30,{message:"username must be 30 or less characters long"}),
    password:z.string().min(5,{message:"password must be more than 5 length"})
})

const userSignup =z.object({
    username:z.string().email().min(3, { message: "username must be 3 or more characters long" })
    .max(30,{message:"username must be 30 or less characters long"}),
    password:z.string().min(5,{message:"password must be more than 5 length"}),
    firstName:z.string().max(50, { message: "firstName must be 50 or less characters long" }),
    lastName:z.string().max(50, { message: "lastName must be 50 or less characters long" })
})

const updatePassword = z.object({
	password:z.string().min(5,{message:"password must be more than 5 length"}),
})

const Signin = async (req,res)=>{
    const username =req.body.username
    const password =req.body.password
    
    try {
        userSignin.parse({username,password})
        const userExist = await User.findOne({username});
       

        if(userExist){
            const result = await bcrypt.compare(password,userExist.password)
            if(result){
                const userId = userExist._id ;
                const account = await Account.findOne({userId})
                if(account){
                    var token = jwt.sign({ userId }, JWT_SECRET);
                    res.status(200).json({
                        message: "successfully login",
                        firstName:userExist.firstName,
                        lastName:userExist.lastName,
                        userId:userExist._id,
                        balance:account.balance,
                        token
                    })
                }else{
                    var token = jwt.sign({ userId }, JWT_SECRET);
                    res.status(200).json({
                        message: "successfully login",
                        firstName:userExist.firstName,
                        lastName:userExist.lastName,
                        userId:userExist._id,
                        balance:"Account is not there",
                        token
                    })
                }
                
            }else{
                res.status(411).json({
                    message: ["Password is incorrect"]
                })
            }
            

        }else{
            res.status(411).json({
                message: ["User does not exist"]
            })
        }
    } catch (error) {
        console.log(error)
        res.status(411).json({
            message: error.errors.map(err => err.message)
        });
    }

}

const Signup = async (req,res)=>{
   

    const email =req.body.email
    const password =req.body.password
    const firstName =req.body.firstName
    const lastName =req.body.lastName
    try {
        userSignup.parse({ email, password, firstName, lastName });
        
        const userExist = await User.findOne({username});

        if(userExist){
            
            return res.status(411).json({
                message: ["Email already taken"]
            })

        }else{
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const user = await User.create({
                email,
                password:hashedPassword,
                firstName,
                lastName,
            })
            if(user){
                return res.status(200).json({
                    message: "User created successfully",
                    token   
                })
                
            }else{
                return res.status(411).json({
                    message: ["Signed up failed"]
                })
            }
        
        }
    } catch (error) {
        return res.status(411).json({
            message: error.errors.map(err => err.message),
        });
    } 
    
}

const ChangePassword =  async (req,res)=>{
    
    try {
        const newPassword=req.body.password
        updatePassword.parse({password:newPassword})
    } catch (error) {
        return res.status(411).json({
            message: "Invalid input",
            errors: error.errors.map(err => err.message),
        });
    }
   
    const password =await bcrypt.hash(req.body.password,saltRounds);
    
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const decode = jwt.verify(token,JWT_SECRET)
    const newUser = decode.newUser;

    try {
        await User.updateOne({_id:newUser},password)
        return res.status(200).json({
            msg:"changePassword is okey"
        })
    } catch (error) {
        return res.status(411).json({
            msg:"not updated"
        })
    }
    
}

module.exports = {Signin,Signup,ChangePassword}