import { Button, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Lists from "./Lists";
import { useDispatch, useSelector } from "react-redux";
import { addTask, getTask } from "../modal/Featureslice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Ticktask = () => {
  // input task
  const taskref = useRef("");
  const [error, setError] = useState(false);
  // store state
  const Data = useSelector((state) => state.addlist.addtaskState);
  // console.log(Data);

  const dispatch = useDispatch();

  const validate = () => {
    let valid = true;
    if (taskref.current.value == "") {
      setError(true);
      valid = false;
    } else {
      setError(false);
      valid = true;
    }
    return valid;
  };

  // change exp
  const [exp, setExp] = useState(false);

  useEffect(() => {
    dispatch(getTask());
  }, [exp]);

  // submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(validate());
    // fn call
    if (validate()) {
      const obj = {
        input: taskref.current.value,
        checked: false,
      };
      dispatch(addTask(obj));
      setExp(!exp);
      taskref.current.value = "";
    }
  };
  if (Data.data?.msg == "Added") {
    toast.success(Data.data.msg);
  }

  return (
    <div className="flex flex-col  items-center relative pt-3">
      <h1 className="text-3xl  font-mono">Tick List</h1>
      {/* input field */}
      <div className="flex gap-2 lg:gap-5 md:w-5/6 lg:w-1/2 mt-3">
        <TextField
          className="w-full"
          error={error}
          helperText={error ? "Please enter the value" : ""}
          inputRef={taskref}
          id="Enter Task"
          label="Enter Task"
          variant="outlined"
        />
        <Button
          className="h-14 w-24"
          variant="contained"
          onClick={handleSubmit}
        >
          <span className="text-lg">Add</span>
        </Button>
      </div>
      {/* list */}
      <div className="w-5/6 lg:w-1/2 mt-3">
        <Lists />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Ticktask;
