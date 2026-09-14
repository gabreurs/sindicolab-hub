import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AcademyProviders } from "@/components/academy/AcademyProviders";

export const Route = createFileRoute("/academy")({
  component: AcademyLayout,
});

function AcademyLayout() {
  return (
    <AcademyProviders>
      <Outlet />
    </AcademyProviders>
  );
}
