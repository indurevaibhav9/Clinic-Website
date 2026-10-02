import axios from "axios";
import { ApiResponse } from "../Types/userTableTypes";

const BASE_URL = "http://localhost:3000/api/table";

export const fetchEmployeesApi = async (): Promise<ApiResponse> => {
  const response = await axios.get<ApiResponse>(BASE_URL);
  return response.data;
};

export const deleteEmployeeApi = async (id: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`);
};