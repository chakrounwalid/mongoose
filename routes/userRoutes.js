const express = require ('express')
const router = express.Router()
const user = require ("../models/user")


//create user
router.post("/newperson",async(req,res)=>{
    try{
        const newUser=user(req.body)
        await newUser.save()
        res.send({msg:"user added"})
    }catch (error) {
        res.send(error.message)
    }
})

// find user 
router.get("/find",async(req,res)=>{
    try{
        const findUser=await user.find();
        res.send(findUser);
    }catch(error){
        res.send(error.message)
    }
})


// find user by id
router.get("/:id",async(req,res)=>{
    try{
        const result = await user.findById({ _id: req.params.id });
        res.send(result)
    }catch(error){
        res.send(error.message)
    }
})

// update by id
router.put("/update/:id",async(req,res)=>{
    try{
        const result = await user.findOneAndUpdate({
            _id: req.params.id,
            $set: { ...req.body },
        });
        res.send(result)
    }catch(error){
        res.send(error.message)
    }
})

// find one and remove
router.delete("/removeone/:id",async(req,res)=>{
    try{
        const result = await user.findByIdAndDelete(req.params.id);
        res.send({result,msg:"deleted"})
    }catch(error){
        res.send(error.message)
    }
})

// delete many
router.delete("/deletemany",async(req,res)=>{
    try{
        const result = await user.deleteMany({name:"Mary"});
        res.send("All Persons with Mary name are deleted")
    }catch(error){
        res.send(error.message)
    }
})
//chain search 
router.get("/query",async(req,res)=>{
    try{
        const result = await user.find({favoriteFoods:"mlawi"}).sort({name:"des"}).limit(3).select(age)
        res.send(result)
    }catch (error){
        res.send(error.message)
    }
})


module.exports=router