import React, { useState } from 'react';
import './Login.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faCity } from "@fortawesome/free-solid-svg-icons";
import farmer from '../../Assets/farmer.jpeg';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const Login = () => {
  const [action, setAction] = useState("Sign Up");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [selectedOption, setSelectedOption] = useState(""); // State for the selected option
  const [selectedFile, setSelectedFile] = useState(null); // State for the selected file

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  
  

  return (
    <div className="container">
    
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        {/* Name */}
        <div className="inputs">
          {action === "Login" ? null : (
            <div className="input">
              <FontAwesomeIcon icon={faUser} />
              <input type="text" placeholder='Name' />
            </div>
          )}
          {/* Email */}
          <div className="input">
            <FontAwesomeIcon icon={faEnvelope} />
            <input type="email" placeholder='Email Id' />
          </div>
          {/* Password */}
          <div className="input">
            <FontAwesomeIcon icon={faLock} />
            <input type="password" placeholder='Password' />
          </div>
          {action === "Sign Up" ? (
            <>
              {/* Phone No */}
              <div className="input">
                <PhoneInput
                  country={'in'}
                  value={phone}
                  onChange={setPhone}
                />
              </div>
              {/* City */}
              <div className="input">
                <FontAwesomeIcon icon={faCity} />
                <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
              </div>
              {/* District */}
              <div className="input">
                <FontAwesomeIcon icon={faCity} />
                <input type="text" placeholder="District" value={district} onChange={(e) => setDistrict(e.target.value)} />
              </div>
              {/* Address */}
              <div className="input">
                <FontAwesomeIcon icon={faLocationDot} />
                <input type="text" placeholder='Address' />
              </div>
              {/* Role */}
              <div className="input">
                <label htmlFor="loginAs"><b>Login as</b></label>
                <select
                  id="loginAs"
                  value={selectedOption}
                  onChange={handleOptionChange} className='dropdown'
                >
                  <option value="">Select an option</option>
                  <option value="farmer">Farmer</option>
                  <option value="customer">Customer</option>
                </select>
              </div>
              {/* Age */}
              <div className="input">
                <input type="text" placeholder='Age' />
              </div>
              {/* Profile Photo */}
              <div className="input">
                <label htmlFor="profilePhoto">Profile Photo</label>
                <input className='photo'
                  type="file"
                  id="profilePhoto"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            </>
          ) : null}
        </div>
        {action === "Login" ? (
          <div className="forgot-password">Lost Password? <span>Click Here!</span></div>
        ) : null}
        <div className="submitcontainer">
          <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => setAction("Sign Up")}>Sign Up</div>
          <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => setAction("Login")}>Login</div>
        </div>
      </div>
  );
}

export default Login;
