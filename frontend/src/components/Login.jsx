import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function App() {
    const navigate = useNavigate();
    const [state, setState] = useState({
        username: "",
        password: ""
    })
    const [errors, setError] = useState({
        errors: {}
    });
    const handleSubmitClick = (e) => {
        if (handleValidation()) {
            localStorage.setItem('username', state.username);
            localStorage.setItem('password', state.password);
            navigate('/flights');
        }
    }

    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const handleValidation = () => {
        let error = {};
        let formIsValid = true;


        if (!state["username"]) {
            formIsValid = false;
            error["username"] = "Username is required!";
        }

        //email
        if (!state["password"]) {
            formIsValid = false;
            error["password"] = "Password isrequired!";
        }
        setError({ errors: error });
        return formIsValid;
    }
    return (

        <div className="App">
            <div className="container">
                <div className="row">
                    <div className="col-md-5 mx-auto">
                        <div id="first">
                            <div className="myform form ">
                                <div className="logo mb-3">
                                    <div className="col-md-12 text-center">
                                        <h1>Login</h1>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Username</label>
                                    <input type="text" name="username" className="form-control" id="username" aria-describedby="usernameHelp" value={state.email}
                                        onChange={handleChange} placeholder="Enter username" />
                                    <span className="error">{errors.errors["username"]}</span>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Password</label>
                                    <input type="password" name="password" id="password" className="form-control" aria-describedby="emailHelp" value={state.password}
                                        onChange={handleChange} placeholder="Enter Password" />
                                    <span className="error">{errors.errors["password"]}</span>
                                </div>
                                <div className="col-md-12 text-center ">
                                    <button type="submit" className=" btn btn-block mybtn btn-primary tx-tfm" onClick={handleSubmitClick} >Login</button>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div >
    );
}

export default App;
