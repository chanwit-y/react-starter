import { InteractionStatus, RedirectRequest } from "@azure/msal-browser";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { useMsal } from "@azure/msal-react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import Env from "../Lib/Utils/Env";
import { grey } from "@mui/material/colors";

export const AuthPage = () => {
  const { instance, inProgress } = useMsal();

  const handleSignin = async () => {
    const request: RedirectRequest = {
      scopes: [Env.API_SCOPE],
    };
    instance.loginRedirect(request);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100vw"
      height="100vh"
    >
      {inProgress === InteractionStatus.None ? (
        <Card elevation={3}>
          <CardContent>
            <Box p={1} minWidth={350}>
              <Typography
                gutterBottom
                color={grey[700]}
                fontSize={20}
                fontWeight={700}
                letterSpacing={1.5}
              >
                Approval Center
              </Typography>
              <Divider />
              <Box
                display="flex"
                mt={1}
                pt={1}
                alignItems="center"
                justifyItems="center"
              >
                <WarningRoundedIcon color="error" />
                <Typography px={1} variant="body1" letterSpacing={1.5}>
                  You're not logged in, please, login first
                </Typography>
              </Box>
            </Box>
          </CardContent>
          <CardActions>
            <Box display="flex" width="100%" justifyContent="end">
              <Button
                size="small"
                color="primary"
                onClick={() => handleSignin()}
              >
                Click here to continue
              </Button>
            </Box>
          </CardActions>
        </Card>
      ) : (
        <Typography color={grey[600]} fontSize={20} fontWeight={700}>
          Loading...
        </Typography>
      )}
    </Box>
  );
};
