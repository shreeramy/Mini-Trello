import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { images } from "../../assets";
import Card from "../../components/Card/Card";
import TaskDeployement from "../../components/TaskDeployement/TaskDeployement";
import TaskDoing from "../../components/TaskDoing/TaskDoing";
import TaskDone from "../../components/TaskDone/TaskDone";
import TaskReview from "../../components/TaskReview/TaskReview";
import {
  CREATE_TASK_MUTATION,
  UPDATE_TASK_MUTATION,
} from "../../GraphQl/Mutation";
import { LOAD_TASKS } from "../../GraphQl/Queries";
import "./Board.style.css";

const Board = () => {
  const [task, setTask] = useState([]);
  const [openPanel, setOpenPanel] = useState(false);
  const [doingTask, setDoingTask] = useState([]);
  const [taskName, setTaskName] = useState();
  const [createTask, { error }] = useMutation(CREATE_TASK_MUTATION);
  const [updateTask] = useMutation(UPDATE_TASK_MUTATION);
  const { loading, data } = useQuery(LOAD_TASKS);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "text",
    drop: (item) => addImageToBoard(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addImageToBoard = (item) => {
    updateTask({
      variables: { id: item.id, name: "pending task", status: "pending" },
    });
  };

  const createTasks = () => {
    if(taskName){
      setOpenPanel(false)
      createTask({ variables: { name: taskName, status: "pending" } });
      window.location.reload()
      if (error) {
      }
    }
  };

  useEffect(() => {
    if (data) {
      setTask(data.allTasks);
    }
  }, [data]);


  return (
    <div>
      <div className="d-flex mt-5 mx-2" style={{background:"rgb(76, 154, 255)", width:"100%", height:"100%",}}>
        <div className="task_status">
          <div className="text-center shadow-lg">
            <div className="p-1">
              <h6 className="card_heading">To Do</h6>
            </div>
            <div
              className="card d-flex justify-content-center align-items-center"
              ref={drop}
              style={{
                width: "100%",
                minHeight: "100px",
                maxHeight: "fit-content",
                backgroundColor:"rgb(235, 236, 240)",
                border:"none"
              }}
            >
              {task &&
                task.map((item) => {
                  return (
                    <div>
                      {item.status == "pending" && (
                        <Card id={item.id} taskName={item.name} setTask={setTask} item={item} openPanel={openPanel} setOpenPanel={setOpenPanel} />
                      )}
                    </div>
                  );
                })}
            </div>
            <div className="">
              <div>
                {openPanel && (
                  <div
                    className="shadow-lg"
                  >
                    <div className="d-flex justify-content-end py-1">
                    </div>
                    <textarea
                      type="text"
                      onChange={(e) => {
                        setTaskName(e.target.value);
                      }}
                      style={{ width: "215px" }}
                    />
                  </div>
                )}
              </div>
                <div className="text-start px-2 pb-2" style={{backgroundColor:"rgb(235, 236, 240)"}}>
                  <button
                    className="border-0"
                    onClick={() => {
                      setOpenPanel(true);
                      createTasks();
                    }}
                    type="btn bg-primary"
                    style={{color:"gray"}}
                  >
                    Add card
                  </button>
                  <img
                        src={images.grayClose}
                        onClick={() => setOpenPanel(false)}
                        style={{ width: "16px", height: "16px" }}
                      />
                </div>
            </div>
          </div>
        </div>
        <div className="task_status">
          <TaskDoing
            task={task}
            setTask={setTask}
            openPanel={openPanel}
            setOpenPanel={setOpenPanel}
          />
        </div>
        <div className="task_status">
          <TaskDone
            task={task}
            openPanel={openPanel}
            setOpenPanel={setOpenPanel}
          />
        </div>
        <div className="task_status">
          <TaskReview
            task={task}
            openPanel={openPanel}
            setOpenPanel={setOpenPanel}
          />
        </div>
        <div className="task_status">
          <TaskDeployement
            task={task}
            openPanel={openPanel}
            setOpenPanel={setOpenPanel}
          />
        </div>
      </div>
    </div>
  );
};

export default Board;
