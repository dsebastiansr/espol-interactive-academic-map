import { useEffect, useMemo, useState } from "react";
import { fetchIndex, fetchMalla, type Course } from "./lib/meshApi";
import { resolveGridCollisions } from "./lib/resolveGrid";
import { MeshGrid } from "./components/MeshGrid";

function storageKey(career: string) {
  return `malla:passed:${career}`;
}

export default function App() {
  const [index, setIndex] = useState<{ code: string; name: string }[]>([]);
  const [career, setCareer] = useState("CI013");
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [passed, setPassed] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchIndex().then(setIndex).catch(console.error);
  }, []);

  useEffect(() => {
    setCourses(null);
    fetchMalla(career)
      .then((data) => {
        const fixed = resolveGridCollisions(data);
        setCourses(fixed);
        const raw = localStorage.getItem(storageKey(career));
        setPassed(raw ? JSON.parse(raw) : {});
      })
      .catch(console.error);
  }, [career]);

  // useEffect(() => {
  //   setCourses(null);
  //   fetchMalla(career).then((data) => {
  //     setCourses(data);
  //     const raw = localStorage.getItem(storageKey(career));
  //     setPassed(raw ? JSON.parse(raw) : {});
  //   }).catch(console.error);
  // }, [career]);

  function toggle(id: string) {
    setPassed((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem(storageKey(career), JSON.stringify(next));
      return next;
    });
  }

  const title = useMemo(() => {
    const found = index.find((x) => x.code === career);
    return found ? `${found.name} (${career})` : career;
  }, [index, career]);

  return (
    <div className="text-white min-h-screen bg-[#1c1c1d] px-12 py-10 flex flex-col items-center">

      <header className="flex flex-wrap items-center gap-3 mb-4">
        <h1 className="text-xl font-bold">{title}</h1>

        <select
          className="border rounded-lg px-3 py-2"
          value={career}
          onChange={(e) => setCareer(e.target.value)}
        >
          {index.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name} ({c.code})
            </option>
          ))}
        </select>
      </header>

      <div className="w-[95%]">
        {!courses ? (
          <div className="opacity-70">Cargando malla…</div>
        ) : (
          <MeshGrid courses={courses} passed={passed} onToggle={toggle} />
        )}        
      </div>
    </div>
  );
}
