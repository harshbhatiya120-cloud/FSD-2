const mg=require("mongoose")
mg.connect("mongodb://127.0.0.1:27017/mgb6").then(()=>{
    console.log("success")
}).catch((e)=>{
    console.log(e)
})

const userschema=new mg.Schema({
    username:{
        type:String,
        required:[true,'Username is required'],
        maxlength:20,
        minlength:[4,'Atleast 4 characters'],
        match:/^[A-Za-z]+[0-9]+$/,
        uppercase:true,
        trim:true
    },
    email:{type:String,unique:true,required:true,match:/\S+@\S+\.\S+/},
    age:{type:Number,min:18,max:45},
    role:{type:String,enum:['user','admin'],default:'user'}
})
mg.pluralize(null);
const mymodel=mg.model('user',userschema)
const myfun=async()=>{
    try{
        const newuser=new mymodel({
            username:"pqr123",
            email:"pqr@gmail.com",
            age:35,
            role:"admin"
        })
        const res=await newuser.save()
        console.log(res);
    }
    catch(e){
        console.log(e)
    }
}
myfun();