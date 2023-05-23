/*
 * MIT License
 *
 * Copyright (c) 2023 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import { WebModuleLocation } from 'hsp-web-module'
import { configureStore } from '@reduxjs/toolkit'
import { AnyAction, createAction, isType } from '../utils/stateUtils'
import { I18nConfig } from './i18n'

export interface ImageSet {
  url: string
  ident: string
  info: string
}

export interface State {
  location: WebModuleLocation
  i18nConfig: I18nConfig
  imageSets?: ImageSet[]
}

export const actions = {
  setState: createAction<State>('SET_STATE'),
  setLocation: createAction<State['location']>('SET_LOCATION'),
  setI18nConfig: createAction<State['i18nConfig']>('SET_I18N_CONFIG'),
  setImageSets: createAction<State['imageSets']>('SET_IMAGE_SETS'),
}

export const selectors = {
  getLocation: (state: State) => state.location,
  getI18nConfig: (state: State) => state.i18nConfig,
  getImageSets: (state: State) => state.imageSets,
}

export const defaultState: State = {
  location: {
    pathname: '/',
    hash: '',
    search: '',
  },
  i18nConfig: {
    language: 'de',
    disableTranslation: false,
  },
}

export function reducer(state = defaultState, action: AnyAction): State {
  if (isType(action, actions.setState)) {
    return action.payload
  }

  if (isType(action, actions.setLocation)) {
    return { ...state, location: action.payload }
  }

  if (isType(action, actions.setI18nConfig)) {
    return { ...state, i18nConfig: action.payload }
  }

  if (isType(action, actions.setImageSets)) {
    return { ...state, imageSets: action.payload }
  }
  return state
}

export const makeStore = (initialState?: State) =>
  configureStore({ reducer, preloadedState: initialState, devTools: true })
