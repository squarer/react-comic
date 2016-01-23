var React = require('react');

var Page = React.createClass({
  render: function() {
    return (
      <img className="page-img" src={this.props.url} />
    );
  }
});

module.exports = Page;
