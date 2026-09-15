/**
 * ## Exercice 7 : Scroll Reveal
 * **Objectif** : Déclencher des animations à l'entrée dans l'écran.
 * - Utiliser `whileInView` au lieu de `animate`.
 * - Configurer `viewport` avec `once: false` et `amount` pour contrôler le déclenchement.
 * - Utiliser des noms sémantiques `offscreen` et `onscreen`.
 */
export default function Exercice7() {
  return (
    <section className="mb-20 flex flex-col gap-10 py-20">
      <h1 className="text-center text-6xl font-bold tracking-tight text-white">
        Just Keep Scrolling
      </h1>

      <p className="mx-auto max-w-2xl text-center text-3xl font-light leading-relaxed text-slate-300">
        Il s'agit d'un exercice sur le déclenchement des animations au
        défilement (Scroll Reveal) avec Framer Motion.
      </p>

      <p className="mx-auto max-w-2xl text-center text-3xl font-light leading-relaxed text-slate-300">
        Grâce à whileInView, les éléments s'animent automatiquement lorsqu'ils
        entrent dans la zone visible.
      </p>
    </section>
  );
}
