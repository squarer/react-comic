var React = require('react');

var NextChapter = React.createClass({
  returnTop: function() {
    location.href = this.getUrl();
    window.scrollTo(0, 0);
  },
  getUrl: function() {
    return '#/catalog/' + this.props.catalog.ID + '/chapter/' + this.props.nextChapter._id + '/page/1';
  },
  render: function() {
    return(
      this.props.nextChapter === null
      ? <div className="alert alert-info text-center next-chapter hidden" role="alert" id="next-chapter">
          已是最新章節
        </div>
      : <a href="javascript:void(0);" className="btn btn-primary btn-raised col-xs-12 hidden" id="next-chapter" onClick={this.returnTop}>
          下一話
        </a>
    );
  }
});

module.exports = NextChapter;
