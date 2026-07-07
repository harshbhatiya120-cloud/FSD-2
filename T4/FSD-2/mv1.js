const mg=require("mongoose")
const validator=require("validator")
mg.connect("mongodb://127.0.0.1:27017/mdb6")
const myschema=new mg.Schema({
    pname:{type:String,
        required:true,
        trim:true,
        uppercase:true,
        minlength:4,
        maxlength:8,
        validate:[validator.isAlphanumeric,"Invalid alphanumeric code"]},
    qty:{
        type:Number,min:1,max:5
    },    
    email:{type:String,unique:true,
        validate:[validator.isEmail,"Invalid Email"]
    },
    role:{type:String,enum:["seller","buyer"],default:"buyer"}
})
const mymodel=new mg.model("products",myschema)
const myfun=async()=>{
    try{
        const data=new mymodel({
            pname:"xyz1",
            qty:"3",
            email:"xy@gmail.com",
            role:"seller"})
        const result=await data.save()
        console.log(result)    
    }
    catch(e){
        console.log(e)
    }
};myfun()