var React = require('react');
var Chapter = require('./chapter');
var moment = require('moment');

var CatalogDetail = React.createClass({
  toISOFormat: function(date) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
  },
  render: function() {
    var chapterNodes = this.props.chapters.map(function(chapter, index) {
      return (
        <Chapter catalogId={this.props.catalog._id} chapter={chapter} key={index} />
      );
    }.bind(this));
    return (
      this.props.catalog === undefined
      ? <div className="alert alert-danger text-center" role="alert">
          No results Found
        </div>
      : <div>
          <div className="detail">
            <div className="col-md-offset-3 col-md-3 crop">
              <img className="img-responsive" src={this.props.catalog.thumbnailurl} />
            </div>
            <div className="col-md-3">
              <p>category: {this.props.catalog.category}</p>
              <p>title: {this.props.catalog.title}</p>
              <p>author: {this.props.catalog.author}</p>
              <p>updatedAt: {this.toISOFormat(this.props.catalog.updatedAt)}</p>
            </div>
            <div className="col-md-3"></div>
          </div>
          <div className="col-md-12 chapter">
            {chapterNodes}
          </div>
        </div>
    );
  }
});

module.exports = CatalogDetail;
