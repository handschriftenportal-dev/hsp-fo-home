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
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { render, screen } from '@testing-library/react'
import { TestProviders } from '../testutils'
import { wpStartseiteResponse } from '../fixtures/wpStartseiteResponse'
import { Main } from 'src/components/Main'

setupServer(
  rest.get(
    'http://example.com/api/wordpress/wp-json/wp/v2/pages',
    (req, res, ctx) => {
      return req.url.searchParams.get('slug') === 'startseite'
        ? res(ctx.status(200), ctx.json(wpStartseiteResponse))
        : res(ctx.status(404))
    }
  )
).listen()

test('home page renders images and texts from wordpress', async () => {
  render(
    <TestProviders>
      <Main />
    </TestProviders>
  )

  await screen.findByText(/Ostritz, Bibliothek der Zisterzienserinnenabtei/i)
  await screen.findByText(/Forschen/i)

  const img = await screen.getAllByRole('img')

  expect(
    img[0]
      .getAttribute('src')
      ?.includes(
        'http://example.com/api/wordpress/wp-content/uploads/2020/11/2016_bearbeitung.jpg'
      )
  ).toBe(true)
})
