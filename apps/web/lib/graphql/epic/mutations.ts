export const createEpic = `
  mutation CreateEpic($input: CreateEpicInput!) {
    createEpic(input: $input) {
      id
      name
    }
  }
`;
