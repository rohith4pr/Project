import {BiTrash} from "react-icons/bi";

const AppoinmentInfo = ({ appoinment, onDeleteAppoinment,firestore }) => {

  const appointmentRef = firestore.collection('appointments');

  const deleteAppointment = async(id) =>{
    var query = appointmentRef.where('id','==',id);
    query.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        doc.ref.delete();
      });
    });
    
  
  }

    return(
        <li className="px-3 py-3 flex items-start">
            {/* <button onClick={() => onDeleteAppoinment(appoinment.id)} type="button"
              className="p-1.5 mr-1.5 mt-1 rounded text-white bg-red-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <BiTrash /></button> */}

            <button onClick={() => deleteAppointment(appoinment.id)} type="button"
            className="p-1.5 mr-1.5 mt-1 rounded text-white bg-red-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <BiTrash /></button>
              <div className="flex-grow">
                <div className="flex items-center">
                  <span className="flex-none font-medium text-2xl text-blue-500">{appoinment.petName}</span>
                  <span className="flex-grow text-right">{appoinment.aptDate}</span>
              </div>
              <div><b className="font-bold text-blue-500">Owner:</b> {appoinment.ownerName}</div>
              <div className="leading-tight">{appoinment.aptNotes}</div>
              </div>
            </li>
    )
}

export default AppoinmentInfo