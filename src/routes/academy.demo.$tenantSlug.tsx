import { createFileRoute, useParams, Navigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useTenant } from "@/lib/tenant/TenantProvider";

/**
 * Pré-visualização de tenant (`/academy/demo/:slug`) — mesma função do
 * `/demo/:slug` da Academy original: aplica o branding da organização e volta
 * para a entrada da Academy. O seletor só muda a visualização; as permissões
 * continuam governadas pelos papéis.
 */
export const Route = createFileRoute("/academy/demo/$tenantSlug")({
  ssr: false,
  component: DemoRedirect,
});

function DemoRedirect() {
  const { tenantSlug } = useParams({ from: "/academy/demo/$tenantSlug" });
  const { overrideSlug } = useTenant();
  useEffect(() => {
    overrideSlug(tenantSlug);
  }, [tenantSlug, overrideSlug]);
  return <Navigate to="/academy" />;
}
