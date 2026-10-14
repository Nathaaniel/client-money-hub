/* Maps each page id in STRUCTURE (src/config.js) to its component. */
import Home from "./Home.jsx";
import Market from "./Market.jsx";
import Segments from "./Segments.jsx";
import Regulation from "./Regulation.jsx";
import Journey from "./Journey.jsx";
import Selector from "./Selector.jsx";
import Console from "./Console.jsx";
import Integrations from "./Integrations.jsx";
import Assurance from "./Assurance.jsx";
import Scorecard from "./Scorecard.jsx";
import Sources from "./Sources.jsx";

export const PAGES = {
  home: Home,
  market: Market,
  segments: Segments,
  regulation: Regulation,
  journey: Journey,
  selector: Selector,
  console: Console,
  integrations: Integrations,
  assurance: Assurance,
  scorecard: Scorecard,
  sources: Sources
};
