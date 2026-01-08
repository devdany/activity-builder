import { ActivityBuilder } from "@/components/ActivityBuilder";
import { ActivityBuilderProvider } from "./contexts/activity-builder/provider";

function App() {
  return (
    <ActivityBuilderProvider>
      <ActivityBuilder />
    </ActivityBuilderProvider>
  );
}

export default App;
