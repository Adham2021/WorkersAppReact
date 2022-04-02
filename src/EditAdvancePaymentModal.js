import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form, Image } from 'react-bootstrap';
import { Save } from 'react-bootstrap-icons';
import swal from 'sweetalert';


export class EditAdvancePaymentModal extends Component {
    constructor(props) {
        super(props);
        this.state = { workers: [] };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API + 'worker/GetAllWorkers')
            .then(response => response.json())
            .then(data => {
                this.setState({ workers: data });
            });
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'worker/UpdateAdvancePayment', {
            method: 'POST',

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Id: this.props.advid,
                Name: event.target.Name.value,
                WorkerId: event.target.WorkerId.value,
                Notes: event.target.Notes.value,
                Amount: event.target.Amount.value,
                Date: event.target.Date.value,
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
                        title: "שגיאה בעדכון",
                        icon: "error",
                        button: "אישור",
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
                    centered>

                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            עדכון פרטי מפרעה
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>

                                    <Form.Group controlId="Name">
                                        <Form.Label>שם מפרעה</Form.Label>
                                        <Form.Control type="text" name="Name" required
                                            defaultValue={this.props.advname}
                                            placeholder="שם מפרעה" />
                                    </Form.Group>
                                    <Form.Group controlId="Amount">
                                        <Form.Label>סכום</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="Amount"
                                            required
                                            placeholder="סכום"
                                            defaultValue={this.props.advamount} />
                                    </Form.Group>

                                    <Form.Group controlId="WorkerId">
                                        <Form.Label>שם עובד</Form.Label>
                                        <Form.Control as="select" defaultValue={this.props.advworker}>
                                            {this.state.workers.map(worker =>
                                                <option key={worker.Id} value={worker.Id}>{worker.WorkerName + " - "
                                                    + worker.WorkerID}</option>)}
                                        </Form.Control>
                                    </Form.Group>
                                    
                                    <Form.Group controlId="Date">
                                        <Form.Label>תאריך</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="Date"
                                            required
                                            placeholder="תאריך"
                                            defaultValue={this.props.advdate} 
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="Notes">
                                        <Form.Label>הערות</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="Notes"
                                            placeholder="הערות"
                                            defaultValue={this.props.advnotes}
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            <Save className='ms-1' />
                                            עדכן מפרעה
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