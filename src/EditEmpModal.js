import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';
import { Save } from 'react-bootstrap-icons';
import swal from 'sweetalert';


export class EditEmpModal extends Component{
    constructor(props){
        super(props);
        this.state={sites:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    componentDidMount(){
        fetch(process.env.REACT_APP_API+'site/GetAllSites')
        .then(response=>response.json())
        .then(data=>{
            this.setState({sites:data});
        });
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'worker/UpdateWorker',{
            method:'POST',
        
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Id:this.props.empid,
                WorkerName:event.target.WorkerName.value,
                SiteId:event.target.SiteId.value,
                DateOfJoining:event.target.DateOfJoining.value,
                Phone:event.target.Phone.value,
                Amount:event.target.Amount.value,
                WorkerID:event.target.WorkerID.value,
                FullAmount:event.target.FullAmount.value,

            })
        })
        .then(res=>res.json())
        .then((result)=>{    
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
        (error)=>{
            swal({
                title: "שגיאה בעדכון",
                icon: "error",
                button: "אישור",
              });
        })
    }


    render(){
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
            עדכון פרטי עובד
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>

                    <Form.Group controlId="WorkerName">
                        <Form.Label>שם עובד</Form.Label>
                        <Form.Control type="text" name="WorkerName" required 
                        defaultValue={this.props.empname}
                        placeholder="שם עובד"/>
                    </Form.Group>

                    <Form.Group controlId="SiteId">
                        <Form.Label>אתר</Form.Label>
                        <Form.Control as="select" defaultValue={this.props.site}>
                        {this.state.sites.map(site=>
                             <option key={site.Id} value={site.Id}>{site.SiteName}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="Phone">
                        <Form.Label>טלפון</Form.Label>
                        <Form.Control 
                        type="text"
                        name="Phone"
                        placeholder="טלפון"
                        defaultValue={this.props.phone}
                        />
                    </Form.Group>
                    <Form.Group controlId="WorkerID">
                        <Form.Label>ת.ז</Form.Label>
                        <Form.Control 
                        type="text"
                        name="WorkerID"
                        placeholder="תעודת זהות"
                        defaultValue={this.props.workerid}
                        />
                    </Form.Group>
                    <Form.Group controlId="FullAmount">
                        <Form.Label>מחיר שעה מלא </Form.Label>
                        <Form.Control 
                        type="number"
                        name="FullAmount"
                        placeholder="מחיר שעה מלא"
                        defaultValue={this.props.fullamount}
                        />
                    </Form.Group>
                    <Form.Group controlId="Amount">
                        <Form.Label>מחיר שעה</Form.Label>
                        <Form.Control 
                        type="number"
                        name="Amount"
                        placeholder="מחיר שעה"
                        defaultValue={this.props.amount}
                        />
                    </Form.Group>

                    <Form.Group controlId="DateOfJoining">
                        <Form.Label>תאריך הצטרפות</Form.Label>
                        <Form.Control 
                        type="date"
                        name="DateOfJoining"
                        required
                        placeholder="תאריך הצטרפות"
                        defaultValue={this.props.doj}
                        />
                    </Form.Group>
                    <Form.Group>
                    <Button variant="primary" type="submit">
                            <Save className='ms-1'/>
                            עדכן עובד
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