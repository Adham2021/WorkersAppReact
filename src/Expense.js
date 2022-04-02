import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddExpenseModal} from './AddExpenseModal';
import {EditExpenseModal} from './EditExpenseModal';
import { Pencil, PlusCircle, Trash } from 'react-bootstrap-icons';
import swal from 'sweetalert';

export class Expense extends Component{

    constructor(props){
        super(props);
        this.state={expenses:[], addModalShow:false, editModalShow:false}
        this.refreshExpensesList.bind(this);
    }

    refreshExpensesList(){
        fetch(process.env.REACT_APP_API+'expense/GetAllExpenses')
        .then(response=>response.json())
        .then(data=>{
            this.setState({expenses:data});
        });
    }

    componentDidMount(){
        this.refreshExpensesList();
    }


    componentDidUpdate(prevProps, prevState){
       // if (prevState.addModalShow != this.state.addModalShow || prevState.editModalShow != this.state.editModalShow) {
       this.refreshExpensesList();
       //}
   }

    deleteExpense(expenseId){
        swal({
            title: "האם אתה בטוח למחוק את ההוצאה ?",
            text: "אתה לא יכול לשחזר נתונים !",
            icon: "warning",
            buttons:true,
            buttons: ["לא", "כן"] ,
            reverseButtons: true
         }).then(
               function (isConfirm) { 
                   if(isConfirm){
                fetch(process.env.REACT_APP_API+'expense/'+expenseId,{
                    method:'DELETE',
                    header:{'Accept':'application/json',
                'Content-Type':'application/json'}
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

                    }
                    else { 
                        swal({
                            title: result.message,
                            icon: "error",
                            button: "אוקי !",
                            
                          });
                    }
                    },
                    (error)=>{
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
    render(){
        const {expenses, expenseid,expensename,expenseprice}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>שם הוצאה</th>
                        <th>מחיר</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map(Expense=>
                            <tr key={Expense.Id}>
                                <td>{Expense.Name}</td>
                                <td>{Expense.Price}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2 ms-1" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        expenseid:Expense.Id,expensename:Expense.Name,expenseprice:Expense.Price})}>
            
            <Pencil />
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteExpense(Expense.Id)}>
            
            <Trash />
        </Button>

        { <EditExpenseModal show={this.state.editModalShow}
        onHide={editModalClose}
        expenseid={expenseid}
        expensename={expensename}
        expenseprice={expenseprice}/> }
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                        <PlusCircle className='ms-1'/>
                  הוצאה חדשה
                    
                    </Button>

                    <AddExpenseModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}