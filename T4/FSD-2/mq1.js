const mg=require("mongoose")
const validator=require("validator")
mg.connect("mongodb://127.0.0.1:27017/mdb6")
const myschema=new mg.Schema({
    course:String,category:String,
    fees:Number,instructor:String,
    active:Boolean,duration:Number,
    mode:{type:String,enum:["online","offline"]},
})
const mymodel=new mg.model("courses",myschema)
const myfun=async()=>{
    const c=[{course:"MERN",category:"web Development",
        fees:25000,instructor:"ABC",
        active:true,duration:3,mode:"offline"
    },
    {course:"Python",category:"programing language",
        fees:30000,instructor:"XYZ",
        active:true,duration:3,mode:"online"
    },
    {course:"ML",category:"AI",
        fees:30000,instructor:"DEF",
        active:true,duration:4,mode:"offline"
    },
    {course:"UX Design",category:"Design",
        fees:25000,instructor:"MNO",
        active:false,duration:4,mode:"online"
    }]
    // const result=await mymodel.insertMany(c);
    // console.log(result);
    // const t1=await mymodel.findOne({instructor:"MNO"});
    // console.log(t1._id);
    // const t2=await mymodel.findByIdAndUpdate(t1._id,
    //     {$set:{duration:7,fees:19000}},{new:true}
    // );
    // console.log(t2)
    // const t3= await mymodel.findByIdAndDelete(t1._id)
    // console.log("Delete",t3)
    
    // const t4=await mymodel.find(
    //     {},
    //     {category:0,active:0,instructor:0,_id:0}).sort({fees:-1}).skip(1).limit(1)  
    //     console.log(t4)   
        
    //  const t5=await mymodel.updateOne({course:"cloud computering"},{$set:{fees:22000,duration:3,mode:"online"}},
    //     {upsert:true}
    //  )   
    //  console.log(t5)

    //  const t6=await mymodel.find({fees:{$lt:28000},mode:"offline"})
    //  console.log(t6)
     
    //  const t7=await mymodel.find({$and:[{active:true},
    //     {duration:{$gte:3}}
    //  ],$nor:[{mode:"online"}]})
    // console.log(t7)

    const t8=await mymodel.countDocuments({active:true,mode:"online"})
    console.log(t8)
}    
myfun()

