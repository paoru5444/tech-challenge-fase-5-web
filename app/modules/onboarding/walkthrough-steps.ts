import { ClockCheck, HandHeart, Sliders, SquarePlus } from "lucide-react";
import helpAddTasksImage from "~/assets/help-add-tasks.png";
import helpSetupImage from "~/assets/help-setup.png";
import helpTasksImage from "~/assets/help-tasks.png";
import type { WalkthroughStep } from "~/components/shared/walkthrough";

export const appWalkthroughSteps: WalkthroughStep[] = [
  {
    icon: HandHeart,
    title: "Bem-vindo(a) ao SeniorEase",
    description:
      "Vamos te mostrar, em poucos passos, como organizar seu dia sem complicação.",
  },
  {
    icon: SquarePlus,
    image: helpAddTasksImage,
    title: "Crie suas tarefas",
    description:
      "Toque no botão + para adicionar o que precisa fazer. Um título e uma descrição já bastam.",
  },
  {
    icon: ClockCheck,
    image: helpTasksImage,
    title: "Acompanhe tudo em um só lugar",
    description:
      "Veja o que ainda falta e o que já foi concluído, e marque suas tarefas ao clicar e acessar os detalhes.",
  },
  {
    icon: Sliders,
    image: helpSetupImage,
    title: "Deixe do seu jeito",
    description:
      "Em Configurações, ajuste o tamanho da fonte, o contraste e o espaçamento sempre que quiser.",
  },
];
