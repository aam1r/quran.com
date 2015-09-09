'use strict';
import React from 'react';
import Ayah from 'components/surah/Ayah';
import Line from 'components/surah/Line';
import AyahsStore from 'stores/AyahsStore';
import Loader from 'components/Loader';
import { connectToStores } from 'fluxible/addons';
import debug from 'utils/Debug';

class AyahsList extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  list() {
    if (this.props.ayahs.length === 0) {
      return <Loader />;
    }

    if (this.props.isReadingMode) {
      return this.props.lines.map((line, index) => {
        return <Line line={line} key={`${index}-line`} />;
      });
    }
    else {
      return this.props.ayahs.map(ayah => {
        return <Ayah ayah={ayah} key={`${ayah.surah}-${ayah.ayah}-ayah`} />;
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.ayahs.length === 0) {
      return true;
    }

    return (this.props.ayahs.length === nextProps.ayahs.length) ||
           (this.props.isReadingMode !== nextProps.isReadingMode);
  }

  render() {
<<<<<<< HEAD
    debug('COMPONENT-AYAHSLIST');

    if (this.props.isReadingMode) {
      return (
        <h1 className="word-font text-justify">
            {this.list()}
        </h1>
      );
    }

=======
    debug('COMPONENT-AYAHSLIST')
>>>>>>> Reading mode beta
    return (
      <div>
        {this.list()}
      </div>
    );
  }
}

AyahsList.displayName = 'AyahsList';

AyahsList.contextTypes = {
  getStore: React.PropTypes.func.isRequired
};

AyahsList = connectToStores(AyahsList, [AyahsStore], (stores, props) => {
  return {
    ayahs: stores.AyahsStore.getAyahs(),
    lines: stores.AyahsStore.getLines(),
    isReadingMode: stores.AyahsStore.isReadingMode()
  };
});

export default AyahsList;
