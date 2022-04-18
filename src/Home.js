import React, {Component} from "react";
import { CurrencyDollar } from "react-bootstrap-icons";

export class Home extends Component{

  constructor(props) {
    super(props);
    this.state = { earning: [] };
    this.getEarning.bind(this);
  }
  getEarning() {

    fetch(process.env.REACT_APP_API + `reports/getEarning`)

      .then(response => response.json())
      .then(data => {
        this.setState({ earning: data });
      });

  }
  componentDidMount() {
    this.getEarning();
  }
    render(){
        return(
            <><div className="row mt-5">
            <div className="col-lg-6 col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-5">
                      <p className="fs-4 mb-1"> הכנסות מתחילת החודש</p>
                    </div>
                    <div className="col-7">
                      <h1 className="fw-light  mb-0 text-success"> {this.state.earning?.totalIncoming} ₪</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-5">
                      <p className="fs-4 mb-1">הוצאות מתחילת החודש</p>
                    </div>
                    <div className="col-7">
                      <h1 className="fw-light  mb-0 text-danger"> {this.state.earning?.totalExpense} ₪</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5">
          <div className="col-lg-12 col-md-12">
          <div className="card">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-5">
                      <p className="fs-4 mb-1"> רווח נטו</p>
                    </div>
                    <div className="col-7">
                      <h1 className="fw-light  mb-0 text-success"> {this.state.earning?.totalIncoming-this.state.earning?.totalExpense} ₪</h1>
                    </div>
                  </div>
                </div>
              </div>
              </div>


            </div ></>
        )
    }
}