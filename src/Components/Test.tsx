import { useEffect } from 'react';
// import  httpClient from '../Lib/Utils/HttpClient';
import { error$ } from '../Lib/Observable/error.obs';

// const httpClient = new HttpClient()

export const Test = () => {
  useEffect(() => {
    // const func = async () => {
    //   const res = await httpClient.get('https://api2-dv.banpu.co.th/ta-plus-api/api/v1/trip/passport-status/30477', {})
    //   console.log('res', res)
    // }
    // func()
  }, [])
  return (
    <div>
      <button
        onClick={() => {
          // error$.next({
          //   code: 200,
          //   message: "xxxxx"
          // });
        }}
      >
        Test 2
      </button>
    </div>
  )
}
