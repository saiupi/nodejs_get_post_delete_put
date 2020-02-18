var express = require('express')
var app = express()
const bodyParser=require('body-parser')
var cors = require('cors')
let contacts=require('./data') 

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

 
app.get('/get/list', function (req, res, next) {
    if(!contacts){
        res.status(404).json({massage:'not found clint side'})
    }
  res.json(contacts)
});
app.get('/get/list/:id',(req,res)=>{
    const reqestId=req.params.id;
    let contact=contacts.filter(contact=>{
        return contact.id==reqestId;
    });
    res.json(contact[0]);
})
 app.post('/post/list',(request,responce)=>{
     const contact ={
         id:contacts.length+1,
         first_name:request.body.first_name,
         emai:request.body.emai,

     }
     contacts.push(contact);
     responce.json(contact);
 });
 app.put('/put/list/:id',(request,responce)=>{
const requestId=request.params.id;
let contact=contacts.filter(contact=>{
    return contact.id==requestId
})[0];
// let contact=contacts.filter(contact=>{
//     return contact.id==reqestId;
// });
// responce.json(contact[0]);
const index=contacts.indexOf(contact);
const keys=Object.keys(request.body);
keys.forEach(key=>{
contact[key]=request.body[key];
});
contacts[index]=contact;
responce.json(contacts[index]);
 });

 app.delete('/delete/list/:id',(request,responce)=>{
     const requestId=request.params.id;
     let contact=contacts.filter(contact=>{
         return contact.id == requestId
     })[0];
     const index=contacts.indexOf(contact);
     contacts.splice(index,1);
     responce.json({massage:`user ${requestId} is deleted`});
   // responce.json(reqestId)
 })
const hostname='192.168.3.235';
const port= 3001;
app.listen(port,hostname,()=>{
    console.log(`serveer is running at http://${hostname}:${port}`)
})



