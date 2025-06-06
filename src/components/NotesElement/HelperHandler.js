import { DeleteANote, PostANote , GetAllNotes} from "../../../utils/APIFunc";

export const HandleRegularOnChange = (e, setAddNoteDetail)=>{
    e.preventDefault();
    setAddNoteDetail((prev)=>({...prev, [e.target.name]:e.target.value}))

}

export const HandleOnChangeForSelectingClient = (e, AllClient, setAddNoteDetail, setFilteredClients) => {
  e.preventDefault();

  const inputValue = e.target.value.toLowerCase();

  // Update input value
  setAddNoteDetail((prev) => ({
    ...prev,
    [e.target.name]: e.target.value,

  }));

  // Filter client list
  const filtered_clients = AllClient
    .filter((client) => client.name.String.toLowerCase().includes(inputValue))
    .slice(0, 6); // Limit to 6

  // Store filtered results for UI (optional)
  if (setFilteredClients) {
    setFilteredClients(filtered_clients);
  }
};

export const HandleSubmitNote = (AddNoteDetail, setAddNoteDetail, setShowAddModal)=>{

    const quicky = async ()=>{
        try {
            const status = await PostANote(AddNoteDetail.title, AddNoteDetail.detail, AddNoteDetail.clientrelation)
            if (status == 200){
                return true
            }
        } catch (error) {
            return false
            
        }
    }

    var success_or_not = quicky();
    setAddNoteDetail({
    title:"",
    detail:"",
    clientrelationname:"",
    clientrelation:0
  })
  setShowAddModal(false);
    
}

export const HandleClickingOnSelectedClient = (e, setAddNoteDetail,AddNoteDetail, client)=>{
    e.preventDefault();
    setAddNoteDetail((prev)=>({...prev, [e.target.id]:Number(client.id), clientrelationname:client.name.String}))    
    console.log(AddNoteDetail)
}

export const DeleteAnEvent = async(e, note_id, setAllNotes) =>{
    e.preventDefault();
    const response = await DeleteANote(note_id);
    console.log(response);
    if (response == 200){
         const response = await GetAllNotes();
        setAllNotes(response)

    }
}