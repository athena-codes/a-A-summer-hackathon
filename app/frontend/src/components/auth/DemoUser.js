import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";

const DemoUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  if (user) {
    return <Redirect to="/home" />;
  }

  const handleClick = (e) => {
    e.preventDefault();

    const credential = "Demo-lition@gmail.com";
    const password = "password";

    dispatch(login({ credential, password }));
  };
  return (
    <button
      className="button"
      id="demo_button"
      onClick={handleClick}
      type="submit"
    >
      Guest
    </button>
  );
};

export default DemoUser;
