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

import React from 'react'
import fetch from 'node-fetch'
import { makeStore, defaultState } from 'src/contexts/state'
import { Providers, Props as ProviderProps } from 'src/contexts/Providers'
import { defaultConfig } from 'src/contexts/config'

export function TestProviders(props: Partial<ProviderProps>) {
  const defaultProps: ProviderProps = {
    config: {
      ...defaultConfig,
      // use node-fetch in test environment
      customFetch: fetch as any,
      // URL must be absolute because we use node-fetch
      // in the test environment.
      wordpressEndpoint: 'http://example.com/api/wordpress',
    },
    store: makeStore({
      ...defaultState,
      i18nConfig: {
        ...defaultState.i18nConfig,
        disableTranslation: true,
      },
    }),
    eventTarget: new EventTarget(),
    children: null,
    containers: {},
  }

  const effectiveProps = {
    ...defaultProps,
    ...props,
  }

  return <Providers {...effectiveProps}>{props.children}</Providers>
}
