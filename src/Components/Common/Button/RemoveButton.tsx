import { styled, Button as MuiButton } from "@mui/material";
import { FC, ReactNode } from "react";

const Button = styled(MuiButton)(() => ({
  width: 140,
}));

type Props = {
  text: string;
  type?: "submit" | "reset" | "button";
  onClick?: Function;
  disabled?: boolean;
  startIcon?: ReactNode;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
};

export const RemoveButton: FC<Props> = ({
  text,
  disabled,
  type,
  startIcon,
  onClick,
  color,
}) => {
  return (
    <Button
      type={type}
      variant="contained"
      disabled={disabled}
      startIcon={startIcon}
      color={color}
      onClick={() => onClick && onClick()}
    >
      {text}
    </Button>
  );
};
