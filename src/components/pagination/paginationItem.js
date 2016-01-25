var React = require('react');

var PaginationItem = React.createClass({
  isCurrentPage: function() {
    return this.props.currentIndex == this.props.index;
  },
  render: function() {
    return (
      <li className={this.isCurrentPage() ? 'active' : ''}>
        <a href={this.props.getUrl(this.props.index)}>
          {this.props.index}
        </a>
      </li>
    );
  }
});

module.exports = PaginationItem;
