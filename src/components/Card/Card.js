import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { images } from "../../assets";
import {
  DELETE_TASK_MUTATION,
  UPDATE_TASK_MUTATION,
} from "../../GraphQl/Mutation";
import { LOAD_TASKS } from "../../GraphQl/Queries";

const Card = ({ id, taskName, setOpenPanel, openPanel, item, setTask }) => {
  const [deleteTask, { error }] = useMutation(DELETE_TASK_MUTATION);
  const [updateTask] = useMutation(UPDATE_TASK_MUTATION);
  const [taskVal, setTaskVal] = useState(taskName);
  const [modalVisible, setMosalVisible] = useState(false);
  const { loading, data } = useQuery(LOAD_TASKS);

  useEffect(()=>{
    setTaskVal(taskName)
  },[taskName])
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "text",
    item: item,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleDelete = (id) => {
    deleteTask({ variables: { id: id } });
    window.location.reload();
  };

  const handleUpdate = (id) => {
    updateTask({ variables: { id: id, name: taskVal, status: item.status } });
    window.location.reload();
  };

  return (
    <div ref={drag}>
      <div
        className="p-1 my-2 shadow-lg postion-relative"
        style={{
          width: "220px",
          minHeight: "90px",
          maxHeight: "fit-content",
          borderRadius: "5px",
          background: "white",
          position:"relative"
        }}
      >
        { modalVisible && <div
          // className="modal"
          // id="pageModal"
          style={{position:"absolute", zIndex:"5"}}
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header text-end">
                <h5 className="modal-title" id="exampleModalLabel"></h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={()=>{
                    setMosalVisible(false)
                  }}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body text-start ">
                <div className="d-flex my-3  align-items-center">
                  <label>Task</label>
                  <textarea
                    className="mx-3"
                    value={taskVal}
                    onChange={(e) => setTaskVal(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className="mx-2 add_btn"
                  onClick={() =>{ handleUpdate(id)
                    setMosalVisible(false)
                  }}
                  style={{
                    border: "none",
                    width: "80px",
                    height: "30px",
                    background: "green",
                    color: "white",
                    borderRadius: "2px",
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>}
        <div>
          <div className="text-start">
            <p>{taskVal}</p>
          </div>
        </div>
        <div className="d-flex justify-content-end align-items-center py-1">
          <button
            // data-toggle="modal"
            // data-target="#pageModal"
            style={{ border: "none", backgroundColor: "white" }}
            onClick={() =>{
              setMosalVisible(true)
            }
            }
          >
            <img
              data-toggle="modal"
              data-target="#pageModal"
              src={images.editIcon}
              style={{ width: "15px", height: "15px" }}
              
            />
          </button>
          <img
            src={images.deleteIcon}
            onClick={() => {
              setOpenPanel(false);
              handleDelete(id);
            }}
            style={{ width: "15px", height: "15px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
