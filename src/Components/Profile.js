import React, { Component } from 'react'
import {Card, Row, Container, Button} from 'react-bootstrap';

export default class Profile extends Component{
    constructor(props){
    super(props)
      this.state = {
        mobile_number: "",
        first_name: "",
        last_name: "",
        show: true
      };
    }

    componentDidMount(){
      this.redirectLogin()
      this.getUserProfile()
    }

    redirectLogin = () => {
      if(localStorage.getItem("token") === "" || localStorage.getItem("token") === undefined || localStorage.getItem("token") === null){
        localStorage.setItem('token', '')
        window.location.href = "/login"
      }
    }

    getUserProfile = () => {
      const requestOptions = {
        method: 'get',
        headers: { 'Content-Type': 'application/json', 'token': localStorage.getItem('token') }
      };

      fetch('http://localhost:3100/' + 'users/profile', requestOptions).
      then(response => response.json())
      .then(data => {
        if(data.status == 200){
          this.updateData(data.data)
        }
      })
    }

    handleMobileNumber = (event) => {
      this.setState({
        mobile_number: event.target.value
      })
    }

    updateData = (data) => {
      this.setState({
        show: true,
        first_name: data.first_name,
        last_name: data.last_name,
        mobile_number: data.mobile_number
      })
    }

    handleLastName = (event) => {
      this.setState({
        last_name: event.target.value
      })
    }

    handleFirstName = (event) => {
      this.setState({
        first_name: event.target.value
      })
    }

    handleSubmit = () => {
      const requestOptions = {
        method: 'post',
        headers: { 'Content-Type': 'application/json', 'token': localStorage.getItem('token') },
        body: JSON.stringify({user: { first_name: this.state.first_name, last_name: this.state.last_name, mobile_number: this.state.mobile_number }})
      };

      fetch('http://localhost:3100/' + 'users/update_profile', requestOptions)
      .then(response => response.json())
      .then(data => {
        if(data.status == 200){
          debugger
          this.updateData(data.data)
        } else {
          window.alert(data.error)
        }
      })
    }

    handleEdit = () => {
      this.setState({
        show: false
      })
    }

    handleCancel = () => {
      this.setState({
        show: true
      })
    }


   render(){
        return(
          <div>
              <Container>
                <Row>
                  <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <Card className="card my-5" style={{marginTop: "10%", border: "0", borderRadius: "1rem", boxShadow: "0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1)" }}>
                      <Card.Body style={{padding: "2rem"}}>
                        <Card.Title><h5 className="text-center">User Profile</h5></Card.Title>

                          <div className="form-label-group mt-2">
                            <label className="float-left" htmlFor="first_name">First Name</label>
                            { this.state.show ?
                              (<label>{this.state.first_name}</label>) :
                              (<input type="text" id="first_name" className="form-control" onChange={this.handleFirstName} value={this.state.first_name} placeholder="Enter First Name" />)
                            }

                          </div>

                          <div className="form-label-group mt-2">
                            <label className="float-left" htmlFor="last_name">Last Name</label>
                            { this.state.show ?
                              (<label>{this.state.last_name}</label>) :
                              (<input type="text" id="last_name" className="form-control" placeholder="Last Name" value={this.state.last_name} onChange={this.handleLastName} />)
                            }

                          </div>

                          <div className="form-label-group mt-2">
                            <label className="float-left" htmlFor="mobile_number">Mobile Number</label>
                            { this.state.show ?
                              (<label>{this.state.mobile_number}</label>) :
                              (<input type="text" id="mobile_number" className="form-control" placeholder="Mobile Number" onChange={this.handleMobileNumber} value={this.state.mobile_number} />)
                            }
                          </div>

                          <div className="text-center mt-2">
                            { this.state.show ?
                              (<Button variant="primary" className="text-center mt-2" onClick={this.handleEdit}>Edit</Button>) :
                                (
                                  <>
                                  <Button variant="primary" className="text-center mt-2" onClick={this.handleSubmit}>Update</Button>
                                  <Button variant="primary" className="text-center mt-2 ml-3" onClick={this.handleCancel}>Cancel</Button>
                                  </>
                                )
                            }

                          </div>
                      </Card.Body>

                    </Card>
                  </div>
                </Row>

              </Container>
          </div>
        )
    }
}