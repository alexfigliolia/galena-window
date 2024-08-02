import { useEffect } from "react";
import type { WindowManager } from "./WindowManager";

export const useSetup = (State: WindowManager) => {
  useEffect(() => {
    State.initialize();
    return () => {
      State.destroy();
    };
  }, [State]);
};
