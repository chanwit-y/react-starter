import Env from "../Utils/Env";
import { HttpClient, unwrap } from "../Utils/HttpClient";

class UserProfileService extends HttpClient {
  public getByEmail(userId: string) {
    return {
      key: ["get userprofile by id"],
      callback: async () => {
        return userId
          ? unwrap(
              await this.get(
                `${Env.API_ENDPOINT}profiles/email?email=chanwit_y@banpu.co.th`
              )
            )
          : {};
      },
      options: {
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        cacheTime: Infinity,
        enabled: false,
      },
    };
  }
}

export default new UserProfileService();
