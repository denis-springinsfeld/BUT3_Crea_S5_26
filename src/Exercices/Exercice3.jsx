/**
 * ## Exercice 3 : Interactions (Hover & Tap)
 * **Objectif** : Rendre l'interface réactive au curseur et au clic.
 * - Créer un bouton interactif utilisant `whileHover` et `whileTap`.
 * - Configurer une transition de type `spring` (ressort) avec `stiffness` et `damping`.
 * - Utiliser des noms de variants sémantiques (`rest`, `hover`, `tap`).
 */
export default function Exercice3() {
  return (
    <div className="flex aspect-square items-center justify-center gap-10 rounded-lg bg-slate-800">
      <button className="w-1/2 cursor-pointer rounded-lg bg-emerald-600 py-4 text-2xl font-light tracking-wide text-gray-100">
        subscribe
      </button>
    </div>
  );
}
