var React = require('react');

var PrevPage = React.createClass({
  isFirstPage: function() {
    return this.props.currentIndex == 1;
  },
  render: function() {
    return (
      <li className={this.isFirstPage() ? 'disabled' : ''}>
        <a href={this.props.getUrl(this.props.currentIndex - 1)}  aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
    );
  }
});

module.exports = PrevPage;
