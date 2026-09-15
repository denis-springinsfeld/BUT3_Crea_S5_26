/**
 * ## Exercice 0 : Les Fondamentaux
 * **Objectif** : Comprendre le composant `motion` et les propriétés de base.
 * - Créer un titre qui apparaît avec un fondu et un changement d'échelle.
 * - Utiliser `initial`, `animate` et `transition`.
 * - Définir des **Variants** pour séparer la logique du design.
 */
export default function Exercice0() {
  return (
    <h1 className="text-5xl font-bold">
      Hello <span className="inline-block text-blue-500">World</span>!
    </h1>
  );
}
