import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  addTodo,
  deleteTodo,
  isDoneTodo,
  updateTodo,
} from "../../redux/actions/todoListActions";
import EditTodo from "./EditTodo";
import Button from '@mui/material/Button';

export default function index() {
  const [state, setState] = useState("");
  const [todoId, setTodoId] = useState(null);
  const [editState, setEditState] = useState("");

  const todos = useSelector((state) => state?.todos?.todos);
  const dispatch = useDispatch();

  console.log(todos)
  const todoData = todos?.find((el, index) => el.id == todoId);

  useEffect(() => {
    if (todoData) return setEditState(todoData?.todo);
  }, [todoId]);

  const onSubmit = (e) => {
    e.preventDefault();
        if(state==="") return
    
      const data = {
        id: todos.length + 1,
        todo: state,
      };
      addNewTodo(data);
  };


  const editSubmit = () => {
        const { id, todo } = todoData;
        const data = {
          id,
          todo: editState,
        };
        updateOldTodo(id, data);
      
  }

  // console.log("second",data.id)
  const addNewTodo = (data) => {
    dispatch(addTodo(data));
    toast.success('You added new todo', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    setState("");
  };

  const updateOldTodo = (todoId, data) => {
    dispatch(updateTodo(todoId, data));
    toast.success('Changes saved', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    setTodoId(null);
  };

  const checkForStatus = (id) => {
    dispatch(isDoneTodo(id))
}

  console.log("todoId", todoId);
  return (
    <>
    <div className="p-4 border-2 flex flex-col items-center gap-4">
      <h2 className="text-blue-500 text-lg font-semibold">TodoList</h2>
      <form onSubmit={onSubmit} className="flex gap-4">
        <input
          name="inputField"
          className="border-2 py-2 px-4 rounded-lg"
          placeholder="Add todo..."
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <Button type="submit" variant="contained">Add</Button>
      </form>
      <div className="w-full mt-4 flex flex-col gap-4">
        {todos?.map((t, index) => {
          return (
            <>
              {todoId === t.id ? (
                <EditTodo
                  editSubmit={editSubmit}
                  editState={editState}
                  setEditState={setEditState}
                  setTodoId={setTodoId}
                />
              ) : (
                <div className="w-full flex gap-2 justify-between">
                  <p onDoubleClick={()=>checkForStatus(t.id)} className={`${t.isDone && "line-through"} flex-1 text-lg select-none  cursor-pointer py-2 px-4`}>{t?.todo}</p>
                  <div className="flex gap-2">
                    <Button
                    variant="contained"
                    color="warning"
                      onClick={() => setTodoId(t?.id)}
                    >
                      Edit
                    </Button>
                    <Button
                    variant="contained"
                    color="error"
                      onClick={() => dispatch(deleteTodo(t?.id))}
                    >
                      delete
                    </Button>
                  </div>
                </div>
              )}
            </>
          );
        })}
      </div>
    </div>
      <ToastContainer />
    </>
  );
}
