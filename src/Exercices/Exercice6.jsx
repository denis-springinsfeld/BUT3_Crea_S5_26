/**
 * ## Exercice 6 : Animation SVG
 * **Objectif** : Animer des tracés vectoriels.
 * - Utiliser `pathLength` pour faire "se dessiner" une icône SVG.
 * - Définir des transitions spécifiques pour le tracé (`default`) et le remplissage (`fill`).
 * - Utiliser `repeatType: "reverse"` pour un effet de va-et-vient.
 */
export default function Exercice6() {
  return (
    <div className="flex aspect-square items-center justify-center gap-10 rounded-lg bg-slate-800">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-1/2 stroke-amber-500 stroke-[0.5]"
      >
        <path
          d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
          fill="rgba(245, 158, 11, 1)"
        />
      </svg>
    </div>
  );
}
