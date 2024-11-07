import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TargetAdd } from "../types/target";
import { addTarget, DataAddTarget, DataDeleteTarget, DataReplenishTarget, deleteTarget, getAllTargets, replenishTarget } from "../api/target";

type TargetState = {
  targets: TargetAdd[] | null;
  target: TargetAdd | null;
  loading: boolean;
  error: string | null;
}

const initialState: TargetState = {
  targets: null,
  target: null,
  loading: false,
  error: null,
}

export const ReplenishTarget = createAsyncThunk('target/ReplenishTarget', async (data: DataReplenishTarget) => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    const response = await replenishTarget(data, accessToken)

    return response;
  }
})

export const AddTarget = createAsyncThunk('target/AddTarget', async (data: DataAddTarget) => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    const response = await addTarget(data, accessToken)

    return response;
  }
})

export const GetAllTargets = createAsyncThunk('target/GetAllTargets', async () => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    const response = await getAllTargets(accessToken)

    return response;
  }
})

export const DeleteBudget = createAsyncThunk('target/DeleteBudget', async (data: DataDeleteTarget) => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    const response = await deleteTarget(data, accessToken)

    return response;
  }
})

export const targetSlice = createSlice({
  name: 'target',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ReplenishTarget
      .addCase(ReplenishTarget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ReplenishTarget.fulfilled, (state, action) => {
        state.loading = false;
        state.target = action.payload || null;
      })
      .addCase(ReplenishTarget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to replenish target';
      })

      //Add Target
      .addCase(AddTarget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AddTarget.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(AddTarget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add target';
      })

      //GetAllTargets
      .addCase(GetAllTargets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetAllTargets.fulfilled, (state, action) => {
        state.loading = false;
        state.targets = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(GetAllTargets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load targets';
      })

      //DeleteBudget
      .addCase(DeleteBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeleteBudget.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(DeleteBudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete target';
      })
  },
})

export default targetSlice.reducer;