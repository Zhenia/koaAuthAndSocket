import React, { Component } from "react";
import { Button, Input } from "../../styles/customStyleComponents";

export default (props: any): React.ReactElement => {
  const { provider } = props;
  const disabled = props.pageData && props.pageData.disabled;
  console.log(props.pageData);
if (props.pageData && props.pageData.name){
  console.log(props.pageData.name);
}
  return (
    <div>
      {props.pageData && props.pageData.name? (
        <div className={"card"}>
          <h4>{props.pageData.name}</h4>
        </div>
      ) : (
        <div className={"button-wrapper fadein-fast"}>
          <Button
            onClick={props.startAuth}
            className={`${provider} ${disabled} button`}
          >
            Sign in with google
          </Button>
        </div>
      )}
    </div>
  );
};
