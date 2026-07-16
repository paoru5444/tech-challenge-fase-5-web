import { useCallback } from "react";
import TitleDisplay from "~/components/shared/title-display";
import Card from "~/components/ui/card";
import Typography from "~/components/ui/typography";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import * as actions from "../store/actions";
import { selectFontSize } from "../store/selector";
import type { SetupType } from "../store/slices";

export default function FontSizeSetupCard() {
  const dispatch = useAppDispatch();

  const currentFontSize = useAppSelector(selectFontSize);
  const fontSizes: SetupType["fontSize"][] = ["small", "default", "big"];

  const onSelectFontSize = useCallback(
    (fontSize: SetupType["fontSize"]) => {
      dispatch(actions.updateFontSize(fontSize));
    },
    [dispatch],
  );

  return (
    <Card className="flex flex-col gap-4">
      <TitleDisplay
        letter="T"
        title="Tamanho da letra"
        description="Escolha o tamanho que é mais fácil para ler"
      />

      <div className="grid grid-cols-2 gap-2">
        {fontSizes.map((size) => {
          const isCurrentFontSize = currentFontSize === size;

          return (
            <button
              key={size}
              type="button"
              onClick={() => onSelectFontSize(size)}
              className={`flex h-10 flex-col justify-end rounded-[10px] bg-[#EAEAEA] p-1.5 text-left ${
                isCurrentFontSize
                  ? "border-2 border-[#39A304]"
                  : "border border-[#EAEAEA]"
              }`}
            >
              <Typography variant="bodySmall">{size}</Typography>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
