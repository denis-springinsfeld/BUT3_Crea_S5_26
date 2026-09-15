/**
 * ## Exercice 8 : AnimatePresence (Sortie)
 * **Objectif** : Animer la disparition d'un élément.
 * - Utiliser le composant `<AnimatePresence>`.
 * - Définir une propriété `exit` sur l'élément motion.
 * - Créer un bouton pour masquer/afficher un élément avec une transition fluide à la fermeture.
 */
import { useState } from "react";

export default function Exercice8() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="flex aspect-square flex-col items-center justify-center gap-10 rounded-lg bg-slate-800">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="cursor-pointer rounded-lg bg-indigo-600 px-6 py-2 font-medium text-white transition-colors hover:bg-indigo-500"
      >
        {isVisible ? "Masquer" : "Afficher"}
      </button>

      {isVisible && (
        <div className="h-32 w-32 rounded-2xl bg-indigo-400 shadow-xl" />
      )}
    </div>
  );
}
