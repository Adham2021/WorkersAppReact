import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddAdvancePaymentModal } from './AddAdvancePaymentModal';
import { EditAdvancePaymentModal } from './EditAdvancePaymentModal';
import swal from 'sweetalert';
import { Pencil, PlusCircle, Trash } from 'react-bootstrap-icons';

export class AdvancePayment extends Component {

    constructor(props) {
        super(props);
        this.state = { advpayments: [], addModalShow: false, editModalShow: false }
    }

    refreshAdvsList() {
        fetch(process.env.REACT_APP_API + 'advancePayment/GetAllAdvancePayments')
            .then(response => response.json())
            .then(data => {
                this.setState({ advpayments: data });
            });
    }

    componentDidMount() {
        this.refreshAdvsList();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.addModalShow != this.state.addModalShow || prevState.editModalShow != this.state.editModalShow) {
            this.refreshAdvsList();
        }
    }

    deleteAdv(advancePaymentId) {
        swal({
            title: "האם אתה בטוח למחוק את המפרעה ?",
            text: "אתה לא יכול לשחזר נתונים !",
            icon: "warning",
            buttons: true,
            buttons: ["לא", "כן"],
            reverseButtons: true
        }).then(
            function (isConfirm) {
                if (isConfirm) {
                    fetch(process.env.REACT_APP_API + 'advancePayment/' + advancePaymentId, {
                        method: 'DELETE',
                        header: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
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
                                this.refreshAdvsList();
                            }
                            else {
                                swal({
                                    title: result.message,
                                    icon: "error",
                                    button: "אוקי !",

                                });
                            }
                        },
                            (error) => {
                                swal({
                                    title: "שגיאה במחיקה",
                                    icon: "error",
                                    button: "ok",
                                });
                            })
                }
            }

        )

    }
    render() {
        const { advpayments, advid, advname, advamount, advnotes, advworker , advdate} = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });
        return (
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>שם מפרעה</th>
                            <th>סכום</th>
                            <th>שם העובד-ת.ז</th>
                            <th>תאריך</th>
                            <th>הערות</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {advpayments.map(adv =>
                            <tr key={adv.Id}>
                                <td>{adv.Name}</td>
                                <td>{adv.Amount}</td>
                                <td>{adv.Worker.WorkerName + " - " + adv.Worker.WorkerID}</td>
                                <td>{(adv.Date).split("T")[0]}</td>
                                <td>{adv.Notes}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2 ms-1" variant="info"
                                            onClick={() => this.setState({
                                                editModalShow: true,
                                                advid: adv.Id,
                                                advname: adv.Name,
                                                advworker: adv.WorkerId,
                                                advamount: adv.Amount,
                                                advnotes: adv.Notes,
                                                advdate:(adv.Date).split("T")[0],

                                            })}>
                                            <Pencil />
                                        </Button>

                                        <Button className="mr-2" variant="danger"
                                            onClick={() => this.deleteAdv(adv.Id)}>
                                            <Trash />
                                        </Button>

                                        <EditAdvancePaymentModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            advid={advid}
                                            advname={advname}
                                            advworker={advworker}
                                            advamount={advamount}
                                            advnotes={advnotes} 
                                            advdate={advdate}/>
                                    </ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                        onClick={() => this.setState({ addModalShow: true })}>
                        <PlusCircle className='ms-1' />
                         מפרעה חדשה</Button>

                    <AddAdvancePaymentModal show={this.state.addModalShow}
                        onHide={addModalClose} />
                </ButtonToolbar>
            </div>
        )
    }
}