const express=require('express');
const router= express.Router();
const MenuItem=require('./../models/MenuItem');


//get method to
router.get('/',async (req,res)=>{
  
    try{
  const data1= await MenuItem.find();
  console.log("data1 fetched");
  res.status(200).json(data1);
    }
    catch(err1){
      console.log(err1);
      res.status(500).json({error:'internal server error'});
    }
  })

  ///////////////// post method menuItem
router.post('/', async (req, res) => {
    try{
     const data1=req.body ;    // assumming the request body contains the manue data
   
     // create a new person document using the mongoose model
   const newMenuitem=new MenuItem(data1);
  
   const response1 =await newMenuitem.save();
  console.log("data1 saved");
  res.status(200).json(response1);
   } 
   catch(err1){
    console.log(err1);
    res.status(500).json({error:'internal server error'});
  
   }
  })

  router.get('/:tasteType', async (req,res)=>{
  
    try{
      const tasteType=req.params.tasteType;
      if(tasteType=='sweet'|| tasteType=='spicy'||tasteType=='Sour'){
      const response=await MenuItem.find({taste:tasteType});
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

router.put('/:id', async (req,res)=>{
  try{
    const menuId=req.params.id;
    const UpdateManuItems=req.body;
    const response= await MenuItem.findByIdAndUpdate(menuId,UpdateManuItems,
      {
        new: true, //return update document
        runValidators:true, // run mongoose validation
    });
    if(!response){
      
      return res.status(404).json({erorr:'Menu item is note found'});

    }
    console.log("menu item item is updated");
    res.status(200).json(response);

  } catch(err){
    console.log(err);
      res.status(500).json({error:'internal server error'});

  }
})

router.delete('/:id', async (req,res)=>{
  try{
    const menuId=req.params.id;
    const response= await  MenuItem.findByIdAndDelete(menuId);
    if(!response){
      return res.status(404).json({erorr:'item not found'});
    }
    console.log("Menu item is deleted");
    res.status(200).json({massage:'menu item is successfully is deleted'});

  } catch(err){
    console.log(err);
    res.status(500).json({error:'internal server error'});

  }
})

  module.exports=router;
  