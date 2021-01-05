<h3 align="center">
    <img src="./.github/logo.JPG" alt="Bossabox" />
    <br><br>
    <b>Bossabox - Front-End challenge.</b>  
    <br>
</h3>

# Index

- [About](#about)
- [Functionalities](#functionalities)
- [Technologies](#technologies)
- [Preview Web](#preview-web)
- [Preview Mobile](#preview-mobile)
- [How to use](#how-to-use)
- [How to contribute](#how-to-contribute)

<a id="about"></a>

## :bookmark: About

<strong>Bossabox</strong> is a platform that unites developers with companies in order to bring together the best team for distinguished projects.

The task is to build a front-end for the VUTTR (Very Useful Tools to Remember) application. The application is a simple repository for managing tools with their names, links, descriptions and tags. Using a Git repository (public, preferably) for versioning and making the code available. The wireframe and style was provided by Bossabox

The front-end was build using Next.js to improve the SEO, and the api is a json-server that is host on [Heroku](https://dashboard.heroku.com/).


<a id="functionalities"></a>

## :fire: Functionalities

  - Show existing tools on database.
  - Search for tool using key word provided on input field.
  - Search for tool, only on tags, using key word provided on input field.
  - Create a new tool.
  - Edit / Update data.
  - Remove tool using confirmation modal.
  - Automated testing using Cypress.
  - Continuous integration using and Github Actions.
  - Continuous deployment using Vercel host linked with Github.

<a id="technologies"></a>

## :rocket: Technologies

The project is made with:

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Cypress](https://www.cypress.io/)
- [json-server](https://www.npmjs.com/package/json-server)


<a id="preview-web"></a>

## :heavy_check_mark: :computer: Web

<h1 align="center">
    <img alt="Web" src=".github/bossaboxWeb.gif" width="900px">
</h1>

<a id="preview-mobile"></a>

## :heavy_check_mark: :iphone: Mobile

<h1 align="center">
    <img alt="Mobile Detail" src=".github/bossaboxMobile.gif" width="900px">
</h1>

<a id="how-to-use"></a>

## :fire: How to Use

- ### **Dependencies**

  - Is **required** to install **[Node.js](https://nodejs.org/en/)**
  - In order to run scripts and install dependencies you need to install a **package manager** (ie: **[NPM](https://www.npmjs.com/)**).

  <br>

1. First step, clone this github repository:

```sh
  $ git clone https://github.com/dpisati/bossa-box-front.git
```

2. Run the application:

```sh
  # Install dependencies
  $ cd bossa-box-front && npm install

  # Start the server on port 3335
  $ npm run dev
```

<a id="how-to-contribute"></a>

## :recycle: How to Contribute

- Create a Fork from this repo,
- Create a branch with your feature: `git checkout -b my-feature`
- Commit changes: `git commit -m 'feat: My new feature'`
- Push to your branch: `git push origin my-feature`
