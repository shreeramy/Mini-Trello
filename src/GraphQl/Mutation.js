import { gql } from "@apollo/client";

export const CREATE_TASK_MUTATION = gql`
mutation($name: String, $status : String) {
  createTask (taskData : {name: $name, status:$status}){
    task{
      id
      name
      status
    }
  }
}
`;   

export const UPDATE_TASK_MUTATION = gql`
mutation($id :ID, $name: String, $status:String) {
  updateTask(taskData : {id:$id, name: $name, status:$status}){
    task{
      id
      name
      status
    }
  }
}
`;

export const DELETE_TASK_MUTATION = gql`
  mutation($id:ID){
    deleteTask(id:$id) {
      task {
      id
      }
      }
  } 

`;