import React from "react";
import { useSelector } from "react-redux/es/exports";
import { counter1Selector, increase } from "../store/slices/counter1Slice";
import { setValueAsync } from "../store/slices/counter1Slice";
import { useAppDispatch } from "../store/store";

type Props = {};

const Page1 = (props: Props) => {
  const dispatch = useAppDispatch();
  const counter1Reducer = useSelector(counter1Selector);
  return (
    <div>
      <h4>Page1</h4>
      <button onClick={() => dispatch(increase())}>
        counter1 - {counter1Reducer.counter}
      </button>
      <button onClick={() => dispatch(setValueAsync(0))}>
        async counter1 - {counter1Reducer.counter}
      </button>
    </div>
  );
};

export default Page1;
