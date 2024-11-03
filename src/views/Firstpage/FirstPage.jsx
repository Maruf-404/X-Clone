import Logo from "../../assets/Xlogo.png";
import GuestAccount from "../../components/GuestAccount/GuestAccount.jsx";
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
          <h1>Happening now</h1>
          <h2>Join Today.</h2>
          <div>
          <Signup />
          <GuestAccount/>
          </div>
        
          <p>
       <b>Attention </b>  Please wait for 50 seconds after making first an api call
            <br /> because it&apos;s hosted on a free server
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
