import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Modal from "react-bootstrap/Modal";
import { Link } from 'react-router-dom'
function Flights() {

    const [data, setData] = useState([]);
    const [showPop, setShowPop] = useState(false);
    const [errors, setError] = useState({
        errors: {}
    });
    const [state, setState] = useState({
        to: "",
        from: "",
        departuretime: "",
        landingtime: "",
        price: ""
    })

    useEffect(() => {
        getFlights()
        return () => {
            setData([])
        }
    }, []);

    function getFlights() {
        let flights = localStorage.getItem("flights");
        let flightsData = JSON.parse(flights)
        setData(flightsData ? flightsData : [])
    }
    const columns = [

        {
            name: 'From',
            selector: row => row.from,
            sortable: true,
        },
        {
            name: 'To',
            selector: row => row.to,
            sortable: true
        },
        {
            name: 'DepartureTime',
            selector: row => row.departuretime,
        },
        {
            name: 'LandingTime',
            selector: row => row.landingtime,
        },
        {
            name: 'Price',
            selector: row => row.price,
        }
    ];

    const handleValidation = () => {
        let error = {};
        let formIsValid = true;


        if (!state["from"]) {
            formIsValid = false;
            error["from"] = "From is required!";
        }

        //email
        if (!state["to"]) {
            formIsValid = false;
            error["to"] = "To is required!";
        }
        if (!state["departuretime"]) {
            formIsValid = false;
            error["departuretime"] = "Departure Time is required!";
        }
        if (!state["landingtime"]) {
            formIsValid = false;
            error["landingtime"] = "Landing Time is required!";
        }
        if (!state["price"]) {
            formIsValid = false;
            error["price"] = "Price is required!";
        }

        setError({ errors: error });
        return formIsValid;
    }
    const show = () => {
        setShowPop(!showPop)
    }

    const handleSubmitClick = (e) => {
        if (handleValidation()) {
            let obj = {
                from: state.from,
                to: state.to,
                departuretime: state.departuretime,
                landingtime: state.landingtime,
                price: state.price
            }
            data.push(obj);
            localStorage.setItem("flights", JSON.stringify(data));
            getFlights()
            setShowPop(!showPop)
        }
    }

    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }
    return (
        <div className="appdata container">
            <button className="btn btn-primary btn-xs pull-right" onClick={show}>Add Flight</button>
            <div className="row col-md-12 col-md-offset-2 custyle">                
                <div className='text-center mb-5'><h3>Flights</h3></div>
                <DataTable
                    columns={columns}
                    data={data}
                    pagination={true}

                />
            </div>
            <Modal show={showPop}>
                <Modal.Body className="CLE_pf_details">
                    <Modal.Header><h1>Add Flight</h1>
                        <Link to="#" className="cross_icn" onClick={show}> <i className="fa fa-times"></i></Link>
                    </Modal.Header>

                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">From</label>
                        <input type="text" onChange={handleChange} className="form-control" id="from" placeholder="Delhi" />
                        <span className="error">{errors.errors["from"]}</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">To</label>
                        <input type="text" onChange={handleChange} className="form-control" id="to" placeholder="Delhi" />
                        <span className="error">{errors.errors["to"]}</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Departure Time</label>
                        <input type="text" onChange={handleChange} className="form-control" id="departuretime" placeholder="10:00" />
                        <span className="error">{errors.errors["departuretime"]}</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Landing Time</label>
                        <input type="text" onChange={handleChange} className="form-control" id="landingtime" placeholder="14:00" />
                        <span className="error">{errors.errors["landingtime"]}</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Price</label>
                        <input type="number" onChange={handleChange} className="form-control" id="price" placeholder="10000" />
                        <span className="error">{errors.errors["price"]}</span>
                    </div>
                    <div className="col-md-12 text-center ">
                        <button type="submit" className=" btn btn-block mybtn btn-primary tx-tfm" onClick={handleSubmitClick} >Save</button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Flights;