const express=require('express');
const router= express.Router();
const Person=require('./../models/person');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');

router.post('/signup', async (req, res) => {
    try{
     const data=req.body ;    // assumming the request body contains the person data
   
     // create a new person document using the mongoose model
   const newPerson=new Person(data);
   // newPerson.name = data.name;
   // newPerson.age = data.age;
   // newPerson.mobile = data.mobile;
   // newPerson.email=data.email;
   // newPerson.address=data.address;
   
   //// save the new person on database;
   
   const response =await newPerson.save();
   console.log("data saved");

   const payload = {
    id: response.id,
    username: response.username
}
console.log(JSON.stringify(payload));
const token = generateToken(payload);
console.log("Token is : ", token);

res.status(200).json({response: response, token: token});

   //res.status(200).json(response);
    } 
    catch(err){
     console.log(err);
     res.status(500).json({error:'internal server error'});
   
    }
   
   })

   // Login Route
router.post('/login', async(req, res) => {
  try{
      // Extract username and password from request body
      const {username, password} = req.body;

      // Find the user by username
      const user = await Person.findOne({username: username});

      // If user does not exist or password does not match, return error
      if( !user || !(await user.comparePassword(password))){
          return res.status(401).json({error: 'Invalid username or password'});
      }

      // generate Token 
      const payload = {
          id: user.id,
          username: user.username
      }
      const token = generateToken(payload);

      // resturn token as response
      res.json({token})
  }catch(err){
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Profile route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
  try{
      const userData = req.user;
      console.log("User Data: ", userData);

      const userId = userData.id;
      const user = await Person.findById(userId);

      res.status(200).json({user});
  }catch(err){
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
})
   

   //get method to
router.get('/',async (req,res)=>{
    try{
  const data= await Person.find();
  console.log("data fetched");
  res.status(200).json(data);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'internal server error'});
    }
  })

  router.get('/:workType', async (req,res)=>{
  
    try{
      const workType=req.params.workType;
      if(workType=='chef'|| workType=='manager'||workType=='waiter'){
      const response=await Person.find({work:workType});
      console.log("response fetched");
      res.status(200).json(response);
      } 
      else{
        res.status(404).json({error:'Invalid work type'});
      }
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'internal server error'});
    }
  
})

// update method 

router.put('/:id',async (req,res)=>{
    try{
const personId=req.params.id;    // extract the id from URL parameter
const updatedPersonData=req.body; //update data for the person
const response=await Person.findByIdAndUpdate(personId,updatedPersonData, {
    new: true, //return update document
    runValidators:true, // run mongoose validation
    
});
if(!response){
  return res.status(404).json({error:'Person not found'});
}


console.log("data updated");
res.status(200).json(response);


    } 
    catch(err){
      console.log(err);
      
      res.status(500).json({error:'internal server error'});
    }
})

router.put('/:id',async (req,res)=>{
    try{
const personId=req.params.id;    // extract the id from URL parameter
const updatedPersonData=req.body; //update data for the person
const response=await Person.findByIdAndUpdate(personId,updatedPersonData, {
    new: true, //return update document
    runValidators:true, // run mongoose validation
    
});
if(!response){
  return res.status(404).json({error:'Person not found'});
}


console.log("data updated");
res.status(200).json(response);


    } 
    catch(err){
      console.log(err);
      
      res.status(500).json({error:'internal server error'});
    }
})

//
router.delete('/:id',async (req,res)=>{
  try{
const personId=req.params.id;    // extract the id from URL parameter
const response=await Person.findByIdAndDelete(personId);
if(!response){
return res.status(404).json({error:'Person not found'});
}
console.log("data deleted");
res.status(200).json({message:'person deleted successfully'});


  } 
  catch(err){
    console.log(err);
    
    res.status(500).json({error:'internal server error'});
  }
})

module.exports=router;
  