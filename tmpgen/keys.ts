import { tables } from "@/services/db/seed";
for (const [name, rows] of Object.entries(tables as Record<string, any[]>)) {
  const keys = new Map<string, Set<string>>();
  for (const r of rows) for (const [k, v] of Object.entries(r)) {
    keys.set(k, (keys.get(k) ?? new Set()).add(v === null ? "null" : Array.isArray(v) ? "array" : typeof v));
  }
  console.log(`${name} (${rows.length}): ` + [...keys].map(([k, t]) => `${k}:${[...t].join("|")}`).join(", "));
}
