import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { postLogout } from "./authSlice";

export default function Logout(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postLogout());
    props.history.push("/");
  }, [dispatch, props.history]);

  return <>Loging out</>;
}
