var React = require('react');
var GridList = require('material-ui/lib/grid-list/grid-list');
var GridTile = require('material-ui/lib/grid-list/grid-tile');

var Catalog = React.createClass({
  render: function() {
    var tileElements = this.props.catalogs.map(function(catalog, index) {
      return <a href={'#/catalog/' + catalog._id + '/'} key={index}>
        <GridTile
          title={catalog.title}
          subtitle={<span>by <b>{catalog.author}</b></span>}
          actionIcon={<div />}
        >
          <img src={catalog.thumbnailurl} />
        </GridTile>
      </a>
    });
    return (
      <div className="catalog-nodes" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
        <GridList
          cellHeight={190}
          style={{width: 1200, overflowY: 'auto', marginBottom: 24}}
          cols={6}
          padding={10}
          >
          {tileElements}
        </GridList>
      </div>
    );
  }
});

module.exports = Catalog;
