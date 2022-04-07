import { useEffect } from "react";
import { foo } from "../Lib/Observable/error.obs";
import { Test } from "./Test";

function App() {
  useEffect(() => {
    foo.subscribe((x) => console.log(x));
  }, []);

  return (
    <div>
      <Test />
      <button
        onClick={() => {
          foo.next({
            code: 100,
            message: "test"
          });
        }}
      >
        Test 1
      </button>
    </div>
  );
}

export default App;
