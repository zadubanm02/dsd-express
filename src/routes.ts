import express from 'express';
import { values } from 'sequelize/types/lib/operators';
const fs = require('fs');


const router = express.Router();

// employeeById
export const getEmployee = (app:any, db:any,  db2:any) => { 
app.get('/api/v1/employees/:id', (req:any, res:any) => {
  let sql = `SELECT * FROM employees WHERE employees.id = ${req.params.id}`;
  console.log('req',req.params.id)
  db.query(sql, (err:any, data:any, fields:any) => {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "Employee lists retrieved successfully"
    })
  })
})
};

// delete employee
export const deleteEmployee = (app:any, db:any , db2:any, db3:any) => { 
    app.delete('/api/v1/employees/:id', (req:any, res:any) => {
      let sql = `DELETE FROM employees WHERE employees.id = ${req.params.id}`;
      console.log('req',req.params.id)
      db.query(sql, (err:any, data:any, fields:any) => {
        if (err) throw err;
        res.json({
          status: 200,
          data,
          message: "Employee was deleted successfully"
        })
      });
      db2.query(sql, ()=>{
        try {
            console.log('Successfuly deleted data on db2')
        } catch (error) {
            console.log("ERROR",error)
        }
    })
    db3.query(sql, ()=>{
        try {
            console.log('Successfuly deleted data on db3')
        } catch (error) {
            console.log("ERROR",error)
        }
    })
    })
    };

//get All
export const getEmployees = (app:any, db:any,  db2:any) => { 
    app.get('/api/v1/employees', (req:any, res:any) => {
      let sql = `SELECT * FROM employees`;
      db.query(sql, (err:any, data:any, fields:any) => {
        if (err) throw err;
        res.json({
          status: 200,
          data,
          message: "Employees lists retrieved successfully"
        })
      })
    })
    };

    // create employee
export const createEmployee = (app:any, db:any,  db2:any, db3:any) => { 
    app.post('/api/v1/employees', (req, res) =>{
        let sql = `INSERT INTO employees(firstName, lastName, email, position, department, salary) VALUES (?)`;
        console.log("Employee", req.body)
        let values = [
          req.body.firstName,
          req.body.lastName,
          req.body.email,
          req.body.position,
          req.body.department,
          req.body.salary,
        ];
        db.query(sql, [values], (err, data, fields) =>{
          try {
            res.json({
                status: 201,
                message: "New employee added successfully",
                data:data
              })
          } catch (error) {
              console.log(error)
          }
         
        })
        db2.query(sql, [values], (err)=>{
            if(err) {
                let jsonData = {};
                jsonData = {method:'post',sql:sql, values:values}

                fs.readFile('postsDB2.json', 'utf8', function readFileCallback(err, data){
                    if (err){
                        console.log(err);
                    } else {
                    let fileData = JSON.parse(data); //now it an object
                    fileData = [...fileData, jsonData] //add some data
                    console.log("FileData",fileData)
                    let json = JSON.stringify(fileData); //convert it back to json
                    fs.writeFile('postsDB2.json', json, (err) => {
                            console.log('Data written to file');
                         });
                }});
                console.log('Error')
            } else {
                console.log("SUCCESFULLY CREATED DATA ON DB 2")
            }
        })
        db3.query(sql, [values], (err)=>{
            if(err) {
                let jsonData = {};
                jsonData = {method:'post',sql:sql, values:values}
    
                fs.readFile('postsDB3.json', 'utf8', function readFileCallback(err, data){
                    if (err){
                        console.log(err);
                    } else {
                    let fileData = JSON.parse(data); //now it an object
                    fileData = [...fileData, jsonData] //add some data
                    console.log("FileData",fileData)
                    let json = JSON.stringify(fileData); //convert it back to json
                    fs.writeFile('postsDB3.json', json, (err) => {
                            console.log('Data written to file');
                         });
                }});
                console.log('Error')
            } else {
                console.log("SUCCESFULLY CREATED DATA ON DB 3")
            }
        })
      });
      
  }
    

    //update employee
    export const updateEmployee = (app:any, db:any, db2:any, db3:any) => { 
        app.put('/api/v1/employees/:id', (req, res) =>{
            console.log("Body", req.body, req.params.id)
            let sql = `UPDATE employees SET ? WHERE employees.id = ${req.params.id}`;
            db.query(sql,[req.body], (err, data, fields) =>{
              try {
                res.json({
                    status: 201,
                    message: "Employee was updated successfully",
                    data:data
                  })
              } catch (error) {
                  console.log(error)
              }
             
            })
            db2.query(sql, [req.body], ()=>{
                try {
                    console.log('Successfuly updated data on db2')
                } catch (error) {
                    console.log("ERROR",error)
                }
            })
            db3.query(sql, [req.body], ()=>{
                try {
                    console.log('Successfuly updated data on db3')
                } catch (error) {
                    console.log("ERROR",error)
                }
            })
          });
        };

