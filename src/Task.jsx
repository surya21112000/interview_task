import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Button, TextField } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";




const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Task() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const [data, setData] = React.useState([]);
  const [task, setTask] = React.useState("");
  const [load, setLoad] = React.useState(false);
  var addData = [];
  useEffect(() => {
    fetchData();
  }, [load]);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    try {
      const response = await axios.get("http://localhost:5000/task", {
        headers,
      });
      const newData = response.data.map((obj, index) => ({
        ...obj,
        id: index + 1,
      }));
      setData(newData);
    } catch (error) {
      console.error(error);
      if (error.response.status == 401) {
        setOpen(true);
      }
    }
  };

  async function addTask() {
    const token = await localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/task",
        { text: task },
        { headers }
      );
      setLoad(!load);
      console.log(response.data);
    } catch (error) {
      if (error.response.status == 401) {
        setOpen(true);
      }
    }
  }

  const columns = [
    { field: "_id", headerName: "Id", width: 350 },
    {
      field: "text",
      headerName: "Task",
      width: 350,
    },
  ];


  return (
    <>
      <TextField
        id="outlined-basic"
        label="Task"
        variant="outlined"
        sx={{ marginLeft: "40%", marginTop: "5%" }}
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <Button
        variant="contained"
        sx={{ marginLeft: "2%", marginTop: "5.3%" }}
        size={"large"}
        onClick={addTask}
      >
        Add Task
      </Button>
      <DataGrid
        sx={{ marginLeft: "28%", marginTop: "5%", width: "40%" }}
        rows={data}
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Session Expired</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            your session has been expired ,Please login Again!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => navigate("/login")}>Login again</Button>
        </DialogActions>
      </Dialog>

    </>
  );
}
