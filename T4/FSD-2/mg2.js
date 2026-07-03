const mg = require("mongoose");

mg.connect('mongodb://127.0.0.1:27017/mgb6').then(() => {
    console.log("Sucess")
}).catch((e) => {
    console.log(e)
})

var myschema = new mg.Schema({
    username: String,
    email: { type: String, required: true },
    age: Number,
    active: Boolean,
    doj: { type: Date, default: new Date().toLocaleDateString() },
}, { strict: false, versionKey: false })
mg.pluralize(null);
const mymodel = new mg.model('person', myschema)

const myfun = async () => {
    try {
        const data = [
            { username: "ABC1", email: "abc@gmail.com", age: 35, active: false },
            { username: "PQR", email: "pqr@gmail.com", age: 28, active: true, city: "Ahmedabad" }
        ]
        const res = await mymodel.insertMany(data);
        console.log(res);
    }
    catch (e) {
        console.log(e)
    }
}
myfun();