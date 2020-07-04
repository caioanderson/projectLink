import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn } from './signinActions';


const Signin = (props) => {
    const { account , signIn} = props;

    const submitHandler = (e) => {
        e.preventDefault();
        signIn({email: "caioanderson02@gmail.com", password : "123456"});
    };

    console.log('SIGN_IN ******', account);

    return (
        <div className="container h-100 pt-5">
            <h1>Sign in</h1>
            <div className="d-flex flex-column h-100">
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" />
                    </div>
                    <button className="btn btn-primary btn-round">Submit</button>
                </form>
                <div className="container text-center fixed-bottom pb-5">
                    <div className="text-muted">Don't have an Account ?</div>
                    <Link to="/sign-up"> Sign-Up</Link>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {account : state.signIn.account};
}

export default connect(mapStateToProps, {signIn})(Signin);