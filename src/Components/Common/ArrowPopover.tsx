import { Box, IconButton, Popover as MuiPopover } from "@mui/material";
import { motion } from "framer-motion";
import { FC, MouseEvent, useState } from "react";
import { Colors } from "../../Lib/Constants/Colors";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export const ArrowPopover: FC = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? "popover" : undefined;

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box
      zIndex={1000}
    >
      <Box
        color={Colors.darkBlue}
      >
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: !open ? 0 : 180 }}
        >
          <IconButton onClick={handleClick}>
            <KeyboardArrowDownIcon />
          </IconButton>
        </motion.div>
      </Box>
      <MuiPopover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {children}
      </MuiPopover>
    </Box>
  );
};
