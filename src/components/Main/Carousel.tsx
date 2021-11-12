/*
 * MIT License
 *
 * Copyright (c) 2021 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
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
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import React from 'react'
import { useTranslation } from 'src/contexts/i18n'
import { useImageSets } from 'src/contexts/wordpress'
import { Image } from './Image'
import NukaCarousel from 'nuka-carousel'


export function Carousel() {
  const { imageSets, error } = useImageSets()
  const { t } = useTranslation()

  if (error) return <p>{t('loadingError')}</p>
  if (!imageSets) return <p>{t('loading')}</p>

  return (
    <div data-testid='home-carousel'>
      <NukaCarousel defaultControlsConfig={{
        nextButtonText: '>',
        prevButtonText: '<'
      }}>
        { imageSets.map(set => <Image {...set} key={set.url} />) }
      </NukaCarousel>
    </div>
  )
}
