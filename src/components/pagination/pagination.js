var React = require('react');
var PrevPage = require('./prevPage');
var NextPage = require('./nextPage');
var PaginationItem = require('./paginationItem');
var Dots = require('./dots');

var Pagination = React.createClass({
  componentDidMount: function() {
    $('.pagination a').on('click', function(e) {
      var className = $(this).parent('li').attr('class');
      if (className.includes('disabled') || className == 'active') {
        e.preventDefault();
      }
    });
  },
  fromLeft: function(index, currentIndex, middle) {
    var sideNumber = middle * 2 + 3;
    return index <= sideNumber && currentIndex <= middle + 2;
  },
  toRight: function(index, currentIndex, middle, total) {
    var sideNumber = middle * 2 + 3;
    return index > total - sideNumber && currentIndex >= total - middle - 1;
  },
  inMiddle: function(index, currentIndex, middle) {
    return index >= currentIndex - middle && index <= parseInt(currentIndex) + middle;
  },
  isDots: function(index, total, bothEnds) {
    return index == bothEnds + 1 || index == total - bothEnds;
  },
  isBothEnds: function(index, total, bothEnds) {
    return index <= bothEnds || index > total - bothEnds;
  },
  shouldPrint: function(index, currentIndex, total, middle, bothEnds) {
    return this.isBothEnds(index, total, bothEnds)
      || this.fromLeft(index, currentIndex, middle)
      || this.toRight(index, currentIndex, middle, total)
      || this.inMiddle(index, currentIndex, middle);
  },
  render: function() {
    var total = this.props.pages.length;
    var currentIndex = this.props.currentIndex;
    var middle = 3;
    var bothEnds = 1;

    var paginationNodes = [];
    for (var index = 1; index <= total; ++index) {
      if (this.shouldPrint(index, currentIndex, total, middle, bothEnds)) {
        paginationNodes.push(
          <PaginationItem
            page={this.props.pages[index - 1]}
            index={index}
            currentIndex={this.props.currentIndex}
            key={index}
            getUrl={this.props.getUrl}
          />
        );
        continue;
      }

      if (this.isDots(index, total, bothEnds)) {
        paginationNodes.push(<Dots key={index} />);
      }
    }
    return (
      <ul className="pagination">
        <PrevPage currentIndex={this.props.currentIndex} getUrl={this.props.getUrl} />
        {paginationNodes}
        <NextPage currentIndex={this.props.currentIndex} lastIndex={this.props.pages.length} getUrl={this.props.getUrl} />
      </ul>
    );
  }
});

module.exports = Pagination;
