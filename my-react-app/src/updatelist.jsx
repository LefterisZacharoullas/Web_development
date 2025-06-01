import { useState } from "react";

function Mycomponent() {
    const [foods, updateitems] = useState(["apple", "banana"]);

    function handlefood() {
        const newfood = document.getElementById("foodinput").value
        updateitems(f => [...f, newfood])
    }

    function Removefood(index) {
        updateitems(foods.filter((_, i) => i !== index))
    }

    return (
        <div className="updatelist">
            <h1>Food list</h1>
            <ul>
                {foods.map((food, index) =>
                    //I am passing anonymous function to onlich to not execute it right away
                    <li key={index} onClick={() => Removefood(index)}>
                        {food}
                    </li>)
                }
                <input type="text" id="foodinput" placeholder="Enter food name" />
                <button onClick={handlefood}>addfood</button>
            </ul>
        </div>)

}

export default Mycomponent