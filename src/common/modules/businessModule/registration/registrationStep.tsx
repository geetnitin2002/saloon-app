import React from "react";

const RegistrationStep = (props: any) => {
  const getSteps = (count: number) => {
    return "step-" + count;
  };
  return (
    <div className="steps clearfix">
      <ul role="tablist" className={getSteps(props.page)}>
        <li
          role="tab"
          aria-disabled="false"
          className={props.page === 1 ? "first current" : "first"}
          aria-selected={props.page === 1 ? "true" : "false"}
        >
          <a id="wizard-t-0" href="#wizard-h-0" aria-controls="wizard-p-0">
            {props.page === 1 && (
              <span className="current-info audible">current step: </span>
            )}
            <span className="number">1.</span>
          </a>
        </li>
        <li
          role="tab"
          aria-disabled="false"
          className={props.page === 2 ? " done current" : ""}
          aria-selected={props.page === 2 ? "true" : "false"}
        >
          <a id="wizard-t-1" href="#wizard-h-1" aria-controls="wizard-p-1">
            {props.page === 2 && (
              <span className="current-info audible">current step: </span>
            )}
            <span className="number">2.</span>
          </a>
        </li>
        <li
          role="tab"
          aria-disabled="false"
          className={props.page === 3 ? " done current" : ""}
          aria-selected={props.page === 3 ? "true" : "false"}
        >
          <a id="wizard-t-2" href="#wizard-h-2" aria-controls="wizard-p-2">
            {props.page === 3 && (
              <span className="current-info audible">current step: </span>
            )}
            <span className="number">3.</span>
          </a>
        </li>
        <li
          role="tab"
          aria-disabled="false"
          className={props.page === 4 ? "last current" : "last"}
          aria-selected={props.page === 4 ? "true" : "false"}
        >
          <a id="wizard-t-3" href="#wizard-h-3" aria-controls="wizard-p-3">
            {props.page === 4 && (
              <span className="current-info audible">current step: </span>
            )}
            <span className="number">4.</span>
          </a>
        </li>
        <li
          role="tab"
          aria-disabled="false"
          className={props.page === 5 ? "last current" : "last"}
          aria-selected={props.page === 5 ? "true" : "false"}
        >
          <a id="wizard-t-4" href="#wizard-h-4" aria-controls="wizard-p-4">
            {props.page === 5 && (
              <span className="current-info audible">current step: </span>
            )}
            <span className="number">5.</span>
          </a>
        </li>
        <li
          role="tab"
          aria-disabled="false"
          className={props.page === 6 ? "last current" : "last"}
          aria-selected={props.page === 6 ? "true" : "false"}
        >
          <a id="wizard-t-4" href="#wizard-h-4" aria-controls="wizard-p-4">
            {props.page === 6 && (
              <span className="current-info audible">current step: </span>
            )}
            <span className="number">6.</span>
          </a>
        </li>
        <li
          role="tab"
          aria-disabled="false"
          className={props.page === 7 ? "last current" : "last"}
          aria-selected={props.page === 7 ? "true" : "false"}
        >
          <a id="wizard-t-4" href="#wizard-h-4" aria-controls="wizard-p-4">
            {props.page === 7 && (
              <span className="current-info audible">current step: </span>
            )}
            <span className="number">7.</span>
          </a>
        </li>
        <li
          role="tab"
          aria-disabled="false"
          className={props.page === 8 ? "last current" : "last"}
          aria-selected={props.page === 8 ? "true" : "false"}
        >
          <a id="wizard-t-4" href="#wizard-h-4" aria-controls="wizard-p-4">
            {props.page === 8 && (
              <span className="current-info audible">current step: </span>
            )}
            <span className="number">8.</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default RegistrationStep;
