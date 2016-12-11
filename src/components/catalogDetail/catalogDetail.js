var React = require('react');
var Chapter = require('./chapter');
var moment = require('moment');

const flexWrapper = {
  display: 'flex',
  justifyContent: 'center'
}

const detail = {
  display: 'flex',
  justifyContent: 'space-between'
};

const info = {
  marginLeft: '30px'
};

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
          <div style={flexWrapper}>
            <div className="well detail" style={detail}>
              <div className="crop">
                <img className="img-responsive " src={this.props.catalog.thumbnailurl} />
              </div>
              <div className="info" style={info}>
                <p>category: {this.props.catalog.category}</p>
                <p>title: {this.props.catalog.title}</p>
                <p>author: {this.props.catalog.author}</p>
                <p>updatedAt: {this.toISOFormat(this.props.catalog.updatedAt)}</p>
              </div>
            </div>
          </div>
          <div className="clearfix"></div>
          <div className="col-md-12 chapter">
            {chapterNodes}
          </div>
        </div>
    );
  }
});

module.exports = CatalogDetail;
