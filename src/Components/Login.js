import React, { Component } from 'react'
import {Card, Row, Container, Button} from 'react-bootstrap';


export default class Login extends Component{
    constructor(props){
    super(props)
      this.state = {
        email: "",
        password: ""
      };
    }

    componentDidMount(){
      this.redirectLogin()
    }

    redirectLogin = () => {
      if(localStorage.getItem("token") !== "" && localStorage.getItem("token") !== undefined && localStorage.getItem("token") !== null){
        localStorage.setItem('token', '')
        window.location.href = "/login"
      }

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

    handleSubmit = () => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user: { email: this.state.email, password: this.state.password }})
      };

      fetch(process.env.REACT_APP_API_URL + 'users/login', requestOptions)
      .then(response => response.json())
      .then(data => {
        debugger
        if(data.status == 200){
          localStorage.setItem("token", data.token)

          window.location.href = "/profile"
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
                        <Card.Title><h5 className="text-center">Login</h5></Card.Title>

                          <div className="form-label-group mt-2">
                            <label className="float-left" htmlFor="email">Email</label>
                            <input type="email" id="email" className="form-control email" onChange={this.handleEmail} placeholder="Enter Email" />
                          </div>

                          <div className="form-label-group mt-2">
                            <label className="float-left" htmlFor="inputPassword">Password</label>
                            <input type="password" id="inputPassword" className="form-control password" placeholder="Password" onChange={this.handlePassword} />
                          </div>

                          <div className="text-center mt-2">
                            <Button variant="primary" className="text-center mt-2" onClick={this.handleSubmit}>Login</Button>
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