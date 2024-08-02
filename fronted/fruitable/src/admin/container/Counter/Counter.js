import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../../../redux/reducer/slice/counter.slice';

function Counter(props) {
    const counter_slice = useSelector(state => state.counter_slice)
    // console.log(counter_slice);
    const dispatch = useDispatch()
    const handleInc = () => {
        dispatch(increment())
    }

    const handleDec = () => {
        dispatch(decrement())
    }
    return (
        <div>
            <button onClick={handleInc}>+</button>
            {counter_slice.count}
            <button onClick={handleDec}>-</button>
        </div>
    );
}

export default Counter;