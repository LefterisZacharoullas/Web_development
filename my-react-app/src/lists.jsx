

function Mylist() {
    const data = [
        {id: 1, name:"Lefteris" , age: 20, ishuman: true},
        {id: 2, name:"Rex" , age: 12, ishuman: false},
        {id: 3, name:"Alex" , age: 19, ishuman: true},
    ]

    data.sort((a, b) => a.name.localeCompare(b.name))

    const listnames = data.map(d =>  
        <li key={d.id}>
            name: {d.name} age: {d.age} ishuman: {d.ishuman ? "Yes" : "No"}
        </li>
    );

    const adultsage = data.filter(a => a.age >= 18);

    const listadults = adultsage.map(d =>  
        <li key={d.id}>
            name: {d.name} age: {d.age} ishuman: {d.ishuman ? "Yes" : "No"}
        </li>
    );
    

    return(
        <div className="listUsers">
            <h1>All the users</h1>
            <ul>{listnames}</ul>
            <h1>Only 18+</h1>
            <ul>{listadults}</ul>
        </div>
        
    )
}

export default Mylist