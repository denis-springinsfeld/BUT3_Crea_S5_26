# TD React — Découvrir les API

# Mise en place

```bash
npm create vite@latest td-api -- --template react
cd td-api
npm install
```

# Notions importantes

## Une API (Application Programming Interface)

Une **API** est un service qui permet à un programme de demander des données à un autre programme. C'est comme au restaurant : vous (l'application React) passez commande, la cuisine (le serveur) prépare, et on vous rapporte le plat (les données). Vous n'entrez jamais en cuisine.

Pour demander quelque chose, on envoie une **requête** à une **URL**. La réponse arrive le plus souvent en **JSON**, un texte qui décrit des objets `{ }` et des tableaux `[ ]`.

Nous allons utiliser [Random User](https://randomuser.me/documentation) génère de faux profils d'utilisateurs : nom, e-mail, photo... Parfait pour s'entraîner.

Entrez l'URL `https://randomuser.me/api/` dans le navigateur et observez la réponse. C'est un objet avec deux champs : `results` (un tableau d'utilisateurs) et `info` (des infos sur la requête). Chaque utilisateur a un nom, un e-mail, un identifiant unique et une photo.

```json
{
  "results": [
    {
      "name": { "first": "Camille", "last": "Martin" },
      "email": "camille.martin@example.com",
      "login": { "uuid": "47a045ba-d8d1-4f82-95c0-168137cb3909" },
      "picture": { "large": "https://randomuser.me/api/portraits/women/12.jpg" }
    }
  ],
  "info": { "results": 1 }
}
```

Pour atteindre une valeur, on suit le chemin avec des points et des crochets : `data.results[0].name.first` donne « Camille ».

## fetch (js)

`fetch` est la fonction du navigateur qui appelle une API. Le réseau prend du temps, donc `fetch` renvoie une **promesse**, un résultat promis pour plus tard. Le mot-clé `await` signifie « attends la réponse avant de continuer ».

```js
async function charger() {
  const response = await fetch("https://randomuser.me/api/"); // 1. on demande
  const data = await response.json(); // 2. on convertit le JSON en objet JavaScript
  console.log(data);
}

charger();
```

Essayez ce code dans la console du navigateur. Attention : `fetch` ne signale aucune erreur pour un code 404 ou 500, car le serveur a bien répondu. Il faut tester `response.ok` (le hook fourni le fait pour vous).

## useEffect

React exécute la fonction d'un composant à chaque fois qu'il doit mettre à jour l'affichage. Si on appelait `fetch` directement dedans, la requête repartirait à chaque affichage, en boucle : la réponse modifie le state, ce qui relance l'affichage, qui relance la requête...

`useEffect` permet de dire : « **une fois le composant affiché**, exécute ce code ». Le tableau à la fin indique quand le relancer :

| Tableau | L'effet s'exécute                             |
| ------- | --------------------------------------------- |
| `[]`    | une seule fois, quand le composant apparaît   |
| `[url]` | au début, puis à chaque fois que `url` change |

```jsx
useEffect(() => {
  console.log("Le composant vient de s afficher");
}, []);
```

Vous n'aurez pas à écrire de `useEffect` dans ce TD : le hook `useFetch` le fait pour vous.

## Les trois états d'une requête

Pendant qu'on attend, puis une fois la réponse reçue, le composant est toujours dans l'un de ces trois états :

| État       | `isLoading` | `data`      | `error`  |
| ---------- | ----------- | ----------- | -------- |
| Chargement | `true`      | `null`      | `null`   |
| Succès     | `false`     | les données | `null`   |
| Erreur     | `false`     | `null`      | l'erreur |

On affiche donc un message différent pour chacun. Attention : tant que la réponse n'est pas arrivée, `data` vaut `null`. Lire `data.results` à ce moment-là fait planter l'application. **Traitez toujours `isLoading` et `error` avant de lire `data`.**

## Le hook `useFetch`

Un **hook** est une fonction réutilisable qui contient de la logique React. Celui-ci envoie la requête et gère les trois états. **Copiez-le tel quel dans `src/hooks/useFetch.js`** : vous n'avez pas besoin de tout comprendre pour l'utiliser.

```js
import { useEffect, useState } from "react";

// useFetch(url) envoie une requête à l'adresse url
// et renvoie { data, error, isLoading, refetch }
function useFetch(url) {
  const [state, setState] = useState({
    data: null,
    error: null,
    isLoading: true,
  });
  const [reloadKey, setReloadKey] = useState(0); // augmenter ce nombre relance la requête

  // useEffect : « une fois le composant affiché, envoie la requête ».
  // La requête repart quand url ou reloadKey change.
  useEffect(() => {
    const controller = new AbortController(); // permet d'annuler la requête

    async function load() {
      setState({ data: null, error: null, isLoading: true });
      try {
        const response = await fetch(url, { signal: controller.signal });
        // fetch ne signale pas les erreurs 404 ou 500 : on les détecte ici
        if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);
        const data = await response.json();
        setState({ data, error: null, isLoading: false });
      } catch (error) {
        if (error.name === "AbortError") return; // annulation voulue : pas une vraie erreur
        setState({ data: null, error, isLoading: false });
      }
    }
    load();

    return () => controller.abort(); // nettoyage : annule la requête en cours
  }, [url, reloadKey]);

  const refetch = () => setReloadKey((k) => k + 1);

  return { ...state, refetch };
}

export default useFetch;
```

Si on appelait `fetch` directement dans un composant, la requête repartirait à chaque affichage, en boucle (la réponse change le state, qui relance l'affichage, qui relance la requête...). `useEffect` permet de dire : « une fois le composant affiché, exécute ce code ». Le tableau `[url, reloadKey]` indique quand le relancer.

**Utilisation :**

```jsx
import useFetch from "../hooks/useFetch";

const { data, error, isLoading, refetch } = useFetch(
  "https://randomuser.me/api/",
);
```

| Valeur renvoyée | Rôle                                          |
| --------------- | --------------------------------------------- |
| `data`          | les données reçues (ou `null`)                |
| `error`         | l'erreur (ou `null`), avec un champ `message` |
| `isLoading`     | `true` tant que la réponse n'est pas arrivée  |
| `refetch`       | une fonction qui relance la même requête      |

Si on donne une **nouvelle URL** au hook, il refait la requête tout seul.

# Exercices

## Exercice 1 — Random User

```plainText

- src/
  App.jsx
  hooks/
    useFetch.js
  components/
    RandomUser.jsx
    UserList.jsx

```

### 1.1 Testez `useFetch`

Testez `useFetch` dans le composant `RandomUser`, puis affichez `data`, `error` et `isLoading` dans la console.

```jsx
import useFetch from "../hooks/useFetch";

function RandomUser() {
  const { data, error, isLoading } = useFetch("https://randomuser.me/api/");

  console.log(data, error, isLoading);

  return <p>Regardez la console</p>;
}

export default RandomUser;
```

### 1.2 Afficher un utilisateur

Complétez le composant, puis affichez-le dans `App.jsx` :

```jsx
import useFetch from "../hooks/useFetch";

function RandomUser() {
  const { data, error, isLoading } = useFetch("https://randomuser.me/api/");

  // TODO 1 : si isLoading est vrai, afficher « Chargement… »
  // TODO 2 : si error existe, afficher error.message
  // TODO 3 : afficher la photo, le prénom, le nom et l'e-mail de data.results[0]

  return <p>À compléter</p>;
}

export default RandomUser;
```

À faire :

- Écrivez les cas de `isLoading` et de `error` **avant** de lire `data`.
- `user.name` est un **objet** (`first`, `last`) : React ne sait pas afficher un objet. Affichez `user.name.first`.
- Une image s'affiche avec `<img src={...} alt={...} />`.

### 1.3 Créez une carte pour chaque utilisateur

- Créez un composant `UserCard` qui affiche les informations d'un utilisateur (photo, prénom, nom, e-mail) dans une carte.

### 1.4 Un bouton « Nouvel utilisateur »

- Récupérez aussi `refetch` et ajoutez un bouton qui l'appelle au clic. Vérifiez que « Chargement… » apparaît brièvement.

Dans les outils de développement vous pouvez simuler un réseau lent pour mieux voir le chargement : onglet **Réseau** → menu déroulant **Online** → **Slow 3G**.

### 1.5 Afficher six utilisateurs

- Ajoutez `?results=6` à l'URL et affichez une liste avec `map`. Chaque élément de liste a besoin d'une `key` unique : utilisez `user.login.uuid`.
- Créez un composant `UserList` qui affiche six utilisateurs dans une liste.
- Ajoutez `&nat=fr` pour obtenir des profils français.

### 1.5 Choisir le genre

- Ajoutez un menu déroulant (`<select>`) « Tous / Femmes / Hommes » qui change l'URL grâce au paramètre `gender` (`male` ou `female`, vide pour tous). Stockez le choix dans un state et construisez l'URL avec :

```jsx
const url = `https://randomuser.me/api/?results=6&nat=fr&gender=${gender}`;
```

Ouvrez l'onglet **Réseau** des DevTools : une nouvelle requête part à chaque changement. (En développement, React lance chaque requête deux fois : vous verrez deux lignes. C'est normal.) Le menu doit rester affiché pendant le chargement (voir le corrigé).

### Suite...

- Créez un composant `Loader` et un composant `ErrorMessage` réutilisables dans tous vos écrans.

## Exercice 2 — API Rick and Morty

Vous allez maintenant utiliser l'API [Rick and Morty](https://rickandmortyapi.com/documentation) pour créer une liste de personnages avec un champ de recherche.

Testez cette nouvelle API.

Pour le prochain TD proposer user-stories et wireframes d'une application qui utilise l'API Rick and Morty.

---

# Pièges fréquents

| Message ou symptôme                      | Cause probable                                                                                 |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `Cannot read properties of null`         | vous lisez `data` avant sa réponse : testez `isLoading` d'abord                                |
| `Objects are not valid as a React child` | vous affichez un objet (par exemple `user.name`) au lieu d'un texte                            |
| Avertissement sur les `key`              | il manque `key` sur l'élément répété dans un `map`                                             |
| `x.map is not a function`                | ce n'est pas un tableau : regardez la structure dans le navigateur (`data.results` ? `data` ?) |
| Rien ne s'affiche                        | ajoutez `console.log(data, error)` et lisez la console                                         |
| Erreur CORS dans la console              | l'API n'autorise pas votre site : choisissez-en une autre                                      |
