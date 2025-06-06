export const FindClientExistance = (AllClients, id) => {

  const correct_client = clientsArray.find(client => String(client.id) === String(id));
  return correct_client ? [true, correct_client] : [false, null];
};
