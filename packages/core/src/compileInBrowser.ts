import babelPlugin from "./babelPlugin";
import handleEvalScript from "./handleEvalScript";
import getBabelOptions, { getAndResetLocs } from "./getBabelOptions";

var Babel = window["Babel"];
delete window["__core-js_shared__"]; // Added by babel standalone, but breaks some lodash tests

let evalFn;
window["__fromJSEvalSetEvalFn"] = function(fn) {
  evalFn = fn;
};

function getEvalFn() {
  let ret;
  if (evalFn) {
    ret = evalFn;
    evalFn = null;
  } else {
    ret = eval;
  }
  return ret;
}

window["fromJSEval"] = function(code) {
  return window["__callExpression"](
    [[eval, null], [undefined, null], [[code]]],
    {},
    null
  );
};

window["__fromJSEval"] = function(code) {
  function compile(code, url, done) {
    if (code.includes("__didInitializeDataFlowTracking")) {
      // Code is already instrumented...
      // this can happen for example if a JS file is fetched via ajax and then
      // eval'd
      done({
        code,
        locs: []
      });
      return;
    }
    const babelResult = Babel.transform(
      code,
      getBabelOptions(babelPlugin, {}, url)
    );
    babelResult.locs = getAndResetLocs();
    done(babelResult);
  }

  let returnValue;
  // handle eval script is sync because compile is sync!
  handleEvalScript(code, compile, {}, evalScript => {
    returnValue = {
      evalScript,
      returnValue: getEvalFn().call(this, evalScript.instrumentedCode)
    };
  });

  return returnValue;
};
