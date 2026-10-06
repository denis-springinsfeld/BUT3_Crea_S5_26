# TD préparatoires ToDo-List (React)

> **Objectif** : Avant de se lancer dans le projet complet de la **Todo List**, cette série de petits exercices isolés permet de comprendre et pratiquer un par un les concepts fondamentaux de React (State, Props, Immutabilité, Listes).

Ces exercices sont conçus pour être réalisés rapidement dans un composant `App.jsx` de test. Pour chacun, copie le **starter** dans `App.jsx` puis complète les zones marquées `TODO`. Chaque exercice contient une ligne **✅ Tu as réussi si…** pour t'auto-évaluer. Les parties marquées **Bonus** sont facultatives, et les fichiers `index.css` fournis se copient tels quels : ils ne sont pas l'objet des exercices.

---

## 🛠️ Mise en place

Les exercices supposent un projet **Vite + React** avec **Tailwind CSS v4** (la syntaxe `bg-(--bg)` et `@import "tailwindcss"` n'existent qu'en v4). Si tu pars de zéro :

```bash
npm create vite@latest todo-prep -- --template react
cd todo-prep
npm install tailwindcss @tailwindcss/vite
npm install motion   # uniquement pour les bonus
```

Dans `vite.config.js`, ajoute le plugin Tailwind (voir la documentation officielle de Tailwind pour l'installation avec Vite) :

```js
import tailwindcss from "@tailwindcss/vite";
// ...
plugins: [react(), tailwindcss()],
```

Puis **remplace tout le contenu** de `src/index.css` par `@import "tailwindcss";` : le fichier généré par Vite contient des styles qui perturbent les exercices. Enfin, pour chaque exercice, remplace le contenu de `src/App.jsx` par le starter.

Lance `npm run dev` et garde la **console du navigateur ouverte** : plusieurs exercices te demandent de vérifier qu'elle ne contient aucun avertissement.

---

## Concepts abordés

1. `useState` basique et passage de Props, avec la destructuration _(Ex. 1)_
2. La remontée d'état : communication enfant → parent _(Ex. 2)_
3. Le rendu conditionnel (`? :` et `&&`) et les données dérivées _(Ex. 3)_
4. L'affichage de listes (`.map` et la prop `key`) et l'ajout immutable _(Ex. 4)_
5. L'immutabilité des tableaux d'objets : modifier et supprimer _(Ex. 5)_
6. Le champ contrôlé : le state comme source de vérité _(Ex. 6)_
7. Le champ non contrôlé et `FormData` _(Ex. 7)_
8. Le filtrage dérivé d'une liste, sans state redondant _(Ex. 8)_
9. Le state partagé entre composants frères (lifting state up) _(Ex. 9)_
10. Le state local dans un enfant, combiné à une remontée au parent _(Ex. 10)_

---

## Exercice 1 : Le Bouton "J'aime" (State & Props)

**Objectif :** Comprendre comment stocker une valeur et passer une fonction à un composant enfant.

### Consignes

1. Crée un composant `LikeButton` qui reçoit deux props : `count` (le nombre de likes) et `onLike` (la fonction à appeler quand on clique).
2. Dans `App`, crée un state `likes` (initialisé à 0).
3. Crée une fonction `handleLike` qui fait `setLikes((prev) => prev + 1)`.
4. Affiche le composant `LikeButton` dans `App` en lui passant la valeur `likes` et la fonction `handleLike`.
5. **Bonus (Motion)** : installe Motion (`npm install motion`), importe `motion` depuis `motion/react`, puis anime le bouton (`rest`, `hover`, `tap`) et le compteur (`hidden`, `visible`) avec des **variants**.

> 💡 **Destructuration des props** : un composant reçoit **un seul objet** `props`. Ces deux écritures sont équivalentes ; la seconde extrait directement les champs dans les paramètres, c'est celle qu'on utilisera partout :
>
> ```jsx
> function LikeButton(props) {
>   return <button onClick={props.onLike}>{props.count}</button>;
> }
>
> function LikeButton({ count, onLike }) {
>   return <button onClick={onLike}>{count}</button>;
> }
> ```

> ⚠️ **Deux réflexes à prendre dès maintenant**
>
> - On **passe** la fonction (`onClick={onLike}`), on ne l'**appelle** pas (`onClick={onLike()}`) : on y revient à l'Exercice 2.
> - Quand la nouvelle valeur **dépend de l'ancienne** (`likes + 1`), on utilise la forme fonctionnelle `setLikes((prev) => prev + 1)`. Quand elle n'en dépend pas (Ex. 2 : `setBgColor(color)`), on passe directement la valeur.

✅ **Resultat attendu** : chaque clic ajoute 1 à la pastille, et `LikeButton` ne contient aucun `useState` : le state vit dans `App`.

### Starter

```jsx
import { useState } from "react";

function LikeButton({ count, onLike }) {
  // TODO : le bouton appelle onLike au clic
  // TODO : affiche le compteur (count) dans la pastille
  return (
    <button className="relative rounded bg-pink-500 px-4 py-2 text-white">
      ❤️ J'aime
      <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
        {/* TODO */}
      </span>
    </button>
  );
}

export default function App() {
  // TODO : déclare le state likes (initialisé à 0)
  // TODO : déclare la fonction handleLike

  return (
    <div className="p-8">
      <h1 className="mb-4 text-xl">Exercice 1</h1>
      {/* TODO : affiche <LikeButton /> avec ses props */}
    </div>
  );
}
```

---

## Exercice 2 : La Remontée d'État (Enfant vers Parent)

**Objectif :** Comprendre comment un composant enfant peut transmettre une information à son parent via une fonction de rappel (callback) et pratiquer la destructuration des props.

### Consignes

1. Crée un composant enfant `ColorPicker` qui reçoit une prop **déstructurée** `{ onColorSelect }`.
2. Dans `ColorPicker`, crée deux boutons ("Rouge" et "Bleu"). Au clic sur le bouton rouge, appelle `onColorSelect("red")`. Au clic sur le bleu, appelle `onColorSelect("blue")`.
3. Dans le parent `App`, crée un state `bgColor` (initialisé à `"white"`).
4. Affiche le composant `ColorPicker` en lui passant une fonction qui met à jour `bgColor` avec la couleur reçue.
5. Applique la couleur de fond à la div principale de `App` avec `style={{ backgroundColor: bgColor }}`.
6. **Bonus 1 (variables CSS)** : remplace le style en ligne par une variable CSS : ``style={{ "--bg": `var(--clr-${bgColor})` }}`` et la classe `bg-(--bg)`. Le fichier `index.css` fourni plus bas définit `--clr-white`, `--clr-red` et `--clr-blue`.
7. **Bonus 2 (Motion)** : anime les boutons avec des variants (`rest`, `hover`, `tap`) et le nom de la couleur affichée (`hidden`, `visible`).

> ⚠️ **Pourquoi `() => onColorSelect("red")` et pas `onColorSelect("red")` ?** `onClick` attend **une fonction** que React appellera au moment du clic. Écrire `onClick={onColorSelect("red")}` **exécute** `onColorSelect` immédiatement, pendant le rendu, et passe son résultat (`undefined`) à `onClick` : le state est modifié pendant le rendu, ce qui déclenche un nouveau rendu, et ainsi de suite (« Too many re-renders »). Dès qu'il faut passer un argument, on enveloppe donc l'appel dans une fonction fléchée. Sans argument (Ex. 1), on passe la fonction telle quelle : `onClick={onLike}`.

✅ **Tu as réussi si…** un clic sur « Rouge » ou « Bleu » change à la fois le fond de la page et le texte « Couleur actuelle », et `ColorPicker` n'a aucun state.

### Starter

```jsx
import { useState } from "react";

// TODO : déstructure la prop { onColorSelect }
function ColorPicker() {
  return (
    <div className="mb-4 flex gap-2">
      {/* TODO : onClick → onColorSelect("red") */}
      <button className="rounded bg-red-500 px-3 py-1 text-white">Rouge</button>
      {/* TODO : onClick → onColorSelect("blue") */}
      <button className="rounded bg-blue-500 px-3 py-1 text-white">Bleu</button>
    </div>
  );
}

export default function App() {
  // TODO : state bgColor (initialisé à "white")
  // TODO : fonction handleColorChange(color) qui met à jour bgColor

  return (
    // TODO : ajoute style={{ backgroundColor: bgColor }}
    <div className="min-h-screen p-8 transition-colors">
      <h1 className="mb-4 text-xl">Exercice 2</h1>
      {/* TODO : affiche <ColorPicker /> avec sa prop */}

      <p>
        Couleur actuelle : <strong>{/* TODO */}</strong>
      </p>
    </div>
  );
}
```

### Bonus 1 — fichier fourni : `index.css`

Pour passer aux variables CSS, remplace `index.css` par ce fichier :

```css
@import "tailwindcss";

@layer base {
  :root {
    --clr-white: #ffffff;
    --clr-red: #ef4444;
    --clr-blue: #3b82f6;
  }
}
```

> 💡 **Pourquoi `var(--clr-${bgColor})` plutôt qu'une classe `bg-${bgColor}` ?** Tailwind génère son CSS en lisant tes fichiers **tels qu'ils sont écrits** : une classe construite dynamiquement (`bg-${bgColor}`) n'apparaît jamais en entier dans le code, donc elle n'est jamais générée. Une variable CSS, elle, est résolue par le navigateur au moment de l'affichage.

---

## Exercice 3 : Mode Sombre (Rendu conditionnel & Données dérivées)

**Objectif :** Modifier l'interface dynamiquement selon une condition, sans créer de state inutile.

### Consignes

1. Dans `App`, crée un state `isDarkMode` (booléen, initialisé à `false`).
2. Crée un bouton qui inverse ce state avec la forme fonctionnelle (`prev => !prev`).
3. **Conditionnel texte** : Le bouton doit afficher "Passer en mode Sombre" ou "Passer en mode Clair" selon le state.
4. **Donnée dérivée** : Crée une variable `themeClass` juste avant le `return` qui vaut `"dark"` si `isDarkMode` est vrai, sinon `""`.
5. Ajoute `themeClass` à la `className` de la `<div>` principale (les classes `text-fg bg-bg` y sont déjà).
6. **Rendu conditionnel** : affiche « Bienvenue du côté obscur ! » uniquement en mode sombre (avec `&&`).
7. Copie dans `index.css` le fichier fourni ci-dessous : les tokens de couleurs y sont déjà définis et la classe `.dark` inverse les couleurs.
8. **Bonus (Motion)** : anime le bouton avec des variants (`rest`, `hover`, `tap`) et le message avec `AnimatePresence` (`hidden`, `visible`, `exit`).

> ⚠️ **Piège classique avec `&&`** : `{count && <p>…</p>}` affiche littéralement `0` quand `count` vaut `0` (React sait afficher un nombre, contrairement à `false`). Pour une condition numérique, écris `{count > 0 && …}` ou utilise un ternaire.

✅ **Tu as réussi si…** le bouton alterne ses deux textes, les couleurs s'inversent, le message n'apparaît qu'en mode sombre, et `App` ne contient qu'un seul `useState` (`themeClass` n'en est pas un).

### Fichier fourni : `index.css`

```css
@import "tailwindcss";

@theme inline {
  --color-bg: var(--clr-bg);
  --color-fg: var(--clr-fg);
}

@layer base {
  :root {
    /* Tokens primitifs */
    --clr-white: #ffffff;
    --clr-dark: #1a1a1a;

    /* Tokens sémantiques */
    --clr-fg: var(--clr-dark);
    --clr-bg: var(--clr-white);
  }

  .dark {
    --clr-fg: var(--clr-white);
    --clr-bg: var(--clr-dark);
  }
}
```

### Starter

```jsx
import { useState } from "react";

export default function App() {
  // TODO : state isDarkMode (false au départ)
  // TODO : fonction toggleDarkMode (utilise la forme prev => !prev)

  // TODO : donnée dérivée themeClass (pas de useState pour ça !)

  return (
    // TODO : ajoute themeClass à la className
    <div className="text-fg bg-bg min-h-screen p-8 transition-colors">
      <h1 className="mb-4 text-xl">Exercice 3</h1>
      <button className="rounded border px-4 py-2">
        {/* TODO : texte conditionnel selon isDarkMode */}
      </button>

      {/* TODO : rendu conditionnel avec && */}
    </div>
  );
}
```

---

## Exercice 4 : L'Inventaire (Rendu de liste & Ajout immutable)

**Objectif :** Afficher un tableau et y ajouter un élément sans utiliser `.push()`.

### Consignes

1. Crée un state `items` contenant un tableau d'objets `{ id, name }` : `Pomme` et `Banane`. L'`id` est une valeur aléatoire générée avec `crypto.randomUUID()`.
2. Affiche ce tableau sous forme de liste `<ul>` en utilisant `.map()`, avec `item.id` comme prop `key`.
3. Ajoute un bouton "Ajouter une Cerise". Au clic, il doit ajouter un nouvel objet `Cerise` avec son propre `id` aléatoire.
   _Rappel : crée d'abord l'objet avec `id: crypto.randomUUID()`, puis ajoute-le avec `setItems((currentItems) => [...currentItems, newItem])`._

> ⚠️ **À retenir sur `key` et `randomUUID`**
>
> - L'`id` se génère **à la création** de l'élément, jamais dans le JSX : `key={crypto.randomUUID()}` (ou `Math.random()`) changerait à chaque rendu, et React détruirait puis recréerait toute la liste. Évite aussi l'index du `.map` comme `key` dès que la liste peut être réordonnée ou filtrée.
> - `crypto.randomUUID()` n'existe que dans un **contexte sécurisé** : HTTPS ou `localhost`. Si tu testes depuis un téléphone via l'IP de ton PC en HTTP (ex. `http://192.168.x.x:5173`), il sera `undefined`.

✅ **Tu as réussi si…** trois clics ajoutent trois « Cerise » à la liste, sans aucun avertissement `key` dans la console.

### Starter

```jsx
import { useState } from "react";

export default function App() {
  // TODO : state items (Pomme, Banane), chacun avec un id aléatoire
  // Astuce : useState(() => [...]) n'exécute la fonction qu'au premier rendu
  // (sinon randomUUID serait rappelé à chaque rendu pour rien)

  const addItem = () => {
    // ⚠️ Interdit : items.push(...) puis setItems(items)
    // TODO : crée d'abord un objet Cerise avec un id unique, puis ajoute-le
    // avec setItems((currentItems) => [...currentItems, newItem])
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

      <ul className="list-disc pl-5">{/* TODO : .map() avec la prop key */}</ul>
    </div>
  );
}
```

---

## Exercice 5 : Le Tableau de Bord (Modifier & Supprimer avec des Objets)

**Objectif :** C'est le cœur de la Todo List ! Apprendre à modifier ou supprimer un objet spécifique dans un tableau d'objets.

### Consignes

1. Pars de ce state initial (à mettre dans `App`) :
   ```javascript
   const [users, setUsers] = useState([
     { id: 1, name: "Alice", active: true },
     { id: 2, name: "Bob", active: false },
   ]);
   ```
2. Affiche chaque utilisateur (`name`) et son statut ("🟢 Actif" ou "🔴 Inactif").
3. **Suppression** : Ajoute un bouton "Supprimer" à côté de chaque user. Il doit appeler une fonction `deleteUser(id)` qui utilise `.filter()` pour enlever le user du tableau.
4. **Modification** : Ajoute un bouton "Basculer statut" qui appelle `toggleUser(id)`. Cette fonction doit utiliser `.map()` pour trouver le user et inverser son booléen `active`.

✅ **Tu as réussi si…** « Supprimer » retire uniquement la ligne cliquée, « Basculer statut » ne modifie que la ligne cliquée, et ton code n'utilise ni `push`, ni `splice`, ni affectation directe (`user.active = …`).

### Starter

```jsx
import { useState } from "react";

export default function App() {
  const [users, setUsers] = useState([
    { id: 1, name: "Alice", active: true },
    { id: 2, name: "Bob", active: false },
  ]);

  const deleteUser = (id) => {
    // TODO : garde tous les users SAUF celui qui a cet id (.filter)
  };

  const toggleUser = (id) => {
    // TODO : recrée le tableau avec .map() et inverse active uniquement
    // pour l'utilisateur dont l'id correspond (copie avec { ...user, ... })
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
            <span>{/* TODO : nom + statut "🟢 Actif" / "🔴 Inactif" */}</span>

            <div className="flex gap-2">
              {/* TODO : ajoute onClick → toggleUser(user.id) au bouton ci-dessous */}
              <button className="rounded bg-blue-500 px-3 py-1 text-sm text-white">
                Basculer statut
              </button>

              {/* TODO : ajoute onClick → deleteUser(user.id) au bouton ci-dessous */}
              <button className="rounded bg-red-500 px-3 py-1 text-sm text-white">
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

---

## Exercice 6 : Le Champ Contrôlé (State miroir)

**Objectif :** Comprendre comment lier la valeur d'un champ de saisie à une variable d'état React : le state alimente `value`, et `onChange` le met à jour (un flux **unidirectionnel**, malgré l'impression de « two-way binding »).

### Consignes

1. Crée un composant `ControlledInput` qui reçoit deux props `{ value, onChange }` et retourne un `<input type="text">`.
2. Dans `App`, crée un state `text` initialisé à une chaîne vide `""`.
3. Passe `text` à la prop `value` de `ControlledInput`, qui la branche sur l'attribut `value` de l'input.
4. Passe à la prop `onChange` une fonction qui met à jour le state (`setText(e.target.value)`) ; `ControlledInput` la branche sur l'événement `onChange` de l'input.
5. Affiche la valeur de `text` en temps réel sous l'input.

> ⚠️ **Piège classique** : un champ contrôlé doit toujours recevoir une `value` définie, dès le premier rendu. Si tu initialises avec `useState()` (donc `undefined`) au lieu de `useState("")`, React affiche l'avertissement _"A component is changing an uncontrolled input to be controlled"_ dès que tu tapes un premier caractère. Pars toujours d'une chaîne vide `""`, jamais de `undefined` ou `null`.

> ♿ **Accessibilité** : un `placeholder` disparaît à la saisie et ne remplace pas un label. Les starters utilisent un `aria-label` ; dans une vraie interface, préfère un `<label>` visible.

✅ **Tu as réussi si…** ce que tu tapes s'affiche immédiatement sous le champ (« — » quand il est vide), et la console n'affiche aucun avertissement « uncontrolled to controlled ».

### Starter

```jsx
import { useState } from "react";

// TODO : reçoit les props { value, onChange }
function ControlledInput() {
  return (
    <input
      type="text"
      // TODO : value et onChange
      placeholder="Tapez ici..."
      aria-label="Texte libre"
      className="rounded border px-3 py-2"
    />
  );
}

export default function App() {
  // TODO : state text (chaîne vide au départ)

  return (
    <div className="p-8">
      <h1 className="mb-4 text-xl">Exercice 6</h1>
      {/* TODO : <ControlledInput /> avec value et onChange */}
      <p className="mt-4">
        Valeur : <strong>{/* TODO : text ou "—" si vide */}</strong>
      </p>
    </div>
  );
}
```

---

## Exercice 7 : Le Champ Non Contrôlé (FormData & Remontée d'état)

**Objectif :** Créer un composant formulaire indépendant qui s'occupe de lire les données du DOM sans state React, et qui remonte uniquement la valeur finale au parent.

### Consignes

1. Crée un composant `UncontrolledInput` qui reçoit des props `{ name, placeholder, buttonText, onSubmit }`.
2. Dans `UncontrolledInput`, crée un `<form>` avec un `<input type="text" name={name} />` et un `<button>`. (Pas de `value` ni `onChange` !). Ajoute l'attribut `required` pour que le navigateur refuse un champ vide.
3. Toujours dans `UncontrolledInput`, intercepte la soumission (`onSubmit` du `<form>`), empêche le rechargement (`e.preventDefault()`), récupère la valeur avec `new FormData(e.currentTarget).get(name)`, et passe-la au parent via la prop `onSubmit(valeur)` si elle est bien une chaîne non vide après `trim()`. Puis vide le formulaire avec `e.currentTarget.reset()` (`currentTarget` est le `<form>` sur lequel on a branché `onSubmit`).
4. Dans `App`, utilise `<UncontrolledInput name="username" onSubmit={...} />` pour récupérer le nom et l'afficher dans une alerte.

> 💡 **Pourquoi généraliser avec une prop `name` ?** Un composant figé sur `"username"` ne peut servir qu'une fois dans l'appli. En passant `name` (et `placeholder`, `buttonText`) en props, le même composant peut servir aussi bien pour saisir un pseudo que pour ajouter une tâche dans le TD — c'est exactement la version qu'on y réutilisera.

✅ **Tu as réussi si…** un champ vide ou composé d'espaces n'ouvre aucune alerte ; avec « Léa », l'alerte affiche « Bonjour, Léa ! » puis le champ se vide, sans aucun `useState` dans `UncontrolledInput`.

### Starter

```jsx
function UncontrolledInput({ name, placeholder, buttonText, onSubmit }) {
  const handleSubmit = (e) => {
    // TODO : empêche le rechargement de la page
    // TODO : récupère la valeur avec new FormData(e.currentTarget).get(name)
    // TODO : si la valeur (trim) n'est pas vide, appelle onSubmit(valeur)
    // TODO : vide le formulaire avec e.currentTarget.reset()
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        // TODO : name, placeholder et required
        aria-label={placeholder}
        className="rounded border px-3 py-2"
      />
      <button
        type="submit"
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        {/* TODO : buttonText */}
      </button>
    </form>
  );
}

export default function App() {
  const handleNameSubmit = (name) => {
    // TODO : affiche `Bonjour, ${name} !` dans une alerte
  };

  return (
    <div className="p-8">
      <h1 className="mb-4 text-xl">Exercice 7</h1>
      {/* TODO : <UncontrolledInput /> avec toutes ses props */}
    </div>
  );
}
```

### 🤔 Contrôlé vs non contrôlé : lequel choisir ?

|                          | Exercice 6 (contrôlé)                                                                           | Exercice 7 (non contrôlé)                                                      |
| ------------------------ | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Source de vérité         | Le state React (`value={text}`)                                                                 | Le DOM (le navigateur garde la valeur)                                         |
| Re-rendu à chaque frappe | Oui                                                                                             | Non                                                                            |
| Pratique pour...         | Valider en temps réel, afficher un compteur de caractères, désactiver un bouton selon la saisie | Un simple formulaire "remplir puis envoyer", sans besoin de lire chaque frappe |
| Code                     | Un peu plus verbeux (`value` + `onChange`)                                                      | Plus court, mais moins flexible pendant la saisie                              |

C'est pour cette raison — un formulaire d'ajout qui n'a besoin de la valeur qu'au moment de l'envoi — que le TD de la Todo List part sur un champ **non contrôlé** pour `UncontrolledInput`. Si plus tard tu avais besoin, par exemple, de désactiver le bouton "Ajouter" tant que le champ est vide, il faudrait basculer ce champ en contrôlé.

> 🚀 **Pour aller plus loin (React 19)** : avec React 19, `<form action={...}>` reçoit directement le `FormData` (plus besoin de `preventDefault`) et réinitialise automatiquement les champs non contrôlés une fois l'action terminée. Vérifie la version de React de ton projet avant de l'utiliser ; le TD reste sur `onSubmit` + `preventDefault`, qui fonctionne partout.

---

## Exercice 8 : Le Filtre à Films (Donnée dérivée sur une liste)

**Objectif :** Afficher un sous-ensemble d'un tableau selon un filtre, **sans** dupliquer la liste dans un second state. L'exercice 3 l'a déjà introduit sur une simple classe CSS (`themeClass`), ici on l'applique à un `.map()`.

### Consignes

1. Pars de ce state initial :
   ```javascript
   const [movies, setMovies] = useState([
     { id: 1, title: "Dune", watched: true },
     { id: 2, title: "Interstellar", watched: false },
     { id: 3, title: "Oppenheimer", watched: false },
   ]);
   ```
2. Crée un state `filter` initialisé à `"all"` (valeurs possibles : `"all"`, `"watched"`, `"unwatched"`).
3. **Juste avant le `return`**, crée un objet `filters` dont les clés sont `"all"`, `"watched"` et `"unwatched"` (comme `themeClass` à l'exercice 3, mais ici ce sont des tableaux, pas des strings). Associe chaque clé au tableau correspondant :
   - `"all"` → `movies`
   - `"watched"` → `movies.filter((movie) => movie.watched)`
   - `"unwatched"` → `movies.filter((movie) => !movie.watched)`

   Puis récupère la liste à afficher avec `const visibleMovies = filters[filter];`.

4. Affiche trois boutons ("Tous", "Vus", "À voir") qui changent `filter` au clic. Le bouton du filtre actif doit se distinguer visuellement (et porter `aria-pressed`). Affiche aussi, entre parenthèses, le nombre de films de chaque catégorie : réutilise les tableaux de `filters` (par exemple `filters.watched.length`) plutôt que de refaire un `.filter()`.
5. Utilise `visibleMovies` (et non `movies`) dans le `.map()` d'affichage.
6. **Piège à éviter** : ne crée surtout pas `const [visibleMovies, setVisibleMovies] = useState([])` avec un `useEffect` pour la synchroniser — ce serait un state redondant, source de bugs (deux sources de vérité à garder synchronisées). Une simple variable calculée au fil du rendu suffit.
7. **Bonus** : ajoute sur chaque film un bouton qui bascule `watched` (comme `toggleUser` à l'Ex. 5). Observe que la liste **et** les compteurs se mettent à jour sans aucun code supplémentaire : c'est tout l'intérêt d'une donnée dérivée.

✅ **Tu as réussi si…** la liste et les compteurs suivent le filtre choisi, le bouton actif se distingue, et `App` n'a que deux `useState` (`movies` et `filter`) et aucun `useEffect`.

### Starter

```jsx
import { useState } from "react";

export default function App() {
  const [movies, setMovies] = useState([
    { id: 1, title: "Dune", watched: true },
    { id: 2, title: "Interstellar", watched: false },
    { id: 3, title: "Oppenheimer", watched: false },
  ]);
  // TODO : state filter ("all" | "watched" | "unwatched")

  // TODO : crée l'objet filters (all, watched, unwatched)
  // TODO : calcule visibleMovies avec filters[filter] (pas un state !)
  // BONUS : fonction toggleWatched(id), comme toggleUser à l'Ex. 5

  return (
    <div className="p-8">
      <h1 className="mb-4 text-xl">Exercice 8</h1>

      <div className="mb-4 flex gap-2">
        {/* TODO : 3 boutons qui appellent setFilter, avec le compteur entre parenthèses,
            un style différent pour le filtre actif et aria-pressed */}
        <button className="rounded border px-3 py-1">Tous</button>
        <button className="rounded border px-3 py-1">Vus</button>
        <button className="rounded border px-3 py-1">À voir</button>
      </div>

      <ul className="space-y-1">
        {/* TODO : .map() sur visibleMovies, affiche 🟢 ou ⚪ + le titre */}
        {/* BONUS : un bouton par film qui bascule watched (setMovies + .map) */}
      </ul>
    </div>
  );
}
```

---

## Exercice 9 : Le Panier (State partagé entre deux composants frères)

**Objectif :** Jusqu'ici, chaque exercice n'avait qu'**un seul** enfant qui parlait au parent. Ici, **deux composants frères** vont partager le même state : l'un l'écrit, l'autre l'affiche. C'est exactement la structure du TD (`UncontrolledInput` qui ajoute une tâche, et la liste de `TodoItem` qui l'affiche et la modifie) — deux enfants distincts d'un même `App`.

### Consignes

1. Dans `App`, crée un state `cart` (tableau d'articles `{ cartItemId, id, name, price }`), initialisé vide `[]`. `cartItemId` est un identifiant unique généré avec `crypto.randomUUID()` (comme à l'Ex. 4) : si on ajoute deux fois le même produit, les deux lignes du panier doivent avoir des `key` différentes.
2. Crée un composant `ProductCatalog` qui reçoit une prop `onAddToCart` (une fonction). Il affiche 2-3 produits fixes (listés dans une constante `PRODUCTS`, définie hors du composant) avec un bouton "Ajouter" chacun, qui appelle `onAddToCart(produit)`.
3. Crée un composant **frère** `CartSummary` qui reçoit une prop `items` (le tableau du panier) et affiche la liste des articles ajoutés, ainsi que le total (calculé avec `reduce`).
4. Dans `App`, affiche `<ProductCatalog onAddToCart={...} />` **et** `<CartSummary items={cart} />` côte à côte. Vérifie que cliquer sur "Ajouter" dans le catalogue met bien à jour le résumé, alors que ce sont deux composants complètement différents qui ne se connaissent pas directement.

> 💡 **Le point clé** : `ProductCatalog` et `CartSummary` ne communiquent **jamais directement entre eux**. Ils ne savent même pas que l'autre existe. Le seul lien, c'est `App`, qui détient le state et le distribue : une fonction vers l'un, la donnée vers l'autre. C'est ce qu'on appelle la **remontée d'état (lifting state up)** — c'est exactement le rôle que joue `App.jsx` dans le TD entre le formulaire d'ajout et la liste des tâches.

✅ **Tu as réussi si…** ajouter deux fois « Café » crée deux lignes distinctes (sans avertissement `key`) et un total correct, et `CartSummary` n'a aucun state.

### Starter

```jsx
import { useState } from "react";

const PRODUCTS = [
  { id: 1, name: "Café", price: 3 },
  { id: 2, name: "Croissant", price: 2 },
  { id: 3, name: "Jus d'orange", price: 4 },
];

// Premier enfant : il ÉCRIT dans le state du parent, il ne le lit jamais.
function ProductCatalog({ onAddToCart }) {
  return (
    <div className="rounded border p-4">
      <h2 className="mb-2 font-bold">Produits</h2>
      {/* TODO : PRODUCTS.map() → nom, prix et bouton "Ajouter" (onAddToCart) */}
    </div>
  );
}

// Second enfant, FRÈRE du premier : il LIT le state du parent, il ne le modifie jamais.
function CartSummary({ items }) {
  // TODO : calcule le total avec reduce

  return (
    <div className="rounded border p-4">
      <h2 className="mb-2 font-bold">Panier ({/* TODO */})</h2>
      {/* TODO : "Panier vide" si items est vide, sinon la liste des articles */}
      <p className="font-semibold">Total : {/* TODO */} €</p>
    </div>
  );
}

export default function App() {
  // TODO : state cart ([] au départ)
  // TODO : fonction addToCart(product) (immutabilité !)

  return (
    <div className="grid grid-cols-2 gap-4 p-8">
      {/* TODO : <ProductCatalog /> et <CartSummary /> avec leurs props */}
    </div>
  );
}
```

---

## Exercice 10 : La Carte Éditable (State local + remontée au parent)

**Objectif :** Jusqu'ici, les composants enfants étaient soit de purs afficheurs (props seulement), soit n'avaient pas de state du tout (`UncontrolledInput`). Ici, l'enfant va avoir **son propre state local** (`isEditing`, `draft`) **en plus** de ses props — et ne remonter au parent que la valeur finale, une fois validée. C'est exactement le mécanisme de `TodoItem` à l'étape 4 du TD.

### Consignes

1. Dans `App`, crée un state `username` (string), initialisé à `"Alice"`.
2. Crée un composant enfant `EditableCard` qui reçoit deux props : `value` (le texte actuel) et `onSave` (fonction appelée avec le nouveau texte).
3. **Dans `EditableCard`** (pas dans `App` !), crée deux states **locaux** :
   - `isEditing` (booléen, `false` au départ)
   - `draft` (string, initialisé avec `value`)
4. **Mode lecture** (`isEditing === false`) : affiche `value` (pas `draft`) et un bouton "Modifier" qui **recopie `value` dans `draft`** puis passe `isEditing` à `true`.
5. **Mode édition** (`isEditing === true`) : affiche un `<form>` contenant un `<input>` **contrôlé** par `draft` (`value={draft}`, `onChange` met à jour `draft`), un bouton "Valider" (`type="submit"`) et un bouton "Annuler" (`type="button"`).
6. À la soumission du formulaire (clic sur "Valider" **ou** touche Entrée) : `e.preventDefault()`, puis, si `draft.trim()` n'est pas vide, appelle `onSave(draft.trim())` et repasse `isEditing` à `false`. Si le brouillon est vide, ne fais rien.
7. Au clic sur "Annuler" : repasse `isEditing` à `false` **sans** appeler `onSave`. Vérifie qu'en cliquant ensuite sur "Modifier", le champ repart bien de la valeur actuelle et non de ton ancien brouillon.
8. Dans `App`, affiche `<EditableCard value={username} onSave={setUsername} />` et vérifie que le texte affiché par `EditableCard` se met bien à jour après validation.

> 💡 **Le point clé** : pendant l'édition, `draft` (local, propre à `EditableCard`) peut diverger de `value` (la prop venue du parent) — c'est voulu, c'est un brouillon. Ce n'est qu'au clic sur "Valider" que la nouvelle valeur est **remontée** au parent via `onSave`, qui met à jour son propre state (`username`), qui redescend ensuite en tant que nouvelle prop `value`. Deux states, deux responsabilités : `isEditing`/`draft` ne regardent que l'enfant, `username` appartient au parent.

> ⚠️ **Piège : copier une prop dans un state.** `useState(value)` n'utilise `value` que **lors du premier rendu** : si la prop change ensuite, `draft` ne suit pas. C'est pourquoi on resynchronise explicitement `draft` à l'ouverture de l'édition (`setDraft(value)`). Sans cela, « Annuler » puis « Modifier » ressortirait l'ancien brouillon.

✅ **Tu as réussi si…** « Valider » (ou Entrée) met à jour le parent, un brouillon vide n'est pas enregistré, « Annuler » ne change rien, et en rouvrant l'édition le champ repart de la valeur actuelle.

### Starter

```jsx
import { useState } from "react";

function EditableCard({ value, onSave }) {
  // TODO : state local isEditing (false au départ)
  // TODO : state local draft (initialisé avec value)

  const startEditing = () => {
    // TODO : recopie value dans draft, puis passe en mode édition
  };

  const cancel = () => {
    // TODO : repasse en mode lecture, sans appeler onSave
  };

  const handleSubmit = (e) => {
    // TODO : e.preventDefault()
    // TODO : si draft.trim() n'est pas vide → onSave(draft.trim()) puis repasse en mode lecture
  };

  return (
    <div className="rounded border p-4">
      {/* TODO : si isEditing → <form onSubmit={handleSubmit}> avec un <input> contrôlé par draft,
          un bouton "Valider" (type="submit") et un bouton "Annuler" (type="button") */}
      {/* TODO : sinon → <span>{value}</span> + bouton "Modifier" (startEditing) */}
    </div>
  );
}

export default function App() {
  // TODO : state username ("Alice" au départ)

  return (
    <div className="p-8">
      <h1 className="mb-4 text-xl">Exercice 10</h1>
      {/* TODO : <EditableCard /> avec value et onSave */}
      <p className="mt-4 text-sm text-gray-500">
        Valeur stockée dans le parent : <strong>{/* TODO */}</strong>
      </p>
    </div>
  );
}
```

---

## 🎯 Conclusion

Si tu maîtrises **l'Exercice 4** (l'Inventaire : ajout immutable), **l'Exercice 5** (le Tableau de Bord), **l'Exercice 6** (le Champ Contrôlé, indispensable à l'édition de l'Ex. 10), **l'Exercice 7** (le Champ Non Contrôlé), **l'Exercice 8** (le Filtre à Films), **l'Exercice 9** (le Panier) et **l'Exercice 10** (la Carte Éditable), tu as les bases nécessaires pour attaquer le TD de la Todo List. Le principe sera exactement le même : deux composants frères (`UncontrolledInput` et la liste de `TodoItem`) qui partagent le state `todos` détenu par `App`, un formulaire qui remonte un texte, un tableau d'objets, `.map()` pour afficher, `.map()` pour cocher/éditer, `.filter()` pour supprimer, un state local dans `TodoItem` pour l'édition, et une variable dérivée pour filtrer l'affichage.
