import { ADD_TODO, DELETE_TODO, IS_DONE_TODO, UPDATE_TODO } from "../types"

export const addTodo = (data) => {

    return {
        type: ADD_TODO,
        payload: data
    }
}

export const deleteTodo = (todoId) => {
    return {
        type: DELETE_TODO,
        payload: {todoId}
    }
}

export const updateTodo = (todoId, updatedData) => {
    return {
        type: UPDATE_TODO,
        payload: {todoId, updatedData}
    }

}

export const isDoneTodo = (todoId) => {
    return {
        type: IS_DONE_TODO,
        payload: {todoId}
    }
}