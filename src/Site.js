import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddSiteModal} from './AddSiteModal';
import {EditSiteModal} from './EditSiteModal';
import { Pencil, PlusCircle, Trash } from 'react-bootstrap-icons';
import swal from 'sweetalert';

export class Site extends Component{

    constructor(props){
        super(props);
        this.state={sites:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'site/GetAllSites')
        .then(response=>response.json())
        .then(data=>{
            this.setState({sites:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }


    componentDidUpdate(prevProps, prevState){
        if (prevState.addModalShow != this.state.addModalShow || prevState.editModalShow != this.state.editModalShow) {
       this.refreshList();
       }
   }

    deleteSite(siteId){
        swal({
            title: "האם אתה בטוח למחוק את האתר ?",
            text: "אתה לא יכול לשחזר נתונים !",
            icon: "warning",
            buttons:true,
            buttons: ["לא", "כן"] ,
            reverseButtons: true
         }).then(
               function (isConfirm) { 
                   if(isConfirm){
                fetch(process.env.REACT_APP_API+'site/'+siteId,{
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
        const {sites, siteid,sitename,sitelocation}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>שם אתר</th>
                        <th>מיקום</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sites.map(site=>
                            <tr key={site.Id}>
                                <td>{site.SiteName}</td>
                                <td>{site.LocationName}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2 ms-1" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        siteid:site.Id,sitename:site.SiteName,sitelocation:site.LocationName})}>
            
            <Pencil />
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteSite(site.Id)}>
            
            <Trash />
        </Button>

        { <EditSiteModal show={this.state.editModalShow}
        onHide={editModalClose}
        siteid={siteid}
        sitename={sitename}
        sitelocation={sitelocation}/> }
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                        <PlusCircle className='ms-1'/>
                    אתר חדש
                    
                    </Button>

                    <AddSiteModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}