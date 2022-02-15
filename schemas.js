const allTodos = {
    response: {
        200: {
            type: 'array',
            items: {
                type: 'object',
                required: ['id', 'name', 'department', 'done'],
                properties: {
                    id: {type: 'string',  format: 'uuid'},                                                              
                    name: {type: 'string'}, 
                    department: {type: 'string'},                                           
                    done: {type: 'boolean'},
                }
            }
        }
    }
}
const addTodo = {
    body: {
        type: 'object',
        required: ['name'],
        properties: {
            name: {type: 'string',},
            department: {type: 'string',},
          
        }
    },
    response: {
        201: {
            type: 'object',
            properties: {
                created: {type: 'boolean'}
            }
        }
    }

}
const updateTodo = {
    body: {
        type: 'object',
        properties: {
            department: {type: 'string'},
            done: {type: 'boolean'}
        }
    },
    params: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' }
        }
    }
}

const deleteTodo = {
    params: {
        type: 'object',
        properties: {
            id: {type: 'string', format: 'uuid'}
        }
    }
}
module.exports = {allTodos, addTodo, updateTodo, deleteTodo}