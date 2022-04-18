import { BiCalendar } from "react-icons/bi"
import Search from "./components/search";
import AddAppoinment from "./components/appoinment";
import AppoinmentInfo from "./components/appoinmentinfo";
import {useState, useEffect, useCallback} from 'react';

function App() {
  let [appoinmentList, setAppoinmentList] = useState([]);
  let [query, setQuery] = useState("");
  let [sortBy, setSortBy] = useState("petName");
  let [orderBy, setOrderBy] = useState("asc");

  const filterappoinment = appoinmentList.filter(
    item => {
    return(
      item.petName.toLowerCase().includes(query.toLocaleLowerCase()) || 
      item.ownerName.toLowerCase().includes(query.toLocaleLowerCase()) ||
      item.aptNotes.toLowerCase().includes(query.toLocaleLowerCase())
      )
    }
  ).sort((a,b) => {
    let order = (orderBy === 'asc') ? 1 : -1;
    return(
      a[sortBy].toLocaleLowerCase() < b[sortBy].toLocaleLowerCase()
      ? -1*order : 1*order
    )
  })

  const fetchData = useCallback(() => {
    fetch('./data.json')
    .then(response => response.json())
    .then(data=>{
      setAppoinmentList(data)
    });
  },[])

  useEffect(() => {
    fetchData()
  },[fetchData]);
  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl mb-3">
        <BiCalendar className="inline-block text-red-400 align-top" /> Hello 
      </h1>
      <AddAppoinment 
        onSendAppoinment={myAppoinment => setAppoinmentList([...appoinmentList, myAppoinment])}
        lastId={appoinmentList.reduce((max, item) => Number(item.id) > max ? Number(item.id) : max, 0)}
      />
      <Search query={query}
      onQueryChange={myQuery => setQuery(myQuery)}
      orderBy={orderBy}
      onOrderByChange={mySort => setOrderBy(mySort)}
      sortBy={sortBy}
      onSortByChange={mySort => setSortBy(mySort)}
      />
      <ul className="divide-y divide-gray-200">
        {filterappoinment
          .map(appoinment => (
            <AppoinmentInfo key={appoinment}
            appoinment={appoinment}
            onDeleteAppoinment={
              appoinmentId =>
              setAppoinmentList(appoinmentList.filter(appoinment => appoinment.id !== appoinmentId))
            }
            />
          ))
        }
      </ul>
    </div>
  );
}

export default App;
