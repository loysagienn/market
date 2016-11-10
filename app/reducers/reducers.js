
import {combineReducers} from 'redux';
import router from './router';
import api from './api';
import categories from './categories/categories';
import models from './models/models';
import enableBatching from './enableBatching';
import settings from './settings';
import filters from './filters';

export default enableBatching(combineReducers({router, categories, models, api, settings, filters}));
