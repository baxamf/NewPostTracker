import { createTheme, ThemeProvider } from "@mui/material";
import React, { useMemo } from "react";

export default function ThemeUI({ children }: React.PropsWithChildren) {
  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: "Poppins",
        },
        palette: {
          primary: {
            main: "#012c3d",
          },
          error: {
            main: "#f8444f",
          },
          background: {
            default: "#f7f8f3",
            paper: "#f7f8f3",
          },
        },
      }),
    []
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
