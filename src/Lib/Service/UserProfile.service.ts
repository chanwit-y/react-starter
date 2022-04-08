import { QueryServiceType } from "src/@types/ServiceType";
import Env from "../Utils/Env";
import { HttpClient, unwrap } from "../Utils/HttpClient";
import { UserProfile } from './../DTO/UserProfile.dto';

class UserProfileService extends HttpClient {
  public getByEmail(userId: string): QueryServiceType<UserProfile> {
    return {
      queryKey: ["get userprofile by id"],
      queryFn: async (): Promise<UserProfile> => {
        return userId
          ? unwrap<UserProfile>(
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
