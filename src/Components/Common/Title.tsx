import React, { FC } from "react";
import { Box, Typography } from "@mui/material";

type Props = {
  text: string;
  icon?: JSX.Element;
  mt?: number;
};

export const Title: FC<Props> = ({ text, icon, mt }) => {
  return (
    <Box display="flex" alignItems="center" mt={mt}>
      {icon && (<Box component="span" mr={1}>{icon}</Box>)} 
      <Typography>{text}</Typography>
    </Box>
  );
};
