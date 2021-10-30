import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import {Row, Col, FormCheck, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Products.css'
import AddToCartButton from '../AddToCartButton/AddToCartButton';


const Products = (props) => {
    
    const [SearchTerm, setSearchTerm] = useState("")
    const [checked, setChecked] = useState(false, "");

    const setSearch = (bool, make) => {
        setChecked(bool, make)
        setSearchTerm(make)
    }

    return ( 
        <div className="container mx-auto my-auto overflow-auto shadow" id='product-panel'>
            <div className='row'>
                <Col md={3} className='side-panel'>
                    <Row>
                        <p className='details-font mt-4' >Search Filter</p>
                    </Row>
                    {/* SEARCH BAR */}
                    <Row>
                        <Col>
                            <input 
                                type="text" 
                                placeholder="Search By: Make, Model, or Type" 
                                className="form-control input-sm" 
                                onChange={(event) =>{setSearchTerm(event.target.value)}}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <div align = "center">
                        <p className = "makeTitle">Filter by Make</p>
                            {console.log(props.carModels)}
                        {props.carModels.map(car => {
                            return <FormCheck 
                            onChange = {() => {setSearch(true, car)}}
                            label = {car}
                            value = {car}
                            type = "checkbox"
                            className = "filterByMake"
                            />
                        })}
                        <Button onClick = {() => {setSearch(false, "")}}>Reset</Button>
                        </div>
                    </Row>
                </Col>
                <Col>
                    {/* PRODUCT CARD */}
                    <Row xs={2} md={3} className="g-4 mt-3">
                        {props.cars.filter(value => {
                            if (SearchTerm === "") {
                                return value
                            } 
                            else if(
                                value.make.toLowerCase().includes(SearchTerm.toLocaleLowerCase())
                                || value.model.toLowerCase().includes(SearchTerm.toLocaleLowerCase())
                                || value.type.toLowerCase().includes(SearchTerm.toLocaleLowerCase())
                            )
                            {
                                return value
                            }
                            return null
                        })
                        .map((car) => (
                                <Card key={car.id.toString()}>
                                    <Link to="/car-details" onClick={() => props.getSingleCar(car)}>
                                        <Card.Img variant="top" src="staticImages\Ford_Shelby.jpg"/>
                                    </Link>
                                    <Card.Body>
                                        <Card.Title>{car.make} {car.model}</Card.Title>
                                        <Card.Text>
                                            MSRP | ${car.price}
                                        </Card.Text>
                                        <hr />
                                        <h6 className="font-weight-bold"> Description </h6>
                                        <Card.Text>
                                            {car.description}
                                        </Card.Text>
                                    </Card.Body>
                                    <AddToCartButton 
                                        addToCart={props.addToCart} 
                                        userID={ props.user ? props.user.id : null} 
                                        carID={car.id} 
                                    />  
                                </Card>
                            ))}
                    </Row>
                </Col>
            </div>
        </div>
    );
}

export default Products;