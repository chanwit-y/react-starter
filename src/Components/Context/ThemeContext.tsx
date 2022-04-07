import React, { FC, createContext } from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { blue, green, red } from "@mui/material/colors";
import { Colors } from "../../Lib/Constants/Colors";

type ContextType = {};
const ThemeContext = createContext<ContextType>({});

type Props = {};
const ThemeProvider: FC<Props> = ({ children }) => {
  const theme = createTheme({
    palette: {
      primary: {
        // main: blue["A700"],
        main: Colors.banpuNextGreen,
      },
      secondary: {
        main: red[400],
      },
    },
    typography: {
      fontFamily: [
        "NotoSans-Regular",
        "NotoSans-Medium",
        "NotoSans-Bold",
        "NotoSans-Light",
        "NotoSans-Thin",
      ].join(","),
      // fontSize: 20,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            // fontcolor: "red"
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            // height: 60,
            // // alignItems: "center",
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            // padding: 0,
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: "none",
            // letterSpacing: 1,
            // height: 30,
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            "&.Mui-required > span": {
              color: Colors.pmRed,
            },
          },
        },
      },
      MuiTableHead: {
        // styleOverrides: {
        //   root: {
        //     backgroundColor: "#edf6fe",
        //   }
        // }
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            cursor: "pointer",
            "&:hover:not(.Mui-disabled)": {
              cursor: "pointer",
              // backgroundColor: `${Colors.rowHover} !important`,
              // backgroundColor: `${Colors.rowHover}`,
            },
            // hover: {
            //   // backgroundColor: Colors.primary
            // }
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            cursor: "pointer",
            "&:hover:not(.Mui-disabled)": {
              cursor: "pointer",
              // backgroundColor: `${Colors.rowHover} !important`,
              // backgroundColor: `${Colors.rowHover}`,
            },
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            // minWidth: 30,
            // paddingLeft: 20,
          },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: {
            color: Colors.banpuNextGreen,
            "&.Mui-checked": {
              color: Colors.banpuNextGreen,
            },
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: Colors.opacityGray,
            "&.Mui-checked": {
              color: Colors.banpuNextGreen,
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            letterSpacing: 1,
            // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            // borderRadius: 3,
            // border: 0,
            // color: 'white',
            height: 40,
            // padding: '0 30px',
            // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
          },
          containedPrimary: {
            color: "white",
          },
          outlinedPrimary: {
            // backgroundColor: "white"
          },
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={{}}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
