Overview
<h1>QKart is an E-commerce application offering a variety of products for customers to choose from.</h1>
Visit the demo website below,

# https://qkart-frontend-hasansamplewala.netlify.app/
Note: Please wait for atleast 3-4 mins for the backend to load the products. You will need to register before logging in.

During the course of this project,

Implemented the core logic for authentication, shopping cart and checkout
Improved UI by adding responsive design elements for uniform experience across different devices
Utilized REST APIs to dynamically load and render data served by the backend server
Deployed website to Netlify

<img width="500" alt="image" src="https://user-images.githubusercontent.com/63907816/225816019-778c601b-dfaf-4a6c-9486-11f93ef9f653.png"> <img width="400" alt="image" src="https://user-images.githubusercontent.com/63907816/225816086-ee211569-a144-4122-9945-ec503c880124.png">

<h2>QKart Component Architecture</h2>

QKart Shopping Interface (Products page)

<h4>Add Registration feature</h4>
Scope of work
Implemented logic and used backend API to get the registration feature ready
Added validation for the register form user input values to display informative error messages
Skills used
React.js, Event Handling, Forms, React Hooks, REST API, Error Handling

<h4>Implement registration-login flow and set up routing</h4>
Scope of work
Used React Router library to set up routes in the application and redirect customers to appropriate pages
Added UI and logic to get the Login page ready
Stored user information at client side using localStorage to avoid login on revisit
Skills used
React Router, Material UI, localStorage, Controlled Components, Conditional Rendering

<img width="400" alt="image" src="https://user-images.githubusercontent.com/63907816/225835264-ee9a7fbc-537d-49cf-9ec3-e5e61dc1f2a4.png"> <img width="600" alt="image" src="https://user-images.githubusercontent.com/63907816/225835446-40f8fa30-8ac2-40db-8b78-4c6c08a4a7f1.png">


Request-response cycle for QKart User signup and login

User flow on website for signup and login

<h4>Display products and implement search feature</h4>
Scope of work
Utilized the useEffect() hook to fetch products data after DOM is rendered for faster page loading
Added search bar to display only on the Products page’s header and implemented search logic
Implemented debouncing for improved UX and reduced API calls on search
Skills used
Keyword Search, Debouncing, Material UI Grid
<img width="769" alt="image" src="https://user-images.githubusercontent.com/63907816/225835562-6faea5e3-c425-49ef-b87b-ddaf3201043c.png">

<h4>QKart Products page</h4>

Add shopping cart and implement checkout flow
Scope of work
Added Cart to Products page and made it responsive
Made authenticated POST API calls to implement Cart logic
Rendered Cart with differing designs in Products page and Checkout page using conditional rendering
Implemented UI and logic to add and select new addresses
Skills used
Responsive Design, Reusable Components
<img width="848" alt="image" src="https://user-images.githubusercontent.com/63907816/225835790-671c1a15-665b-4761-bd03-45c65702eada.png">

Products page UI with responsive Cart design (Left: Desktop, Right: Mobile)
<img width="600" alt="image" src="https://user-images.githubusercontent.com/63907816/225835880-820d4d61-3403-40c7-ae47-ac319572eccd.png">

QKart Checkout page

Deploy the QKart website
Scope of work
Deployed the QKart React app to Netlify
Configured Netlify to support visiting any sub pages directly as React is a single page application
Skills used
Deployment, Netlify
