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
import clsx from 'clsx'
import NukaCarousel from 'nuka-carousel'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import List from '@material-ui/core/List'

import { useTranslation } from 'src/contexts/i18n'
import { useImageSets } from 'src/contexts/wordpress'
import { Image } from './Image'

const useStyles = makeStyles((theme) => ({
  rootWeb: {
    gridRowStart: 1,
    gridColumnStart: 1,
  },
  icon: {
    background: 'rgba(255, 255, 255, 0.7)',
    paddingLeft: theme.spacing(0.5),
    paddingBottom: theme.spacing(1.5),
    paddingTop: theme.spacing(1.5),
    width: theme.spacing(3.5),
    height: theme.spacing(6),
  },
  bottomCenterActive: {
    fill: theme.palette.primary.main + '!important',
  },
  bottomCenterButton: {
    cursor: 'pointer',
    opactiy: 1,
    background: 'transparent',
    border: 'none',
    fill: 'white',
  },
  bottomCenterList: {
    position: 'relative',
    top: '-10px',
    display: 'flex',
    padding: '0px',
    listStyleType: 'none',
    marginBottom: '16px !important',
  },
  bottomCenterListItem: {
    padding: 0,
  },
  itemIcon: {
    display: 'inline',
    cursor: 'pointer',
    opacity: '0.5',
  },
  itemIconOut: {
    cursor: 'not-allowed',
    opacity: '0.1',
  },
  loading: {
    position: 'absolute',
  },
  button: {
    background: 'transparent',
    border: 'none',
    padding: 0,
  },
}))

export function Carousel() {
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('xs'))
  const { imageSets, error } = useImageSets()
  const { t } = useTranslation()
  const cls = useStyles()

  const isOnMobile = window.matchMedia('(pointer:coarse)').matches && mobile

  if (error || !imageSets) {
    return (
      <p className={cls.loading}>{error ? t('loadingError') : t('loading')}</p>
    )
  }

  const renderIcon = (icon: string) => {
    return (
      <div className={cls.icon}>
        {icon === 'previous' && <ArrowBackIosIcon />}
        {icon === 'next' && <ArrowForwardIosIcon />}
      </div>
    )
  }

  const renderButton = (
    slide: () => void,
    direction: string,
    enabled: boolean
  ) => {
    if (mobile) {
      return null
    }
    return (
      <button className={cls.button} onClick={slide} aria-label={t(direction)}>
        <ListItemIcon
          className={clsx(cls.itemIcon, { [cls.itemIconOut]: !enabled })}
        >
          {renderIcon(direction)}
        </ListItemIcon>
      </button>
    )
  }

  const renderPagingDots = (
    slideCount: number,
    currentSlide: number,
    goToSlide: (targetIndex: number) => void
  ) => {
    return (
      <div>
        <List
          aria-label={t('carouselDotLabel')}
          role="listbox"
          component="nav"
          className={cls.bottomCenterList}
          id="gallery"
          tabIndex={-1}
        >
          {[...Array(slideCount)].map((_e, key) => (
            <button
              aria-selected={currentSlide === key}
              role="option"
              key={key}
              type="button"
              aria-label={`${t('image')} ${key}`}
              onClick={() => goToSlide(key)}
              className={cls.bottomCenterButton}
            >
              <svg
                className={
                  currentSlide === key ? cls.bottomCenterActive : undefined
                }
                width="6"
                height="6"
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 6 6"
              >
                <circle cx="3" cy="3" r="3" />
              </svg>
            </button>
          ))}
        </List>
      </div>
    )
  }

  return (
    <div
      data-testid="home-carousel"
      className={clsx({ [cls.rootWeb]: !mobile })}
    >
      <NukaCarousel
        slidesToScroll={1}
        style={
          isOnMobile
            ? { height: window.innerHeight - 130 }
            : { lineHeight: '0%' }
        }
        renderBottomCenterControls={({ slideCount, currentSlide, goToSlide }) =>
          renderPagingDots(slideCount, currentSlide, goToSlide)
        }
        renderCenterLeftControls={({ previousSlide, currentSlide }) =>
          renderButton(previousSlide, 'previous', currentSlide > 0)
        }
        renderCenterRightControls={({ nextSlide, currentSlide, slideCount }) =>
          renderButton(nextSlide, 'next', currentSlide < slideCount - 1)
        }
      >
        {imageSets.map((set) => (
          <Image {...set} key={set.url} />
        ))}
      </NukaCarousel>
    </div>
  )
}
