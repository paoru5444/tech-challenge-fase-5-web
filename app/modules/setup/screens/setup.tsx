import { useCallback } from "react";
import DashboardLayout from "~/components/layout/dashboard-layout";
import PageHeader from "~/components/shared/page-header";
import TitleDisplay from "~/components/shared/title-display";
import Card from "~/components/ui/card";
import { Switch } from "~/components/ui/switch";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import SetupCard from "../components/setup-card";
import * as actions from "../store/actions";
import {
  selectContrastLevel,
  selectFeedback,
  selectFontSize,
  selectInterfaceMode,
  selectSpacementSize,
} from "../store/selector";
import type { FeedbackType, SetupType } from "../store/slices";
import Typography from "~/components/ui/typography";

export default function SetupScreen() {
  const dispatch = useAppDispatch();

  const currentFontSize = useAppSelector(selectFontSize);
  const currentContrastLevel = useAppSelector(selectContrastLevel);
  const currentSpacementSize = useAppSelector(selectSpacementSize);
  const currentInterfaceMode = useAppSelector(selectInterfaceMode);
  const currentFeedback = useAppSelector(selectFeedback);

  const onSelectFontSize = useCallback(
    (fontSize: SetupType["fontSize"]) => {
      dispatch(actions.updateFontSize(fontSize));
    },
    [dispatch],
  );

  const onSelectContrastLevel = useCallback(
    (contrastLevel: SetupType["contrastLevel"]) => {
      dispatch(actions.updateContrastLevel(contrastLevel));
    },
    [dispatch],
  );

  const onSelectSpacementSize = useCallback(
    (spacementSize: SetupType["spacementSize"]) => {
      dispatch(actions.updateSpacementSize(spacementSize));
    },
    [dispatch],
  );

  const onSelectInterfaceMode = useCallback(
    (interfaceMode: SetupType["interfaceMode"]) => {
      dispatch(actions.updateInterfaceMode(interfaceMode));
    },
    [dispatch],
  );

  type FeedbackProps = {
    title: string;
    description: string;
    type: keyof FeedbackType;
    enabled: boolean;
  };

  const feedbackConfirmations: FeedbackProps[] = [
    {
      title: "Feedback Visual",
      description: "Animações e destaques ao completar ações",
      type: "visualFeedback",
      enabled: currentFeedback.visualFeedback,
    },
    {
      title: "Pedir confirmação extra",
      description: "Confirmar antes de excluir ou enviar algo importante",
      type: "extraConfirmation",
      enabled: currentFeedback.extraConfirmation,
    },
    {
      title: "Sons de confirmação",
      description: "Um som suave ao concluir uma tarefa",
      type: "soundConfirmation",
      enabled: currentFeedback.soundConfirmation,
    },
  ];

  const onSelectFeedback = useCallback(
    (feedback: FeedbackProps) => {
      dispatch(
        actions.updateFeedback({
          [feedback.type]: !feedback.enabled,
        }),
      );
    },
    [dispatch],
  );

  return (
    <DashboardLayout>
      <PageHeader
        title="Personalizar Experiência"
        description="Ajuste o aplicativo do seu jeito para ter mais conforto e facilidade"
      />

      <SetupCard<"fontSize">
        list={["small", "default", "big"]}
        onSelectItem={onSelectFontSize}
        title="Tamanho da letra"
        description="Escolha o tamanho que é mais fácil para ler"
        letter="T"
        currentItem={currentFontSize}
      />

      <SetupCard<"contrastLevel">
        list={["default", "high"]}
        onSelectItem={onSelectContrastLevel}
        title="Nível de Contraste"
        description="Torna as cores mais distintas para facilitar a leitura"
        letter="C"
        currentItem={currentContrastLevel}
      />

      <SetupCard<"spacementSize">
        list={["small", "default", "big"]}
        onSelectItem={onSelectSpacementSize}
        title="Espaçamento"
        description="Controla a distância entre os elementos na tela"
        letter="E"
        currentItem={currentSpacementSize}
      />

      <SetupCard<"interfaceMode">
        list={["simple", "default"]}
        onSelectItem={onSelectInterfaceMode}
        title="Interface"
        description="Controla a distância entre os elementos na tela"
        letter="I"
        currentItem={currentInterfaceMode}
      />

      <Card className="flex flex-col gap-4">
        <TitleDisplay letter="F" title="Feedbacks e Confirmações" />

        <div className="flex flex-col gap-2">
          {feedbackConfirmations.map((item) => (
            <div
              key={item.title}
              role="button"
              tabIndex={0}
              onClick={() => onSelectFeedback(item)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onSelectFeedback(item);
                }
              }}
              className="flex min-h-10 cursor-pointer items-center justify-between rounded-[10px] p-1.5"
            >
              <div className="flex-1">
                <Typography variant="subtitle">{item.title}</Typography>
                <Typography variant="body">{item.description}</Typography>
              </div>

              <Switch
                checked={item.enabled}
                onChange={() => onSelectFeedback(item)}
              />
            </div>
          ))}
        </div>
      </Card>
    </DashboardLayout>
  );
}
