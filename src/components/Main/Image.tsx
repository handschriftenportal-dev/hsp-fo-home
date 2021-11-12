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
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'


const useStyles = makeStyles({
  imageIdent: {
    position: 'absolute',
    bottom: '10%',
    left: '16px',
    background: 'rgba(255, 255, 255, 0.7)',
    padding: '8px',
    maxWidth: '45%'
  },
  imageInfo: {
    position: 'absolute',
    textAlign: 'right',
    bottom: '10%',
    right: '16px',
    background: 'rgba(255, 255, 255, 0.7)',
    padding: '8px',
    maxWidth: '45%'
  }
})

interface Props {
  url: string;
  ident: string;
  info: string;
}

export function Image(props: Props) {
  const { url, ident, info } = props
  const classes = useStyles()

  return (
    <Paper>
      <div
        role="img"
        style={{
          backgroundImage: 'url(' + url + ')',
          backgroundSize: 'cover',
          height: '100vh'
        }}
      >
        <Typography className={classes.imageIdent}>
          {ident}
        </Typography>
        <Typography className={classes.imageInfo}>
          {info}
        </Typography>
      </div>
    </Paper>
  )
}
