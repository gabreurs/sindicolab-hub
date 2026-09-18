import { useCallback, useEffect, useState } from "react";
import { Card, EmptyState, PageHeader, Stat, TableWrap } from "@/components/console/ui";
import { getAnalyticsSnapshot } from "@/services/analyticsService";

export function AnalyticsDashboard() {
  const [snapshot, setSnapshot] = useState(getAnalyticsSnapshot);
  const refresh = useCallback(() => setSnapshot(getAnalyticsSnapshot()), []);

  useEffect(() => {
    window.addEventListener("storage", refresh);
    window.addEventListener("sindicolab:analytics", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("sindicolab:analytics", refresh);
    };
  }, [refresh]);

  const rate = snapshot.courseViews > 0
    ? (snapshot.checkoutClicks / snapshot.courseViews) * 100
    : 0;

  return (
    <>
      <PageHeader
        title="Métricas"
        description="Acessos aos cursos, saídas para compra e downloads registrados neste navegador."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Acessos aos cursos" value={snapshot.courseViews} hint="Visitas únicas por sessão" />
        <Stat label="Cliques na Kiwify" value={snapshot.checkoutClicks} hint="Intenções de compra" />
        <Stat label="Downloads" value={snapshot.materialDownloads} hint="Materiais baixados" />
        <Stat label="Conversão para checkout" value={`${rate.toFixed(1)}%`} hint="Cliques ÷ acessos" />
      </div>

      <Card
        className="mt-5"
        title="Desempenho por produto"
        description="A compra concluída dependerá da integração futura com a Kiwify; por enquanto, conversão significa clique para o checkout."
        padded={false}
      >
        {snapshot.products.length === 0 ? (
          <EmptyState title="Ainda não há atividade" description="Os dados aparecerão após acessos, cliques e downloads neste navegador." />
        ) : (
          <TableWrap>
            <table className="c-table">
              <thead><tr><th>Produto</th><th>Acessos</th><th>Cliques</th><th>Downloads</th><th>Conversão</th></tr></thead>
              <tbody>
                {snapshot.products.map((product) => (
                  <tr key={product.id}>
                    <td><span className="font-medium">{product.title}</span><span className="ml-2 text-xs c-muted">{product.slug}</span></td>
                    <td className="tabular-nums">{product.views}</td>
                    <td className="tabular-nums">{product.checkoutClicks}</td>
                    <td className="tabular-nums">{product.downloads}</td>
                    <td className="tabular-nums">{product.views ? `${product.conversionRate.toFixed(1)}%` : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrap>
        )}
      </Card>
    </>
  );
}