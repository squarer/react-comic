var React = require('react');

var Catalog = React.createClass({
  componentDidMount: function() {
    $.material.init();
  },
  render: function() {
    return (
      <div className="col-md-2 col-sm-3 col-xs-4">
        <a className="btn btn-default btn-raised" href={'#/catalog/' + this.props.catalog._id + '/'}>
          <div className="crop">
            <img className="img-responsive" src={this.props.catalog.thumbnailurl} />
          </div>
          <p className="caption">{this.props.catalog.title}</p>
        </a>
      </div>
    );
  }
});

module.exports = Catalog;
