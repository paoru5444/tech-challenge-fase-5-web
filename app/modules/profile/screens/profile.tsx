import { useMemo } from "react";
import { useNavigate } from "react-router";
import DashboardLayout from "~/components/layout/dashboard-layout";
import PageHeader from "~/components/shared/page-header";
import TitleDisplay from "~/components/shared/title-display";
import Badge from "~/components/ui/badge";
import Button from "~/components/ui/button";
import Card from "~/components/ui/card";
import Divider from "~/components/ui/divider";
import { preferencesNames } from "~/constants/conts";
import Typography from "~/components/ui/typography";
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

  const logout = async () => {
    await dispatch(actions.logout());
    navigate("/sign-in", { replace: true });
  };

  const preferencesList = useMemo(() => {
    const { feedback, ...rest } = preferences;
    const normalizedPreferences = { ...rest, ...feedback };

    return Object.entries(normalizedPreferences);
  }, [preferences]);

  return (
    <DashboardLayout>
      <PageHeader
        title="Meu Perfil"
        description="Suas informações e preferências salvas"
      />

      <Card>
        <TitleDisplay
          user={user}
          title="João Lucas Pereira de Almeida"
          description="40 anos"
        />
      </Card>

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
