import React from "react";
import styled from "styled-components";

interface IError {
  error: any;
}
const ErrorBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  color: red;
`;
const Span = styled.span`
  margin: 4px;
`;
const SpanMessages = styled.span`
  margin: 4px;
`;
const getObjectError = (error: any) => {
  return Object.keys(error).map((row: any, index: any) => {
    return (
      <>
        <p className="error" key={index}>
          <Span>{row.charAt(0).toUpperCase() + row.slice(1)}</Span>:
          <SpanMessages>{error[row]}</SpanMessages>
        </p>
      </>
    );
  });
};
const getArrayError = (error: any) => {
  return error.map((row: any) => {
    return getObjectError(row);
  });
};
const Errorhandler = (props: IError) => {
  const { error } = props;
  return (
    <ErrorBlock>
      {typeof error === "string" && <p className="error">{error}</p>}
      {typeof error !== "string" &&
        Array.isArray(error) === false &&
        getObjectError(error)}
      {typeof error !== "string" &&
        Array.isArray(error) === true &&
        getArrayError(error)}
    </ErrorBlock>
  );
};

export default Errorhandler;
