var React = require('react');

var Breadcrumbs = React.createClass({
  getUrl: function() {
    return '#/catalog/' + this.props.catalog._id + '/';
  },
  render: function() {
    return (
      <ul className="breadcrumb">
        <li><a href="/">Home</a></li>
        <li><a href={this.getUrl()}>{this.props.catalog.title}</a></li>
        <li>{this.props.chapter.title}</li>
      </ul>
    );
  }
});

module.exports = Breadcrumbs;
