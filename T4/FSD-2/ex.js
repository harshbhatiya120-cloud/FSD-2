const mg = require('mongoose')
mg.connect('mongodb://127.0.0.1:27017/lju2');
const personschema = new mg.Schema({ name: String, age: Number, active: Boolean });
const person = mg.model("person", personschema)
const perform = async () => {
    try {
        const persondata = new person({ name: 'test', age: 25, active: true })
        await persondata.save()
        const result = await person.updateOne({ name: 'test' }, { $set: { age: 34, active: false } }, { upsert: true })
        console.log('updated result', result)
        //find one documenet
        const person = await person.findOne({ name: "test" })
        console.log('person', person)
        console.log('person ID', person._id);
    }
    catch (err) { console.error(err) }
}
perform()
// 