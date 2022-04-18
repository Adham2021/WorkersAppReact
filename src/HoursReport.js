import { Modal, Button, Row, Col, Form, Image } from 'react-bootstrap';
import React, { useState,useRef, Component } from "react";
import { Search } from "react-bootstrap-icons";
// import { DownloadTableExcel } from 'react-export-table-to-excel';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

export class HoursReport extends Component {

    constructor(props) {
        super(props);
        this.state = { workDays: [], workers: [], dates: [], hours: [], totalHours: [], allTotalHours: 0 };
        this.handleSubmit = this.handleSubmit.bind(this);


    }

    handleSubmit(event) {
        event.preventDefault();
        var date = event.target.WorkDayMonth.value + "/" + event.target.WorkDayYear.value;
        
        fetch(process.env.REACT_APP_API + `workDay/GetAttendanceByMonth?date=` + date)

            .then(response => response.json())
            .then(data => {
                this.setState({
                    workDays: data,
                    workers: data?.workers,
                    dates: data?.dates,
                    hours: data?.hours,
                    totalHours: data?.totalHours,
                    allTotalHours: data?.allTotalHours
                });
            });
    }

    render() {
        const months = [];
        months.push({ number: 1, name: "01" }, { number: 2, name: "02" }, { number: 3, name: "03" }, { number: 4, name: "04" }, { number: 5, name: "05" }, { number: 6, name: "06" }
            , { number: 7, name: "07" }, { number: 8, name: "08" }, { number: 9, name: "09" }, { number: 10, name: "10" }, { number: 11, name: "11" }, { number: 12, name: "12" });
        const years = [];
        var currentYear = new Date().getFullYear();
        years.push({ number: currentYear - 1, name: currentYear - 1 }, { number: currentYear, name: currentYear }, { number: currentYear + 1, name: currentYear + 1 }
            , { number: currentYear + 2, name: currentYear + 2 }, { number: currentYear + 3, name: currentYear + 3 })

        const hours = [];
        for (const indx of this.state?.hours) {
            hours.push(<td >{indx}</td>)
        }
        const totalHours = [];
        for (const ho of this.state?.totalHours) {
            totalHours.push(<td ><strong>{ho}</strong></td>)
        }
        return (


            <><Form onSubmit={this.handleSubmit} className=" row col-sm-12 mt-3">
                <Form.Group controlId="WorkDayMonth" className="col-sm-4">
                    <Form.Label>חודש</Form.Label>
                    <Form.Control as="select">
                        {months.map(mon => <option key={mon.number} value={mon.name}>{mon.name}</option>)}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="WorkDayYear" className="col-sm-4">
                    <Form.Label>שנה</Form.Label>
                    <Form.Control as="select">
                        {years.map(year => <option key={year.number} value={year.name}>{year.name}</option>)}
                    </Form.Control>
                </Form.Group>
                <Form.Group className="col-sm-4 mt-4">
                    <Button variant="primary" type="submit">
                        <Search className='ms-1' />
                        חפש
                    </Button>
                </Form.Group>

            </Form>
            <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="table-to-xls"
                    filename="דוח שעות "
                    sheet="tablexls"
                    buttonText="הורדת קובץ EXCEL"/>
                <div className="col-12 mt-5">
                    <table  id="table-to-xls" className="table table-striped ">
                        <thead className="bg-light">
                            <tr>
                                <th scope="col">#</th>
                                {this.state?.workers.map((item) => (
                                    <th scope="col">{item}</th>
                                ))}
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state?.dates.map((item) => (
                                <tr>

                                    <td >{item.split("T")[0]}</td>

                                    {this.state?.workers.map((item) => (
                                        hours.shift()
                                    ))}
<td></td>
                                </tr>
                            ))}
                            <tr className="bg-light ">
                                <td ><strong>סה"כ שעות</strong></td>
                                {this.state?.workers.map((item) => (
                                    totalHours.shift()
                                ))}
<td></td>
                            </tr>


                        </tbody>
                        <tfoot>
                            <tr>

                                <td ></td>
                                {this.state?.workers.map((item) => (
                                    <td></td>
                                ))}
                                <td><strong>כל שעות העובדים : {this.state?.allTotalHours}</strong></td>
                          
                            </tr>
                        </tfoot>

                    </table>
                </div></>





        );


    }
}
