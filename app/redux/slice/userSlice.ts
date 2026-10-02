import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Employee } from "@/app/Types/userTableTypes";
import { fetchEmployeesApi, deleteEmployeeApi } from "@/app/FrontEndApi/userApi";

interface UserState {
  data: Employee[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchEmployees = createAsyncThunk("users/fetchEmployees", async () => {
  const response = await fetchEmployeesApi();
  return response.data;
});

export const deleteEmployee = createAsyncThunk("users/deleteEmployee", async (id: string) => {
  await deleteEmployeeApi(id);
  return id;
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action: PayloadAction<Employee[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      })
      .addCase(deleteEmployee.fulfilled, (state, action: PayloadAction<string>) => {
        state.data = state.data.filter((item) => item._id !== action.payload);
      });
  },
});

export default userSlice.reducer;