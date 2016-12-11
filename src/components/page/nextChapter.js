var React = require('react');

var NextChapter = React.createClass({
  returnTop: function() {
    window.scrollTo(0, 0);
  },
  getUrl: function() {
    return '#/catalog/' + this.props.catalog._id + '/chapter/' + this.props.nextChapter._id + '/page/1';
  },
  render: function() {
    return(
      this.props.nextChapter === null
      ? <div className="alert alert-info text-center next-chapter hidden" role="alert" id="next-chapter">
          Latest Chapter Arrived
        </div>
      : <a href={this.getUrl()} className="btn btn-primary btn-raised col-xs-12 hidden" id="next-chapter" onClick={this.returnTop}>
          next chapter
        </a>
    );
  }
});

module.exports = NextChapter;
