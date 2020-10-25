GitHub Users Followers Search [Flair](https://logicalogbonna.github.io/github-followers-search).


## Installation

This is a [ReactJs](https://reactjs.org/) package available through the [npm registry](https://www.npmjs.com/).


```bash
$ npm install github-user-search --save
```
or
```bash
 $ yarn add github-user-search 
```
## Demo
[Demo Link](https://logicalogbonna.github.io/github-followers-search/)

## Usage

```js
  import ReactDom from "react-dom"; 
  import React from "react";
  import GitHubSearch  from "github-user-search";
  
  ReactDom.render(<GitHubSearch />, document.getElementById("root"));

```

## Props
| prop      | Description | Required    | Default |
| :---        |    :----:   |          ---: | ---: |
| user      | username of the user to diplay followers| false   |  mosh-hamedani    |
| current   | page to start pagination from | false      |      1|
| pageSize   | number of followers to be returned | false      |      5|
 
## License

  [MIT](LICENSE)
