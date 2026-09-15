/**
 * ## Exercice 2 : Keyframes et Boucles
 * **Objectif** : Créer des animations cycliques complexes.
 * - Utiliser des tableaux de valeurs (keyframes) pour les propriétés `scale`, `rotate` et `borderRadius`.
 * - Mettre en place une boucle infinie avec `repeat: Infinity` et `repeatType: "reverse"`.
 */
export default function Exercice2() {
  return (
    <div className="flex aspect-square items-center justify-center gap-10 rounded-lg bg-slate-800">
      <div className="h-1/3 w-1/3 bg-rose-400 shadow-xl"></div>
    </div>
  );
}
