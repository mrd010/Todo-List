import "./styles/normalize.css";
import "material-symbols/sharp.css";
import "./styles/index.scss";
import { initialize } from "./scripts/displayController";
import { loadWorkspace } from "./scripts/workspace";

loadWorkspace();
initialize();
