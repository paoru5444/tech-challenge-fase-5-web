import TitleDisplay from "~/components/shared/title-display";
import Card from "~/components/ui/card";
import { preferencesNames } from "~/constants/conts";
import type { SetupType } from "../store/slices";
import Typography from "~/components/ui/typography";

export type SetupListKey = Exclude<keyof SetupType, "feedback">;

interface SetupCardProps<k extends SetupListKey> {
  list: SetupType[k][];
  onSelectItem: (value: SetupType[k]) => void;
  title: string;
  description: string;
  letter: string;
  currentItem: SetupType[k];
}

export default function SetupCard<k extends SetupListKey>({
  list,
  onSelectItem,
  title,
  description,
  letter,
  currentItem,
}: SetupCardProps<k>) {
  return (
    <Card className="flex flex-col gap-4">
      <TitleDisplay letter={letter} title={title} description={description} />

      <div className="grid grid-cols-2 gap-2">
        {list.map((item) => {
          const isCurrentItem = currentItem === item;

          return (
            <button
              key={String(item)}
              type="button"
              onClick={() => onSelectItem(item)}
              className={`flex h-10 flex-col justify-end rounded-[10px] bg-[#EAEAEA] p-1.5 text-left ${
                isCurrentItem
                  ? "border-[3px] border-[#39A304]"
                  : "border border-[#EAEAEA]"
              }`}
            >
              <Typography variant="bodySmall">
                {preferencesNames[String(item)]}
              </Typography>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
