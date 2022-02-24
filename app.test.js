'use strict'
const { v4: uuidv4 } = require('uuid');
const { test } = require('tap')
const build = require('./app')
const { Client } = require('pg')
test('requests the "/" route', async t => {
  const app = build()
  const text = {
    "name" :"sneha",
    "department" : "ece"
  }
  const response = await app.inject({
    method: 'POST',
    url: '/',
    body: 
      text
    
  })
  t.equal(response.statusCode, 201, 'returns a status code of 201')
  t.equal(response.statusMessage, 'Created', 'returns a true')
})
test('requests the post "/" route', async t => {
  const app = build()
  const response = await app.inject({
    method: 'GET',
    url: '/'
    
  })
  t.equal(response.statusCode, 200, 'returns a status code of 200')
  t.equal(response.statusMessage, 'OK', 'returns ok')
})
// test('requests the patch "/:id" route', async t => {
//   const app = build()
//   const text = {
    
//     "department" : "Mechanical",
//     "done" : false
//   }
  
//   const response = await app.inject({
//     method: 'PATCH',
   
//     url: '/:54e694ce-6003-46e6-9cfd-b1cf0fe9d332',
//     body: 
//       text
    
//   })
//   console.log(response)
//  // t.equal(response.statusCode, 204, 'returns a status code of 204')
//   //t.equal(response.statusMessage, 'OK', 'returns ok')
// })





