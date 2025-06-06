import React from 'react';
import { UpdateANote, GetAllNotes } from '../../../utils/APIFunc';

const ShowClientEdit = ({
  setSelectedEditNote,
  SelectedEditNote,
  setShowEditClient,
  setAllNotes
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Note Detail</h2>

        <label htmlFor="detail" className="block text-sm font-medium text-gray-700 mb-1">
          Note Content
        </label>
        <textarea
          id="detail"
          name="detail"
          rows={6}
          value={SelectedEditNote.detail || ""}
          onChange={(e) => {
            e.preventDefault();
            setSelectedEditNote((prev) => ({
              ...prev,
              [e.target.name]: e.target.value
            }));
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowEditClient(false);
            }}
            className="px-4 py-2 rounded-lg bg-red-400 hover:text-white transition"
          >
            Cancel
          </button>

          <button
            onClick={async (e) => {
              console.log(SelectedEditNote);
              const response = await UpdateANote(
                SelectedEditNote.id,
                SelectedEditNote.title,
                SelectedEditNote.detail,
                SelectedEditNote.clientrelation?.Valid
                  ? SelectedEditNote.clientrelation.Int64
                  : 0
              );
              if (response === 200) {
                const updatedNotes = await GetAllNotes();
                setAllNotes(updatedNotes);
              }
              setShowEditClient(false);
            }}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowClientEdit;
