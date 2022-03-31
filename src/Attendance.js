import React, { useState, Component } from "react";
import ReactDOM from "react-dom";
import DatePicker from 'react-date-picker';
import './Attendance.css';

export class Attendance extends Component {

  constructor(props) {
    super(props);
    this.state = { workDays: [] };

  }
  // State with list of all checked item
  getworkDays() {
    var data = { dayDate: new Date() };
    if (document.getElementById("TodayDate")) {
      data.dayDate = document.getElementById("TodayDate").value;
    }
    fetch(process.env.REACT_APP_API + `worker/GetAllWorkersByAttendance?dayDate=` + data.dayDate.toString())

      .then(response => response.json())
      .then(data => {
        this.setState({ workDays: data });
      });

  }
  componentDidMount() {
    this.getworkDays();
  }
  componentDidUpdate(){
    console.log("teze")
  }

  render() {

    const date = new Date();
    const futureDate = date.getDate();
    date.setDate(futureDate);
    const defaultValueDate = date.toLocaleDateString('en-CA');
    const defaultWorkDayHours = date.getDay() == 5 ? 8 : 9.5;
    // Add/Remove checked item from list


    const handleAttendance = (item, Ischecked) => {
      const Todaydate = document.getElementById("TodayDate").value;
      fetch(process.env.REACT_APP_API + 'workDay/UpdateWorkDay', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Id: item.Id,
          DayDate: Todaydate,
          IsAttendance: Ischecked,
          NumberOfHours: 9.5,
          WorkerId: item.WorkerId,
          NumberOfHours: item.NumberOfHours,
          HourPercent: item.HourPercent
        })
      })
        .then(res => res.json())
        .then((result) => {

        },
          (error) => {

          })


    };
    const handleWorkHours = (id, hours) => {
      var workday=this.state.workDays.find(e => e.Id == id);
      this.state.workDays[this.state.workDays.indexOf(workday)].NumberOfHours=Number(hours);
     this.forceUpdate();
     handleAttendance(workday,workday.IsAttendance);

    }
    const handleWorkHourPercent = (id, percent) => {
      var workday=this.state.workDays.find(e => e.Id == id);
    this.state.workDays[this.state.workDays.indexOf(workday)].HourPercent=Number(percent);
     this.forceUpdate()
     handleAttendance(workday,workday.IsAttendance);

    }
    const handleChangeDate = () => {
      this.getworkDays();
    }
    const getDayName = (day) => {
      var dayName = "";
      switch (day) {

        case 0:
          dayName = "יום ראשון";
          break;
        case 1:
          dayName = "יום שני";
          break;
        case 2:
          dayName = "יום שלישי";
          break;
        case 3:
          dayName = "יום רביעי";
          break;
        case 4:
          dayName = "יום חמישי";
          break;
        case 5:
          dayName = "יום שישי";
          break;
        case 6:
          dayName = "יום שבת";
          break;
      }
      return dayName;
    }
    return (
      <div className="workersList">
        <span >בחר תאריך : </span>
        <input className="mt-3" type="date" defaultValue={defaultValueDate} id="TodayDate" onChange={handleChangeDate} />
        <div className="checkList">
          <div className="title m-2">נוכחות העובדים {getDayName(date.getDay()) + " , " + defaultValueDate}</div>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">נוכח ?</th>
                      <th scope="col">שם עובד</th>
                      <th scope="col">שעות עבודה</th>
                      <th scope="col">אחוז שעה %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.workDays.map((item) => (
                      <tr key={item.Id}>
                        <td>
                          <input id="workerCheck" value={item.Id} type="checkbox" className="form-check-input" onChange={(e) => handleAttendance(item, e.target.checked)} defaultChecked={item.IsAttendance} />
                        </td>
                        <td>
                          <h6 htmlFor="workerCheck">{item.Worker.WorkerName}</h6>
                        </td>
                        <td>
                          <input id={'workDayHourNum' + '_' + item.Id} defaultValue={item.NumberOfHours} type="number" className="form-control" onChange={(e) => handleWorkHours(item.Id, e.target.value)} />
                        </td>
                        <td>
                          <select  defaultValue={item.HourPercent} id={'workDayHourPercent' + '_' + item.Id} className="form-select" onChange={(e) => handleWorkHourPercent(item.Id, e.target.value)} >
                            <option value="100">100</option>
                            <option value="125">125</option>
                            <option value="140">140</option>
                            <option value="200">200</option>
                            <option value="300">300</option>
                          </select>

                        </td>
                      </tr>

                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>



        </div>


      </div>


    );


  }
}
