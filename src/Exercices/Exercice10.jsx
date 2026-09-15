/**
 * ## Exercice 10 : Shared Layout (`layoutId`)
 * **Objectif** : Créer des transitions fluides entre composants distincts.
 * - Créer un système d'onglets (Tabs).
 * - Utiliser `layoutId` pour faire voyager l'indicateur de sélection (la "pilule") d'un bouton à l'autre.
 */
import { useState } from "react";

const tabs = ["Design", "Code", "Deploy"];

export default function Exercice10() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="flex aspect-square items-center justify-center rounded-lg bg-slate-800">
      <div className="flex gap-4 rounded-full bg-slate-900/50 p-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative rounded-full px-6 py-2 text-sm font-medium transition-colors ${
              activeTab === tab
                ? "text-white"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {activeTab === tab && (
              <div
                className="absolute inset-0 bg-linear-to-r from-violet-600 to-indigo-600 shadow-lg"
                style={{ borderRadius: 9999 }}
              />
            )}
            <span className="relative z-10">{tab}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
