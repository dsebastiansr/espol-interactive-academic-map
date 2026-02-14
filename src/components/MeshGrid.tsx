import type { Course } from '../lib/meshApi';
import SubjectButton from './SubjectButton';

function bounds(courses: Course[]) {
  let maxRow = 0,
    maxCol = 0;
  for (const c of courses) {
    if (c.grid.row) maxRow = Math.max(maxRow, c.grid.row);
    if (c.grid.col) maxCol = Math.max(maxCol, c.grid.col);
  }
  return { maxRow, maxCol };
}

export function MeshGrid({
  courses,
  passed,
  onToggle,
}: {
  courses: Course[];
  passed: Record<string, boolean>;
  onToggle: (id: string) => void;
}) {
  const { maxRow, maxCol } = bounds(courses);

  return (
    <div
      className="grid gap-2"
      style={{
        gridTemplateRows: `repeat(${maxRow}, minmax(100px, 1fr))`,
        gridTemplateColumns: `repeat(${maxCol}, minmax(180px, 250px))`,
      }}
    >
      {courses.map((c) => {
        const isPassed = !!passed[c.id];
        return (
          <SubjectButton
            key={c.id}
            gridRow={c.grid.row ?? 1}
            gridColumn={c.grid.col ?? 1}
            c={c}
          />
          // <button
          //   key={c.id}
          //   onClick={() => onToggle(c.id)}
          //   className={[
          //     "rounded-xl border p-2 text-left transition",
          //     isPassed ? "bg-green-100 border-green-300" : "bg-white hover:shadow",
          //   ].join(" ")}
          //   style={{
          //     gridRow: c.grid.row ?? undefined,
          //     gridColumn: c.grid.col ?? undefined,
          //   }}
          // >
          //   <div className="text-xs opacity-70">{c.code ?? "CPI"} · {c.unit}</div>
          //   <div className="text-sm font-semibold leading-tight">{c.name}</div>
          //   <div className="text-xs opacity-70">
          //     {c.credits ?? "-"} créditos
          //     {c.approved_count_requirement ? ` · req: ${c.approved_count_requirement} aprobadas` : ""}
          //   </div>
          // </button>
        );
      })}
    </div>
  );
}
