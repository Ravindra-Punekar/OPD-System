import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../../context/UserAuthContext";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Snackbar from "../../components/Snackbar/Snackbar";
import "./Signup.css";

function SU(email, password, name, surname, birthDate, role, doctorInfo) {
  return createUserWithEmailAndPassword(auth, email, password).then(
    async (userCredential) => {
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        password: password,
        name: name,
        surname: surname,
        dob: birthDate,
        role: role,
      });

      if (role === "Doctor") {
        await setDoc(doc(db, "doctors", user.uid), {
          email: user.email,
          name: name,
          surname: surname,
          dob: birthDate,
          ...doctorInfo,
        });
      }
    }
  );
}

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [role, setRole] = useState("");
  const [doctorInfo, setDoctorInfo] = useState({
    age: "",
    speciality: "",
    experience: "",
  });

  const [isSnackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("error");

  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const isPasswordValid = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const showSnackbar = (message, type) => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setSnackbarVisible(true);
    setTimeout(() => {
      setSnackbarVisible(false);
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const password = document.getElementById("formBasicPassword").value;
      const confirmPassword = document.getElementById(
        "formBasicConfPassword"
      ).value;

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      if (!isPasswordValid(password)) {
        showSnackbar(
          "Password must be at least 8 characters long and contain at least 1 special character, 1 uppercase letter, and 1 lowercase letter.",
          "error"
        );
        return;
      }
      await SU(email, password, name, surname, birthDate, role, doctorInfo);

      showSnackbar("Signup successful!", "success");
      navigate("/");
    } catch (err) {
      setError(err.message);
      showSnackbar(err.message, "error");
    }
  };

  const renderDoctorFields = () => {
    if (role === "Doctor") {
      return (
        <>
          <Form.Group className="mb-3" controlId="formDoctorAge">
            <Form.Control
              type="number"
              placeholder="Age"
              onChange={(e) =>
                setDoctorInfo({ ...doctorInfo, age: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDoctorSpeciality">
            <Form.Control
              type="text"
              placeholder="Speciality"
              onChange={(e) =>
                setDoctorInfo({ ...doctorInfo, speciality: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDoctorExperience">
            <Form.Control
              type="number"
              placeholder="Years of Experience"
              onChange={(e) =>
                setDoctorInfo({ ...doctorInfo, experience: e.target.value })
              }
            />
          </Form.Group>
        </>
      );
    }
    return null;
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="su-title">Signup</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Control
              type="text"
              placeholder="First Name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicSurname">
            <Form.Control
              type="text"
              placeholder="Last Name"
              onChange={(e) => setSurname(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBirthDate">
            <Form.Control
              type="date"
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicRole">
            <Form.Control
              as="select"
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => setRole(e.target.value)}
            >
              <option>Select your Role</option>
              <option value="Patient">Patient</option>
              <option value="Doctor">Doctor</option>
              <option value="TempAdmin">Admin</option>
            </Form.Control>
          </Form.Group>

          {renderDoctorFields()}

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicConfPassword">
            <Form.Control type="password" placeholder="Re-type Password" />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="submit">
              Sign up
            </Button>
          </div>
        </Form>

        <Snackbar
          message={snackbarMessage}
          isVisible={isSnackbarVisible}
          type={snackbarType}
        />

        <div className="text-center">
          Already have an account? <Link to="/">Log In</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
