/**
 * ## Exercice 12 : Listes réordonnables (`Reorder`)
 * **Objectif** : Créer une liste drag-and-drop fonctionnelle.
 * - Utiliser `<Reorder.Group>` and `<Reorder.Item>`.
 * - Lier l'état d'un tableau React à la liste pour permettre la réorganisation réelle des éléments.
 */
const initialItems = ["🍎 Pomme", "🍌 Banane", "🍒 Cerise", "🥝 Kiwi"];

export default function Exercice12() {
  return (
    <div className="flex aspect-square flex-col items-center justify-center gap-6 rounded-lg bg-slate-800 p-6">
      <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400">
        List items
      </h3>

      <div className="flex w-full flex-col gap-3">
        {initialItems.map((item) => (
          <div key={item} className="cursor-default">
            <div className="flex items-center justify-between rounded-xl bg-slate-700 p-4 text-white shadow-md">
              <span className="font-medium">{item}</span>
              <div className="flex flex-col gap-1 opacity-40">
                <div className="h-0.5 w-4 bg-white" />
                <div className="h-0.5 w-4 bg-white" />
                <div className="h-0.5 w-4 bg-white" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
