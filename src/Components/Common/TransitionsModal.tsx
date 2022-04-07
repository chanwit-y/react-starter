import CloseIcon from "@mui/icons-material/Close";
import {
  styled,
  Box,
  Fade,
  IconButton,
  Modal as MuiModal,
} from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";
import { Title } from ".";
import { Colors } from "../../Lib/Constants/Colors";

const Modal = styled(MuiModal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: 10,
});

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  title: string;
};

export const TransitionsModal: FC<Props> = ({
  open,
  setOpen,
  title,
  children,
}) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box
            width={500}
            bgcolor={Colors.white}
            borderRadius={1}
            overflow="hidden"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              p={2}
              sx={{ borderBottom: "1px solid rgba(0,0,0,0.12)" }}
            >
              <Title text={title} />
              <IconButton size="small" component="span" onClick={handleClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
            <Box
              maxHeight={500}
              width="auto"
            >
              {children}
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
