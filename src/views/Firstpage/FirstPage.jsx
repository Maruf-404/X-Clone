import Logo from "../../assets/Xlogo.PNG";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import "./FirstPage.css";

function FirstPage() {
  return (
    <div>
      <div className="first-page">
        <div className="image-container">
          <img src={Logo} alt="" />
        </div>
        <div className="first-page-action">
          <h1 style={{}}>Happening now</h1>
          <h2>Join Today.</h2>
          <Signup />

          <p>
            {" "}
            By signing up, you agree to the Terms of Service and Privacy Policy,
            <br /> including Cookie Use.
          </p>
          <h5>Already have an account ?</h5>
          <Login />
        </div>
      </div>
      <div className="first-page-footer">
        About Download the X app Help Center Terms of Service Privacy Policy
        Cookie Policy Accessibility Ads info Blog Status Careers Brand Resources
        X for Business Developers Directory
        <br /> Settings © 2024 X Corp.
      </div>
    </div>
  );
}

export default FirstPage;
