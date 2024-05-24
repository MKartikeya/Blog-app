const expresss=require('express');
const router=expresss.Router();
const User=require('../models/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

//Register
router.post("/register",async(req,res)=>{
    try{
        const {username,email,password}=req.body;
        const salt=await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hashSync(password,salt);
        const newUser=new User({
            username,
            email,
            password:hashedPassword,
        }); 
        console.log("here");
        const saved=await newUser.save();
        res.status(200).json(saved);

    } catch(err) {
        res.status(500).json(err);
    }

});


//Login
router.post("/login",async(req,res)=>{
    try{
        const user=await User.findOne({email:req.body.email});
        if(!user){
            console.log("User not found ");
            res.status(404).json("User not found");
        }
        const hasMatched = await bcrypt.compare(req.body.password,user.password);
        if(!hasMatched){
            res.status(401).json("Invalid credentials");
        }
        const token = jwt.sign({_id:user._id,username:user.username,email:user.email},process.env.SECRET_KEY,{expiresIn:"1d"});
        const {password,...others}=user._doc;
        res.cookie("token",token).status(200).json(others);
    } catch(err) {
        // res.status(500).json(err);
        console.log(err);
    }
});


//Logout
router.get("/logout",(req,res)=>{
    try{
        res.clearCookie("token",{sameSite:"none",secure:true}).status(200).json("Logged out successfully");
    } catch(err) {
        res.status(500).json(err);
    }
});


//Refetch user
router.get("/refetch",async(req,res)=>{
    try{
        const token=req.cookies.token;
        const match = await jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
            if(err){
                console.log("here");
                res.status(404).json("Invalid token");
            }
            res.status(200).json(user);
        });
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports=router;