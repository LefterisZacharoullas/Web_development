function Mylist({items = []}) {
    const sortedItems = items.sort((a, b) => a.name.localeCompare(b.name));

    const listnames = sortedItems.map(d =>  
        <li key={d.id}>
            name: {d.name} age: {d.age} ishuman: {d.ishuman ? "Yes" : "No"}
        </li>
    );

    const humans = sortedItems
        .filter(a => a.ishuman)
        .map(d =>  
            <li key={d.id}>
                name: {d.name} age: {d.age} ishuman: Yes
            </li>
        );

    return (
        <div className="listUsers">
            <h1>All the users</h1>
            <ul>{listnames}</ul>
            <h1>Only humans</h1>
            <ul>{humans}</ul>
        </div>
    );
}

export default Mylist