import React from "react";
import { useSelector } from "react-redux/es/exports";
import { counter2Selector, increase } from "../store/slices/counter2Slice";
import { setValueAsync } from "../store/slices/counter2Slice";
import { useAppDispatch } from "../store/store";

type Props = {};

const Page2 = (props: Props) => {
  const dispatch = useAppDispatch();
  const counter2Reducer = useSelector(counter2Selector);
  return (
    <div>
      <h4>Page2</h4>
      <button onClick={() => dispatch(increase())}>
        counter2 - {counter2Reducer.counter}
      </button>
      <button onClick={() => dispatch(setValueAsync(0))}>
        async counter2 - {counter2Reducer.counter}
      </button>
    </div>
  );
};

export default Page2;
