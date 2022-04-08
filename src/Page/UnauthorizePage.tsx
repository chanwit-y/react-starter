import { useMsal } from "@azure/msal-react"

export const UnauthorizePage = () => {
  const { instance } = useMsal()
  return (
    <div>
      <div>Error 401 ja</div>
      <button onClick={() => instance.logout()}>Logout</button>
    </div>
  )
}
