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

import { useMemo, useState, useEffect } from 'react'
import { useConfig } from './config'
import { useSelector, useDispatch } from 'react-redux'
import { ImageSet, selectors, actions } from './state'
import WPAPI from 'wpapi'
import urlJoin from 'url-join'

type Result = {
  imageSets?: ImageSet[]
  error?: Record<string, unknown>
}

export function useImageSets() {
  const imageSets = useSelector(selectors.getImageSets)
  const dispatch = useDispatch()
  const [result, setResult] = useState<Result>({})
  const { wordpressEndpoint } = useConfig()

  const wp = useMemo(() => {
    return new WPAPI({
      endpoint: urlJoin(wordpressEndpoint, '/wp-json'),
    })
  }, [wordpressEndpoint])

  function getImageSetsFromAcf(acf: Record<string, string>): ImageSet[] {
    const imageSetsFromAcf: ImageSet[] = []
    let i = 1
    let imageKey = `image_${i}`
    while (imageKey in acf && typeof acf[imageKey] === 'string') {
      imageSetsFromAcf.push({
        url: acf[imageKey],
        ident: acf[`${imageKey}_ident`],
        info: acf[`${imageKey}_info`],
      })
      i = i + 1
      imageKey = `image_${i}`
    }
    return imageSetsFromAcf
  }

  function replaceImageUrls(sets: ImageSet[]) {
    return sets.map((set) => ({
      ...set,
      url: urlJoin(
        wordpressEndpoint,
        'wp-content',
        set.url.replace(/^.*\/wp-content\//, '')
      ),
    }))
  }

  useEffect(() => {
    if (imageSets) {
      setResult({ imageSets })
    } else {
      wp.pages()
        .slug('startseite')
        .then((pages) => pages[0].acf)
        .then(getImageSetsFromAcf)
        .then(replaceImageUrls)
        .then((sets) => dispatch(actions.setImageSets(sets)))
        .catch((err) => setResult({ error: err }))
    }
  }, [imageSets])

  return result
}
