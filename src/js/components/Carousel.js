// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var React = require('react');
var ReactDOM = require('react-dom');
var Box = require('./Box');

var CLASS_ROOT = "carousel";

var Carousel = React.createClass({

  propTypes: {
    autoplay: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
      autoplay: true
    };
  },

  getInitialState: function () {
    return {
      activeIndex: 0,
      priorIndex: 0,
      sequence: 1,
      width: 0
    };
  },

  slide: null,

  componentDidMount: function() {
    this.setState({ width: ReactDOM.findDOMNode(this.refs.carousel).offsetWidth });

    if (this.props.autoplay) {
      this._setSlideInterval();
    }
  },

  componentWillUnmount: function() {
    clearInterval(this.slide);
  },

  _setSlideInterval: function() {
    this.slide = setInterval(function() {
      this.setState({ activeIndex: (this.state.activeIndex + 1) % this.props.children.slice().length })
    }.bind(this), 5000);
  },

  _onSelect: function (index) {
    if (index !== this.state.activeIndex) {
      this.setState({ activeIndex: index });
    }
  },

  _onMouseOver: function() {
    clearInterval(this.slide);
  },

  _onMouseOut: function() {
    this._setSlideInterval();
  },

  _slidePrev: function(numSlides) {
    this.setState({ activeIndex: (this.state.activeIndex + numSlides - 1) % numSlides });
  },

  _slideNext: function(numSlides) {
    this.setState({ activeIndex: (this.state.activeIndex + 1) % numSlides });
  },

  _renderPrevButton: function(numSlides) {
    return (
      <svg className={CLASS_ROOT + '__arrow ' + CLASS_ROOT + '__arrow--prev'} viewBox="0 0 36 72" version="1.1"
        onClick={this._slidePrev.bind(this, numSlides)}>
        <line x1="36" y1="0" x2="0" y2="36" />
        <line x1="0" y1="36" x2="36" y2="72" />
      </svg>
    );
  },

  _renderNextButton: function(numSlides) {
    return (
      <svg className={CLASS_ROOT + '__arrow ' + CLASS_ROOT + '__arrow--next'} viewBox="0 0 36 72" version="1.1"
        onClick={this._slideNext.bind(this, numSlides)}>
        <line x1="0" y1="0" x2="36" y2="36" />
        <line x1="36" y1="36" x2="0" y2="72" />
      </svg>
    );
  },

  render: function () {
    var classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var index = -1;
    const children = this.props.children.slice();

    var width = this.state.width;
    var trackWidth = width * children.length;

    var trackPosition = -(width * this.state.activeIndex);

    var controls = React.Children.map(this.props.children, function (child) {
      index += 1;
      var controlClasses = [CLASS_ROOT + "__control"];
      if (index === this.state.activeIndex) {
        controlClasses.push(CLASS_ROOT + "__control--active");
      }

      return (
        <svg className={controlClasses.join(' ')} viewBox="0 0 24 24" version="1.1"
          onClick={this._onSelect.bind(this, index)}>
          <circle cx={12} cy={12} r={6}></circle>
        </svg>
      );
    }, this);

    return (
      <Box ref="carousel" className={classes.join(' ')}>
        <div className={CLASS_ROOT + "__track"} style={{ width: trackWidth, left: trackPosition }} onMouseEnter={this._onMouseOver} onMouseLeave={this._onMouseOut}>
          {children}
        </div>
        {this._renderPrevButton(children.length)}
        {this._renderNextButton(children.length)}
        <Box className={CLASS_ROOT + "__controls"} direction="row" justify="center">
          {controls}
        </Box>
      </Box>
    );
  }

});

module.exports = Carousel;
