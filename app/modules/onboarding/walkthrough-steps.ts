import { ClockCheck, HandHeart, Sliders, SquarePlus } from "lucide-react";
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
    title: "Crie suas tarefas",
    description:
      "Toque no botão + para adicionar o que precisa fazer. Um título e uma descrição já bastam.",
  },
  {
    icon: ClockCheck,
    title: "Acompanhe tudo em um só lugar",
    description:
      "Veja o que ainda falta e o que já foi concluído, e marque suas tarefas como feitas com um toque.",
  },
  {
    icon: Sliders,
    title: "Deixe do seu jeito",
    description:
      "Em Configurações, ajuste o tamanho da fonte, o contraste e o espaçamento sempre que quiser.",
  },
];
