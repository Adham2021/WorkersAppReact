import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form, Image } from 'react-bootstrap';
import { PlusCircle } from 'react-bootstrap-icons';
import swal from 'sweetalert';


export class AddEmpModal extends Component {
    constructor(props) {
        super(props);
        this.state = { sites: [] };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API + 'site/GetAllSites')
            .then(response => response.json())
            .then(data => {
                this.setState({ sites: data });
            });
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'worker/AddWorker', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Id: 0,
                WorkerName: event.target.WorkerName.value,
                SiteId: event.target.SiteId.value,
                Phone: event.target.Phone.value,
                DateOfJoining: event.target.DateOfJoining.value,
                Amount: event.target.Amount.value,
                WorkerID: event.target.WorkerID.value,
                FullAmount: event.target.FullAmount.value,

            })
        })
            .then(res => res.json())
            .then((result) => {
                if (result.success) {
                    swal({
                        title: result.message,
                        icon: "success",
                        timer: 2000,
                        buttons: false,
                    });
                    this.props.onHide()
                }
                else {
                    swal({
                        title: result.message,
                        icon: "error",
                        buttons: true,
                    });
                }

            },
                (error) => {
                    swal({
                        title: "שגיאה בהוספה",
                        icon: "error",
                        button: "ok",
                    });
                })
    }


    render() {
        return (
            <div className="container">

                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            עובד חדש
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="WorkerName">
                                        <Form.Label>שם עובד</Form.Label>
                                        <Form.Control type="text" name="WorkerName" required
                                            placeholder="שם עובד" />
                                    </Form.Group>

                                    <Form.Group controlId="SiteId">
                                        <Form.Label>אתר</Form.Label>
                                        <Form.Control as="select">
                                            {this.state.sites.map(dep =>
                                                <option key={dep.Id} value={dep.Id}>{dep.SiteName}</option>)}
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="Phone">
                                        <Form.Label>טלפון</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="Phone"
                                            placeholder="טלפון"
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="WorkerID">
                                        <Form.Label>ת.ז</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="WorkerID"
                                            placeholder="תעודת זהות"
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="FullAmount">
                                        <Form.Label>מחיר שעה מלא </Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="FullAmount"
                                            placeholder="מחיר שעה מלא"
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="Amount">
                                        <Form.Label>מחיר שעה</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="Amount" 
                                            placeholder="מחיר שעה"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="DateOfJoining">
                                        <Form.Label>תאריך הצטרפות</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="DateOfJoining"
                                            required
                                            placeholder="תאריך הצטרפות"
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            <PlusCircle className='ms-1' />
                                            הוסף עובד
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>

                        </Row>
                    </Modal.Body>

                    <Modal.Footer>

                        <Button variant="danger" onClick={this.props.onHide}>סגור</Button>
                    </Modal.Footer>

                </Modal>

            </div>
        )
    }

}