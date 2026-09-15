// Utilisation de Variants pour définir les états de l'animation
// 'hidden' : état initial
// 'visible' : état final
// 'transition' : paramètres de l'animation
//  'delayChildren': déclenche l'animation de tous les enfants après un délai
//  'staggerChildren': déclenche les animations des enfants les unes après les autres
export default function Exercice0() {
  return (
    <h1 className="text-5xl font-bold">
      Hello <span className="inline-block text-blue-500">World</span>
      <span className="inline-block">!</span>
    </h1>
  );
}
