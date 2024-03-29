import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

type Counter1State = {
  counter: number;
  loading: boolean;
};

const initialValues: Counter1State = {
  counter: 0,
  loading: false,
};

export const setValueAsync = createAsyncThunk(
  "counter1/setValueAsync",
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

const counter1Slice = createSlice({
  name: "counter1",
  initialState: initialValues,
  reducers: {
    increase: (state: Counter1State, action: PayloadAction<void>) => {
      state.counter = state.counter + 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setValueAsync.fulfilled, (state: Counter1State, action) => {
      state.counter = action.payload;
      state.loading = false;
    });

    builder.addCase(setValueAsync.rejected, (state: Counter1State) => {
        state.counter = 0;
      });

    builder.addCase(setValueAsync.pending, (state: Counter1State) => {
      state.loading = true;
    });
  },
});

export const { increase } = counter1Slice.actions;
export const counter1Selector = (store: RootState) => store.counter1Reducer;
export default counter1Slice.reducer;
