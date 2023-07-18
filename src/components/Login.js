import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { loginApi } from "../services/UserService";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "./Login.scss";

const Login = () => {
  const navigate = useNavigate();
  const { loginContext } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loadingAPI, setLoadingAPI] = useState(false);

  // useEffect(() => {
  //   let token = localStorage.getItem("token");
  //   if (token) {
  //     navigate("/");
  //   }
  // }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter EMAIL or PASSWORD!");
      return;
    }

    setLoadingAPI(true);
    let res = await loginApi(email.trim(), password);
    if (res && res.token) {
      loginContext(email, res.token);
      navigate("/");
    } else {
      if (res && res.status === 400) {
        toast.error(res.data.error);
      }
    }
    setLoadingAPI(false);
  };

  const handlePressEnter = (event) => {
    if (event && event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <>
      <div className="login-container col-12 col-sm-4">
        <div className="title">Log in</div>
        <div className="text">Email or username (eve.holt@reqres.in)</div>
        <input
          type="text"
          placeholder="Email or username"
          className="input-login"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="input-password">
          <input
            className="input-login"
            placeholder="Password"
            type={isShowPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(event) => handlePressEnter(event)}
          />
          <i
            className={
              isShowPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
            }
            onClick={() => setIsShowPassword(!isShowPassword)}
          ></i>
        </div>

        <button
          className={email && password ? "login-active" : "btn-login"}
          disabled={email && password ? false : true}
          onClick={() => handleLogin()}
        >
          Log in
          {loadingAPI && <i className="fas fa-spinner fa-spin mx-1"></i>}
        </button>
        <div className="go-back">
          <Link to="/" style={{ color: "black", textDecoration: "none" }}>
            <i className="fa-solid fa-angle-left me-2"></i>
            Go back
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
