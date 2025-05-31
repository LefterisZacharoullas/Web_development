

function Mylist() {
    const data = [
        {id: 1, name:"lefteris" , age: 20, ishuman: true},
        {id: 2, name:"Rex" , age: 12, ishuman: false},
    ]

    const listnames = data.map(d =>  
        <li key={d.id}>
            {d.name}
        </li>
    );

    return(
        <ul>{listnames}</ul>
    )
}

export default Mylist