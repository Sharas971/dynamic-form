## Launch a project in development mode:

### `npm install`

### `npm start`

## Run tests:

### `npm install`

### `npm run test`

## Available Scripts:

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\

### `npm run test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\

## Documentation/description:

Used 'react-hook-form' for main form functionality and 'zod' for form schema and validation.
Both tools are very popular amongst developers, having 4M+ weekly downloads. Both are small sized dependencies and very performant.
Also both help a lot if we would compare it to using just React and HTML. Help with state management, validations, etc. Very developer oriented tools.

When adding new fields to the form used 'react-modal', for popup functionality. In my opinion it should be quite clear for an end user.
You just press 'Add field' button and are greeted with a popup that has it's own small form, where you can specify what kind of field you want, how to name it, etc.

Project structure should be clear aswell. Separated main parts like components, styles, tests, etc. Every component has it's own folder with it's styles if needed.

Used minimal styling, as it wasn't required, but it still looks quite good. It's main purpose is to make sure that everything is clear and user-friendly.

Tests are written using Jest, which is included with CRA. Wrote few tests for main components 'DynamicForm' and 'AddFieldModal', to show how to do it. Production solution would have many more tests.

Used constants in helpers to keep track of everything in one place. So for example if we want to change some validation texts it would be easy. Same thing with style variables.

It wasn't specified what to do with form data, so I logged it in console.

How to use:
When you open app, you are greeted with default form with few inputs on it. There are some other default form choices to try on the bottom, just press 'Basic', 'Login' or 'Email details' buttons.
You can delete existing field by pressing delete button right next to it. If you want to add new fields press 'Add field' button, and you will be greeted with a popup that has another form, to add your desired fields.
Once you configured your form, you can enter data data and submit. If something is wrong, you will get a validation for a corresponding field.
