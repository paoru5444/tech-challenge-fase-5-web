import { selectUser } from "~/modules/auth/store/selectors";
import { useAppSelector } from "~/store/hooks";
import Avatar from "./avatar";
import Typography from "./typography";

export default function Header() {
  const user = useAppSelector(selectUser);

  return (
    <div className="flex flex-row gap-2">
      <Avatar user={user} />

      <div>
        <Typography variant="subtitle">Olá, {user?.displayName}</Typography>

        <Typography variant="caption">Quinta. 11 de Junho</Typography>
      </div>
    </div>
  );
}
