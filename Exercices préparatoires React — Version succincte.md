# Exercices préparatoires React - Correction commentée

## Exercice 1 — Le bouton « J'aime » (State & Props)

**Description :** `App` stocke un compteur de likes dans un state et le transmet à un composant enfant `LikeButton` avec la fonction qui l'incrémente. L'enfant n'a aucun state.

**Objectif :** comprendre comment stocker une valeur dans un state et passer cette valeur et une fonction à un composant enfant.

**Notions abordées :** `useState`, props, destructuration des props, forme fonctionnelle `setX((prev) => …)`, passer une fonction sans l'appeler.

**Correction commentée :**

```jsx
import { useState } from "react";

// Destructuration : { count, onLike } au lieu de props.count / props.onLike
function LikeButton({ count, onLike }) {
  return (
    // On PASSE la fonction (onLike), on ne l'appelle pas (onLike())
    <button
      onClick={onLike}
      className="relative rounded bg-pink-500 px-4 py-2 text-white"
    >
      ❤️ J'aime
      <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
        {count}
      </span>
    </button>
  );
}

export default function App() {
  const [likes, setLikes] = useState(0); // le state vit dans le parent

  // Forme fonctionnelle : la nouvelle valeur dépend de l'ancienne (prev)
  const handleLike = () => setLikes((prev) => prev + 1);

  return (
    <div className="p-8">
      <h1 className="mb-4 text-xl">Exercice 1</h1>
      // on passe le state et la fonction au composant enfant
      <LikeButton count={likes} onLike={handleLike} />
    </div>
  );
}
```

## Exercice 2 — La remontée d'état (enfant → parent)

**Description :** Le composant enfant `ColorPicker` propose deux boutons (Rouge / Bleu) et prévient le parent via un callback. `App` garde la couleur dans un state et l'applique au fond de la page.

**Objectif :** comprendre comment un composant enfant transmet une information à son parent via une fonction de rappel (callback), et pratiquer la destructuration des props.

**Notions abordées :** remontée d'état (enfant → parent), callback passé en prop, fonction fléchée pour transmettre un argument, style en ligne, variables CSS (bonus).

**Correction commentée :**

```jsx
import { useState } from "react";

function ColorPicker({ onColorSelect }) {
  return (
    <div className="mb-4 flex gap-2">
      {/* Fonction fléchée OBLIGATOIRE dès qu'on passe un argument */}
      <button
        onClick={() => onColorSelect("red")}
        className="rounded bg-red-500 px-3 py-1 text-white"
      >
        Rouge
      </button>
      <button
        onClick={() => onColorSelect("blue")}
        className="rounded bg-blue-500 px-3 py-1 text-white"
      >
        Bleu
      </button>
    </div>
  );
}

export default function App() {
  const [bgColor, setBgColor] = useState("white");

  // Reçoit la couleur envoyée par l'enfant.
  // Elle ne dépend pas de l'ancienne valeur : on passe directement la valeur.
  const handleColorChange = (color) => setBgColor(color);

  return (
    <div
      style={{ backgroundColor: bgColor }}
      className="min-h-screen p-8 transition-colors"
    >
      <h1 className="mb-4 text-xl">Exercice 2</h1>
      // On passe la fonction au composant enfant pour qu'il puisse remonter la
      couleur choisie
      <ColorPicker onColorSelect={handleColorChange} />
      <p>
        // On affiche la couleur du state Couleur actuelle :{" "}
        <strong>{bgColor}</strong>
      </p>
    </div>
  );
}
```

_Bonus variables CSS :_ `style={{ "--bg": `var(--clr-${bgColor})`  }} ` avec la classe `bg-(--bg)`, car Tailwind ne génère pas une classe construite dynamiquement comme `bg-${bgColor}`.

## Exercice 3 — Mode sombre (rendu conditionnel & donnée dérivée)

**Description :** un bouton bascule un booléen `isDarkMode`. Le texte du bouton, une classe CSS et un message de bienvenue en dépendent, mais un seul state suffit.

**Objectif :** modifier l'interface dynamiquement selon une condition, sans créer de state inutile.

**Notions abordées :** rendu conditionnel (`? :` et `&&`), données dérivées, forme fonctionnelle `prev => !prev`, thème clair/sombre via une classe CSS (`dark`).

**Correction commentée :**

```jsx
import { useState } from "react";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  // Donnée DÉRIVÉE : recalculée à chaque rendu, pas de useState pour ça
  const themeClass = isDarkMode ? "dark" : "";

  return (
    // text-fg / bg-bg : tokens de couleurs définis dans le index.css fourni
    <div
      className={`text-fg bg-bg min-h-screen p-8 transition-colors ${themeClass}`}
    >
      <h1 className="mb-4 text-xl">Exercice 3</h1>
      <button onClick={toggleDarkMode} className="rounded border px-4 py-2">
        {/* Ternaire : choisir entre deux valeurs */}
        {isDarkMode ? "Passer en mode Clair ☀️" : "Passer en mode Sombre 🌙"}
      </button>

      {/* && : afficher si isDarkMode est true ou ne rien afficher */}
      {isDarkMode && <p className="mt-4">Bienvenue du côté obscur !</p>}
    </div>
  );
}
```

**À retenir :**

- Les données dérivées du state n’ont pas besoin d’être stockées dans un state séparé.
- Ternaire pour choisir entre deux rendus, `&&` pour afficher ou non. Piège : `{count && <p>…</p>}` affiche `0` quand `count` vaut 0, il faut écrire `count > 0 &&`.

## Exercice 4 — L'inventaire (rendu de liste & ajout immutable)

**Description :** on affiche un tableau d'objets `{ id, name }` avec `.map()` et on y ajoute un élément (« Cerise ») sans jamais modifier le tableau existant.

**Objectif :** afficher un tableau et y ajouter un élément sans utiliser `.push()`.

**Notions abordées :** `.map()` et prop `key`, ajout immutable avec le spread, `crypto.randomUUID()`.

**Correction commentée :**

```jsx
import { useState } from "react";

export default function App() {
  // Initialisation paresseuse : randomUUID n'est appelé qu'au 1er rendu
  const [items, setItems] = useState(() => [
    { id: crypto.randomUUID(), name: "Pomme" },
    { id: crypto.randomUUID(), name: "Banane" },
  ]);

  const addItem = () => {
    // ❌ items.push(...) : modifie le tableau existant
    // ✅ on crée un NOUVEAU tableau avec le spread
    const newItem = { id: crypto.randomUUID(), name: "Cerise" }; // id généré UNE fois, à la création
    // ... le spred opérateur recupère tous les éléments existants, puis ajoute le nouveau à la fin
    setItems((current) => [...current, newItem]);
  };

  return (
    <div className="p-8">
      <h1 className="mb-4 text-xl">Exercice 4</h1>
      <button
        onClick={addItem}
        className="mb-4 rounded bg-green-500 px-4 py-2 text-white"
      >
        Ajouter une Cerise 🍒
      </button>

      <ul className="list-disc pl-5">
        {items.map((item) => (
          // key stable et unique : l'id de l'objet
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

**À retenir :**

- On n'utilise jamais `push` sur un state, on crée un nouveau tableau avec `[...current, newItem]`.
- L'`id` se génère à la création de l'élément, jamais dans le JSX (`key={crypto.randomUUID()}` recréerait toute la liste à chaque rendu). On évite l'index comme `key` si la liste peut être réordonnée ou filtrée. `crypto.randomUUID()` exige HTTPS ou `localhost`.

## Exercice 5 — Le tableau de bord (modifier & supprimer des objets)

**Description :** une liste d'utilisateurs `{ id, name, active }` avec un bouton « Supprimer » (`.filter()`) et un bouton « Basculer statut » (`.map()`). C'est le cœur de la Todo List.

**Objectif :** apprendre à modifier ou supprimer un objet précis dans un tableau d'objets, le mécanisme central de la Todo List.

**Notions abordées :** immutabilité, `.filter()` pour supprimer, `.map()` pour modifier, spread d'objet `{ ...user, active: … }`, rendu conditionnel d'un statut.

L’immutabilité, c’est le fait de ne pas modifier directement une donnée existante. Au lieu de la changer sur place, on crée une nouvelle version avec les modifications.

**Correction commentée :**

```jsx
import { useState } from "react";

export default function App() {
  const [users, setUsers] = useState([
    { id: 1, name: "Alice", active: true },
    { id: 2, name: "Bob", active: false },
  ]);

  // SUPPRIMER : on garde tous les users SAUF celui qui a cet id
  const deleteUser = (id) => {
    setUsers((current) => current.filter((user) => user.id !== id));
  };

  // MODIFIER : .map() renvoie une copie ; seul le user ciblé est remplacé
  // par un NOUVEL objet ({ ...user, active: !user.active })
  const toggleUser = (id) => {
    setUsers((current) =>
      current.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user,
      ),
    );
  };

  return (
    <div className="p-8">
      <h1 className="mb-4 text-xl">Exercice 5</h1>

      <ul className="space-y-2">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex items-center justify-between rounded border p-4"
          >
            <span>
              <strong>{user.name}</strong> -{" "}
              {user.active ? "🟢 Actif" : "🔴 Inactif"}
            </span>

            <div className="flex gap-2">
              <button
                onClick={() => toggleUser(user.id)}
                className="rounded bg-blue-500 px-3 py-1 text-sm text-white"
              >
                Basculer statut
              </button>
              <button
                onClick={() => deleteUser(user.id)}
                className="rounded bg-red-500 px-3 py-1 text-sm text-white"
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

**À retenir :** `.filter()` pour supprimer, `.map()` + spread d'objet pour modifier. Jamais de `push`, de `splice` ni d'affectation directe (`user.active = …`), qui mutent les données.

## Exercice 6 — Le champ contrôlé (state miroir)

**Description :** un `<input>` dont la valeur est pilotée par un state React : le state alimente `value` et `onChange` le met à jour. Le texte saisi est affiché en direct.

**Objectif :** lier la valeur d'un champ de saisie à un state React : le state alimente `value` et `onChange` le met à jour (flux unidirectionnel).

**Notions abordées :** champ contrôlé, `value` / `onChange`, `e.target.value`, valeur initiale `""` (jamais `undefined`), accessibilité (`aria-label`).

**Correction commentée :**

```jsx
import { useState } from "react";

function ControlledInput({ value, onChange }) {
  return (
    <input
      type="text"
      value={value} // le state alimente l'input
      onChange={onChange} // l'input signale chaque frappe
      placeholder="Tapez ici..."
      aria-label="Texte libre"
      className="rounded border px-3 py-2"
    />
  );
}

export default function App() {
  // Toujours "" au départ, jamais undefined ni null
  const [text, setText] = useState("");

  return (
    <div className="p-8">
      <h1 className="mb-4 text-xl">Exercice 6</h1>
      <ControlledInput value={text} onChange={(e) => setText(e.target.value)} />
      <p className="mt-4">
        Valeur : <strong>{text || "—"}</strong>
      </p>
    </div>
  );
}
```

**À retenir :** le state est la source de vérité, et le flux reste unidirectionnel (state → `value`, événement → `setText`). `useState()` sans valeur initiale donne l'avertissement « uncontrolled to controlled » dès le premier caractère tapé. Un `placeholder` ne remplace pas un label (`aria-label` ou `<label>`).

## Exercice 7 — Le champ non contrôlé (FormData & remontée d'état)

**Description :** un composant formulaire réutilisable lit la valeur directement dans le DOM avec `FormData`, sans aucun state, et ne remonte au parent que la valeur finale validée.

**Objectif :** créer un composant formulaire indépendant qui lit les données du DOM sans state React et ne remonte au parent que la valeur finale.

**Notions abordées :** champ non contrôlé, `FormData`, `e.preventDefault()`, `e.currentTarget.reset()`, validation avec `required` et `trim()`, composant générique configuré par props.

**Correction commentée :**

```jsx
function UncontrolledInput({ name, placeholder, buttonText, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault(); // empêche le rechargement de la page

    const value = new FormData(e.currentTarget).get(name);

    // `required` laisse passer "   " : on re-vérifie avec trim()
    if (typeof value === "string" && value.trim()) {
      onSubmit(value.trim()); // remonte la valeur au parent
    }

    e.currentTarget.reset(); // vide le formulaire
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      {/* Pas de value ni onChange : c'est le DOM qui garde la valeur */}
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        aria-label={placeholder}
        required
        className="rounded border px-3 py-2"
      />
      <button
        type="submit"
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        {buttonText}
      </button>
    </form>
  );
}

export default function App() {
  const handleNameSubmit = (name) => alert(`Bonjour, ${name} !`);

  return (
    <div className="p-8">
      <h1 className="mb-4 text-xl">Exercice 7</h1>
      <UncontrolledInput
        name="username"
        placeholder="Votre nom"
        buttonText="Soumettre"
        onSubmit={handleNameSubmit}
      />
    </div>
  );
}
```

**À retenir :** les props `name`, `placeholder` et `buttonText` rendent le composant réutilisable (pseudo, tâche, etc.). `e.currentTarget` désigne le `<form>` sur lequel `onSubmit` est branché.

**Contrôlé (Ex. 6) ou non contrôlé (Ex. 7) ?** Le contrôlé convient quand il faut réagir à chaque frappe (validation en direct, compteur de caractères, bouton désactivé). Le non contrôlé est plus court et suffit pour un formulaire « remplir puis envoyer », donc pour l'ajout d'une tâche.

## Exercice 8 — Le filtre à films (donnée dérivée sur une liste)

**Description :** une liste de films avec trois boutons de filtre (Tous / Vus / À voir) et leurs compteurs. La liste affichée est calculée à partir de `movies` et de `filter`, sans second state.

**Objectif :** afficher un sous-ensemble d'un tableau selon un filtre, sans dupliquer la liste dans un second state.

**Notions abordées :** donnée dérivée appliquée à une liste, `.filter()`, objet `filters` indexé par clé, une seule source de vérité (pas de `useState` + `useEffect` redondants), `aria-pressed`.

**Correction commentée :**

```jsx
import { useState } from "react";

export default function App() {
  const [movies] = useState([
    { id: 1, title: "Dune", watched: true },
    { id: 2, title: "Interstellar", watched: false },
    { id: 3, title: "Oppenheimer", watched: false },
  ]);
  const [monFiltre, setMonFiltre] = useState("all"); // 'all' | 'watched' | 'unwatched'

  let visibleMovies = movies; // Par défaut, "all"

  switch (monFiltre) {
    case "watched":
      visibleMovies = movies.filter((movie) => movie.watched);
      break;
    case "unwatched":
      visibleMovies = movies.filter((movie) => !movie.watched);
      break;
  }

  // ✅ Données dérivées pour les décomptes : on les calcule une seule fois avant le return
  const countTotal = movies.length;
  const countWatched = movies.filter((m) => m.watched).length;
  const countUnwatched = countTotal - countWatched;

  return (
    <div className="p-8">
      <h1 className="mb-4 text-xl">Exercice 8</h1>

      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setMonFiltre("all")}
          className="rounded border px-3 py-1"
        >
          Tous ({countTotal})
        </button>
        <button
          onClick={() => setMonFiltre("watched")}
          className="rounded border px-3 py-1"
        >
          Vus ({countWatched})
        </button>
        <button
          onClick={() => setMonFiltre("unwatched")}
          className="rounded border px-3 py-1"
        >
          À voir ({countUnwatched})
        </button>
      </div>

      <ul className="space-y-1">
        {visibleMovies.map((movie) => (
          <li key={movie.id}>
            {movie.watched ? "🟢" : "⚪"} {movie.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Exercice 9 — Le panier (state partagé entre deux composants frères)

**Description :** `ProductCatalog` écrit dans le panier et `CartSummary` l'affiche. Les deux composants frères ne se connaissent pas : seul leur parent `App` détient le state et le distribue.

**Objectif :** faire partager un même state à deux composants frères, l'un qui l'écrit et l'autre qui l'affiche, comme le formulaire et la liste de la Todo List.

**Notions abordées :** remontée d'état (_lifting state up_), communication entre frères via leur parent, `.reduce()`, `key` unique (`cartItemId`), constante définie hors du composant.

**Correction commentée :**

```jsx
import { useState } from "react";

// Constante hors du composant : elle ne change jamais
const PRODUCTS = [
  { id: 1, name: "Café", price: 3 },
  { id: 2, name: "Croissant", price: 2 },
  { id: 3, name: "Jus d'orange", price: 4 },
];

// Premier enfant : il ÉCRIT dans le state du parent (via une fonction)
function ProductCatalog({ onAddToCart }) {
  return (
    <div className="rounded border p-4">
      <h2 className="mb-2 font-bold">Produits</h2>
      {PRODUCTS.map((product) => (
        <div
          key={product.id}
          className="mb-1 flex items-center justify-between"
        >
          <span>
            {product.name} — {product.price} €
          </span>
          <button
            onClick={() => onAddToCart(product)}
            className="rounded bg-green-500 px-2 py-1 text-sm text-white"
          >
            Ajouter
          </button>
        </div>
      ))}
    </div>
  );
}

// Second enfant (frère) : il LIT le state du parent (via une donnée)
function CartSummary({ items }) {
  const total = items.reduce((sum, item) => sum + item.price, 0); // donnée dérivée

  return (
    <div className="rounded border p-4">
      <h2 className="mb-2 font-bold">Panier ({items.length})</h2>
      {items.length === 0 ? (
        <p className="text-sm text-gray-400">Panier vide</p>
      ) : (
        <ul className="mb-2 text-sm">
          {items.map((item) => (
            <li key={item.cartItemId}>
              {item.name} — {item.price} €
            </li>
          ))}
        </ul>
      )}
      <p className="font-semibold">Total : {total} €</p>
    </div>
  );
}

// Le parent détient le state et le distribue : une fonction d'un côté, la donnée de l'autre
export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    // cartItemId unique : deux « Café » ont des key différentes
    const cartItem = { ...product, cartItemId: crypto.randomUUID() };
    setCart((current) => [...current, cartItem]);
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-8">
      <ProductCatalog onAddToCart={addToCart} />
      <CartSummary items={cart} />
    </div>
  );
}
```

**À retenir :** c'est la remontée d'état (_lifting state up_) : deux frères ne communiquent jamais directement, ils passent par leur parent commun. C'est exactement le rôle d'`App` entre le formulaire d'ajout et la liste de tâches du TD.

## Exercice 10 — La carte éditable (state local + remontée au parent)

**Description :** `EditableCard` possède son propre state local (`isEditing`, `draft`) pour gérer l'édition, et ne remonte au parent que la valeur finale validée.

**Objectif :** donner à un enfant son propre state local en plus de ses props, et ne remonter au parent que la valeur finale validée, comme `TodoItem` dans le TD.

**Notions abordées :** state local et state du parent, `isEditing` / `draft`, champ contrôlé, `useState(value)` qui ne lit la prop qu'au premier rendu (resynchronisation), soumission de formulaire (touche Entrée), rendu conditionnel.

**Correction commentée :**

```jsx
import { useState } from "react";

function EditableCard({ value, onSave }) {
  // States LOCAUX : ils ne concernent que ce composant
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value); // brouillon

  const startEditing = () => {
    // useState(value) ne lit value qu'au 1er rendu : on resynchronise ici,
    // sinon « Annuler » puis « Modifier » ressortirait l'ancien brouillon
    setDraft(value);
    setIsEditing(true);
  };

  const cancel = () => setIsEditing(false); // pas d'appel à onSave

  const handleSubmit = (e) => {
    e.preventDefault(); // la touche Entrée valide aussi
    const trimmed = draft.trim();
    if (!trimmed) return; // un brouillon vide n'est pas enregistré
    onSave(trimmed); // remontée de la valeur finale au parent
    setIsEditing(false);
  };

  return (
    <div className="rounded border p-4">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          {/* Champ contrôlé par draft (voir Ex. 6) */}
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            aria-label="Nouvelle valeur"
            className="flex-1 rounded border px-2 py-1"
            autoFocus
          />
          <button
            type="submit"
            className="rounded bg-blue-600 px-3 py-1 text-sm text-white"
          >
            Valider
          </button>
          <button
            type="button"
            onClick={cancel}
            className="rounded bg-gray-200 px-3 py-1 text-sm"
          >
            Annuler
          </button>
        </form>
      ) : (
        <div className="flex items-center gap-3">
          {/* Mode lecture : on affiche value, pas draft */}
          <span className="flex-1">{value}</span>
          <button
            onClick={startEditing}
            className="rounded bg-gray-200 px-3 py-1 text-sm"
          >
            Modifier
          </button>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [username, setUsername] = useState("Alice"); // state du PARENT

  return (
    <div className="p-8">
      <h1 className="mb-4 text-xl">Exercice 10</h1>
      <EditableCard value={username} onSave={setUsername} />
      <p className="mt-4 text-sm text-gray-500">
        Valeur stockée dans le parent : <strong>{username}</strong>
      </p>
    </div>
  );
}
```

**À retenir :** deux states, deux responsabilités : `isEditing` et `draft` appartiennent à l'enfant, `username` appartient au parent. Le brouillon peut diverger de `value` pendant l'édition, et la nouvelle valeur ne remonte (via `onSave`) qu'à la validation, puis redescend en prop. Le bouton « Annuler » est en `type="button"` pour ne pas soumettre le formulaire. C'est le mécanisme de `TodoItem` dans le TD.
