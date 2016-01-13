var React = require('react');

var Chapter = React.createClass({
  getUrl: function() {
    return '/catalog/' + this.props.catalogId + '/chapter/' + this.props.chapter._id + '/page/';
  },
  render: function() {
    var url = '#' + this.getUrl();
    return (
      <div className="col-md-1 col-sm-2 col-xs-3">
        <a href={url}>
          {this.props.chapter.title}
        </a>
      </div>
    );
  }
});

module.exports = Chapter;
