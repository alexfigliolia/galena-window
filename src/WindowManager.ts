import { State } from "@figliolia/galena";
import type { IScreen } from "./types";

export class WindowManager extends State<IScreen> {
  public initialized = false;
  constructor() {
    super("Screen", {
      width: window?.innerWidth ?? 0,
      height: window?.innerHeight ?? 0,
    });
  }

  public initialize() {
    if (!this.initialized && typeof window !== "undefined") {
      this.initialized = true;
      window.addEventListener("resize", this.onResize);
    }
  }

  public destroy() {
    if (typeof window !== "undefined") {
      this.initialized = false;
      window.removeEventListener("resize", this.onResize);
    }
  }

  private onResize = () => {
    this.update(state => {
      state.width = window?.innerWidth ?? 0;
      state.height = window?.innerHeight ?? 0;
    });
  };
}
