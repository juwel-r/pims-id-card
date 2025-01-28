import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import googlePng from "../assets/google.png";
import { toast,  } from "react-toastify";
import Loader from "../components/Loader";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { sendPasswordResetEmail } from "firebase/auth";
import auth from "../firebase.config";
import { Helmet } from "react-helmet-async";

//========>>>>>>>>>>><<<<<<<<<<<=======\\
const DataEntry = () => {
  const {
    DataEntryUser,
    userInfo,
    DataEntryWithGoogle,
    setUserInfo,
    loader,
    setIsLoader,
  } = useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);
  const [inputPass, setInputEmail] = useState();
  const [showResetPass, setShowResetPass] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const DataEntryHandler = (e) => {
    setIsLoader(true);
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    DataEntryUser(email, password)
      .then((result) => {
        notifySuccess("successfully Signed In!");
        e.target.reset();
        setUserInfo(result.user);
        setTimeout(() => {
          navigate(location.state ? location.state : "/");
          setIsLoader(false);
        }, 1000);
      })
      .catch((error) => {
        setIsLoader(false);
        notify(
          error.code
            .replace(/[-]/g, " ")
            .replace(/^./, (char) => char.toUpperCase())
        );
      });
  };

  //Signin with google
  const signInWithGoogle = () => {
    setIsLoader(true);
    DataEntryWithGoogle()
      .then((result) => {
        setUserInfo(result.user);
        notifySuccess("successfully Signed In!");
        setTimeout(() => {
          setIsLoader(false);
          navigate(location.state ? location.state : "/");
        }, 1000);
      })
      .catch((error) => {
        setIsLoader(false);
        notify(
          error.code
            .replace(/[-]/g, " ")
            .replace(/^./, (char) => char.toUpperCase())
        );
      });
  };
  // Reset Password
  const resetPass = (e) => {
    setIsLoader(true);
    e.preventDefault;
    setShowResetPass(false);
    sendPasswordResetEmail(auth, e.target.email.value)
      .then(() => {
        notifySuccess("Password reset email sent!");
        setTimeout(() => {
          window.location.href = "https://mail.google.com/";
          setIsLoader(false);
        }, 1000);
      })
      .catch((error) => {
        setIsLoader(false);
        notify(
          error.code
            .replace(/[-]/g, " ")
            .replace(/^./, (char) => char.toUpperCase())
        );
      });
  };

  const notify = (message) =>
    toast.error(message, {
      position: "top-left",
      autoClose: 2000,
      closeOnClick: true,
    });

  const notifySuccess = (message) =>
    toast.success(message, {
      position: "top-left",
      autoClose: 2000,
      closeOnClick: true,
    });


  //========>>>>>>>>>>><<<<<<<<<<<=======\\
  // if (userInfo) {
  //   return <Navigate to="/"></Navigate>;
  // }
  return (
    <div className="bg-gradient-to-br from-[#FDEFF4] via-[#D1F7FF] to-[#FFEBC1] bg-opacity-50 min-h-[calc(100vh-300px)]">
            <Helmet>
        <title>Sign In || CareerUp</title>
      </Helmet>
      {loader && <Loader></Loader>}

      {!loader && (
        <>
          {!showResetPass ? (
            <section>
              {" "}
              <h1 className="text-4xl text-primary font-bold text-center py-4">
                DataEntry now!
              </h1>
              <div className="card w-5/6 md:w-4/6 lg:w-[35%] mx-auto shrink-0 shadow-2xl">
                <form onSubmit={DataEntryHandler} className="card-body">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      onChange={(e) => setInputEmail(e.target.value)}
                      name="email"
                      type="email"
                      placeholder="Enter Email"
                      className="input input-bordered w-full bg-white/50"
                      required
                    />
                  </div>

                  <div className="form-control w-full relative">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      name="password"
                      type={showPass ? "text" : "password"}
                      placeholder="Enter Pssword"
                      className="input input-bordered w-full bg-white/50"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="btn btn-ghost hover:bg-transparent btn-xs absolute bottom-[35%] right-[2%] text-xl text-gray-600"
                    >
                      {showPass ? <IoEyeOff /> : <IoEye />}
                    </button>
                    <button
                      onClick={() => setShowResetPass(true)}
                      className="m-1 underline text-left hover:text-primary"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="form-control mt-4">
                    <button className="btn btn-ghost bg-primary text-lg  text-primary  my-4  bg-white/20 border border-primary/30 backdrop-blur-3xl">
                      Sign In
                    </button>
                  </div>
                </form>
            <div className="px-8 divider"> OR</div>
                <button
                  onClick={signInWithGoogle}
                  className="flex items-center justify-center  border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition mx-8 mb-6"
                >
                  <img
                    src={googlePng}
                    alt="Google Logo"
                    className="w-7 h-7 mr-2"
                  />
                  <span className="text-gray-700 font-medium">
                    Sign in with Google
                  </span>
                </button>
              </div>
              <p className="flex justify-center items-center pb-16 mt-6">
                New to CareerUp ? &nbsp;{" "}
                <Link className="font-semibold text-primary" to="/register">
                  {" "}
                  Create Account!
                </Link>
              </p>
              
            </section>
          ) : (
            <section>
              <h1 className="text-3xl lg:text-4xl text-primary font-bold text-center py-4">
                Reset Your Password!
              </h1>
              <div className="card w-5/6 md:w-4/6 lg:w-1/4 mx-auto shrink-0 shadow-2xl">
                <form onSubmit={resetPass} className="card-body">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      defaultValue={inputPass}
                      name="email"
                      type="email"
                      placeholder="Enter Email"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                  <div className="form-control mt-4">
                    <button
                      type="submit"
                      className="btn btn-ghost bg-primary text-lg  text-primary  my-4  bg-white/20 border border-primary/30 backdrop-blur-3xl"
                    >
                      Reset Password
                    </button>
                  </div>
                </form>
              </div>
              <p className="flex justify-center items-center pb-16 mt-6">
                <button
                  onClick={() => setShowResetPass(false)}
                  type="bottom"
                  className="font-semibold text-primary hover:text-primary/50"
                  to="/DataEntry"
                >
                  {" "}
                  Back to Sign In
                </button>
              </p>
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default DataEntry;