const { v4: uuidv4 } = require('uuid');
const { allTodos, addTodo, updateTodo, deleteTodo} = require('./schema')
const fastify = require('fastify')
require('dotenv').config()
const { Client } = require('pg')

'use strict'

function build(opts={}) {
    const client = new Client({
        user: 'shradhagupta',
        host: 'localhost',
        port: 5432,
        database: 'todos'
    })
    client.connect()
    console.log("db connected succesfully")
        
  const app = fastify(opts)
  app.get('/',{schema: allTodos}, async function (request, reply) {
    try {
        const {rows} = await client.query('SELECT * FROM todos')
       // console.log(rows)
        return rows
        
    } catch(err) {
        throw new Error(err)
    }
    
  })
  app.post('/', {schema: addTodo}, async function(request, reply) {
    const {name, department} = request.body
    const id = uuidv4()
    const done = false
    //createdAt = new Date().toISOString()
    const query = {
        text: `INSERT INTO todos (id, name, department, done)
                VALUES($1, $2, $3, $4) RETURNING *`,
        values: [id, name, department, done],
        }
    try {
        const {rows} = await client.query(query)
        console.log(rows[0])
        reply.code(201)
        return {created: true}
    } catch (err) {
        throw new Error(err)
    }
    
})
app.patch('/:id',{schema: updateTodo}, async function (request, reply) {
    //const id = request.params.id.uuidv4();
    
    const {department, done} = request.body
    const query = {
        text:  `UPDATE todos SET 
                department = COALESCE($1, department), 
                
                done = COALESCE($2, done) 
                WHERE id = $3 RETURNING *`,
        values : [department, done, id]
    }
    try {
        const {rows} = await client.query(query)
        console.log(rows[0])
        reply.code(204)
    } catch (err) {
        throw new Error(err)
    }
} )
app.delete('/:id', {schema: deleteTodo}, async function(request, reply) {
    console.log(request.params)
    try {
        const {rows} = await client.query('DELETE FROM todos WHERE id = $1 RETURNING *', [request.params.id])
        console.log(rows[0])
        reply.code(204)
    } catch(err) {
        throw new Error(err)
    }
})

  return app
}

module.exports = build