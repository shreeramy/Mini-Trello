import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { UPDATE_TASK_MUTATION } from "../../GraphQl/Mutation";
import Card from "../Card/Card";

const TaskDone = ({ openPanel, setOpenPanel, task }) => {
  const [doneTask, setDoneTask] = useState([]);
  const [updateTask] = useMutation(UPDATE_TASK_MUTATION);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "text",
    drop: (item) => addImageToBoard(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addImageToBoard = (item) => {
    updateTask({ variables: { id: item.id, name:item.name, status: "done" } });
    doneTask.push(item);
    setDoneTask([...doneTask]);
  };

  return (
    <div className="text-center shadow-lg border border-1">
      <div className="border border-1 p-1">
        <h6 className="card_heading">Done</h6>
      </div>
      <div
        className="card"
        ref={drop}
      >
        {task.length > 0 &&
          task.map((item) => {
            return (
              <div className="d-flex justify-content-center align-items-center">
                {item.status == "done" && (
                  <Card
                    id={item.id}
                    taskName={item.name}
                    item={item}
                    openPanel={openPanel}
                    setOpenPanel={setOpenPanel}
                  />
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TaskDone;
