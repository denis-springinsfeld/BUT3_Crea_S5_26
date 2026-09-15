/**
 * ## Exercice 13 : Text Animation (Par caractère)
 * **Objectif** : Animer un texte lettre par lettre.
 * - Découper un texte en tableau de caractères.
 * - Utiliser `staggerChildren` pour un effet de "vague" ou de révélation séquentielle.
 * - Ajouter des transformations 3D (`rotateX`, `perspective`) pour un rendu premium.
 */
const text = "L'ART DU MOUVEMENT";

export default function Exercice13() {
  const letters = Array.from(text);

  return (
    <div className="flex aspect-square items-center justify-center rounded-lg bg-slate-800 px-6">
      <h2 className="flex flex-wrap justify-center text-center text-4xl font-black tracking-tighter text-white md:text-5xl">
        {letters.map((letter, index) => (
          <span
            key={index}
            className="inline-block pointer-events-none"
            style={{
              marginRight: letter === " " ? "0.3em" : "0.02em",
              minWidth: letter === " " ? "0.3em" : "auto",
            }}
          >
            {letter}
          </span>
        ))}
      </h2>
    </div>
  );
}
