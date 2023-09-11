import Logo from "../image/logo.png";
import "./AddForm.css";
export default function AddForm(){
    return(
        <>
            <form>
             <div className="container"> <img src={Logo} alt="logo"/>
            <h2>Mental Assessment</h2>
            <h3>Please enter your details to sign in</h3>
                <div className="form-control">
                    <input type="user" className="user-input"/>
                </div>
                <div className="form-control">
                    <input type="pass" className="pass-input"/>
                </div>
                <div className="form-text">
                    <span>Remember me</span>
                <span>Forget password?</span>
                </div> 
                <div className="form-control">
                <button type="submit" className="signin-bt">Sign in</button></div>   
            </div>
            </form>      
        </>
    );
}