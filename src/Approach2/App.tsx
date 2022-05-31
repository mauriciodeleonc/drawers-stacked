import "../styles.css";

import Drawers from "./Drawers";
import Drawer1 from "./Drawer1";
import { useDrawers } from "../Utils/drawerUtils";
import { drawerActions } from "../Utils/drawerActions";
import { useEffect, useMemo, useState } from "react";
import Drawer2 from "./Drawer2";
import Drawer3 from "./Drawer3";
import { DrawerDef } from "../types";
import React from "react";

export default function App() {
  const { state, dispatch } = useDrawers();

  // const [drawers, setDrawers] = useState<any[]>([]);

  const navigateBack = async (cb: any) => {
    await dispatch(drawerActions.navigateBackApp2());
    if (cb) cb();
  };

  const onCloseLast = (childData: any) => {
    alert("Previous Drawer: " + JSON.stringify(childData, null, " "));
  };

  const addDrawer = async () => {
    await dispatch(
      drawerActions.navigateForward({
        to: {
          name: "drawer1",
          callbacks: {
            onClose: onCloseLast,
            onSubmit: () => console.log("submitting")
          },
          args: {
            title: "This comes from config"
          }
        }
      })
    );
  };

  const drawersMap: any = useMemo(
    () => ({
      drawer1: Drawer1,
      drawer2: Drawer2,
      drawer3: Drawer3
    }),
    []
  );

//   const [drawers, setDrawers] = useState<DrawerDef[]>([]);

  // let drawers: any[] | undefined | void = [];
	const drawers = useMemo(() => {
		if (!state.drawers || state.drawers.length === 0)
			return [];
			// setDrawers([]);

		let newDrawers: any[] = [];

		state.drawers.forEach((drawer: DrawerDef) => {
		if (drawersMap[drawer.name]) {
			const Component = drawersMap[drawer?.name];

			console.log(drawer);

			newDrawers = [
			...newDrawers,
			<Component {...drawer} dispatch={dispatch} navigateBack={navigateBack} />
			];
		}
		});

		// setDrawers(newDrawers);
		return newDrawers;
	}, [state.drawers]);

  return (
    <div className="App">
      <h1>Approach 2</h1>
      <button onClick={addDrawer}>Open Drawer1</button>
      <Drawers drawers={drawers} />
    </div>
  );
}
