var React = require('react');

var Index = React.createClass({

render: function() {

var bundleScript = this.props.bundleScript || "bundle.js";
var styleScript = this.props.styleScript || "style.css";

return (
<html>
<head>
  <link rel="stylesheet" type="text/css" href={ styleScript } />
</head>
<body>
<div id="app" className="bo-domain-services-app"></div>
<script src={bundleScript} ></script>
</body>
</html>
);
}
});

module.exports = Index;
