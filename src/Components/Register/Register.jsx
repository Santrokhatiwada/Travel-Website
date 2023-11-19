import React, { useState } from "react";

import http from "../../http";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    Cpassword: "",
  });

  const [errorMessage, setErrorMessage] = useState([]); // New state variable for error message

  var name;
  const handleChange = (event) => {
    name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const checkPassword = () => {
    if (
      inputs.password &&
      inputs.Cpassword &&
      inputs.password === inputs.Cpassword
    ) {
      console.log("Passwords match");
    } else {
      console.log("Passwords do not match");
      setErrorMessage((prevMessages) => [
        ...prevMessages,
        "Passwords do not match",
      ]);
    }
  };

  const submitForm = (event) => {
    event.preventDefault();
    console.log("Submitting form...");

    setErrorMessage([]); // Clear any previous error message

    const requestBody = {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password,
    };

    http
      .post("/unauth/user/register", requestBody)
      .then((res) => {
        console.log("Register Response:", res.data.user);

        if (res.data.user) {
          http.post("/unauth/user/login", inputs).then((res) => {
            console.log(res.data.token);
            navigate("/login");
          });
        } else {
          console.log(res.data.error);
          setErrorMessage((prevMessages) => [...prevMessages, res.data.error]);
          checkPassword();
        }
      })
      .catch((error) => {
    
        if (error.response && error.response.status === 422) {
          // Validation errors are in the response data
          const validationErrors = error.response.data.error;
          console.log(validationErrors);
          setErrorMessage((prevMessages) => [
            ...prevMessages,
            ...(validationErrors ? Object.values(validationErrors) : []),
          ]);
          checkPassword();
        } else {
          console.log("An unexpected error occurred:");
        }
      });
  };

  return (
    <>
      <div className="wrapper">
        <div className="logo">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAA/1BMVEX///8AAAD8/Pzc3Nz//f/+/vxsbGyztbT09fSmpqiAgIDExMT///4zxPAAAAMAAQDv7+/l5eXOzs6urq7W1tagoKD///jf39+FhYUOEA////WOjo5VVVXBwcGVlZUhISF4eHj/+f/4//n1//81xOn/+vn///I2wfZiYmJMTExZWVkXFxdEREQuxO8wMDDa9frn9/q+6fdz1/WO3fD+++w2w/zM7/De9v+h4PUxxOc4x+L0/u7x9/7S9/HZ7flOxPCl4vEszua44/l40vNcyui16PCv6vXL8/k7v+eL3PYAu+vg9vR/1vRJx/Zp2fMAwv2S5OaT2fZR1eGx8/JmzeRYT3QrAAAKKUlEQVR4nO2aeXvaSBKHm6LbCJCIJEAmEAg6QHESxcgscUQ8NuMLG8fOeDbf/7NstQ4OTzKz++SJObbePwCpG1E/VXdVdSPGCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgthtgqhDrNuKX4rqM83Ub8UvpiR13IeNMdXZYosrY4eGA7cQoFcDRVyoD4MISFjAOTnMQHnmzWeANgXNurdvEn8QRgts2B1X9lw2O4E7TDY+0me8Hnj+afXTF1jvS5q6w+010lOvcTT+y40/eTIvGkTaKxkF06Fpbr/AznAx+Ow0fvxydeQ+T8MHzfe93beR7XuCPfC4ErNvCn0VMbu79AJkNw/OLQPM8TfPlq+fPxueWUKG3bhP/V5yeaztLh8Mg0ALt7NN0Mg58baxpKNFDpdrllbud2cIG106nlqxZ4OQ0PP8Uhhc+Dks/8oMoCn5HL15MB0xs5xR0ek1naW5hhrDuri+9KBppKE4bByP/a/Tp2Ok5jnDXZ+ZPcDfglj0/AgumD/caug81eui7G3TkcNC0bPS0up0+HI4nrpp8xDdrcoTzMJ55qBJn303gTYTFmQsAW5oo4HamDe+wrOY9cXerxaDGyPM9fA+iy9P+uk38SWznyyy4Hw4cuPqGYzNWGPmRN4puojN/9jBwTtZt4k/iCLjwx2Pv4ttXLfAShWfeyI/Gvn8TDKEJ9j9fZKNRONwd4ZQLRli23KejdHR5PRmNNe+6j1XM9vvQEu4ZZvex1Bb7cHZ0pYRYxETTHojtr9NABcEHmi8rGUwTN9r95E79fHhzP/vmbr24GAGi504jWVnj6sE/unaa3Dm817w/TnZk28LlttN8/IpFWjTzP31sCs6d/sNMu2KOw3fCh2A5p49/hH+OoqNPJzglbe5YLPzzsMddW9329XxMc/plOBWuEoYgLJXL1M9xac9d6LnqFvuwJ6x4J8Y9fZjc7cZgfEKfg4OOOh1O7uSm07rN+QUAljLO1fD8xOJC7W3nqujv6YvB9DF0LIHzDXYkK6ziXg1D2xIAFsrboVHKXQc4+mwQTo6Z2IlU8ARu21iGDsLrQ1ds6abLP2A5rj04v8L1bk9s/+b197CUwccpejHZmFHXbc4v4Hj60cU0j8ULBtHdUiiEAyeD6cBl6i5mBqGit/jdb3e2u5NzT27yMtf9bcBxOc8528UalIHrnsjnDGAn1TH5FIULLog4sOzcEyNPnPbEiRz6vNl3efYUCSz1y7p+x+3wo4ZfTn4/X8uvYDDQFwe6AqsaLWV6fHIKPe4o9VarYc4bsB/TG61GEQDy+6sXja9g4Af92QUq73NPecVYdenwdam98o3m1A98798OV9me7C3vQCaRtfBMgzH9ySU/KLL9DX6qP7sb4RX+bGVO7kUu94axQnruhTzO5Q6MpW+4X+TO9jcubNiXjeW5zcCMD3hCZ6Cs6HuRe6/IPntrUbjwIcpLeCsVvqgs2/hhSeLhWPO1wDv9DPL2vMjtMXU+x4rYt4vvSi65NfNxoMhmqbD4zPrwd812GTHf4q+X5KdyuyYVVnLvTXlU6LyKTZQiwLEdsI5utMgf+0cch2lZttUWF5MuxIkppA/fFcoZbRMXX9KHFVS4rvJhD296PbVTxApfpS0Kzq1Krp3GSj5AFx49+Fp06uChHAGt+UXackRjtI0VvjZWfmBtCmWQS+aIVAhx1JAKpakgxx9A3FaSnbmjikkQfD0NfS94xLU+DstK7p2eXUoOhAJLffh6f54iYJ0KYysgUVhMj+Y+5Em7PHorZ5LgYuD5kQdcPmdxjNVAHFqyuVXDz+91yBQu+RDWOEqBAVvEuURu5sPUNmaiZQdoOVh2P9S06NxtDkdaMJHtDZkw0vBYws+d+AJ/UbhWHyYszcNlhbH8tvSozGh9Dp4WnN1ZMDgL/EBwV+jYhpNUasy/xm8p8itqrLBdM82axDTYBipMRmlSiHXxqBsPX+tKC/xbwXvu0A9uwiYHTOM4hGOFHZkq4gtIhTg/X6ZgLIJNVHiQNdWluTKAsJ71oGnBYc8W1iHGmkv5N1NZthrS2yjwZS3WGitcSqgttpE+PNiX5NtvpIQPcQNMZ5r/DQQIAUd+EIQCepj1K7GTqvj+hsVzLvHhyyWFG+nDOeiNSlJfN299bxaCjTVp8woLm4u+24yVfdCZ8jbJmlJjMg8LZoYRB+gNU5iOskr8/sqQmzaufXo/9seJCJdfBp4/tbjAQqaCX5XlzUEaVDcq42f8NZYu6Mb/M2FKu43ug/N4TSxsca55wRAHLEYYLPHihUMxTfFbovC92caStZOMQTyHuUHzZ+NBrNCyrUEQRNqJJYTxDkNMB1PFax22SqGsS9NiZw+4yh0+CUbRbbJf6rjgDDVt9iiEKrNJvPJqZBfbIoUsrsteYK7gvHlyOfa948RAXB1ax8F9MB5gdVqLFcaLjMSHSaRZXc6LpG6qPpegVdLqOludQlbTyJINaza5QhKid4Ul6cXyhsblKPInwrHtPSlRFudZpNFljFpeIprJb1RyS0E6LpOeS+G8Lk3JFMbiZbn5Xv1syyXTdHnXLcRoGomeI1dNlXhhmCJHaWVlCVyWp/dWyoB5OfsswJMdhmrmQ1ll6vEisB/eaLNLZ3kTwvGCwL/C7MjeyVG52LASq7sYC4UrHDynQtTULXXL81FqlkqlerrwAFbrlhol/ep2eHutusvPPoePw8dr4LaTT9I6m2eL0irdfPoby+fqz6rwx7uZkHjG4jYGlz5ffrpbNLFSFY7IHrScb7p9fwN5g/bOIVkmzl8A0i2MdM8XkjOpomQoM1icTl8h2yOG7DZtFom9abDJjkFhC4Hpenl+CJA6cekmpN1gkxwogbltqetSm+fOzI7mPlZWPQrf6bZJZEbORS68lTkkPZfuZKX7/jC/M2xxJntZk5YfUO60mW7KvyHqHYyCRqcuX3FppBTi89hQ7NRAKXYwC5SxdmkzpVgvABSxO2opA5j43XpBvmCErtarz5jd/wuMElNYTe6gdXXW2ldKChhoZstgykFZj7NISWf7rJVnxTJr1FmhBLpMpoUCfhH1N3S9w/KyY63K6jWls2kuRB8WGNrG0DRWNvETOk7vmPherZer0tyO7NZQmFFlxbpZrYPRLZpMqXbixLdXr7eY0a2aLN/Jd3SlVG3//Q8+N0pNKRm1uo4ONI2WoTTyZosVi+0uekrZK0ofNsz9GqsX9Dq+6l29AXpH18HYN1pxK+AtyMsztUa7A0pL1zdrlCptvPt6tVpmeqGIpYpeLRo4sVjegBoz4s2muAHaKBBqisKk+6oFBTvKDWFmKtgRz7RBzzNThwK2rVvUCsv/6jK2HCcXyWLeL0vqbBE0Yd47O964WEoQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQ/3/8B8mb7HujQaBJAAAAAElFTkSuQmCC"
            alt=""
          />
        </div>
        <div className="text-center mt-4 name">Ghumna Jam</div>
        <div className="text-center mt-3 name">Register</div>

        <ul>
          {errorMessage.map((error, index) => (
            <div key={index} className="alert alert-danger">
              <li>
                {index + 1} {error}
              </li>
            </div>
          ))}
        </ul>

        <form className="p-3 mt-3">
          <div className="form-field d-flex align-items-center">
            <span className="far fa-user"></span>
            <input
              type="name"
              name="name"
              id="name"
              autoComplete="off"
              value={inputs.name || ""}
              onChange={handleChange}
              placeholder="UserName"
            />
          </div>

          <div className="form-field d-flex align-items-center">
            <span className="far fa-user"></span>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="off"
              value={inputs.email || ""}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="off"
              value={inputs.password || ""}
              onChange={handleChange}
              placeholder="Password"
            />
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input
              type="password"
              name="Cpassword"
              id="Cpassword"
              autoComplete="off"
              value={inputs.Cpassword || ""}
              onChange={handleChange}
              placeholder="Confirm Password"
            />
          </div>
          <button type="submit" onClick={submitForm} className="btn mt-3">
            Register
          </button>
        </form>
        <div className="text-center fs-6">
          <a href="#">Forget password?</a> or <a href="#">Sign up</a>
        </div>
      </div>
    </>
  );
};

export default Register;
