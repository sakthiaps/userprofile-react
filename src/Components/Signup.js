import React, { Component } from 'react'
import {Card, Row, Container, Button} from 'react-bootstrap';


export default class Signup extends Component{
    constructor(props){
    super(props)
      this.state = {
        email: "",
        password: "",
        password_confirmation: ""
      };
    }


    handleEmail = (event) => {
      this.setState({
        email: event.target.value
      })
    }

    handlePassword = (event) => {
      this.setState({
        password: event.target.value
      })
    }

    handlePasswordConfirmation = (event) => {
      this.setState({
        password_confirmation: event.target.value
      })
    }

    handleSubmit = () => {

      if(this.state.password_confirmation !== this.state.password){
        window.alert("Password & Password confirmation should be same")
        return
      }
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user: { email: this.state.email, password: this.state.password, password_confirmation: this.state.password_confirmation }})
      };

      fetch(process.env.REACT_APP_API_URL + 'users/signup', requestOptions)
      .then(response => response.json())
      .then(data => {
        if(data.status == 200){
          window.location.href = "/login"
        } else {
          window.alert(data.error)
        }
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
                        <Card.Title><h5 className="text-center">Sign Up</h5></Card.Title>

                          <div className="form-label-group">
                            <label htmlFor="email" className="float-left">Email</label>
                            <input type="email" id="email" className="form-control email" onChange={this.handleEmail} placeholder="Enter Email" />
                          </div>

                          <div className="form-label-group mt-2">
                            <label className="float-left" htmlFor="inputPassword">Password</label>
                            <input type="password" id="inputPassword" className="form-control password" placeholder="Password" onChange={this.handlePassword} />
                          </div>

                          <div className="form-label-group mt-2">
                            <label className="float-left" htmlFor="inputPasswordConfirmation">Password Confirmation</label>
                            <input type="password" id="inputPasswordConfirmation" className="form-control password" placeholder="Password Confirmation" onChange={this.handlePasswordConfirmation} />
                          </div>

                          <div className="text-center mt-2">
                            <Button variant="primary" className="text-center" onClick={this.handleSubmit}>Sign Up</Button>
                          </div>
                      </Card.Body>

                    </Card>
                  </div>
                </Row>

              </Container>
            {/* </div> */}
          </div>
        )
    }
}