import Raven from "raven-js";

export const handleError = (error, errorInfo) => {
  console.error(error);
  Raven.captureException(error, { extra: errorInfo });
};

export function loadBinary(path, callback, handleProgress) {
  console.log('[loadBinary]: le path: ', path)
  var req = new XMLHttpRequest();
  req.open("GET", path);
  req.setRequestHeader("Access-Control-Allow-Origin", "*");
  req.overrideMimeType("text/plain; charset=x-user-defined");
  req.onload = function () {
    console.log('[loadBinary]: onload()')
    if (this.status === 200) {
      if (req.responseText.match(/^<!doctype html>/i)) {
        // Got HTML back, so it is probably falling back to index.html due to 404
        return callback(new Error("Page not found"));
      }

      callback(null, this.responseText);
    } else if (this.status === 0) {
      // Aborted, so ignore error
    } else {
      callback(new Error(req.statusText));
    }
  };
  req.onerror = function () {
    console.log('[loadBinary]: onerror()')

    callback(new Error(req.statusText));
  };
  req.onprogress = handleProgress;
  req.send();
  return req;
}
