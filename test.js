const { addTodo } = require('./schema.js');
const { ResponseError } = require('./response')
const checkRequest = require('./checkRequest')
const Routes = require('./routes.js')
const VALID_REQUEST = {
    httpMethod: 'POST',
    path: '/',
    headers: {
      'content-type': 'application/json'
    },
    body: '{foo:bar}'
  }
  
  describe('Message checkRequest()', () => {
    it('allows valid requests', () => {
      expect(checkRequest(VALID_REQUEST)).toBe(null)
    })
  });
// const MOCK_MESSAGE_REQUEST = {
//     text: 'this is legit text'
//   }
  
//   const MOCK_MESSAGE_RESPONSE = {
//     name: "sneha",
//     depaertment: ("PHY")
//   }
  
//   describe('Message insertMessage()', () => {
//     it('returns the first row from a successful message insert', async () => {
//       const mockDatabase = {
//         async query() {
//           return [MOCK_MESSAGE_RESPONSE]
//         }
//       }
  
//       const response = await Routes.routes()
  
//       expect(response).toBe(true)
//     })
// });



// const test = async () => {
//   const app = routes()

//   const response = await app.inject({
//     method: 'GET',
//     url: '/'
//   })

//   console.log('status code: ', response.statusCode)
//   console.log('body: ', response.body)
// }
// test()
