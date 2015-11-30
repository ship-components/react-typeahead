/** ****************************************************************************
 * Typeahead List
 *
 * @author       Isaac Suttell <isaac_suttell@playstation.sony.com>
 * @file         Shows a list of options when a user types
 ******************************************************************************/

// Modules
import React from 'react';
import classNames from 'classnames';

// Components
import TypeaheadOption from './TypeaheadOption';

import css from './typeahead.css';

export default class Typeahead extends React.Component {
  /**
   * Render list by order of score
   */
  render() {
    if (!this.props.value){
      // Nothing to filter by yet
      return null;
    } else if (!this.props.visible.length && this.props.empty !== false) {
      // Can't find anything
      return (
        <ul className={classNames('typeahead--list', css.list)}>
          <TypeaheadOption empty={this.props.empty} />
        </ul>
      );
    }

    return (
        <ul className={classNames('typeahead--list', css.list)}>
          {this.props.visible
            .filter((item) => item && item.score && item.original)
            .sort((a, b) => b.score - a.score)
            .map((option, index) => {
              var key = this.props.extract(option.original);
              return (
                <TypeaheadOption
                  key={key}
                  selected={this.props.selected === index}
                  option={option}
                  onClick={this.props.onSelected.bind(null, option)} />
                );
            })}
        </ul>
      );
  }
}

/**
 * Defaults
 * @static
 * @type {Object}
 */
Typeahead.defaultProps = {
  empty: false,
  visible: [],
  onSelected: function(){}
};