import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { Save } from 'react-bootstrap-icons';
import swal from 'sweetalert';

export class EditExpenseModal extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'expense/UpdateExpense', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Id: this.props.expenseid,
                Name: event.target.ExpenseName.value,
                Price: event.target.ExpensePrice.value,

            })
        })
            .then(res => res.json())
            .then((result) => {
                if(result.success){
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
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            עדכון הוצאה
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="ExpenseName">
                                        <Form.Label>שם</Form.Label>
                                        <Form.Control type="text" name="ExpenseName" required
                                            defaultValue={this.props.expensename}
                                            placeholder="Expense Name" />
                                    </Form.Group>
                                    <Form.Group controlId="ExpensePrice">
                                        <Form.Label>מחיר</Form.Label>
                                        <Form.Control type="text" name="ExpensePrice" required
                                            defaultValue={this.props.expenseprice}
                                            placeholder="Expense Price" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            <Save className='ms-1' />
                                            עדכן הוצאה
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