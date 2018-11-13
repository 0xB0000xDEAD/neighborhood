# Neighborhood

## Table of Contents

- [What is this?](<What\ is\ this?>)
- [How to use it](<How\ to\ use\ it>)
- [Note](Note)

## What is this?

Neighborhood is a demo realized for the final project of the FrontEnd Udacity Course. The main purpose is to show how to fetch data from external API ([Foursquare](http:foursquare.com))and visualize this data through google maps in a React app


## How to use it

Clone the repository with:

```
$ git clone ***
```

Run in the terminal

```
 $ yarn build
```

to build the app or if you like to explore the source code run

```
 $ yarn start
```

to live view the app in your browser.
The local server will respond on _localhost:3000_

## Note

To prevent to exceed the API call limit a copy of the real API response is served in dev from a local json server to make it easier to debug the code.

**!**  The json server starts automatically only when you call the _start_ script and provide the dummy data. To use this functionality set to _true_  config property  _callForReal_ in [./config.js](./config.js)

```
export const config = {
  port: 4000,
  callForReal: false,
  swOnDev: false // turn on the Service Worker in dev mode
};

```

Also _port_ set the json-server port.
 





