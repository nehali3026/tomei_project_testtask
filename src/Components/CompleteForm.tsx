import { ListGroup, Card, ListGroupItem } from "react-bootstrap";
import { IEmployeeInputs } from "./Home";
import UplodFileImage from "../Images/Avatar.png"


interface IProps {
  priviousStep: () => void;
  resetStepAaction: () => void;
  allFormInputs: IEmployeeInputs;
}

export function CompleteForm(props: IProps) {
  const { allFormInputs, priviousStep, resetStepAaction } = props;
  const onFormConfirm = () => {
    //Submit data into backend
    alert("Data Submited Successfully.");
    resetStepAaction()
  }
  return (
    <>
      <Card style={{ width: '18rem' }}>
        <img src={allFormInputs.ProfileImage != "" ? allFormInputs.ProfileImage : UplodFileImage} className="img-fluid" />
        <Card.Body className="text-center">
          <Card.Title><b>{allFormInputs.Name}</b></Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>{allFormInputs.Email}</ListGroupItem>
          <ListGroupItem>{allFormInputs.Salary}</ListGroupItem>
          <ListGroupItem> {allFormInputs.MobileNumber}</ListGroupItem>
          <ListGroupItem> {allFormInputs.DocumentUrl}</ListGroupItem>
        </ListGroup>
        <Card.Body>
          <div className="next-btn">
            <button onClick={priviousStep} type="submit">
              Privious
            </button>
            <button onClick={onFormConfirm} type="submit">
              Save
            </button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
