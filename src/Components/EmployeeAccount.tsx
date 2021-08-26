import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { IEmployeeInputErrors, IEmployeeInputs } from "./Home";
import UplodFileImage from "../Images/Avatar.png"
import ArrowRight from "../Images/arrow-right.png"
import { useState, useRef } from "react"
interface IProps {
  nextStep: () => void;
  allFormInputs: IEmployeeInputs;
  formError: IEmployeeInputErrors;
  buttonClick: Boolean;
  handelFileChange: (image: any) => void;
  handleChange: (value: string, filedName: string) => void
}

export function EmployeeAccount(props: IProps) {
  const { nextStep, allFormInputs, handleChange, buttonClick, formError, handelFileChange } = props;
  const [imageState, setimageState] = useState({ image: UplodFileImage })
  const fileEl = useRef<HTMLInputElement>(null);
  const onFileUpload = () => {
    fileEl?.current?.click();
  }
  const onFileChange = (event: any) => {

    if (event.target.files && event.target.files[0]) {
      setimageState({
        image: URL.createObjectURL(event.target.files[0])
      });
      handelFileChange({
        image: URL.createObjectURL(event.target.files[0])
      })
    }

  }
  return (
    <>
      <section className="mb-3">
        <div className="account-tital">
          <h1>Creaet Your Account</h1>
        </div>
        <div className="account-text">
          <p>
            Because there will be documents that you need to prepare to apply for the loan,let's start off by
            creating a password so that you can login to your account once you have these document ready.
          </p>
        </div>
      </section>
      <section className="account-profile">
        <Row>
          <Col lg={3} sm={12}>
            <div className="avtar-image"
              onClick={onFileUpload}
            >
              <div><img src={imageState.image} alt="CompanyLogo" /></div>
              <p>Upload</p>
            </div>
            <input ref={fileEl} type="file" onChange={onFileChange} className="display-none" />
          </Col>
          <Col lg={9} sm={12}>
            <div className="form-section">
              <Row>
                <Form.Group as={Col} lg={6} md={12} className="mb-4" controlId="Name">
                  <Form.Label>NAME</Form.Label>
                  <Form.Control
                    type="text"
                    value={allFormInputs.Name}
                    onChange={(e) => handleChange(e.target.value, 'Name')}
                    autoComplete="new-password"
                  />
                  <span style={{ color: "red" }}>{formError.NameError}</span>

                </Form.Group>
                <Form.Group as={Col} lg={6} md={12} className="mb-4" controlId="Email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    value={allFormInputs.Email}
                    onChange={(e) => handleChange(e.target.value, 'Email')}
                    autoComplete="new-password"
                  />
                  {
                    <span style={{ color: "red" }}>{formError.EmailError}</span>
                  }
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} lg={6} md={12} className="mb-4" controlId="Password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={allFormInputs.Password}
                    onChange={(e) => handleChange(e.target.value, 'Password')}
                    autoComplete="new-password"
                  />
                  {
                    <span style={{ color: "red" }}>{formError.PasswordError}</span>
                  }
                </Form.Group>
                <Form.Group as={Col} lg={6} md={12} className="mb-4" controlId="ConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={allFormInputs.ConfirmPassword}
                    onChange={(e) => handleChange(e.target.value, 'ConfirmPassword')}
                    autoComplete="new-password"
                  />
                  {
                    <span style={{ color: "red" }}>{formError.ConfirmPasswordError}</span>
                  }
                </Form.Group>
              </Row>
            </div>
            <div className="trans-secoond-bottun">
              <button onClick={nextStep}>
                Save & Next
                <img src={ArrowRight} alt="next arrow" />
              </button>
            </div>
          </Col>

        </Row>
      </section>
    </>
  );
}
