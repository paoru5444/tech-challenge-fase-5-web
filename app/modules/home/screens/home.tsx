import DashboardLayout from "~/components/layout/dashboard-layout";
import PageHeader from "~/components/shared/page-header";
import Card from "~/components/ui/card";

export default function HomeScreen() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Início"
        description="Bem-vindo(a) de volta! Aqui você acompanha suas atividades."
      />

      <Card className="text-sm text-[#8A8783]">
        Nenhuma atividade por aqui ainda.
      </Card>
    </DashboardLayout>
  );
}
