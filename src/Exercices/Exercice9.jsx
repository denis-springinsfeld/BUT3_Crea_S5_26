/**
 * ## Exercice 9 : Layout Animations
 * **Objectif** : Animer les changements de structure CSS.
 * - Utiliser la prop `layout`.
 * - Créer un carré qui s'agrandit pour remplir son conteneur au clic.
 * - Observer comment Motion gère automatiquement la transition de taille et de `borderRadius`.
 */
import { useState } from "react";

export default function Exercice9() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex aspect-square items-center justify-center rounded-lg bg-slate-800 p-8">
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          borderRadius: isExpanded ? "40px" : "12px",
        }}
        className={`cursor-pointer bg-pink-500 shadow-2xl ${
          isExpanded ? "h-full w-full" : "h-24 w-24"
        } flex items-center justify-center overflow-hidden`}
      >
        <span className="font-bold text-white uppercase tracking-tighter">
          {isExpanded ? "Click to shrink" : "Expand"}
        </span>
      </div>
    </div>
  );
}
