import React from 'react';
import { Link } from 'react-router-dom';

function Login() {

    function handleLogin(event) {
        event.preventDefault();
        const username = event.target.username;
        username.value = "That won't work.";
    }

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <button onClick={handleLogin} type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/Register">Register here</Link></p>
        </div>
    );

}

export default Login