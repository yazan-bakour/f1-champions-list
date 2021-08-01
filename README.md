# Formula one champions list

This app will display the data of seasons, race names, and the champions names.

## Description

This project is using TypeScript, and was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

I created Store folder to store the API endpoints states into actions/reducers, and dispatch them in the view to only display the data. By following this store structure we will achive scaleable app with good design pattern.

I split the components inside Views to recieve the dispatch data independently and to have a better performance.

### Dependencies & Scripts

* TypeScript.
* Redux Tookit.
* Material-UI.
* Material-UI Icons.
* msw 
* axios
* ...

### Excuting program

* To make sure all dependencies are installed
```
yarn
```

* To start the project on localhost
```
yarn start
```

* To test the program
```
yarn test
```

Please check the package.json and run yarn if there's missing dependencies