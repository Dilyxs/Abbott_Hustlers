

export const HandleFiltering = (condition, AllClients, input) => {
  let filtered_Clients;

  switch (condition) {
    case "phone":
      filtered_Clients = AllClients.filter((client) =>
        client.phone.String.includes(String(input))
      );
      break;

    case "bookingdone":
      filtered_Clients = AllClients.filter((client) => client.bookingdone.Bool === true);
      break;

    default: // search by name
      filtered_Clients = AllClients.filter((client) =>
        client.name.String.toLowerCase().includes(String(input).toLowerCase())
      );
      break;
  }

  return filtered_Clients;
};