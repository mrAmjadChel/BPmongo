//contact with database
const slugify = require("slugify")
const Blogs = require("../models/blog")
const { v4: uuidv4 } = require('uuid');

//create data
exports.create = (req,res)=>{
    const {title,content,author}=req.body
    let slug = slugify(title)

    //validate /ตรวจสอบความถูกต้องของข้อมูล
    if(!slug) slug = uuidv4();
    switch(true){
        case !title:
            return res.status(400).json({error:"กรุณาป้อนชื่อบทความ"})
            break;
        case !content:
            return res.status(400).json({error:"กรุณาป้อนเนื้อหาบทความ"})
            break;
    }
    //save data
    Blogs.create({title,content,author,slug},(err,blog)=>{
        if(err){
            res.status(400).json({error:"มีชื่อบทความซ้ำกัน"})
        }
        res.json(blog)
    })
}

//ดึงข้อมูลบทความทั้งหมด
exports.getAllblogs = (req,res) => {
    Blogs.find({}).exec((err,blogs) => {
        res.json(blogs)
    })
    
}

//ดึงบทความที่สนใจโดยอ้างอิงตาม slug
exports.singleBlog = (req,res) => {
    const {slug} = req.params
    Blogs.findOne({slug}).exec((err,blog) => {
        res.json(blog)
    })
}

//ลบบทความ
exports.remove = (req,res) => {
    const {slug} = req.params
    Blogs.findOneAndRemove({slug}).exec((err,blog) => {
        if(err) console.log(err)
        res.json({
            message:"ลบบทความเรียบร้อย"
        })
    })
}

//update blog
exports.update = (req,res) => {
    const {slug} = req.params
    const {title,content,author} = req.body
    Blogs.findOneAndUpdate({slug},{title,content,author},{new:true}).exec((err,blog) => {
        if(err) console.log(err)
        res.json(blog)
    })
}