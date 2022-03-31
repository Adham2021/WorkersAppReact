import React, {Component} from "react";
import { CurrencyDollar } from "react-bootstrap-icons";

export class Home extends Component{
    render(){
        return(
            <div className="row mt-5">
            <div className="col-lg-4 col-md-4">
              <div className="card">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-5">
                      <p className="fs-4 mb-1">הכנסות</p>
                    </div>
                    <div className="col-7">
                      <h1 className="fw-light  mb-0 text-success">₪ 0.00 </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
              <div className="card">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-5">
                      <p className="fs-4 mb-1">הוצאות</p>
                    </div>
                    <div className="col-7">
                    <h1 className="fw-light  mb-0 text-danger">₪ 0.00 </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
}