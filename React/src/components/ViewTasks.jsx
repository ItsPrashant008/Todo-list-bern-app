import axios from "axios";
import { useEffect, useState } from "react";

export const ViewTasks = () => {
  useEffect(() => {
    getDetail(1);
  }, []);

  const getDetail = async (id) => {
    axios.get(`${process.env.BaseURL}/viewTasks/${id}`).then((response) => {
      console.log("response.data--->>> ", response.data);
    });
  };

  return (
    <>
      <h1>View Tasks Component</h1>
    </>
  );
};
