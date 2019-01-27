import React from 'react';
import ClientDetail from '../components/ClientDetail/index';

const Page_client = (props) => {
  const clientId = parseInt(props.match.params.clid);
  const clientData = props.clients.find((client) => {
    return client.id === clientId
  });

  return (
    <ClientDetail client={clientData} />
  );
};


export default Page_client;