var React = require('react');

var SearchBar = React.createClass({
  getInitialState: function() {
    return {value: ''};
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  handleKeyDown: function(event) {
    if (event.keyCode == 13) {
      this.setHash('/catalog?title=' + this.state.value);
    }
  },
  handleClick: function() {
    this.setHash('/catalog?title=' + this.state.value);
  },
  setHash: function(hash) {
    window.location.hash = hash;
    var href = window.location.href;
    href = href.slice(0, href.indexOf('#') + 1) + hash;
    window.location.href = href;
  },
  componentDidMount: function() {
    var url = this.props.url;
    $('.typeahead').typeahead({
      highlight: true,
      hint: false,
      minLength: 1
    },
    {
      source: function(query, results, asyncResults) {
        $.ajax({
          url: url + '?title=' + query,
          dataType: 'json',
          success: function(data) {
            var list = [];
            data.forEach(function(value) {
              list.push(value.title);
            });
            asyncResults(list);
          }
        });
      }
    });

    $('.typeahead').bind('typeahead:select', function(event, suggestion) {
      this.handleChange(event);
    }.bind(this));
  },
  render: function() {
    return (
      <div className="input-group col-md-12">
        <input
          type="text"
          className="form-control input-lg typeahead"
          placeholder="search comic..."
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
        <span className="input-group-btn">
          <button className="btn btn-info btn-lg" type="button" onClick={this.handleClick}>
            <i className="glyphicon glyphicon-search"></i>
          </button>
        </span>
      </div>
    );
  }
});

module.exports = SearchBar;
