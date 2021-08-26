import { Form, Row, Col } from "react-bootstrap";
import { IEmployeeInputErrors, IEmployeeInputs } from "./Home";
import ArrowRight from "../Images/arrow-right.png"


interface IProps {
  nextStep: () => void;
  priviousStep: () => void;
  allFormInputs: IEmployeeInputs;
  formError: IEmployeeInputErrors;
  handleChange: (value: string, filedName: string) => void
}

export function EmployeeDocument(props: IProps) {
  const { nextStep, allFormInputs, handleChange, priviousStep, formError } = props;

  return (
    <>
      <section className="mb-3">
        <div className="account-tital">
          <h1>Upload Document</h1>
        </div>
        <div className="account-text">
          <p>Because there will be documents that you need to prepare to apply for the loan,let's start off by creating a password so that you can login to your account once you have these document ready.
          </p>
        </div>
      </section>
      <section className="account-profile">
        <div className="form-section">
          <Row className="mb-3">
            <Form.Group as={Col} controlId="DocumentUrl">
              <Form.Label>Enter Document URL</Form.Label>
              <Form.Control
                type="text"
                value={allFormInputs.DocumentUrl}
                onChange={(e) => handleChange(e.target.value, 'DocumentUrl')}
                autoComplete="new-password"
              />
              <span style={{ color: "red" }}>{formError.DocumentUrlError}</span>
            </Form.Group>
          </Row>
        </div>
        <div className="next-btn">
          <button onClick={priviousStep}>
            Privious
          </button>
          <button onClick={nextStep}>
            Save & Next
            <img src={ArrowRight} alt="next arrow" />
          </button>
        </div>
      </section>
    </>
  );
}
