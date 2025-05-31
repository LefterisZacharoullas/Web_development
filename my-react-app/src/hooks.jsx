import { useState } from "react";

//Always start with the big letter
function Myhook() {
    const [count, setCount] = useState(0);

    //Better way is to pass an arrow function 
    function IncreaseCount() {
        setCount(c => c + 1)
    }

    function DecreaseCount() {
        setCount(c => c - 1)
    }

    function ResetCount() {
        setCount(0)
    }

    return (
        <div className="Hook-counter">
            <p>{count}</p>
            <button onClick={IncreaseCount}>Increase</button>
            <button onClick={ResetCount}>Reset</button>
            <button onClick={DecreaseCount}>Decrease</button>
        </div>
    )
}

export default Myhook