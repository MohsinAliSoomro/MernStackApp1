const express = require('express');
const router = express.Router();

const Item = require('../../models/Item');

//@Get Router
router.get('/',(req,res)=>{
    Item.find()
    .sort({date:-1})
    .then(item=>res.json(item))
})
//@POST Router
router.post('/',(req,res)=>{
    const newitem = new Item({
        name:req.body.name
    })
    newitem.save().then(item=>res.json(item))
})
//@DELETE Router
router.delete('/:id',(req,res)=>{
    Item.findById(req.params.id)
    .then(item=>item.remove()
    .then(()=>res.json({succes:true})))
    .catch(err=>res.json({succes:false}))
})

module.exports=router;