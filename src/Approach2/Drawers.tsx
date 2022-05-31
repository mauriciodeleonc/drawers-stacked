import MuiDrawer from "@mui/material/Drawer";
import React from "react";
import { memo } from "react";
import { DrawerDef } from "../types";

function Drawers({ drawers }: { drawers: DrawerDef[] }) {
  if (drawers.length === 0) {
    return null;
  }

  return (
    <>
      {drawers.map((val: DrawerDef, i: number) => {
        const open = true;
        const anchor = i >= drawers.length - 1 ? "right" : "left";
        const myOnClose =
          anchor === "right" ? val.props.callbacks?.onClose : undefined;
        const sx = i < drawers.length - 2 ? { display: "none" } : undefined;

        return (
          <MuiDrawer
            key={i}
            sx={sx}
            open={open}
            anchor={anchor}
            // onClose={myOnClose}
          >
            {val}
          </MuiDrawer>
        );
      })}
    </>
  );
}

export default memo(Drawers);
