var React = require('react');

var Category = React.createClass({
  getUrl: function() {
    var url = '#/catalog?category=' + this.props.category;
    if (!this.props.sort) {
      return url;
    }
    return url + '&sort=' + this.props.sort;
  },
  render: function() {
    var category = this.props.category.slice(0, -1);
    return (
      <li>
        <a href={this.getUrl()}>{category}</a>
      </li>
    );
  }
});

var Navbar = React.createClass({
  getUrl: function() {
    var href = window.location.href;
    if (!this.props.sort) {
      return '/#/';
    }
    return '#/catalog?&sort=' + this.props.sort;
  },
  loadCategories: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(categories) {
        this.setState({categories: categories});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {categories: []};
  },
  componentDidMount: function() {
    this.loadCategories();
  },
  render: function() {
    var categoryNodes = this.state.categories.map(function(category, index) {
      return (
        <Category category={category} sort={this.props.sort} key={index} />
      );
    }.bind(this));
    return (
      <div className="navbar navbar-default" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-305-collapse">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href={this.getUrl()}>305</a>
          </div>
          <div className="collapse navbar-collapse navbar-305-collapse">
            <ul className="nav navbar-nav">
              {categoryNodes}
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Navbar;
