import axios from "axios";
import { useEffect, useState } from "react";

export const ViewAllTasks = () => {
  const [data, setData] = useState([null]);
  useEffect(() => {
    viewAllTask();
  }, []);

  const viewAllTask = async () => {
    axios.get(`${process.env.BaseURL}/viewAllTasks`).then((response) => {
      console.log("response.data--->>> ", response.data.data);
      setData(response.data.data);
    });
  };
  return (
    <>
      <h1>View All Tasks Component</h1>

      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <td>Task Id</td>
            <td>Task Name</td>
            <td>Task Date</td>
            <td>Task Owner</td>
            <td>Task Status</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            {data.length > 0
              ? data.map((item) => {
                  //   `<td>${item}</td>`;
                })
              : "No Data Found!"}
          </tr>
        </tbody>
      </table>
    </>
  );
};
