import express from 'express';
//import sequelize from 'sequelize';
import mysql from 'mysql'
import cors from 'cors'
import bodyParser from 'body-parser'
import {getEmployees, createEmployee, getEmployee, deleteEmployee, updateEmployee} from './routes'
const fs = require('fs');
import axios from 'axios';


const app = express();
//@ts-ignore
app.use(cors())
app.use(bodyParser.json());

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employees',
    port: 8889
});

var db2 = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test',
    port: 8889
});

var db3 = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test1',
    port: 8889
});

const postDataFromJSONDB3 = async () => {
    fs.readFile('postsDB3.json', 'utf8', async (err, data) => {
        if (err){
            console.log(err);
        } else {

        let fileData = JSON.parse(data); 
        console.log("File Data",fileData, "Lenght", fileData.length)

        if(fileData.length == 0){
            console.log('Empty File')
        }
        else{
            fileData.forEach(async (query)=>{
                console.log("QUERY", query)
                await axios.post('http://localhost:4000/api/v1/employees', {
                    firstName:query.values[0],
              lastName:query.values[1],
              email:query.values[2],
              position:query.values[3],
              department:query.values[4],
              salary:query.values[5]
                }).then((data)=>{
                    console.log("Added data", data)
                }).catch(err=>console.log("error", err))
        });
        fileData = []
        fs.writeFile('postsDB3.json', JSON.stringify(fileData), (err) => {
            console.log('Data written to file');
         });
        }
}
});
}

const postDataFromJSONDB2 = async () => {
    fs.readFile('postsDB2.json', 'utf8', async (err, data) => {
        if (err){
            console.log(err);
        } else {

        let fileData = JSON.parse(data); 
        console.log("File Data",fileData, "Lenght", fileData.length)

        if(fileData.length == 0){
            console.log('Empty File')
        }
        else{
            fileData.forEach(async (query)=>{
                console.log("QUERY", query)
                await axios.post('http://localhost:4000/api/v1/employees', {
                    firstName:query.values[0],
              lastName:query.values[1],
              email:query.values[2],
              position:query.values[3],
              department:query.values[4],
              salary:query.values[5]
                }).then((data)=>{
                    console.log("Added data", data)
                }).catch(err=>console.log("error", err))
        });
        fileData = []
        fs.writeFile('postsDB2.json', JSON.stringify(fileData), (err) => {
            console.log('Data written to file');
         });
        }
}
});
}

db2.connect((err)=>{
    if(err)
    {
        console.log(err);
        
    }
    else{
        console.log("Connected DB2")
        postDataFromJSONDB2();
    }
})

db3.connect((err)=>{
    if(err)
    {
        console.log(err);
        
    }
    else{
        console.log("Connected DB3")
        postDataFromJSONDB3();
    }
})

db.connect((err)=>{
    err ? console.log(err) : console.log("Connected DB")

});

const server = {
    port: 4000
  };

getEmployees(app,db, db2)
createEmployee(app, db, db2, db3)
getEmployee(app, db, db2)
deleteEmployee(app, db, db2, db3)
updateEmployee(app, db, db2, db3)

  
  
  // starting the server
  app.listen( server.port , () => console.log(`Server started, listening port: ${server.port}`));

