import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth";
// import { toast } from "react-toastify";

// react-bootstrap
import { Card, Row, Col, Button, Form, InputGroup } from 'react-bootstrap';

// third party
import FeatherIcon from 'feather-icons-react';

// assets
import logoDark from 'assets/images/logo-dark.svg';

// -----------------------|| SIGNIN 1 ||-----------------------//

export default function SignIn1() {
    const { userLogin, loading, error, msg } = useAuth();
    const navigate = useNavigate();
    
    const HandleSubmit = async (e) => {
      e.preventDefault();
  
      const email = e.target.exampleInputEmail.value;
      const password = e.target.exampleInputPassword.value;
  
      if (email === '' || password === '') {
        alert("Enter login details");
        return;
      }
  
      const success = await userLogin(email, password);
  
      if (success) {
        navigate("/user", { replace: true });
      }
    };
  
    if(error){
      toast.error(error);
    }
    if(msg){
      toast.success(msg);
    }


  return (
    <div className="auth-wrapper">
      <div className="auth-content text-center">
        <Card className="borderless">
          <Row className="align-items-center text-center">
            <Col>
              <Card.Body className="card-body">
                <img src={logoDark} alt="" className="img-fluid mb-4" />
                <h4 className="mb-3 f-w-400">Signin</h4>
                <Form onSubmit={HandleSubmit}>
                <InputGroup className="mb-3">
                  <InputGroup.Text>
                    <FeatherIcon icon="mail" />
                  </InputGroup.Text>
                  <Form.Control type="email" id="exampleInputEmail" placeholder="Email address" />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text>
                    <FeatherIcon icon="lock" />
                  </InputGroup.Text>
                  <Form.Control type="password" id="exampleInputPassword"  placeholder="Password" />
                </InputGroup>
                <Form.Group>
                  <Form.Check type="checkbox" className="text-left mb-4 mt-2" label="Save Credentials." defaultChecked />
                </Form.Group>
                  <Button type='submit' className="btn btn-sm btn-primary mb-4">Signin</Button>
                </Form>
                <p className="mb-2 text-muted">
                  Forgot password?{' '}
                  <NavLink to="#" className="f-w-400">
                    Reset
                  </NavLink>
                </p>
                <p className="mb-0 text-muted">
                  Don’t have an account?{' '}
                  <NavLink to="/register" className="f-w-400">
                    Signup
                  </NavLink>
                </p>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
}
