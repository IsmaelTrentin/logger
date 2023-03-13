import factory from './../src';

const logger = factory('base', 'label');

logger.debug('debug', { at: 'test' });
logger.info('info');
