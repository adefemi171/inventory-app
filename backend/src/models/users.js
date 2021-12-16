'use strict';
const connection = require('../database/conn')

module.exports = {
    register: (data, password)=>{
        return new Promise((resolve, reject)=>{
            //validation for email or username if already exist
            let regis = `INSERT INTO users SET ${data} , password = ${password}`;
            let qemail = `SELECT * FROM users WHERE email = ${data.email}`;
            let qusername = `SELECT * FROM users WHERE username = ${data.username}`;

            connection.query(qemail, (err, result)=>{
                console.log(err)
                if(result && !!result.length){
                    reject(err),
                    console.log(err)
                }
                else{
                    connection.query(qusername, (err, result)=>{
                        if( result&& !!result.length ){
                            reject(err)
                        }else{
                            connection.query(regis, (err, result)=>{
                                if(!err){resolve(result)}else{ reject(err)}
                            })
                        }
                    })
                }
            })
            
        })
    },
   
    loginUser:(email)=>{
        return new Promise((resolve, reject)=>{
            connection.query(`SELECT * FROM users WHERE email = ?`, [email], (err, result)=>{
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    // allUsers:()=>{
    //     return new Promise((resolve, reject)=>{
    //         connection.query(`SELECT * FROM users`, (err, result)=>{
    //             if(!err){resolve(result)}else{reject(err)}
    //         })
    //     })
    // },

    //READ - get all data users
    allUsers: (search, sortBy, sort, skip, limit) =>{
        return new Promise((resolve, reject) =>{

            let query = `SELECT * FROM users `;
            if(search){
               query += `WHERE id like "%${search}%" or name like "%${search}%"`
            }
            query += ` ORDER BY ${sortBy} ${sort} LIMIT ${skip}, ${limit}`;
            connection.query(query, (err, result)=>{
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    // get total data in database
    totalData: (search) => {
        return new Promise((resolve, reject) =>{
            let query = "SELECT COUNT(*) as 'data in database' FROM users "
            if(search){
                query +=  `WHERE name like "%${search}%"`
            }
            connection.query(query, (err, result)=>{
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    udateUser:(data, id)=>{
        return new Promise((resolve, reject)=>{
            connection.query(`UPDATE users set ? WHERE id = ? `, [data, id], (err, result)=>{
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    },

    deleteUser:(id)=>{
        return new Promise((resolve, reject)=>{
            connection.query(`DELETE FROM users WHERE id = ?`, id, (err, result)=>{
                if(!err){resolve(result)}else{reject(err)}
            })
        })
    }
}