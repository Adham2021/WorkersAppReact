import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddEmpModal } from './AddEmpModal';
import { EditEmpModal } from './EditEmpModal';
import swal from 'sweetalert';
import { Pencil, PlusCircle, Trash } from 'react-bootstrap-icons';

export class Employee extends Component {

    constructor(props) {
        super(props);
        this.state = { emps: [], addModalShow: false, editModalShow: false }
    }

    refreshList() {
        fetch(process.env.REACT_APP_API + 'worker/GetAllWorkers')
            .then(response => response.json())
            .then(data => {
                this.setState({ emps: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.addModalShow != this.state.addModalShow || prevState.editModalShow != this.state.editModalShow) {
            this.refreshList();
        }
    }

    deleteEmp(workerId) {
        swal({
            title: "האם אתה בטוח למחוק את העובד ?",
            text: "אתה לא יכול לשחזר נתונים !",
            icon: "warning",
            buttons: true,
            buttons: ["לא", "כן"],
            reverseButtons: true
        }).then(
            function (isConfirm) {
                if (isConfirm) {
                    fetch(process.env.REACT_APP_API + 'worker/' + workerId, {
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
                                this.refreshList();
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
        const { emps, empid, empname, site, doj, phone, amount,fullamount,workerid } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });
        return (
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>שם עובד</th>
                            <th>אתר</th>
                            <th>טלפון</th>
                            <th>ת.ז</th>
                            <th>מחיר שעה מלא</th>
                            <th>מחיר שעה</th>
                            <th>תאריך הצטרפות</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {emps.map(emp =>
                            <tr key={emp.Id}>
                                <td>{emp.WorkerName}</td>
                                <td>{emp.Site.SiteName}</td>
                                <td>{emp.Phone}</td>
                                <td>{emp.WorkerID}</td>
                                <td>{emp.FullAmount}</td>
                                <td>{emp.Amount}</td>
                                <td>{(emp.DateOfJoining).split("T")[0]}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2 ms-1" variant="info"
                                            onClick={() => this.setState({
                                                editModalShow: true,
                                                empid: emp.Id,
                                                empname: emp.WorkerName,
                                                site: emp.SiteId,
                                                doj: (emp.DateOfJoining).split("T")[0],
                                                phone: emp.Phone,
                                                amount: emp.Amount,
                                                fullamount: emp.FullAmount,
                                                workerid: emp.WorkerID,
                                            })}>
                                           <Pencil />
                                        </Button>

                                        <Button className="mr-2" variant="danger"
                                            onClick={() => this.deleteEmp(emp.Id)}>
                                            <Trash />
                                        </Button>

                                        <EditEmpModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            empid={empid}
                                            empname={empname}
                                            site={site}
                                            doj={doj}
                                            phone={phone}
                                            amount={amount}
                                            fullamount={fullamount}
                                            workerid={workerid}
                                        />
                                    </ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                        onClick={() => this.setState({ addModalShow: true })}>
                            <PlusCircle className='ms-1'/>
                        עובד חדש</Button>

                    <AddEmpModal show={this.state.addModalShow}
                        onHide={addModalClose} />
                </ButtonToolbar>
            </div>
        )
    }
}