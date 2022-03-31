import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { Save } from 'react-bootstrap-icons';
import swal from 'sweetalert';

export class EditSiteModal extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'site/UpdateSite', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Id: event.target.SiteId.value,
                SiteName: event.target.SiteName.value,
                LocationName: event.target.LocationName.value,

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
                    centered>

                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            עדכון אתר
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="SiteId">

                                    </Form.Group>

                                    <Form.Group controlId="SiteName">
                                        <Form.Label>שם אתר</Form.Label>
                                        <Form.Control type="text" name="SiteName" required
                                            defaultValue={this.props.sitename}
                                            placeholder="שם אתר" />
                                    </Form.Group>
                                    <Form.Group controlId="LocationName">
                                        <Form.Label>מיקום</Form.Label>
                                        <Form.Control type="text" name="LocationName" required
                                            defaultValue={this.props.sitelocation}
                                            placeholder="מיקום" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            <Save className='ms-1' />
                                            עדכן אתר
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