import {NEXT_PUBLIC_ENV} from "@/config";
import React from "react";

const Test = () => {
  return (
    <>
      <h1 className="text-2xl">Test</h1>
      <p>Currently running in <span className="font-bold">{NEXT_PUBLIC_ENV}</span> env.</p>
    </>
  );
}

Test.propTypes = {};

export default Test;
