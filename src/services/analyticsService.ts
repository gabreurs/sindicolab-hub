export type AnalyticsEventType = "course_view" | "checkout_click" | "material_download";

export type AnalyticsEvent = {
  id: string;
  type: AnalyticsEventType;
  productId: string;
  productSlug: string;
  productTitle: string;
  value?: number;
  source?: string;
  createdAt: string;
};

export type ProductMetric = {
  id: string;
  slug: string;
  title: string;
  views: number;
  checkoutClicks: number;
  downloads: number;
  conversionRate: number;
};

const STORAGE_KEY = "sindicolab.analytics.events.v1";
const MAX_EVENTS = 5000;

function readEvents(): AnalyticsEvent[] {
  if (typeof window === "undefined") return [];
  try {
    const value = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function writeEvents(events: AnalyticsEvent[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(events.slice(-MAX_EVENTS)));
  window.dispatchEvent(new CustomEvent("sindicolab:analytics"));
}

export function trackAnalyticsEvent(event: Omit<AnalyticsEvent, "id" | "createdAt">) {
  if (typeof window === "undefined") return;
  writeEvents([
    ...readEvents(),
    {
      ...event,
      id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
      createdAt: new Date().toISOString(),
    },
  ]);
}

export function trackCourseView(course: { id: string; slug: string; title: string }) {
  if (typeof window === "undefined") return;
  const key = `sindicolab.course-view.${course.id}`;
  if (window.sessionStorage.getItem(key)) return;
  window.sessionStorage.setItem(key, "1");
  trackAnalyticsEvent({
    type: "course_view",
    productId: course.id,
    productSlug: course.slug,
    productTitle: course.title,
  });
}

export function trackCheckoutClick(course: { id: string; slug: string; title: string; price_brl?: number | null }, source: string) {
  trackAnalyticsEvent({
    type: "checkout_click",
    productId: course.id,
    productSlug: course.slug,
    productTitle: course.title,
    value: course.price_brl ?? undefined,
    source,
  });
}

export function trackMaterialDownload(material: { id: string; slug: string; title: string }) {
  trackAnalyticsEvent({
    type: "material_download",
    productId: material.id,
    productSlug: material.slug,
    productTitle: material.title,
  });
}

export function getAnalyticsSnapshot() {
  const events = readEvents();
  const products = new Map<string, ProductMetric>();

  for (const event of events) {
    const current = products.get(event.productId) ?? {
      id: event.productId,
      slug: event.productSlug,
      title: event.productTitle,
      views: 0,
      checkoutClicks: 0,
      downloads: 0,
      conversionRate: 0,
    };
    if (event.type === "course_view") current.views += 1;
    if (event.type === "checkout_click") current.checkoutClicks += 1;
    if (event.type === "material_download") current.downloads += 1;
    current.conversionRate = current.views > 0 ? (current.checkoutClicks / current.views) * 100 : 0;
    products.set(event.productId, current);
  }

  return {
    events,
    products: [...products.values()].sort((a, b) => b.checkoutClicks + b.views + b.downloads - (a.checkoutClicks + a.views + a.downloads)),
    courseViews: events.filter((event) => event.type === "course_view").length,
    checkoutClicks: events.filter((event) => event.type === "checkout_click").length,
    materialDownloads: events.filter((event) => event.type === "material_download").length,
  };
}