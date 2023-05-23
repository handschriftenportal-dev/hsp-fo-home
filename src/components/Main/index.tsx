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

import React, { useEffect } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Carousel } from './Carousel'
import { useConfig } from 'src/contexts/config'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  rootWeb: {
    display: 'grid',
    flexGrow: 1,
  },
  searchBarWeb: {
    gridRowStart: 1,
    gridColumnStart: 1,
    placeSelf: 'center',
    zIndex: 100,
    background: 'white',
    padding: theme.spacing(6),
    // class coming from hsp-fo-search
    '& .searchAdvBtn': {
      backgroundColor: 'white',
    },
  },
  searchBarMobile: {
    position: 'absolute',
    top: '20%',
    left: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 100,
    background: 'white',
    padding: theme.spacing(4),
    paddingBottom: theme.spacing(1),
    // class coming from hsp-fo-search
    '& .searchAdvBtn': {
      display: 'none',
    },
  },
}))

export function Main() {
  const config = useConfig()
  const cls = useStyles()
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('xs'))

  useEffect(() => {
    document
      .getElementById('hsp-home-search-bar-anchor')
      ?.appendChild(config.anchors.searchBar)
  }, [])

  return (
    <div id="hsp-home-main" className={clsx({ [cls.rootWeb]: !mobile })}>
      <div
        id="hsp-home-search-bar-anchor"
        className={mobile ? cls.searchBarMobile : cls.searchBarWeb}
      />
      <Carousel />
    </div>
  )
}
