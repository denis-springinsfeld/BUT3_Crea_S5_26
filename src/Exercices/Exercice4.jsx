/**
 * ## Exercice 4 : Le Drag (Glisser-Déposer)
 * **Objectif** : Manipuler des éléments à la souris.
 * - Rendre un carré déplaçable avec la propriété `drag`.
 * - Limiter la zone de mouvement avec `dragConstraints`.
 * - Ajouter un feedback visuel pendant le déplacement avec `whileDrag`.
 */
export default function Exercice4() {
  return (
    <div className="flex aspect-square items-center justify-center gap-10 rounded-lg bg-slate-800">
      <div className="h-1/3 w-1/3 cursor-grab rounded-3xl bg-orange-500 shadow-lg"></div>
    </div>
  );
}
