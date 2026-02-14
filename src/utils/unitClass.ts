export default function unitClass(unit: "BASICO" | "PROFESIONAL" | "INTEGRACION" | "CPI") {
  switch (unit) {
    case "BASICO":
      return "bg-basic/40 border-basic text-basic";

    case "PROFESIONAL":
      return "bg-profesional/25 border-profesional text-profesional";

    case "INTEGRACION":
      return "bg-integradora/20 border-integradora text-integradora";

    case "CPI":
      return "bg-cpi/20 border-cpi text-cpi";
      
    default:
      return "bg-slate-50 border-slate-200 text-slate-950";
  }
}