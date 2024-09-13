# brewhaus

Note: you will need a .env file with TomTom api key

hosted on github pages

- npm run build
- git subtree push --prefix dist origin gh-pages

Features of this website should include:

    - Main page listing out breweries
    - Pagination or lazy loading of breweries
    - Simple search function of breweries
    - Details page where a user can find out more information about specific breweries

Planning:

- App config: router, state management, typescript, ui styles setup
- layout: header, main
- brewery fetch, lazy load
  - pagination seemed like too many controls so i opted for lazy load
  - i added an option to get breweries close to user location
- detail page
  - added a tomtom api endpoint to fetch directions if the necessary data is present

Bugs:

- ref is not defined when cleaning up the scroll event/callback in BreweryList

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
