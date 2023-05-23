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
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  imgDiv: {
    position: 'relative',
    height: 'calc(100vh - 80px)',
    [theme.breakpoints.down('xs')]: {
      height: 'calc(100vh - 76px)',
    },
  },
  carouselImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  descriptionDiv: {
    position: 'absolute',
    zIndex: 1,
    bottom: '4%',
    left: theme.spacing(1.5),
    paddingLeft: theme.spacing(1),
    maxWidth: '45%',
  },
  imageInfo: {
    background: 'rgba(255, 255, 255, 0.7)',
    padding: theme.spacing(1),
    display: 'table',
    opacity: '0.9',
  },
  imageIdent: {
    background: 'rgba(255, 255, 255, 0.7)',
    padding: theme.spacing(1),
    marginTop: theme.spacing(2),
    display: 'table',
    opacity: '0.9',
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing(2),
    },
  },
}))

interface Props {
  url: string
  ident: string
  info: string
}

export function Image(props: Props) {
  const { url, ident, info } = props
  const classes = useStyles()

  return (
    <div className={classes.imgDiv}>
      <img className={classes.carouselImg} src={url} alt={info} />
      <div className={classes.descriptionDiv}>
        <Typography className={classes.imageInfo}>{info}</Typography>
        <Typography className={classes.imageIdent}>{ident}</Typography>
      </div>
    </div>
  )
}
