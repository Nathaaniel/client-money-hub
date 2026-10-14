import PublicSelector from "./selector/PublicSelector.jsx";
import OnlineSelector from "./selector/OnlineSelector.jsx";
import ManagerSelector from "./selector/ManagerSelector.jsx";

/* One version of the selector per channel. Each starts fresh when the channel or example firm changes. */
const VIEWS = { public: PublicSelector, online: OnlineSelector, manager: ManagerSelector };

export default function Selector({ channel, sector, setSector, go }) {
  const View = VIEWS[channel];
  return <View key={`${channel}-${sector}`} sector={sector} setSector={setSector} go={go} />;
}
