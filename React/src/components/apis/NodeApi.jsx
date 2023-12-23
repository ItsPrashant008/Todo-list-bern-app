import axios from "axios";

export const NodeApi = () => {
  const viewTasks = (id) => {
    return axios
      .get(`${process.env.BaseURL}/viewTasks/${id}`)
      .then((response) => {
        return response.data.result;
      })
      .catch((error) => {
        console.log("NodeApi Component viewTasks error->> ", error);
      });
  };

  const viewAllTasks = () => {
    return axios
      .get(`${process.env.BaseURL}/viewAllTasks`)
      .then((response) => {
        return response.data.result;
      })
      .catch((error) => {
        console.log("NodeApi Component viewAllTasks error->> ", error);
      });
  };

  const viewUserTasks = (account) => {
    return axios
      .get(`${process.env.BaseURL}/viewUserTasks/${account}`)
      .then((response) => {
        return response.data.result;
      })
      .catch((error) => {
        console.log("NodeApi Component viewUserTasks error->> ", error);
      });
  };

  return {
    viewTasks: viewTasks,
    viewAllTasks: viewAllTasks,
    viewUserTasks: viewUserTasks,
  };
};
