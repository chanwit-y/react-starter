import { styled, Button as MuiButton } from "@mui/material";
import { FC, ReactNode } from "react";

const Button = styled(MuiButton)(() => ({
  width: 140,
  background: "linear-gradient(45deg, #00B490 30%, #472F92 90%)",
}));

type Props = {
  text: string;
  type?: "submit" | "reset" | "button";
  onClick?: Function;
  disabled?: boolean;
  startIcon?: ReactNode;
};

export const PrimaryButton: FC<Props> = ({
  text,
  disabled,
  type,
  startIcon,
  onClick,
}) => {
  return (
    <Button
      type={type}
      variant="contained"
      disabled={disabled}
      startIcon={startIcon}
      onClick={() => onClick && onClick()}
    >
      {text}
    </Button>
  );
};
