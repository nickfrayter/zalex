import React, {useState} from 'react';
import { Container, FormControl, Table, Form, Row, Col } from 'react-bootstrap';
import './ListComponent.css';

const ListComponent = ({requests}) => {
  const [searchTerms, setSearchTerms] = useState({
    request_no: '',
    address_to: '',
    status: ''
  });

  const [sortingField, setSortingField] = useState(null);
  const [sortingOrder, setSortingOrder] = useState(null);

  const handleInputChange = event => {
    setSearchTerms({...searchTerms, [event.target.name]: event.target.value});
  };

  const handleSortChange = (field) => {
    if (sortingField === field) {
      setSortingOrder(order => order === 'ascending' ? 'descending' : 'ascending');
    } else {
      setSortingField(field);
      setSortingOrder('ascending');
    }
  };

  const sorting = (a, b) => {
    if (a[sortingField] < b[sortingField]) {
      return sortingOrder === 'ascending' ? -1 : 1;
    }
    if (a[sortingField] > b[sortingField]) {
      return sortingOrder === 'ascending' ? 1 : -1;
    }
    return 0;
  };

  const filteredRequests = requests.filter(request => {
    return (
      (searchTerms.request_no !== '' ? request.request_no.toString() === searchTerms.request_no : true) &&
      (searchTerms.address_to !== '' ? request.address_to.toLowerCase().includes(searchTerms.address_to.toLowerCase()) : true) &&
      (searchTerms.status !== '' ? request.status.toLowerCase() === searchTerms.status.toLowerCase() : true)
    );
  }).sort(sorting);
    
  return (
    <Container>
    <h1 className="text-center" style={{marginTop: '5rem', marginBottom: '1.5em'}}>Request List</h1>
    <Form>
      <Row>
        <Form.Group as={Col} className="mb-3">
          <Form.Label>Reference No.: </Form.Label>
          <FormControl
            name="request_no"
            type="text"
            placeholder="Search by Reference No."
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group as={Col} className="mb-3">
          <Form.Label>Address To: </Form.Label>
          <FormControl
            name="address_to"
            type="text"
            placeholder="Search by Address To"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group as={Col} className="mb-3">
          <Form.Label>Status: </Form.Label>
          <FormControl
            name="status"
            type="text"
            placeholder="Search by Status"
            onChange={handleInputChange}
          />
        </Form.Group>
      </Row>
    </Form>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="sortable" onClick={() => handleSortChange('request_no')}>Reference No.</th>
            <th className="sortable" onClick={() => handleSortChange('address_to')}>Address To</th>
            <th className="sortable" onClick={() => handleSortChange('purpose')}>Purpose</th>
            <th className="sortable" onClick={() => handleSortChange('issued_on')}>Issued On</th>
            <th className="sortable" onClick={() => handleSortChange('status')}>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map((request, i) => (
            <tr key={i}>
              <td>{request.request_no}</td>
              <td>{request.address_to}</td>
              <td>{request.purpose}</td>
              <td>{request.issued_on}</td>
              <td>{request.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ListComponent;
