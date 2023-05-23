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

;(global as any).fetch = jest.fn()

import { createHspHome } from 'src/HspHome'
import { defaultState } from 'src/contexts/state'
import { defaultConfig } from 'src/contexts/config'
import 'test/testutils/matchMedia.ts'

test('addEventListener', function (done) {
  const home = createHspHome(defaultConfig)
  home.addEventListener('linkClicked', (e) => {
    expect(e.detail.href).toBe('http://example.com/foo')
    done()
  })
  home.eventTarget.dispatchEvent(
    new CustomEvent('linkClicked', {
      detail: new URL('http://example.com/foo'),
    })
  )
})

test('addEventListener returns a function to remove listener', function () {
  let counter1 = 0
  let counter2 = 0
  const home = createHspHome(defaultConfig)

  function triggerEvent() {
    home.eventTarget.dispatchEvent(
      new CustomEvent('linkClicked', {
        detail: new URL('http://example.com/foo'),
      })
    )
  }

  const removeListener1 = home.addEventListener('linkClicked', () => counter1++)
  const removeListener2 = home.addEventListener('linkClicked', () => counter2++)

  triggerEvent()
  expect(counter1).toBe(1)
  expect(counter2).toBe(1)

  removeListener1()
  triggerEvent()
  expect(counter1).toBe(1)
  expect(counter2).toBe(2)

  removeListener2()
  triggerEvent()
  expect(counter1).toBe(1)
  expect(counter2).toBe(2)
})

test('getConfig returns the config values passed to the constructor', function () {
  const config = createHspHome(defaultConfig).getConfig()
  expect(config).toEqual(defaultConfig)
})

test('mount, umount, isMounted', async function () {
  const mainContainer = document.createElement('div')
  document.body.appendChild(mainContainer)

  const home = createHspHome(defaultConfig)

  expect(document.getElementById('hsp-home-root')).toBeNull()
  expect(home.isMounted()).toBe(false)

  await home.mount({
    main: mainContainer,
  })
  expect(document.getElementById('hsp-home-root')).not.toBeNull()
  expect(document.getElementById('hsp-home-main')).not.toBeNull()
  expect(home.isMounted()).toBe(true)

  // Nothing should change here because we did not invoke unmount()
  // before we call mount() a second time. So this call should be ignored.
  await home.mount({
    main: document.createElement('div'),
  })
  expect(document.getElementById('hsp-home-root')).not.toBeNull()
  expect(document.getElementById('hsp-home-main')).not.toBeNull()
  expect(home.isMounted()).toBe(true)

  home.unmount()
  expect(document.getElementById('hsp-home-root')).toBeNull()
  expect(document.getElementById('hsp-home-main')).toBeNull()
  expect(home.isMounted()).toBe(false)

  home.unmount()
  // At least one container element must be given
  await expect(home.mount({})).rejects.toThrow()
})

test('setState and getState', function () {
  const home = createHspHome(defaultConfig)
  const newState = {
    ...defaultState,
    location: {
      ...defaultState.location,
      path: 'test-path',
    },
  }

  expect(home.getState()).toEqual(defaultState)
  home.setState(newState)
  expect(home.getState()).toEqual(newState)
})

test('setLocation and getLocation', function () {
  const location = {
    pathname: '/foo',
    search: 'q=bar',
    hash: 'baz',
  }
  const home = createHspHome(defaultConfig)
  home.setLocation(location)

  expect(home.getLocation()).toEqual(location)
})

test('setLanguage and getLanguage', function () {
  const home = createHspHome(defaultConfig)
  expect(home.getLanguage()).toBe('de')
  home.setLanguage('en')
  expect(home.getLanguage()).toBe('en')
})
