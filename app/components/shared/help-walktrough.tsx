import { appWalkthroughSteps } from "~/modules/onboarding/walkthrough-steps";
import type { WalkthroughStep } from "./walkthrough";
import Walkthrough from "./walkthrough";

interface HelpWalktroughProps {
  onFinish: () => void;
  visible: boolean;
}

export default function HelpWalktrough({
  onFinish,
  visible,
}: HelpWalktroughProps) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
      <Walkthrough steps={appWalkthroughSteps} onFinish={onFinish} />
    </div>
  );
}
