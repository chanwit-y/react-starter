import { useEffect } from "react";
import { error$ } from "../Lib/Observable/error.obs";
import { Test } from "./Test";

function App() {
  useEffect(() => {
    error$.subscribe((x) => console.log(x));
  }, []);

  return (
    <div>
      <Test />
      <button
        onClick={() => {
          // error$.next({
          //   code: 100,
          //   message: "test"
          // });
        }}
      >
        Test 1
      </button>
    </div>
  );
}

export default App;
