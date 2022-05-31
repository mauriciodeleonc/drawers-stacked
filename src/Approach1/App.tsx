import "../styles.css";

import Drawers from "./Drawers";
import Drawer1 from "./Drawer1";
import { useDrawers } from "../Utils/drawerUtils";
import { drawerActions } from "../Utils/drawerActions";

export default function App() {
  const { state, dispatch } = useDrawers();

  const addDrawer = async () => {
    await dispatch(
      drawerActions.navigateForward({
        to: {
          name: "drawer1",
          component: Drawer1
        }
      })
    );
  };

  const onCloseLast = (childData: any) => {
    alert("Previous Drawer: " + JSON.stringify(childData, null, " "));
  };

  return (
    <div className="App">
      <h1>Approach 1</h1>
      <button onClick={addDrawer}>Open Drawer1</button>
      <Drawers
        drawers={state.drawers}
        dispatch={dispatch}
        onCloseLastDrawer={onCloseLast}
      />
    </div>
  );
}
