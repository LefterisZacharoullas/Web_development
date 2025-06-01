import Myhook from "./hooks"
import Mylist from "./lists"

function App() {
  const data = [
    { id: 1, name: "Lefteris", age: 20, ishuman: true },
    { id: 2, name: "Rex", age: 12, ishuman: false },
    { id: 3, name: "Alex", age: 19, ishuman: true },
  ]

  const data2 = [
    { id: 4, name: "Hello", age: 40, ishuman: true },
    { id: 5, name: "Why", age: 1, ishuman: false },
    { id: 6, name: "Wow", age: 40, ishuman: false },
  ]

  return (<>
    {data.length > 0 && <Mylist ></Mylist>} 
    <Mylist items={data2}></Mylist>
  </>)
}

export default App