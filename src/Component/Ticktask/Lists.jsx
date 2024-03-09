import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { blue, red } from "@mui/material/colors";
import React, {
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { deleteTask, getTask, updateTask } from "../modal/Featureslice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Lists = () => {
  const Data = useSelector((state) => state.addlist);
  //   console.log(Data);
  const dispatch = useDispatch();

  const accesstoken = localStorage.getItem("accesstoken")

  // pop up edit
  const [pop, setPop] = useState(false);
  const [input, setInput] = useState({
    in_id: "",
    input: "",
    checked: "",
  });
  const [exp, setExp] = useState(false);
  const handlePop = (i) => {
    setInput({
      in_id: i._id,
      input: i.input,
      checked: i.checked,
    });
    setPop(!pop);
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value || "" });
  };

  useEffect(() => {
    dispatch(getTask());
  }, [exp,accesstoken]);

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateTask(input));
    setExp(!exp);
    setPop(!pop);
  };

  // delete
  const handleDelete = (i) => {
    dispatch(deleteTask(i));
    setExp(!exp);
  };

  // check
  const handleCheck = (i) => {
    console.log(i);
    const obj = {
      in_id: i._id,
      input: i.input,
      checked: !i.checked,
    };
    console.log(obj);
    dispatch(updateTask(obj));
    setExp(!exp);
  };
  
  

  return (
    <>
    {
        Data.getData.data?.length == 0 ?
        <h1 className="text-3xl text-center pt-8 text-gray-300">NO Content ....</h1>
        :
        <>
        {Data.getData.data?.map((i,index) => {
        return (
          <div key={index}>
            <div className="flex justify-between items-center border-2 lg:pl-5 pl-2 pr-2 mb-3 cursor-pointer">
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={i?.checked}
                      onClick={() => handleCheck(i)}
                      // check color
                      sx={{
                        color: blue[800],
                        "&.Mui-checked": {
                          color: red[600],
                        },
                      }}
                    />
                  }
                  label={i.input}
                />
              </div>
              <div className="flex gap-2">
                <span onClick={() => handlePop(i)}>
                  <DriveFileRenameOutlineOutlinedIcon color="primary" />
                </span>
                <span onClick={() => handleDelete(i?._id)}>
                  <DeleteSweepOutlinedIcon color="primary" />
                </span>
              </div>
            </div>
          </div>
        );
      })}
      {/* pop up */}
      {pop ? (
        <div className="flex justify-center items-center absolute top-0 left-0 h-[100vh] w-full bg-black bg-opacity-80 z-50">
          <div className="bg-white h-1/3 flex flex-col w-1/3 justify-center px-5 py-3 gap-5 rounded-xl">
            {/* cross icon */}
            <span
              onClick={handlePop}
              className=" flex justify-end cursor-pointer"
            >
              <CloseOutlinedIcon />
            </span>

            {/* input */}
            <TextField
              className="w-full"
              name="input"
              value={input.input}
              onChange={handleChange}
              id="Enter Input"
              label="Enter Input"
              variant="outlined"
            />

            {/* check data */}
            <TextField
              className="w-full"
              name="checked"
              value={input.checked}
              onChange={handleChange}
              id="Enter Input"
              label="Enter Input"
              variant="outlined"
            />

            {/* btn */}
            <Button
              className="h-14 w-28"
              variant="contained"
              onClick={handleUpdate}
            >
              <span className="text-xl">Submit</span>
            </Button>
          </div>
          <ToastContainer/>
        </div>
      ) : null}</>
    }
    </>
  );
};

export default Lists;
