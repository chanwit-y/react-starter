import { Button as MuiButton, styled } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { FC } from "react";

const Button = styled(MuiButton)(() => ({
  width: 140,
  color: "grey",
  borderColor: "grey",
  "&:hover": {
    borderColor: "grey",
    boxShadow: "none",
  },
}));

type Props = {
  onClick?: Function;
};

export const CancelButton: FC<Props> = ({ onClick }) => {
  return (
    <Button
      variant="outlined"
      startIcon={<CancelOutlinedIcon />}
      onClick={() => onClick && onClick()}
    >
      Cancel
    </Button>
  );
};
