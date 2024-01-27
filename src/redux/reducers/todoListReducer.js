import { ADD_TODO, DELETE_TODO, IS_DONE_TODO, UPDATE_TODO } from "../types"

const initialState = {
    todos: [
        {id: 1, todo: "qwerty", isDone: false},
        {id: 2, todo: "qwerty2",isDone: false}
    ]
}

export const todoListReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_TODO: 
        const data = [...state.todos, action.payload];
        return {
            ...state,
            todos: data,
        }
    case DELETE_TODO:
        return {
            ...state,
            todos: state.todos.filter((todo, index)=> todo.id !== action.payload.todoId)
        } 
    case UPDATE_TODO:
        console.log(state.todos)
        return {
            ...state,
            todos: state.todos.map((todo)=> {
              return todo.id == action.payload.todoId ? {...todo, ...action.payload.updatedData} : todo
            })
          }
    case IS_DONE_TODO:
        return {
            ...state,
            todos: state.todos.map((todo)=>todo.id === action.payload.todoId ? {...todo, isDone: !todo.isDone} : todo)
        }
        default: 
        return state
    }
}