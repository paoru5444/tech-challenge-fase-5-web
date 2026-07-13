import { selectUser } from "~/modules/auth/store/selectors";
import { useAppSelector } from "~/store/hooks";
import Avatar from "./avatar";

export default function Header() {
  const user = useAppSelector(selectUser);

  return (
    <div className="flex flex-row gap-2">
      <Avatar user={user} />

      <div>
        <p className="text-base leading-normal font-semibold tracking-[-0.4px]">
          Olá, {user?.displayName}
        </p>

        <p className="text-[10px] leading-normal font-medium tracking-[-0.2px] text-[#828282]">
          Quinta. 11 de Junho
        </p>
      </div>
    </div>
  );
}
