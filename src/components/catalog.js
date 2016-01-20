var React = require('react');

var Catalog = React.createClass({
  componentDidMount: function() {
    $.material.init();
  },
  render: function() {
    return (
      <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
        <a
          className="btn btn-default btn-raised"
          href={'#/catalog/' + this.props.catalog._id + '/'}
          style={{paddingLeft: 15, paddingRight: 15}}
        >
          <div className="crop">
            <img className="img-responsive" src={this.props.catalog.thumbnailurl} />
          </div>
          <p style={{marginTop: 10, marginBottom: 0}}>{this.props.catalog.title}</p>
        </a>
      </div>
    );
  }
});

module.exports = Catalog;
