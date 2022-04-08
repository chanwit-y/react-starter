import { useEffect } from "react";
import { useQueryService } from "../Lib/Hook/useQueryService";
import { error$ } from "../Lib/Observable/error.obs";
import userSrv from "./Service/UserProfile.service";

function App() {
  // const query  = UserProfileSer("");

  // const {key, callback, options} = userSrv.getByEmail("x");
  // const query = useQuery(key, callback, options);
  const x = useQueryService(userSrv.getByEmail("x"));

  useEffect(() => {
    x.refetch();
  }, []);

  useEffect(() => {
    // error$.subscribe((x) => {
    //   alert()
    // });
    console.log(x.data);
  }, [x.data]);

  return (
    <div>
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
