import React from 'react';
import { createPortal } from 'react-dom';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { setCurrentUser } from '../../redux/user/user.actions';
import useForm from '../../hooks/useForm/useForm';
import Auth from '../../auth';

const Login = props => {
  if (Auth.isUserAuthenticated()) {
    props.history.push('/');
  }

  const login = userDataForm => {
    if (Auth.authenticateUser(userDataForm.rememberMe)) {
      props.history.push('/');
    } else {
      // FIXME: Criar tratamentos de errors
      console.error('Erro no form');
    }
  };

  const { handleChange, handleSubmit } = useForm(login);

  return createPortal(
    <div className="measure center shadow-5 bg-white br3 pa4 mv3">
      <form className="" method="POST" onSubmit={handleSubmit}>
        <fieldset id="login" className="ba b--transparent ph0 mh0">
          <legend className="f2 fw7 mid-gray ph0 mh0 tc">Login</legend>
          <div className="mt4">
            <input
              className="pv2 ph3 input-reset bw0 bg-black-05 br2 w-100 lh-copy"
              type="email"
              name="emailAddress"
              placeholder="Email"
              onChange={handleChange}
              id="email-address"
              required
            />
          </div>
          <div className="mv3">
            <input
              className="pv2 ph3 input-reset bw0 bg-black-05 br2 w-100 lh-copy"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              id="password"
              required
            />
          </div>
          <label className="pa0 ma0 lh-copy f6 pointer">
            <input type="checkbox" name="rememberMe" onChange={handleChange} />
            <span> Remember me</span>
          </label>
        </fieldset>
        <div className="">
          <input
            className="ph3 fw5 b--moon-gray br2 w-100 mid-gray pv2 input-reset ba bg-transparent hover-bg-light-gray bg-animate pointer f5 dib"
            type="submit"
            onChange={handleChange}
            value="Sign in"
          />
        </div>
        <div className="lh-copy mt4 flex">
          <div className="w-50">
            <Link to="/register" className="f6 dim mid-gray">
              Sign Up
            </Link>
          </div>
          <div className="w-50 tr">
            <Link to="/forgot-password" className="f6 dim mid-gray">
              Forgot your password?
            </Link>
          </div>
        </div>
      </form>
    </div>,
    document.body
  );
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
);
