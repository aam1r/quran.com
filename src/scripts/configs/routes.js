import * as SurahsActions from 'actions/SurahsActions';
import * as AyahsActions from 'actions/AyahsActions';
import RouteNotFound from 'utils/RouteNotFound';
import AyahRangeError from 'utils/AyahRangeError';
import debug from 'debug';
const debugRoutes = debug('quran-com');

export default {
  index: {
    path: '/',
    method: 'get',
    page: 'index',
    title: `The Noble Qur'an - القرآن الكريم`,
    handler: require('../routes/Index'),
    action(actionContext, currentRoute, done) {
      actionContext.executeAction(
        SurahsActions.getSurahs,
        null,
        done
      );
    }
  },
  donations: {
    path: '/donations',
    method: 'get',
    page: 'donations',
    title: 'Contributing to Quran.com',
    handler: require('../routes/Donations')
  },
  contributions: {
    path: '/contributions',
    method: 'get',
    page: 'contributions',
    title: 'Contributing to Quran.com',
    handler: require('../routes/Donations')
  },
  about: {
    path: '/about',
    method: 'get',
    page: 'about',
    title: 'About Quran.com',
    handler: require('../routes/About')
  },
  contact: {
    path: '/contact',
    method: 'get',
    page: 'contact',
    title: 'Contact Quran.com',
    handler: require('../routes/Contact')
  },
  contactus: {
    path: '/contactus',
    method: 'get',
    page: 'contact',
    title: 'Contact Quran.com',
    handler: require('../routes/Contact')
  },
  search: {
    path: '/search',
    method: 'get',
    page: 'search',
    title: 'Search',
    handler: require('../routes/Search'),
    action(actionContext, currentRoute, done) {
      actionContext.executeAction(
        AyahsActions.search,
        {
          q: currentRoute.get('query').get('q'),
          p: currentRoute.get('query').get('p') || 1
        },
        done
      );
    }
  },
  surah: {
    path: '/:surahId/:range?',
    method: 'get',
    page: 'surah',
    title: 'Surah',
    handler: require('../routes/Surah'),
    action(actionContext, currentRoute, done) {
      if (isNaN(currentRoute.get('params').get('surahId'))) {
        return done(new RouteNotFound(currentRoute.get('url')));
      }

      let fromParam,
        toParam,
        surahId = currentRoute.get('params').get('surahId');

      actionContext.executeAction(
        SurahsActions.getSurahs,
        currentRoute.get('params').get('surahId'),
        () => {
          if (currentRoute.get('params').get('range')) {
            if (currentRoute.get('params').get('range').indexOf('-') > -1) {
              fromParam = currentRoute.get('params').get('range').split('-')[0];
              toParam = currentRoute.get('params').get('range').split('-')[1];
            }
            else {
              fromParam = currentRoute.get('params').get('range');
              toParam = parseInt(fromParam) + 10;
            }

            fromParam = parseInt(fromParam);
            toParam = parseInt(toParam);
            // This is the case when someone has a range but it's not valid. Eg: /1/asdasd
            if (isNaN(fromParam) || isNaN(toParam)) {
              return done(new RouteNotFound(currentRoute.get('url')));
            }

            if ((toParam - fromParam) > 50) {
              return done(new AyahRangeError(fromParam, toParam));
            }
          }
          else {
            fromParam = 1;
            toParam = 10;
          }

          actionContext.executeAction(AyahsActions.getAyahs, {
            surahId: surahId,
            from: fromParam,
            to: toParam
          }, done);
        }
      );
    }
  }
};
