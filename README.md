# Neighborhood

## Table of Contents
* [What is this?](What\ is\ this?)
* [How to use it](How\ to\ use\ it)
* [Note](Note)


## What is this?
Neighborhood is a demo realized for the final project of the FrontEnd developper Udacity Course. his main scope is to show how to fetch data from external API and visualize this data through google maps.

A restaurants review page that load the content from a local json [file](/app/data/restaurants.json).

## How to use it

Clone the repository with:

```
$ git clone ***
```


Run in the terminal 
```
 $ yarn build
```

a local server showing [index.html](/app/index.html) will be loaded in your browser.

__!__  If you get some error while loading the review data, please change the port in the following code portion in [/utils/config.js](./utils/config.js)

```
static get DATABASE_URL() {
    const port = 9000 // Change this to your server port
    return `http://localhost:${port}/data/restaurants.json`;
  }

```
## Note

Please look at the _task_ in [gulpfile.js](gulpfile.js) to run other action.

To prevent to exceed the Api call limit a copy of the real API response is served in dev from a local server to make it easier to debug the code.