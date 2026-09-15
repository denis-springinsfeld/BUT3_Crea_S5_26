import { animate, motion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * ## Exercice 9 : Animation de Chiffres (Counter)
 * Objectif : Animer un compteur de 0 à 100.
 * - Utiliser `animate()` avec le callback `onUpdate` pour mettre à jour un state.
 * - Ajouter un bouton pour relancer l'animation.
 */

export default function Exercice9() {
  const [count, setCount] = useState(0);

  const launchAnimation = () => {
    setCount(0);
    animate(0, 100, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => {
        console.log(v);
        setCount(Math.round(v));
      },
    });
  };

  // Lancer l'animation au montage
  useEffect(() => {
    launchAnimation();
  }, []);

  return (
    <div className="flex aspect-square flex-col items-center justify-center gap-6 rounded-lg bg-slate-800">
      <span className="text-7xl font-bold tabular-nums text-emerald-400">
        {count}
      </span>

      <motion.button
        onClick={launchAnimation}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="rounded-lg bg-emerald-500 px-6 py-2 font-semibold text-white shadow-lg transition-colors hover:bg-emerald-400"
      >
        Relancer
      </motion.button>
    </div>
  );
}
