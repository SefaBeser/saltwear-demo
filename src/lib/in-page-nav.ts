/** Aynı sayfa içi bölüme kaydır (Next.js hash navigasyonundan kaçınır) */
export function scrollToPageSection(targetId: string) {
  if (typeof document === "undefined") return;
  const el = document.getElementById(targetId);
  if (!el) return;
  try {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch {
    el.scrollIntoView();
  }
  try {
    window.history.replaceState(null, "", `#${targetId}`);
  } catch {
    /* bazı ortamlarda replaceState kısıtlı olabilir */
  }
}
