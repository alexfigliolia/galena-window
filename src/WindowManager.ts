import { State } from "@figliolia/galena";
import type { IPriorityLevel, IScreen } from "./types";

export class WindowManager extends State<IScreen> {
  public initialized = false;
  public priority: IPriorityLevel;
  constructor(priority: IPriorityLevel = "BATCHED") {
    super("Screen", {
      width: window?.innerWidth ?? 0,
      height: window?.innerHeight ?? 0,
    });
    this.priority = priority;
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
    this[this.updateMethod](state => {
      state.width = window?.innerWidth ?? 0;
      state.height = window?.innerHeight ?? 0;
    });
  };

  private get updateMethod() {
    switch (this.priority) {
      default:
      case "BATCHED":
        return "update";
      case "IMMEDIATE":
        return "priorityUpdate";
      case "MICROTASK":
        return "backgroundUpdate";
    }
  }
}
