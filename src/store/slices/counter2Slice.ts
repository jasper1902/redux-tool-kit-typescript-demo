import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

type Counter2State = {
  counter: number;
  loading: boolean;
};

const initialValues: Counter2State = {
  counter: 0,
  loading: false,
};

export const setValueAsync = createAsyncThunk(
  "counter2/setValueAsync",
  async (value: number) => {
    const job = new Promise<number>((resolve, reject) => {
      setTimeout(() => {
        if (value >= 0) {
          resolve(value);
        } else {
          reject(Error(""));
        }
      }, 2000);
    });

    const result = await job;
    return result;
  }
);

const counter2Slice = createSlice({
  name: "counter2",
  initialState: initialValues,
  reducers: {
    increase: (state: Counter2State, action: PayloadAction<void>) => {
      state.counter = state.counter + 2;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setValueAsync.fulfilled, (state: Counter2State, action) => {
      state.counter = action.payload;
      state.loading = false;
    });

    builder.addCase(setValueAsync.rejected, (state: Counter2State) => {
        state.counter = 0;
      });

    builder.addCase(setValueAsync.pending, (state: Counter2State) => {
      state.loading = true;
    });
  },
});

export const { increase } = counter2Slice.actions;
export const counter2Selector = (store: RootState) => store.counter2Reducer;
export default counter2Slice.reducer;
