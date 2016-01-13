var React = require('react');

var NextPage = React.createClass({
  isLastPage: function() {
    return this.props.currentIndex == this.props.lastIndex;
  },
  render: function() {
    return (
      <li className={this.isLastPage() ? 'disabled' : ''}>
        <a href={this.props.getUrl(parseInt(this.props.currentIndex) + 1)} aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
    </li>
    );
  }
});

module.exports = NextPage;
