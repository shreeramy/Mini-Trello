import gql from "graphql-tag";

export const LOAD_TASKS = gql`
query{
    allTasks{
    name
    id
    status
    }
    }
`;