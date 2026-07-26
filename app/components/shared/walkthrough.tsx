import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import Button from "../ui/button";
import Typography from "../ui/typography";

export interface WalkthroughStep {
  image?: string;
  icon?: LucideIcon;
  title: string;
  description: string;
}

interface WalkthroughProps {
  steps: WalkthroughStep[];
  onFinish: () => void;
  nextLabel?: string;
  finishLabel?: string;
}

export default function Walkthrough({
  steps,
  onFinish,
  nextLabel = "Próximo",
  finishLabel = "Concluir",
}: WalkthroughProps) {
  const [stepIndex, setStepIndex] = useState(0);

  const step = steps[stepIndex];
  const isLastStep = stepIndex === steps.length - 1;
  const Icon = step.icon;

  function handlePress() {
    if (isLastStep) {
      onFinish();
      return;
    }

    setStepIndex((index) => index + 1);
  }

  return (
    <div className="flex flex-1 flex-col justify-between gap-8 pb-4">
      {step.image && (
        <div className="flex h-135 w-full items-center justify-center bg-[#FDF4F0]">
          <img
            src={step.image}
            alt={step.title}
            className="h-95 w-full object-contain"
          />
        </div>
      )}

      {!step.image && Icon && (
        <div className="flex h-120 w-full items-center justify-center bg-[#FDF4F0]">
          <Icon size={64} color="#F67653" />
        </div>
      )}

      <div className="flex flex-col gap-24">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3 px-6">
            <Typography variant="h2" className="text-center">
              {step.title}
            </Typography>

            <Typography variant="body" className="text-center">
              {step.description}
            </Typography>
          </div>

          <div className="flex flex-row items-center justify-center gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full ${
                  index === stepIndex
                    ? "w-5 bg-[#F67653]"
                    : "w-2 bg-[#EAEAEA] contrast:bg-black"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="px-6">
          <Button
            text={isLastStep ? finishLabel : nextLabel}
            onPress={handlePress}
          />
        </div>
      </div>
    </div>
  );
}
