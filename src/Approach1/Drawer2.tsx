import React, { memo } from "react";
import styled from "styled-components";
import Drawer1 from "./Drawer1";
import Drawer3 from "./Drawer3";
import { drawerActions } from "../Utils/drawerActions";

const DrawerWrap = styled.div`
  width: 75vw;
`;

const Drawer2 = (props: any) => {
  const { name, onClose, dispatch } = props;
  const addDrawer = (component: any) => {
    dispatch(
      drawerActions.navigateForward({
        to: component
      })
    );
  };

  return (
    <DrawerWrap>
      <h1>Drawer2</h1>
      <button onClick={() => onClose({ childData: {} })}>Close</button>
      <button
        onClick={() => addDrawer({ name: "drawer1", component: Drawer1 })}
      >
        Open Drawer1
      </button>
      <button
        onClick={() => addDrawer({ name: "drawer3", component: Drawer3 })}
      >
        Open Drawer3
      </button>
    </DrawerWrap>
  );
};

export default Drawer2;
