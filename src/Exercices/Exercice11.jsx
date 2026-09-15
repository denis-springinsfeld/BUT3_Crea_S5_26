/**
 * ## Exercice 11 : Transformations de valeurs (`useTransform`)
 * **Objectif** : Créer des effets de parallaxe ou de liaison complexe.
 * - Utiliser `useTransform` pour llier la progression du scroll à la rotation et à l'opacité d'une carte.
 * - Créer un effet d'entrée dynamique où l'élément se redresse en scrollant.
 */
export default function Exercice11() {
  return (
    <div className="flex aspect-square items-center justify-center rounded-lg bg-slate-800">
      <div className="flex h-48 w-48 items-center justify-center rounded-3xl bg-linear-to-br from-yellow-400 to-orange-500 shadow-2xl">
        <div className="flex flex-col items-center gap-2 text-white">
          <span className="text-4xl font-black">COOL</span>
          <span className="text-xs font-bold tracking-widest uppercase">
            Parallax Effect
          </span>
        </div>
      </div>
    </div>
  );
}
