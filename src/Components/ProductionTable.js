import React, { Component } from 'react'
import {Card, Row, Container, Button, Form, Table} from 'react-bootstrap';
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import Select from 'react-select'
import { MDBDataTable } from 'mdbreact';

export default class ProductionTable extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            products_details: {}
        }
    }

    componentDidMount(){
        this.getUserProfile()
    }

    getUserProfile = () => {
        const requestOptions = {
            method: 'get',
            headers: { 'Content-Type': 'application/json', 'token': localStorage.getItem('token') }
        };

        fetch(process.env.REACT_APP_API_URL + 'manufacturings', requestOptions).
        then(response => response.json())
        .then(data => {
            if(data.status == 200){
                this.setState({
                    products_details: data.data
                })
            }
        })
    }

    render(){
        return(
            <div>
                <Container>
                    <MDBDataTable
                        striped
                        bordered
                        small
                        data={this.state.products_details}
                    />
                </Container>
            </div>
            
        )
    }
}