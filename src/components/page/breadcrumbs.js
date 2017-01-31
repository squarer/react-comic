var React = require('react');

var Breadcrumbs = React.createClass({
  getUrl: function() {
    return '#/catalog/' + this.props.catalog.ID + '/';
  },
  getPrevNode: function() {
    if (!this.props.prevChapter) {
      return null;
    }
    return (
      <span className="pull-left">
        <a href={this.getUrl() + 'chapter/' + this.props.prevChapter._id + '/page/1'}>
          上一話
        </a>
      </span>
    );
  },
  getNextNode: function() {
    if (!this.props.nextChapter) {
      return null;
    }
    return (
      <span className="pull-right">
        <a href={this.getUrl() + 'chapter/' + this.props.nextChapter._id + '/page/1'}>
          下一話
        </a>
      </span>
    );
  },
  render: function() {
    return (
      <ul className="breadcrumb text-center">
        {this.getPrevNode()}
        <li><a href={this.getUrl()}>{this.props.catalog.title}</a></li>
        <li>{this.props.chapter.title}</li>
        {this.getNextNode()}
      </ul>
    );
  }
});

module.exports = Breadcrumbs;
