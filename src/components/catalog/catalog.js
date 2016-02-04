var React = require('react');

var Catalog = React.createClass({
  componentDidMount: function() {
    $('.grid').masonry({
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer',
      percentPosition: true
    });
    $('.grid').masonry('reloadItems');
    $.material.init();
  },
  getClassName: function() {
    var className = '';
    switch (this.props.index % 3) {
      case 2:
        className = 'grid-item-h1';
        break;
      case 0:
        className = 'grid-item-h2';
        break;
    }
    return className;
  },
  render: function() {
    return (
      <div className={'col-lg-2 col-md-3 col-sm-4 col-xs-6 grid-item ' + this.getClassName()}>
        <a
          className="btn btn-default btn-raised"
          href={'#/catalog/' + this.props.catalog._id + '/'}
          style={{paddingLeft: 15, paddingRight: 15}}
        >
          <div className="">
            <img className="img-responsive" src={this.props.catalog.thumbnailurl} />
          </div>
          <p style={{
            marginTop: 10,
            marginBottom: 0,
            marginLeft: 6,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            width: 120
          }}>
            {this.props.catalog.title}
          </p>
        </a>
      </div>
    );
  }
});

module.exports = Catalog;
