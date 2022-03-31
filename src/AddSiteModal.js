import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { PlusCircle } from 'react-bootstrap-icons';
import swal from 'sweetalert';

export class AddSiteModal extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'site/AddSite', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Id: 0,
                SiteName: event.target.SiteName.value,
                LocationName: event.target.LocationName.value

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
                            הוספת אתר חדש
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="SiteName">
                                        <Form.Label>שם אתר</Form.Label>
                                        <Form.Control type="text" name="SiteName" required
                                            placeholder="שם אתר" />
                                    </Form.Group>

                                    <Form.Group controlId="LocationName">
                                        <Form.Label>מיקום</Form.Label>
                                        <Form.Control type="text" name="LocationName" required
                                            placeholder="מיקום" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            <PlusCircle className='ms-1' />
                                            הוסף אתר
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