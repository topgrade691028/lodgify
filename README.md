# Lodgify Grouped Tasks

## Introduction

Welcome to the Lodgify Grouped Tasks project! This project is a small widget designed to help users track their progress in completing tasks within different groups. The widget displays a list of task groups, each containing individual tasks that can be checked off as completed. As tasks are checked off, the progress bar dynamically updates to reflect the overall completion percentage.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Features](#features)
4. [Testing](#testing)
5. [Accessibility](#accessibility)
6. [Technologies Used](#technologies-used)
7. [Acknowledgements](#acknowledgements)

### Installation

To run this project locally, follow these steps:

In the project directory, you can run:

`yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

`yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

`yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Usage

The Lodgify Grouped Tasks widget is simple and intuitive to use:

- Upon loading the application, the widget will fetch data from an external API to populate the task groups and their associated tasks.
- Each task group can be expanded or collapsed by clicking on the group header.
- Individual tasks can be marked as completed by checking the corresponding checkbox.
- The progress bar at the top of the widget dynamically updates to reflect the overall completion percentage of all tasks.

### Features

- **Task Grouping**: Tasks are organized into groups, allowing users to focus on specific areas of completion.
- **Interactive Interface**: Users can interact with the widget by expanding/collapsing task groups and checking off individual tasks.
- **Dynamic Progress Tracking**: The progress bar updates in real-time as tasks are completed, providing users with immediate feedback on their progress.
- **Accessibility**: The application is designed with accessibility in mind, ensuring that all users, including those with disabilities, can navigate and interact with the widget effectively.

### Testing

The project includes a comprehensive suite of unit tests to ensure the reliability and correctness of the code. Testing is conducted using the React Testing Library and Jest framework. The tests cover various scenarios, including data fetching, user interaction, and component rendering.

### Accessibility

Accessibility is a top priority in this project, and efforts have been made to ensure that the widget is usable by all individuals, including those with disabilities. Key accessibility features include:

- **Semantic HTML**: Proper use of semantic HTML elements to provide meaningful structure and navigation.
- **Keyboard Navigation**: All interactive elements are accessible via keyboard navigation, ensuring that users who cannot use a mouse can still interact with the widget.
- **Screen Reader Support**: The widget includes appropriate ARIA attributes and labels to facilitate screen reader compatibility and enhance the user experience for visually impaired users.

### Technologies Used

- React: JavaScript library for building user interfaces.
- Material-UI: React UI framework for building responsive and accessible web applications.
- Axios: Promise-based HTTP client for making API requests.
- Jest: JavaScript testing framework for unit testing React components.
- React Testing Library: Testing utilities for React applications.

### Acknowledgements

This project was developed as part of the Lodgify Frontend Technical Challenge. Special thanks to the Lodgify recruitment team for providing the opportunity to showcase my technical skills and creativity.

For any inquiries or feedback, please contact:

- ### Ivan Bushev
- ### seasoneddev007@gmail.com
