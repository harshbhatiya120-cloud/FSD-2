const expr=require("express")
const app=expr()
const mg=require("mongoose")
mg.connect("mongodb://127.0.0.1:27017/mdb6")
const myschema=new mg.Schema({username:String,password:String})
const mymodel=new mg.model("logindata",myschema)
app.use(expr.static(__dirname,{index:"task.html"}))
app.get("/submit",async(req,res)=>{
  const data=new mymodel({username:req.query.uname,password:req.query.pass})
  await data.save()
  res.send(`Welcome ${req.query.uname}`)
})
app.listen(8002);