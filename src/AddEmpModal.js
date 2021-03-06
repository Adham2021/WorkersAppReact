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
                        title: "?????????? ????????????",
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
                            ???????? ??????
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="WorkerName">
                                        <Form.Label>???? ????????</Form.Label>
                                        <Form.Control type="text" name="WorkerName" required
                                            placeholder="???? ????????" />
                                    </Form.Group>

                                    <Form.Group controlId="SiteId">
                                        <Form.Label>??????</Form.Label>
                                        <Form.Control as="select">
                                            {this.state.sites.map(dep =>
                                                <option key={dep.Id} value={dep.Id}>{dep.SiteName}</option>)}
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="Phone">
                                        <Form.Label>??????????</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="Phone"
                                            placeholder="??????????"
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="WorkerID">
                                        <Form.Label>??.??</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="WorkerID"
                                            placeholder="?????????? ????????"
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="FullAmount">
                                        <Form.Label>???????? ?????? ?????? </Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="FullAmount"
                                            placeholder="???????? ?????? ??????"
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="Amount">
                                        <Form.Label>???????? ??????</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="Amount" 
                                            placeholder="???????? ??????"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="DateOfJoining">
                                        <Form.Label>?????????? ??????????????</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="DateOfJoining"
                                            required
                                            placeholder="?????????? ??????????????"
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            <PlusCircle className='ms-1' />
                                            ???????? ????????
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>

                        </Row>
                    </Modal.Body>

                    <Modal.Footer>

                        <Button variant="danger" onClick={this.props.onHide}>????????</Button>
                    </Modal.Footer>

                </Modal>

            </div>
        )
    }

}