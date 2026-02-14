import type { Course } from "./meshApi";

export function resolveGridCollisions(items: Course[]): Course[] {
  // clonamos para no mutar el array original
  const next = items.map((it) => ({
    ...it,
    grid: { ...it.grid },
  }));

  // orden estable: row, col, y si empatan, orden original
  const ordered = next
    .map((it, idx) => ({ it, idx }))
    .sort((a, b) => {
      const ra = a.it.grid.row ?? 1e9;
      const rb = b.it.grid.row ?? 1e9;
      if (ra !== rb) return ra - rb;

      const ca = a.it.grid.col ?? 1e9;
      const cb = b.it.grid.col ?? 1e9;
      if (ca !== cb) return ca - cb;

      return a.idx - b.idx;
    });

  const used = new Set<string>();

  for (const { it } of ordered) {
    const r = it.grid.row;
    let c = it.grid.col;

    if (r == null || c == null) continue;

    while (used.has(`${r}:${c}`)) {
      c += 1;
    }

    it.grid.col = c;
    used.add(`${r}:${c}`);
  }

  return next;
}
