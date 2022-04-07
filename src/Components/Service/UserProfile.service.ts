import { HttpClient, unwrap } from "./../../Lib/Utils/HttpClient";

class UserProfileService extends HttpClient {
  public  getByEmail(userId: string) {
    return {
      key: ["get userprofile by id"],
      callback: async () => {
        return userId
          ? unwrap(await this.get(
              "https://api2-dv.banpu.co.th/ta-plus-api/api/v1/profiles/email?email=chanwit_y@banpu.co.th"
            ))
          : {};
      },
      options: {
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        cacheTime: Infinity,
	enabled: false
      },
    };
  }
}

export default new UserProfileService();
