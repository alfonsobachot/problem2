# Problem Ordering Solved

App made with React Native using hooks.
I'm using Expo to deploy and test the app.

I made use of React Navigation to navigate throught the screens and AsyncStorage to locally save changes made to orders.

App.js contains the Navigation Stack.

First screen is Index, where there are a list with all the orders, so if you click on an order, app navigates to Screen Details.

Screen Details shows a list with the items from the selected order, each item has a button to delete the item.
Under the shown items, there is a Picker and a text entry with a button to add the selected item and quantity to the order.
Last, a button that sends the order to a remote API and shows an alert with its result.


## Setup 

**Install Dependencies**

    npm install
    
**Run App** 

    npm run web

