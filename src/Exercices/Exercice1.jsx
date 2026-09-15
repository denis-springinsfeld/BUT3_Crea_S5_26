/**
 * ## Exercice 1 : Orchestration (Stagger)
 * **Objectif** : Animer plusieurs éléments de manière séquentielle.
 * - Créer un conteneur parent et deux enfants.
 * - Utiliser `staggerChildren` dans le variant parent pour décaler l'apparition des enfants.
 * - Faire venir un enfant du haut et l'autre du bas.
 */
export default function Exercice1() {
  return (
    <div className="flex aspect-square items-center justify-center gap-10 rounded-lg bg-slate-800">
      {/* Carré */}
      <div className="h-20 w-20 rounded-lg bg-stone-100"></div>

      {/* Cercle */}
      <div className="h-20 w-20 rounded-full bg-stone-100"></div>
    </div>
  );
}
