# Motion (Ex Framer Motion)

[Docs motion pour React](https://motion.dev/docs/react)

Motion est une librairie d'animation pour React, qui permet de créer des animations fluides et performantes avec une API simple et intuitive.

## Sommaire

| N°  | Thème                          | Concepts clés                                                         |
| :-: | :----------------------------- | :-------------------------------------------------------------------- |
|  0  | Fondamentaux                   | `motion.*`, `initial`, `animate`, `transition`, `variants`, `stagger` |
|  1  | Application (Orchestration)    | Propagation parent → enfants, `delayChildren`, `staggerChildren`      |
|  2  | Keyframes et Boucles           | Tableaux de valeurs, `repeat`, `repeatType`                           |
|  3  | Interactions (Hover & Tap)     | `whileHover`, `whileTap`, `spring`                                    |
|  4  | Animation SVG                  | `pathLength`, transitions par propriété                               |
|  5  | Scroll Reveal                  | `whileInView`, `viewport`                                             |
|  6  | AnimatePresence (Sortie)       | `<AnimatePresence>`, `exit`                                           |
|  7  | Layout Animations              | `layout`, transitions de taille/position                              |
|  8  | Text Animation (Par caractère) | `Array.from`, `staggerChildren`, transforms 3D                        |
|  9  | Animation de chiffres          | `animate()`, `onUpdate`, `useEffect`, `useState`                      |

---

## Installation

Télécharger le projet et installer les dépendances :

> ```bash
> npm install
> ```

Installer la librairie Motion :

> ```bash
> npm install motion
> ```

Importer sur chaque composant React les éléments nécessaires depuis `motion/react` :

```jsx
import { motion } from "motion/react";
```

---

# Partie 1 — Les bases

## 1.1 Le composant `motion.*`

Pour animer un élément HTML, on remplace la balise standard par sa version `motion.` :

```
<h1>       →  <motion.h1>
<div>      →  <motion.div>
<button>   →  <motion.button>
<span>     →  <motion.span>
<svg>      →  <motion.svg>
<path>     →  <motion.path>
```

## 1.2 Les propriétés fondamentales

| Propriété    | Rôle                                         |
| :----------- | :------------------------------------------- |
| `initial`    | État de départ au montage du composant.      |
| `animate`    | État cible de l'animation.                   |
| `transition` | Façon dont on passe de `initial` → `animate` |
| `exit`       | État avant le démontage du composant.        |

### Exemple minimal

```jsx
<motion.h1
  initial={{ opacity: 0, scale: 0.5 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.7 }}
  className="text-5xl font-bold"
>
  Hello World !
</motion.h1>
```

## 1.3 Options de `transition`

| Propriété  | Description              | Exemple                   |
| :--------- | :----------------------- | :------------------------ |
| `duration` | Durée en secondes        | `0.5`                     |
| `delay`    | Délai avant le démarrage | `0.2`                     |
| `ease`     | Courbe d'accélération    | `"easeInOut"`, `"linear"` |
| `type`     | Type d'animation         | `"spring"` ou `"tween"`   |

- **`tween`** : animation temporelle classique (défaut pour `opacity`, `color`, etc.)
- **`spring`** : animation physique à ressort (défaut pour `scale`, `x`, `y`, `rotate`)

> [!TIP]
> **→ Exercice 0** (`Exercice0.jsx`)
>
> - 1. Créer un titre qui apparaît avec un fondu et un changement d'échelle. Utiliser `initial`, `animate` et `transition`.
> - 2. Définir des `variants` pour séparer la logique du design.
> - 3. Utiliser `delayChildren` et `staggerChildren` pour orchestrer les enfants.

---

# Partie 2 — Les Variants

## 2.1 Principe

Les **variants** permettent de définir des états d'animation nommés, séparés du JSX. C'est la méthode recommandée.

```jsx
const myVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

<motion.h1
  variants={myVariants}
  initial="hidden"
  animate="visible"
  className="text-5xl font-bold"
>
  Hello World !
</motion.h1>;
```

## 2.2 Avantages

| Avantage        | Explication                                   |
| :-------------- | :-------------------------------------------- |
| Lisibilité      | JSX plus propre, logique séparée              |
| Réutilisabilité | Mêmes variants sur plusieurs composants       |
| Propagation     | Coordination automatique parent → enfants     |
| Orchestration   | Synchronisation des animations avec `stagger` |

## 2.3 Bonnes pratiques de nommage

Utiliser des noms sémantiques décrivant l'état visuel :

- `hidden` / `visible`
- `open` / `closed`
- `offscreen` / `onscreen`
- `active` / `inactive`
- `rest` / `hover` / `tap`

---

# Partie 3 — Orchestration (Stagger)

## 3.1 Propagation automatique

Quand un parent `motion.*` a `animate="visible"`, ses enfants `motion.*` cherchent **automatiquement** le variant `visible` dans leur propre objet `variants`.

> Pas besoin de remettre `initial` et `animate` sur chaque enfant.

## 3.2 `delayChildren` et `staggerChildren`

| Propriété         | Rôle                                                         |
| :---------------- | :----------------------------------------------------------- |
| `delayChildren`   | Déclenche l'animation de **tous** les enfants après un délai |
| `staggerChildren` | Décale le démarrage de chaque enfant successivement          |

Ces propriétés se placent dans la `transition` du variant **parent** :

```jsx
// Variants du PARENT
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2, // attend 0.2s avant le premier enfant
      staggerChildren: 0.3, // 0.3s d'écart entre chaque enfant
    },
  },
};

// Variants des ENFANTS
const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};
```

```jsx
<motion.div variants={containerVariants} initial="hidden" animate="visible">
  <motion.div variants={childVariants} /> {/* démarre à 0.2s */}
  <motion.div variants={childVariants} /> {/* démarre à 0.5s */}
  <motion.div variants={childVariants} /> {/* démarre à 0.8s */}
</motion.div>
```

> [!TIP]
> **→ Exercice 1** (`Exercice1.jsx`)
>
> - Créer un conteneur parent et deux enfants.
> - Utiliser `delayChildren` et `staggerChildren` dans le variant parent pour décaler l'apparition des enfants.
> - Faire venir un enfant du haut et l'autre du bas.

---

# Partie 4 — Keyframes et Boucles

## 4.1 Keyframes

Au lieu d'une valeur unique, on passe un **tableau** pour créer une séquence d'états :

```jsx
<motion.div
  animate={{
    scale: [1, 2, 2, 1],
    rotate: [0, 90, 180, 0],
    borderRadius: ["20%", "20%", "50%", "20%"],
  }}
  transition={{ duration: 2 }}
/>
```

Chaque étape se partage la durée totale de manière égale.

## 4.2 Boucles

| Propriété     | Valeur      | Description                            |
| :------------ | :---------- | :------------------------------------- |
| `repeat`      | `Infinity`  | Boucle infinie                         |
| `repeat`      | `3`         | Répète 3 fois                          |
| `repeatDelay` | `0.5`       | Pause entre deux cycles (en secondes)  |
| `repeatType`  | `"loop"`    | Recommence au début                    |
| `repeatType`  | `"reverse"` | Joue en sens inverse un cycle sur deux |
| `repeatType`  | `"mirror"`  | Alterne aller / retour                 |

```jsx
transition={{
  duration: 2,
  repeat: Infinity,
  repeatType: "reverse",
}}
```

> [!TIP]
> **→ Exercice 2** (`Exercice2.jsx`)
>
> - Utiliser des tableaux de valeurs (keyframes) pour `scale`, `rotate` et `borderRadius`.
> - Mettre en place une boucle infinie avec `repeat: Infinity` et `repeatType: "reverse"`.

---

# Partie 5 — Interactions (Hover & Tap)

## 5.1 Propriétés d'interaction

| Propriété    | Déclencheur         |
| :----------- | :------------------ |
| `whileHover` | Survol de la souris |
| `whileTap`   | Clic / toucher      |

Ces propriétés acceptent un objet de style ou un nom de variant.

## 5.2 Transition `spring` (ressort)

| Propriété   | Rôle                                  | Valeur par défaut |
| :---------- | :------------------------------------ | :---------------- |
| `stiffness` | Tension du ressort (↑ = plus nerveux) | `100`             |
| `damping`   | Amortissement (↓ = plus de rebond)    | `10`              |

## 5.3 Exemple complet

```jsx
const buttonVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.1,
    backgroundColor: "#d1d5db",
    color: "#000000",
    transition: { type: "spring", damping: 10, stiffness: 600 },
  },
  tap: { scale: 0.9 },
};

<motion.button
  variants={buttonVariants}
  initial="rest"
  whileHover="hover"
  whileTap="tap"
>
  Subscribe
</motion.button>;
```

> [!TIP]
> **→ Exercice 3** (`Exercice3.jsx`)
>
> - Créer un bouton interactif utilisant `whileHover` et `whileTap`.
> - Configurer une transition de type `spring` avec `stiffness` et `damping`.
> - Utiliser des noms de variants sémantiques (`rest`, `hover`, `tap`).

---

# Partie 6 — Animation SVG

## 6.1 Tracé de chemin (`pathLength`)

| Valeur          | Rendu           |
| :-------------- | :-------------- |
| `pathLength: 0` | Tracé invisible |
| `pathLength: 1` | Tracé complet   |

En animant `pathLength` de `0` à `1`, on obtient l'effet "dessin progressif".

## 6.2 Transitions par propriété

On peut définir une transition **différente** pour chaque propriété animée :

```jsx
transition: {
  default: { duration: 2, ease: "easeInOut" },  // pour pathLength
  fill: { duration: 2, ease: "easeIn", delay: 1 } // pour fill (décalé)
}
```

## 6.3 Exemple complet

```jsx
const svgIconVariants = {
  hidden: {
    pathLength: 0,
    fill: "rgba(255, 255, 255, 0)",
  },
  visible: {
    pathLength: 1,
    fill: "rgba(255, 255, 255, 1)",
    transition: {
      default: { duration: 2, repeat: Infinity, repeatType: "reverse" },
      fill: { duration: 2, ease: "easeIn", delay: 1 },
    },
  },
};

<motion.svg viewBox="0 0 24 24">
  <motion.path
    d="..."
    variants={svgIconVariants}
    initial="hidden"
    animate="visible"
    stroke="white"
    strokeWidth={0.5}
  />
</motion.svg>;
```

> **Important** : Pour que `pathLength` fonctionne, il faut utiliser `<motion.path>` (pas `<path>`), et le SVG doit contenir un `stroke`.

> [!TIP]
> **→ Exercice 4** (`Exercice4.jsx`)
>
> - Utiliser `pathLength` pour faire "se dessiner" une icône SVG.
> - Définir des transitions spécifiques pour le tracé (`default`) et le remplissage (`fill`).
> - Utiliser `repeatType: "reverse"` pour un effet de va-et-vient.

---

# Partie 7 — Scroll Reveal (`whileInView`)

## 7.1 Principe

`whileInView` remplace `animate` pour déclencher l'animation **quand l'élément entre dans la zone visible** du navigateur.

## 7.2 Propriétés

| Propriété         | Rôle                                                        |
| :---------------- | :---------------------------------------------------------- |
| `whileInView`     | Lance l'animation quand l'élément entre dans le viewport    |
| `viewport.once`   | Si `true`, joue une seule fois (ne revient pas à `initial`) |
| `viewport.amount` | Proportion de l'élément qui doit être visible (`0` à `1`)   |
| `viewport.margin` | Marge virtuelle de déclenchement (ex: `"-100px"`)           |

## 7.3 Exemple

```jsx
const variants = {
  offscreen: { opacity: 0, y: 50 },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", duration: 0.8 },
  },
};

<motion.div
  variants={variants}
  initial="offscreen"
  whileInView="onscreen"
  viewport={{ once: false, amount: 0.5 }}
/>;
```

- `once: false` → l'animation se rejoue à chaque entrée/sortie
- `amount: 0.5` → l'élément doit être visible à 50% pour déclencher

> [!TIP]
> **→ Exercice 5** (`Exercice5.jsx`)
>
> - Utiliser `whileInView` au lieu de `animate`.
> - Configurer `viewport` avec `once: false` et `amount` pour contrôler le déclenchement.
> - Utiliser des noms sémantiques `offscreen` et `onscreen`.

---

# Partie 8 — AnimatePresence (Sortie)

## 8.1 Le problème

Sans `AnimatePresence`, React **retire immédiatement** un composant du DOM quand la condition de rendu devient `false`. Aucune animation de sortie n'est possible.

## 8.2 La solution

`<AnimatePresence>` enveloppe les éléments conditionnels et leur permet de jouer leur animation `exit` avant d'être retirés du DOM.

```jsx
import { motion, AnimatePresence } from "motion/react";
```

## 8.3 Propriétés

| Propriété          | Rôle                             |
| :----------------- | :------------------------------- |
| `initial`          | État d'entrée                    |
| `animate`          | État stable                      |
| `exit`             | État de sortie (avant démontage) |
| `mode="popLayout"` | Évite les sauts de layout        |

## 8.4 Exemple

```jsx
const [isVisible, setIsVisible] = useState(true);

<AnimatePresence mode="popLayout">
  {isVisible && (
    <motion.div
      key="box"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.3 }}
      className="h-32 w-32 rounded-2xl bg-indigo-400"
    />
  )}
</AnimatePresence>;
```

> **Important** : L'élément conditionnel doit avoir une prop `key` unique pour que Motion puisse suivre son cycle de vie.

> [!TIP]
> **→ Exercice 6** (`Exercice6.jsx`)
>
> - Utiliser le composant `<AnimatePresence>`.
> - Définir une propriété `exit` sur l'élément motion.
> - Créer un bouton pour masquer/afficher un élément avec une transition fluide à la fermeture.

---

# Partie 9 — Layout Animations

## 9.1 Principe

La prop `layout` anime **automatiquement** les changements de taille, position et `borderRadius` quand la mise en page CSS change.

```jsx
<motion.div layout />
```

## 9.2 Comment ça marche

1. Motion capture la position/taille **avant** le re-render
2. React effectue le re-render (changement de classes, taille, position…)
3. Motion capture la **nouvelle** position/taille
4. Motion anime la transition entre les deux états via `transform`

## 9.3 Exemple

```jsx
const [isExpanded, setIsExpanded] = useState(false);

<motion.div
  layout
  onClick={() => setIsExpanded(!isExpanded)}
  style={{
    width: isExpanded ? "100%" : "96px",
    height: isExpanded ? "100%" : "96px",
    borderRadius: isExpanded ? "40px" : "12px",
  }}
  transition={{ type: "spring", stiffness: 300, damping: 30 }}
  className="cursor-pointer bg-pink-500"
/>;
```

> **Cas d'usage** : accordéons, cartes expansibles, grilles réorganisables.

> [!TIP]
> **→ Exercice 7** (`Exercice7.jsx`)
>
> - Utiliser la prop `layout`.
> - Créer un carré qui s'agrandit pour remplir son conteneur au clic.
> - Observer comment Motion gère automatiquement la transition de taille et de `borderRadius`.

---

# Partie 10 — Text Animation (Par caractère)

## 10.1 Méthode

1. **Découper** le texte en tableau de caractères avec `Array.from()` ou `.split("")`
2. **Envelopper** chaque caractère dans un `<motion.span>`
3. **Orchestrer** avec `staggerChildren` sur le conteneur parent

## 10.2 Points clés

| Point               | Détail                                          |
| :------------------ | :---------------------------------------------- |
| `display`           | Chaque lettre doit être en `inline-block`       |
| `staggerChildren`   | Sur le conteneur pour décaler chaque lettre     |
| Gestion des espaces | Prévoir un `minWidth` ou `marginRight` pour ` ` |
| `perspective`       | Optionnel, pour les effets de rotation 3D       |

## 10.3 Exemple

```jsx
const text = "Hello World";
const letters = Array.from(text);

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 20, rotateX: -90 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: "spring", damping: 12 },
  },
};

<motion.h1
  variants={containerVariants}
  initial="hidden"
  animate="visible"
  style={{ perspective: 500 }}
>
  {letters.map((letter, index) => (
    <motion.span
      key={index}
      variants={letterVariants}
      className="inline-block"
      style={{
        marginRight: letter === " " ? "0.3em" : "0.02em",
        minWidth: letter === " " ? "0.3em" : "auto",
      }}
    >
      {letter}
    </motion.span>
  ))}
</motion.h1>;
```

> [!TIP]
> **→ Exercice 8** (`Exercice8.jsx`)
>
> - Découper un texte en tableau de caractères.
> - Utiliser `staggerChildren` pour un effet de vague ou de révélation séquentielle.
> - Ajouter des transformations 3D (`rotateX`, `perspective`) pour un rendu premium.

> [!NOTE]
> **Vérification des exercices 7 et 8**
>
> Les consignes de ces deux exercices décrivent respectivement `layout` et une animation par caractère, mais les fichiers actuels n'utilisent pas encore ces fonctionnalités (`motion.div`/`layout` pour l'exercice 7 et `motion.span`/variants pour l'exercice 8). Il faut donc compléter leur implémentation pour que le code corresponde entièrement au cours.

# Partie 11 — Effet de bord et compteur animé

## 11.1 À quoi sert `useEffect` ?

`useEffect` permet d'exécuter du code après le rendu d'un composant. Il est adapté aux effets de bord, c'est-à-dire aux actions qui ne consistent pas uniquement à calculer le JSX : lancer une animation, effectuer une requête réseau, écouter un événement ou modifier le document.

```jsx
import { useEffect } from "react";

useEffect(() => {
  // Code exécuté après le rendu
}, []);
```

Le deuxième argument est le **tableau de dépendances** :

| Tableau   | Quand l'effet est exécuté                       |
| :-------- | :---------------------------------------------- |
| absent    | Après chaque rendu                              |
| `[]`      | Une fois au montage du composant                |
| `[value]` | Au montage, puis chaque fois que `value` change |

## 11.2 `useEffect` dans l'exercice 9

Dans `Exercice9.jsx`, l'animation doit démarrer automatiquement lorsque le composant apparaît. L'effet appelle donc `launchAnimation` une seule fois :

```jsx
useEffect(() => {
  launchAnimation();
}, []);
```

Le déroulement est le suivant :

1. React rend le composant avec `count` égal à `0`.
2. Après ce rendu initial, `useEffect` appelle `launchAnimation`.
3. `animate()` fait progresser la valeur de `0` à `100` pendant deux secondes.
4. `onUpdate` reçoit chaque nouvelle valeur et `setCount` demande à React d'afficher le compteur à jour.
5. Le bouton rappelle la même fonction pour relancer l'animation à la demande.

L'effet ne doit pas être déclenché à chaque rendu : `setCount` provoque de nouveaux rendus, et un effet sans tableau de dépendances relancerait l'animation en boucle. Ici, `[]` indique que l'animation automatique est liée au montage du composant.

> [!TIP]
> **→ Exercice 9** (`Exercice9.jsx`)
>
> - Utiliser `useState` pour conserver la valeur affichée du compteur.
> - Utiliser `useEffect` avec `[]` pour lancer l'animation au montage.
> - Utiliser `animate()` et `onUpdate` pour synchroniser la valeur animée avec le state React.
> - Ajouter un bouton permettant de relancer l'animation.

---

## Récapitulatif — Tous les états d'animation

| Propriété     | Déclencheur                        |
| :------------ | :--------------------------------- |
| `initial`     | Montage du composant               |
| `animate`     | Immédiat (état cible)              |
| `exit`        | Démontage (avec `AnimatePresence`) |
| `whileHover`  | Survol                             |
| `whileTap`    | Clic / toucher                     |
| `whileInView` | Entrée dans le viewport            |
| `whileDrag`   | Pendant un glisser-déposer         |

---
