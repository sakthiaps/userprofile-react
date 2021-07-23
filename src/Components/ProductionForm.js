import React, { Component } from 'react'
import {Card, Row, Container, Button, Form} from 'react-bootstrap';
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import Select from 'react-select'


export default class Profile extends Component{
  constructor(props){
    super(props)
    this.state = {
      start_date: new Date(),
      shift: "",
      user: "",
      production_count: 0,
      defect_count: 0
    }
  }

    componentDidMount(){
      this.redirectLogin()
    //   this.getUserProfile()
    }

    redirectLogin = () => {
      if(localStorage.getItem("token") === "" || localStorage.getItem("token") === undefined || localStorage.getItem("token") === null){
        localStorage.setItem('token', '')
        window.location.href = "/login"
      }
    }

    handleUser = (event) => {
      this.setState({
        user: event.value
      })
    }

    handleShift = (event) => {
      this.setState({
        shift: event.value
      })
    }

    handleDate = (event) => {
      this.setState({
          start_date: event.target.value
      })
    }

    handleProductionCount = (event) => {
      this.setState({
          production_count: event.target.value
      })
    }

    handleDefectCount = (event) => {
      this.setState({
          defect_count: event.target.value
      })
    }

    handleSubmit = () => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'token': localStorage.getItem('token') },
        body: JSON.stringify({entry: {
          shift: this.state.shift,
          user_name: this.state.user,
          start_date: this.state.start_date,
          production_count: this.state.production_count,
          defect_count: this.state.defect_count
        }})
      };

      fetch(process.env.REACT_APP_API_URL + 'manufacturings', requestOptions)
      .then(response => response.json())
      .then(data => {
        if(data.status == 200){
          window.alert(data.message)
          window.location.href = '/productions'
          
        } else if(data.status == 401) {
          window.alert('Sorry, You dont have access. Please login again')
        } else {
          window.alert(data.error)
        }
      })
    }

    handleCancel = () => {
      this.setState({
        shift: '',
        user: '',
        start_date: new Date(),
        production_count: 0,
        defect_count: 0
      })
    }


   render(){
        return(
          <div>
              <Container>
                <Row>
                  <div className="col-sm-9 col-md-5 mx-auto">
                    <Card className="card my-5" style={{marginTop: "10%", border: "0", borderRadius: "1rem", boxShadow: "0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1)" }}>
                        <Card.Body style={{padding: "2rem"}}>
                            <Card.Title><h5 className="text-center">Production Entry</h5></Card.Title>
                            <Form>
                                <div className="form-row">
                                    <div className="col-12 text-left">
                                        <label className='font-weight-class'>Shift</label>
                                    </div>

                                    <div className="col-12 text-left">
                                        <Select 
                                            options={[
                                                    {value: "Shift 1", label: 'Shift 1'}, 
                                                    {value: "Shift 2", label: 'Shift 2'},
                                                    {value: "Shift 3", label: 'Shift 3'},
                                                ]}
                                              onChange={(event) => {this.handleShift(event)}} 
                                        />
                                    </div>
                                </div>

                                <div className="form-row mt-2">
                                    <div className="col-12 text-left">
                                        <label className='font-weight-class'>User</label>
                                    </div>

                                    <div className="col-12 text-left">
                                        <Select 
                                            options={[
                                              {value: "Siva", label: 'Siva'}, 
                                              {value: "Tamil", label: 'Tamil'},
                                            ]}

                                            onChange={(event) => {this.handleUser(event)}} 
                                        />
                                    </div>
                                </div>

                                <div className="form-row mt-2">
                                    <label className='font-weight-class'>Date</label>
                                    <input type="date" className="form-control" onChange={(event) => {this.handleDate(event)}} selected={moment().toDate()}></input>
                                </div>

                                <div className="form-row mt-2">
                                    <label className='font-weight-class'>Production Count</label>
                                    <input type="text" onChange={(event) => {this.handleProductionCount(event)}} className="form-control"></input>
                                </div>

                                <div className="form-row mt-2">
                                    <label className='font-weight-class'>Defect Count</label>
                                    <input type="text" onChange={(event) => {this.handleDefectCount(event)}} className="form-control"></input>
                                </div>
                            </Form>
                        </Card.Body>

                        <div className="col-12" style={{marginBottom: "10px"}}>
                            <Button variant="primary" className="text-center mt-2" onClick={this.handleSubmit}>Submit</Button>
                            <Button variant="primary" className="text-center mt-2 ml-3" onClick={this.handleCancel}>Cancel</Button>                     
                        </div>

                    </Card>
                  </div>
                </Row>

              </Container>
          </div>
        )
    }
}