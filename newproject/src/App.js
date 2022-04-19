import { BiCalendar } from "react-icons/bi"
import Search from "./components/search";
import AddAppoinment from "./components/appoinment";
import AppoinmentInfo from "./components/appoinmentinfo";
import {useState} from 'react';
//import {useEffect, useCallback} from 'react';
import { useCollectionData } from "react-firebase-hooks/firestore";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyAypI2k1MvVjft3u6cZgPyiBpGlFDW7qgI",
  authDomain: "superchat-fd6b4.firebaseapp.com",
  projectId: "superchat-fd6b4",
  storageBucket: "superchat-fd6b4.appspot.com",
  messagingSenderId: "455333954952",
  appId: "1:455333954952:web:a3ab83a25bc0f92bdfe63d"
});

const firestore = firebase.firestore();


function App() {
  let [appoinmentList, setAppoinmentList] = useState([]);
  //let [appoinmentLists, setAppoinmentLists] = useState([]);
  let [query, setQuery] = useState("");
  let [sortBy, setSortBy] = useState("petName");
  let [orderBy, setOrderBy] = useState("asc");

  const messagesRef = firestore.collection('appointments');
  const Query = messagesRef;


  const [appoinmentLists] = useCollectionData(Query, {idField: 'id'});
  if(appoinmentLists != null){
    appoinmentList = appoinmentLists;
  }
  

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

  

  // const fetchData = useCallback(() => {
    

  //   fetch('./data.json')
  //   .then(response => response.json())
  //   .then(data=>{
  //     setAppoinmentList(data)
  //   });
  // },[])

  // useEffect(() => {
  //   fetchData()
  // },[fetchData]);
  
  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl mb-3">
        <BiCalendar className="inline-block text-red-400 align-top" /> Appointments 
      </h1>
      <AddAppoinment 
        firestore={firestore}
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
            <AppoinmentInfo key={appoinment.id}
            appoinment={appoinment}
            firestore ={firestore}
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
