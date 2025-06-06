import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Pencil } from 'lucide-react';
import { DeleteAnEvent, HandleClickingOnSelectedClient, HandleOnChangeForSelectingClient, HandleRegularOnChange ,HandleSubmitNote} from './HelperHandler';
import { PostANote, GetAllNotes } from '../../../utils/APIFunc';
import ShowClientEdit from './ShowClientEdit';

const SingleNote = ({ AllNotes, AllClients, setAllNotes }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [ShowEditClient , setShowEditClient ] = useState(false);
  const [AddNoteDetail , setAddNoteDetail ] = useState(JSON.parse(localStorage.getItem("AddNoteDetail")) || {
    title:"",
    detail:"",
    clientrelationname:"",
    clientrelation:0
  });
  const [FilteredClients, setFilteredClients] = useState([]);
  const [SelectedEditNote , setSelectedEditNote] = useState(null);


  useEffect(()=>{
    const SaveDataLocally = ()=>{
      localStorage.setItem("AddNoteDetail", JSON.stringify(AddNoteDetail))

    }

    window.addEventListener("pagehide",SaveDataLocally)
    return ()=> window.removeEventListener("pagehide", SaveDataLocally)
  }, [AddNoteDetail])

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Notes</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" /> Add Note
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        {AllNotes != null && AllNotes.map((note) => {
          let Matched_Client = null;
          if (note.clientrelation.Valid) {
            Matched_Client = AllClients.find(
              (client) => client.id === note.clientrelation.Int64
            );
          }

          return (
            <div
              key={note.id}
              className="rounded-2xl shadow-md p-4 bg-white border border-gray-200 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {note.title}
                </h2>
                <p className="text-gray-600 mb-4">{note.detail}</p>

                {Matched_Client && (
                  <div className="text-sm text-gray-500 border-t pt-2 mt-2">
                    <div><span className="font-medium">Client:</span> {Matched_Client.name.String}</div>
                    <div><span className="font-medium">Phone:</span> {Matched_Client.phone.String}</div>
                    <div><span className="font-medium">Message:</span> {Matched_Client.message.String}</div>
                  </div>
                )}
              </div>

              <div className="flex gap-2 mt-4">
                {<button className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-full flex items-center" onClick={()=>{setShowEditClient(true); setSelectedEditNote(note); console.log(SelectedEditNote)}}>
                  <Pencil className="w-4 h-4 mr-1" /> Edit
                </button> }
                <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full flex items-center" onClick={async(e)=>{DeleteAnEvent(e, note.id, setAllNotes)}}>
                  <Trash2 className="w-4 h-4 mr-1" /> Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {showAddModal && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md mx-4 sm:mx-auto">
      <h2 className="text-xl font-bold mb-6 text-black">Add New Note</h2>

      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          id="title"
          type="text"
          name="title"
          value={AddNoteDetail.title}
          onChange={(e) => HandleRegularOnChange(e, setAddNoteDetail)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="detail" className="block text-sm font-medium text-gray-700 mb-1">
          Detail
        </label>
        <input
          id="detail"
          type="text"
          name="detail"
          value={AddNoteDetail.detail}
          onChange={(e) => HandleRegularOnChange(e, setAddNoteDetail)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="clientrelation" className="block text-sm font-medium text-gray-700 mb-1">
          Client Relation (Optional)
        </label>
        <input
          id="clientrelationname"
          type="text"
          name="clientrelationname"
          value={AddNoteDetail.clientrelationname}
          onChange={(e) => HandleOnChangeForSelectingClient(e, AllClients, setAddNoteDetail, setFilteredClients)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {FilteredClients.map(client => (
  <div key={client.id} id="clientrelation" className="p-2 hover:bg-gray-100 text-black cursor-pointer" onClick={(e)=>{HandleClickingOnSelectedClient(e, setAddNoteDetail,AddNoteDetail,client)}}>
    {client.name.String}
  </div>
))}

      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => setShowAddModal(false)}
          className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md"
        >
          Cancel
        </button>
        <button
          onClick={async(e)=>{
              e.preventDefault();

              try {
                const status = await PostANote(
                  AddNoteDetail.title,
                  AddNoteDetail.detail,
                  AddNoteDetail.clientrelation
                );

                if (status === 200) {
                  setAddNoteDetail({
                    title: "",
                    detail: "",
                    clientrelationname: "",
                    clientrelation: 0
                  });
                  setShowAddModal(false);
                  const response = await GetAllNotes();
                  setAllNotes(response)
                  
                } else {
                  console.error("Note post failed with status:", status);
                }
              } catch (error) {
                console.error("Error posting note:", error);
              }


          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
)}

{ShowEditClient && (<ShowClientEdit setSelectedEditNote={setSelectedEditNote} SelectedEditNote={SelectedEditNote} setShowEditClient = {setShowEditClient} setAllNotes={setAllNotes}></ShowClientEdit>)}
    </div>
  );
};

export default SingleNote;
