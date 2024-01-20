import React, { useState, useEffect } from 'react';
import FormComponent from './components/FormComponent';
import ListComponent from './components/ListComponent';
import './App.css';

function App() {
  const [requests, setRequests] = useState([]); 
  const [requestNo, setRequestNo] = useState(1);

  useEffect(() => {
    fetch('/request-list')
      .then(response => response.json())
      .then(data => {
        const dataWithRequestNumbers = data.map((request, index) => ({
          ...request,
          request_no: request.request_no ? request.request_no : index + 1,
        }));

        setRequests(dataWithRequestNumbers);

        setRequestNo(data.length + 1);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const handleNewRequest = (request) => {
    setRequestNo(requestNo + 1); 
    setRequests([request, ...requests]);
  };

  return (
    <div>
      <FormComponent onNewRequest={handleNewRequest} requestNo={requestNo} />
      <ListComponent requests={requests}/>
    </div>
  );
}

export default App;
