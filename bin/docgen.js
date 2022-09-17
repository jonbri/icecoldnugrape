const docgen = require("react-docgen-typescript");

const options = {
  savePropValueAsString: true,
};

// Parse a file for docgen info
const result = docgen.parse("./components/Sample.tsx", options);

console.log(result);
console.log(result[0].props);
