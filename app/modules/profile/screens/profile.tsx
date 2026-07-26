import { ChevronRight, CircleHelp } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import DashboardLayout from "~/components/layout/dashboard-layout";
import HelpWalktrough from "~/components/shared/help-walktrough";
import TitleDisplay from "~/components/shared/title-display";
import Badge from "~/components/ui/badge";
import Button from "~/components/ui/button";
import Card from "~/components/ui/card";
import Divider from "~/components/ui/divider";
import Typography from "~/components/ui/typography";
import { preferencesNames } from "~/constants/conts";
import * as actions from "~/modules/auth/store/actions";
import { selectUser } from "~/modules/auth/store/selectors";
import { selecPreferences } from "~/modules/setup/store/selector";
import { useAppDispatch, useAppSelector } from "~/store/hooks";

const preferencesTitleNames = {
  contrastLevel: "Contraste",
  fontSize: "Tamanho da fonte",
  spacementSize: "Espaçamento",
  interfaceMode: "Interface",
  visualFeedback: "Feedback visual",
  extraConfirmation: "Confirmação extra",
};

export default function ProfileScreen() {
  const user = useAppSelector(selectUser);
  const preferences = useAppSelector(selecPreferences);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showHelp, setShowHelp] = useState(false);

  const logout = async () => {
    await dispatch(actions.logout());
    navigate("/sign-in", { replace: true });
  };

  const preferencesList = useMemo(() => {
    const { feedback, hasSeenWalkthrough, ...rest } = preferences;
    const normalizedPreferences = { ...rest, ...feedback };

    return Object.entries(normalizedPreferences);
  }, [preferences]);

  return (
    <DashboardLayout>
      <div className="flex flex-col">
        <Typography variant="h2">
          Informações do <span className="text-[#F67653]">Perfil</span>
        </Typography>

        <Typography variant="body">
          Suas informações e preferências salvas
        </Typography>
      </div>

      <Card>
        <TitleDisplay
          user={user}
          title={user?.displayName ?? ""}
          description={user?.age ? `${user?.age} anos` : ""}
        />
      </Card>

      <Card>
        <button
          type="button"
          onClick={() => setShowHelp(true)}
          className="flex w-full flex-row items-center justify-between"
        >
          <div className="flex flex-row items-center gap-2.5">
            <CircleHelp size={20} color="#F67653" />
            <Typography variant="subtitle">Como usar o app</Typography>
          </div>

          <ChevronRight size={20} color="#8A8783" />
        </button>
      </Card>

      <HelpWalktrough visible={showHelp} onFinish={() => setShowHelp(false)} />

      <Card className="flex flex-col gap-8">
        <TitleDisplay letter="P" title="Preferências ativas" />

        <div>
          {preferencesList.map(([key, value], index) => {
            const name =
              preferencesTitleNames[key as keyof typeof preferencesTitleNames];
            const badgeName = preferencesNames[String(value)];

            return (
              <div key={key}>
                {index > 0 && <Divider size={12} />}

                <div className="flex flex-row items-center justify-between">
                  <Typography variant="label">{name}</Typography>

                  <Badge text={badgeName} />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Button text="Sair da conta" onPress={logout} />
    </DashboardLayout>
  );
}
