import React, { useState } from "react";

import { Alert } from "react-bootstrap";

const closeModel = (setShow: any, props: any) => {
  setShow(false);
  props.close(true);
};
const AlertSuccess = (props: any) => {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert
        variant={"success"}
        onClose={() => closeModel(setShow, props)}
        dismissible
      >
        <p>{props.messages}</p>
      </Alert>
    );
  } else {
    return null;
  }
};

export default AlertSuccess;
