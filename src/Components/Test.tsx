import { foo } from '../Lib/Observable/error.obs';

export const Test = () => {
  return (
    <div>
      <button
        onClick={() => {
          foo.next({
            code: 200,
            message: "xxxxx"
          });
        }}
      >
        Test 2
      </button>
</div>
  )
}
