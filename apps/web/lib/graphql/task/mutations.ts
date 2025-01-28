export const createTask = `
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
      name
    }
  }
`;
