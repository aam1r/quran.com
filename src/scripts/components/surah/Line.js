/* eslint-disable consistent-return */

import React from 'react';
import * as AudioplayerActions from 'actions/AudioplayerActions';
import debug from 'utils/Debug';
import $ from 'jquery';

class Line extends React.Component {
  text() {
    if (!this.props.line[0].char) { // TODO shouldn't be possible, remove this clause
      return;
    }

    let text = this.props.line.map(data => {
      if (data.word.translation) {
        let tooltip = data.word.translation;

        return (
          <b key={data.char.code}
            className={data.char.font}
            data-toggle="tooltip"
            data-placement="top" title={tooltip}
            dangerouslySetInnerHTML={{__html: data.char.code}}>
          </b>
        );
      }
      else {
        return (
          <b className={data.char.font}
            key={data.char.code}
            dangerouslySetInnerHTML={{__html: data.char.code}}>
          </b>
        );
      }
    });

    return (
      <span className="line">
        {text}
      </span>
    );

    return (
      <h1 className="word-font text-right">
        {text}
      </h1>
    );
  }

  componentDidMount() {
    // let element = React.findDOMNode(this),
    //     line = element.querySelector('.line'),
    //     lineWidth = line.getBoundingClientRect().width,
    //     containerWidth = element.querySelector('.line-container').getBoundingClientRect().width;
    //
    // while (lineWidth < containerWidth) {
    //   line.style.fontSize = parseInt(window.getComputedStyle(line).getPropertyValue('font-size')) + 1 + 'px';
    //   line.style.width = `${lineWidth}px`;
    //   line.style.display = 'block';
    //   lineWidth = lineWidth + 50;
    // }
    // line.style.width = '100%';
  }

  render() {
    debug(`COMPONENT-LINE RENDERED page ${this.props.line[0].char.page}, line ${this.props.line[0].char.line}, ayah ${this.props.line[0].ayah_key}`);

    return (
      <div className="row word-font text-right">
        <div className="col-md-12 line-container">
          {this.text()}
        </div>
      </div>
    );
  }
}

Line.displayName = 'Line';

Line.contextTypes = {
  executeAction: React.PropTypes.func.isRequired
};

Line.propTypes = {
  line: React.PropTypes.array.isRequired
};

export default Line;
