# Create React Structure

### Remove src folder & Re create it

```bat
rm -r src
mkdir src
cd src
touch App.js index.js
```

### Write Content Of index.js file

```js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
ReactDOM.render(<App />, document.getElementById("root"));
```

### Live Preview

- [Click Here To See Live Preview!](https://react-task-sy.netlify.app)
