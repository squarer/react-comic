var React = require('react');

var Chapter = React.createClass({
  getUrl: function() {
    return '#/catalog/' + this.props.catalogId + '/chapter/' + this.props.chapter._id + '/page/1';
  },
  render: function() {
    return (
      <div className="col-md-1 col-sm-2 col-xs-3">
        <a href={this.getUrl()}>
          {this.props.chapter.title}
        </a>
      </div>
    );
  }
});

module.exports = Chapter;
