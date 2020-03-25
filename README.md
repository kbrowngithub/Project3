# Chuck-Wagon

Search Recipes [here](https://chuck-wagon.herokuapp.com/)

## Overview
React-based Recipe Search app. 

    Home - Search Drinks Button, Search Recipes Button

    Saved - Renders all books saved to the Mongo database. User has an option to "View" the book, 
    bringing them to the book on Google Books, or "Delete" a book, removing it from the Mongo database.


This is a MERN stack application and was created using create-react-app, uses React Routing on the front
end and Express routing on the backend. The application framework is designed following the Model View
Controller (MVC) model.

---

## Technologies Used
- HTML (https://html.spec.whatwg.org/multipage/)
- Bootstrap/Custom CSS (https://getbootstrap.com/)
- Create-React-App (https://github.com/facebook/create-react-app)
- React Hook Forms
- JavaScript (https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- Node.js (https://nodejs.org/en/)
- Axios / Express
- APIs: Twilio / Spoonacular / CocktailsDB
- Authentication using Passport
- Deployed on Heroku

---

## Site Organization
1. Landing page contains a nav bar with Friends, Recipe, New User, Panty, Login/out buttons.

2. Friends: Lists saved contacts, button to add a contact. Button routes to Invite page where an email or mobile number
    can be entered along with the contact name and a message to send. A send button initiates the text or email send and
    saves the contact to the list.

3. Recipe:

4. Pantry

5. New User

6. Login/Logout

7. Drink Recipes / Food Recipes

---

## Authors
- Lucas Aho - [LucasAho]https://github.com/LucasAho
- Kevin Brown - [kbrowngithub](https://github.com/kbrowngithub)
- Richard Hamp - [RichardHamp](https://github.com/RichardHamp)
- Tucker Fiumara - [thy-turk](https://github.com/thy-turk)


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

