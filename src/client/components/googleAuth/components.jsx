import React, { Component } from "react";
import { Button, Input } from "../../styles/customStyleComponents";
export default (props: any): React.ReactElement => {
  const { provider } = props;
  const { name } = props.userContext.user;
  const disabled = props.pageData && props.pageData.disabled;
  return (
    <div>
      {name? (
        <div className={"card"}>
          <h4>{name}</h4>
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




