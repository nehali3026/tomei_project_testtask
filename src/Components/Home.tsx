import { useState } from "react"
import { EmployeeAccount } from "./EmployeeAccount"
import { EmployeePersonalInformation } from "./EmployeePersonalInformation"
import { EmployeeDetails } from "./EmployeeDetails"
import { EmployeeDocument } from "./EmployeeDocument"
import { CompleteForm } from "./CompleteForm"
import { Col, Row } from "react-bootstrap"
import '../font/OpenSans-SemiBold.ttf'
import CompanyLogo from '../Images/Logo.png'
import WizardStep1 from '../Images/Wizard-Step1.png'
import WizardStep2 from '../Images/Wizard-Step2.png'
import WizardStep3 from '../Images/Wizard-Step3.png'
import WizardStep4 from '../Images/Wizard-Step4.png'
import WizardStep5 from '../Images/Wizard-Step5.png'

export interface IEmployeeInputs {
    stepCount: number;
    Name: string;
    Email: string;
    Password: string;
    ConfirmPassword: string;
    MobileNumber: string;
    DocumentUrl: string;
    ProfileImage: string;
    Salary: string;
}
const defaultValue: IEmployeeInputs = {
    stepCount: 1,
    Name: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
    MobileNumber: '',
    DocumentUrl: '',
    ProfileImage: '',
    Salary: ''
}
export interface IEmployeeInputErrors {
    NameError: string;
    EmailError: string;
    PasswordError: string;
    ConfirmPasswordError: string;
    MobileNumberError: string;
    DocumentUrlError: string;
    SalaryError: string;
}
const defaultValueErorr: IEmployeeInputErrors = {
    NameError: '',
    EmailError: '',
    PasswordError: '',
    ConfirmPasswordError: '',
    MobileNumberError: '',
    DocumentUrlError: '',
    SalaryError: ''
}
export function Home() {
    const [formInputState, setFormInputState] = useState<IEmployeeInputs>(defaultValue)
    const [isButtonClick, setisButtonClick] = useState(false);
    const [formInputError, setformInputError] = useState(defaultValueErorr);
    const handelFileChange = (profile: any) => {
        setFormInputState({
            ...formInputState,
            ProfileImage: profile.image
        });
    }
    const handleFiledsUpload = (value: string, filedName: string) => {
        setFormInputState({
            ...formInputState,
            [filedName]: value
        });
        filedName += "Error";
        setformInputError({
            ...formInputError,
            [filedName]: ""
        });
    }
    const isFormValid = (stepCount: number) => {
        setisButtonClick(true);
        let formValid = true;
        let empErrorJson = {
            NameError: '',
            EmailError: '',
            PasswordError: '',
            ConfirmPasswordError: '',
            MobileNumberError: '',
            DocumentUrlError: '',
            SalaryError: ''
        }
        if (stepCount === 1) {
            if (formInputState.Name === "") {
                formValid = false;
                empErrorJson.NameError = "Name Is Required"
            }
            if (formInputState.Email === "") {
                formValid = false;
                empErrorJson.EmailError = "Email Is Required"
            }
            else {
                if (!new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(formInputState.Email)) {
                    formValid = false;
                    empErrorJson.EmailError = "Invalid Email Address"
                }
            }
            if (formInputState.Password === "") {
                formValid = false;
                empErrorJson.PasswordError = "Password Is Required"
            }
            else {
                if (formInputState.Password.length < 8) {
                    formValid = false;
                    empErrorJson.PasswordError = "Password At Least 8 Characters"
                }
            }
            if (formInputState.ConfirmPassword === "") {
                formValid = false;
                empErrorJson.ConfirmPasswordError = "Confirm Password Is Required"
            }
            if (formInputState.Password !== "" && formInputState.ConfirmPassword !== "") {
                if (formInputState.Password !== formInputState.ConfirmPassword) {
                    formValid = false;
                    empErrorJson.ConfirmPasswordError = "Confirm Password Not Match"
                }
            }

        }
        else if (stepCount === 2) {
            if (formInputState.MobileNumber === "") {
                formValid = false;
                empErrorJson.MobileNumberError = "Mobile Number Is Required"
            }
        }
        else if (stepCount === 3) {
            if (formInputState.Salary === "") {
                formValid = false;
                empErrorJson.SalaryError = "Salary Is Required"
            }
        }
        else if (stepCount === 4) {
            if (formInputState.DocumentUrl === "") {
                formValid = false;
                empErrorJson.DocumentUrlError = "Document Is Required"
            }
        }
        else {
            return formValid;
        }
        setformInputError(empErrorJson);
        return formValid;
    }
    const handleNextStepAction = () => {
        if (isFormValid(formInputState.stepCount)) {
            setFormInputState({
                ...formInputState,
                stepCount: formInputState.stepCount + 1
            })
        }
    }
    const resetStepAaction = () => {
        setFormInputState({
            ...formInputState,
            stepCount: 1
        })
        setFormInputState(defaultValue);
    }
    const handlePreviousStepAction = () => {
        setFormInputState({
            ...formInputState,
            stepCount: formInputState.stepCount - 1
        })
    }

    const loadSteps = () => {
        if (formInputState.stepCount === 1)
            return <EmployeeAccount buttonClick={isButtonClick} handelFileChange={handelFileChange} formError={formInputError} handleChange={handleFiledsUpload} allFormInputs={formInputState} nextStep={handleNextStepAction} />
        else if (formInputState.stepCount === 2)
            return <EmployeePersonalInformation priviousStep={handlePreviousStepAction} formError={formInputError} handleChange={handleFiledsUpload} allFormInputs={formInputState} nextStep={handleNextStepAction} />
        else if (formInputState.stepCount === 3)
            return <EmployeeDetails priviousStep={handlePreviousStepAction} formError={formInputError} handleChange={handleFiledsUpload} allFormInputs={formInputState} nextStep={handleNextStepAction} />
        else if (formInputState.stepCount === 4)
            return <EmployeeDocument priviousStep={handlePreviousStepAction} formError={formInputError} handleChange={handleFiledsUpload} allFormInputs={formInputState} nextStep={handleNextStepAction} />
        else if (formInputState.stepCount === 5)
            return <CompleteForm resetStepAaction={resetStepAaction} priviousStep={handlePreviousStepAction} allFormInputs={formInputState} />
        else
            <>Steps Not Found</>
    }
    return (
        <>
            <section className="main-div-section">
                <div className="CompanyLogo-image text-center">
                    <img src={CompanyLogo} alt="CompanyLogo" className="img-fluid" />
                </div>
                <Row className="text-uppercase">
                    <Col className={formInputState.stepCount === 1 ? "" : "step-hide"}>
                        <div className={formInputState.stepCount === 1 ? "steps-flow-image stap-text-color site-font" : "steps-flow-image"} >
                            <div className="steps-flow-create  step-trans"><img src={WizardStep1} alt="create account step" /></div>
                            <span> STEP 1:</span>
                            <p>Create Your Account Password</p>
                        </div>
                    </Col>
                    <Col className={formInputState.stepCount === 2 ? "" : "step-hide"}>
                        <div className={formInputState.stepCount === 2 ? "steps-flow-image stap-text-color" : "steps-flow-image"} >
                            <div className="steps-flow-create step-trans"><img src={WizardStep2} alt="CompanyLogo" /></div>
                            <span> STEP 2:</span>
                            <p>Personal Information</p>
                        </div>
                    </Col>
                    <Col className={formInputState.stepCount === 3 ? "" : "step-hide"}>
                        <div className={formInputState.stepCount === 3 ? "steps-flow-image stap-text-color" : "steps-flow-image"} >
                            <div className="steps-flow-create step-trans"><img src={WizardStep3} alt="CompanyLogo" /></div>
                            <span> STEP 3:</span>
                            <p>Employment Details</p>
                        </div>

                    </Col>
                    <Col className={formInputState.stepCount === 4 ? "" : "step-hide"}>
                        <div className={formInputState.stepCount === 4 ? "steps-flow-image stap-text-color" : "steps-flow-image"} >
                            <div className="steps-flow-create step-trans"><img src={WizardStep4} alt="CompanyLogo" /></div>
                            <span> STEP 4:</span>
                            <p>Upload Document</p>
                        </div>
                    </Col>
                    <Col className={formInputState.stepCount === 5 ? "" : "step-hide"}>
                        <div className={formInputState.stepCount === 5 ? "steps-flow-image stap-text-color" : "steps-flow-image"} >
                            <div className="steps-flow-create"><img src={WizardStep5} alt="CompanyLogo" /></div>
                            <span> STEP 5:</span>
                            <p>Complete</p>
                        </div>
                    </Col>

                </Row>
            </section>
            {loadSteps()}
        </>
    )
}