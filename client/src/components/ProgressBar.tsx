import React, { Fragment } from "react";
import Logo from "../assests/Logo.png";
import Step1 from "../assests/Wizard-Step1.png";
import Step2 from "../assests/Wizard-Step2.png";
import Step3 from "../assests/Wizard-Step3.png";
import Step4 from "../assests/Wizard-Step4.png";
import Step5 from "../assests/Wizard-Step5.png";
import Line from "../assests/Wizard-HorizontalBar.png";
import Avatar from "../assests/Avatar.png";
import Arrow from "../assests/arrow-right.png";
interface IProps {
  signUp: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  setSignUp: React.Dispatch<
    React.SetStateAction<{
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    }>
  >;
  handleChange: () => void;
}
const ProgressBar: React.FC<IProps> = ({
  signUp,
  setSignUp,
  handleChange,
}: IProps) => {
  return (
    <Fragment>
      <div className="section1">
        <div className="logo">
          <img src={Logo} alt="logo" />
        </div>
        <div className="progessbar">
          <img className="progressstep" src={Step1} alt="step1" />
          <img className="Line" src={Line} alt="Line" />
          <img className="progressstep" src={Step2} alt="step2" />
          <img className="Line" src={Line} alt="Line" />
          <img className="progressstep" src={Step3} alt="step3" />
          <img className="Line" src={Line} alt="Line" />
          <img className="progressstep" src={Step4} alt="step4" />
          <img className="Line" src={Line} alt="Line" />
          <img className="progressstep" src={Step5} alt="step5" />
        </div>
        <div className="step">
          <span className="customcolor">
            Step 1{/* CREATE YOUR <br/>ACCOUNT <br/> PASSWORD */}
          </span>
          <span>Step 2</span>
          <span>Step 3</span>
          <span>Step 4</span>
          <span>Step 5</span>
        </div>
        <div className="stepheading">
          <span id="align" className="customcolor">
            CREATE YOUR <br />
            ACCOUNT <br /> PASSWORD
          </span>
          <span>
            PERSONAL <br />
            INFORMATION
          </span>
          <span>
            EMPLOYEMENT <br />
            DETAILS
          </span>
          <span>
            UPLOAD
            <br />
            DOCUMENTS
          </span>
          <span>COMPLETE</span>
        </div>
        <div className="accoutdetail">
          <span>CREATE YOUR ACCOUNT</span>
        </div>
        <div className="paragraph">
          <p>
            Because there will be documents that you need to prepare for apply
            for the loan,let's start off by creating a password so that you can
            login to your account once you have these documents ready.
          </p>
        </div>
      </div>
      <div className="section2">
        <div className="avatar">
          <img src={Avatar} alt="avatar" />
          <br />
          <span>Upload</span>
        </div>
        <div className="inputfields">
          <div className="inputsection1">
            <div>
              <label>NAME</label>
              <br />
              <input
                type="text"
                value={signUp.name}
                onChange={(e) => setSignUp({ ...signUp, name: e.target.value })}
              />
            </div>
            <div>
              <label>EMAIL</label>
              <br />
              <input
                type="email"
                value={signUp.email}
                onChange={(e) =>
                  setSignUp({ ...signUp, email: e.target.value })
                }
              />
            </div>
          </div>
          <div className="inputsection2">
            <div>
              <label>PASSWORD</label>
              <br />
              <input
                type="password"
                value={signUp.password}
                onChange={(e) =>
                  setSignUp({ ...signUp, password: e.target.value })
                }
              />
            </div>
            <div>
              <label>CONFIRM PASSWORD</label>
              <br />
              <input
                type="password"
                value={signUp.confirmPassword}
                onChange={(e) =>
                  setSignUp({ ...signUp, confirmPassword: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      </div>
      <button className="save" onClick={handleChange}>
        SAVE & NEXT <img id="img" src={Arrow} alt="arrow" />{" "}
      </button>
    </Fragment>
  );
};
export default ProgressBar;
