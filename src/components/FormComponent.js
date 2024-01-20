import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const FormComponent = ({ onNewRequest, requestNo }) => {
  const [name, setName] = useState('');
  const [request, setRequest] = useState('');
  const [date, setDate] = useState('');
  const [id, setID] = useState('');
  const [isSubmitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {  
    e.preventDefault();
  
    if (request.length < 50) {
      alert('Your purpose should be at least 50 characters.');
      return;
    }
  
    if (new Date(date) <= new Date()) {
      alert('The date of issue should be a future date. Please choose another date.');
      return;
    }
  
    const data = { 
      "request_no": requestNo,
      "address_to": name,
      "purpose": request,
      "issued_on": date,
      "employee_id": id,
      "status": "Under Review"
    };
  
    try {
      const response = await fetch('/request-certificate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) throw new Error('Error submitting form');
  
      onNewRequest(data);    
      setSubmitted(true);
  
    } catch (err) {
      alert(err.message);
    }
  };
  
  return (
    <Container>
      <h1 className="text-center">Zalex Certification Portal</h1>
      <h2 className="text-center" style={{marginTop: '1.5rem'}}>Request Certificate</h2>
      {isSubmitted && <Alert variant="success">Form successfully submitted!</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Address To:</Form.Label>
          <Form.Control
            type='text'
            placeholder="Address to..."
            value={name}
            onChange={event => {
              const value = event.target.value;
              const isValid = /^[a-z0-9\s]+$/i.test(value);
              if (value === "" || isValid) {
                setName(value);
              }
            }}
            required
            />

        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Purpose:</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Purpose of request..."
            value={request}
            onChange={event => setRequest(event.target.value)}
            required
            minLength="50"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date of issue:</Form.Label>
          <Form.Control
            type="date"
            placeholder="Date of issue..."
            value={date}
            onChange={event => setDate(event.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Employee ID:</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your Employee ID..."
            value={id}
            onChange={event => setID(event.target.value)}
            min="0"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default FormComponent;