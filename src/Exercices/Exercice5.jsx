/**
 * ## Exercice 5 : Progression au Scroll
 * **Objectif** : Lier une animation au défilement de la page.
 * - Utiliser le hook `useScroll` pour récupérer la progression (`scrollYProgress`).
 * - Mapper cette progression sur une barre de remplissage.
 * - Utiliser `useSpring` pour lisser le mouvement et `offset` pour définir la zone d'activation.
 */
export default function Exercice5() {
  return (
    <div className="flex aspect-square items-center justify-center gap-10 rounded-lg bg-slate-800">
      <div className="relative aspect-square w-40 overflow-hidden rounded-xl bg-gray-50/20">
        <div className="h-full w-full origin-bottom rounded-xl bg-cyan-500" />
      </div>
    </div>
  );
}
