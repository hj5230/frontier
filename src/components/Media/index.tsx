import {
  h,
  FunctionComponent,
  VNode,
  Fragment,
} from 'preact'

import styles from './media.module.css'

interface MediaSize {
  width: string | number
  height: string | number
}

interface MediaProps {
  uri: string
  type: 'image' | 'video'
  /** Accessible description for images; falls back to an empty string. */
  alt?: string
  size?: MediaSize
  inputStyle?: preact.JSX.CSSProperties
}

export const Media: FunctionComponent<MediaProps> = ({
  uri,
  type,
  alt = '',
  size,
  inputStyle,
}): VNode => {
  const mediaStyle: preact.JSX.CSSProperties = size
    ? {
        width: size.width,
        height: size.height,
        ...inputStyle,
      }
    : { ...inputStyle }

  return (
    <div style={mediaStyle}>
      <Fragment>
        {type === 'image' && (
          <img
            className={styles.media}
            src={uri}
            alt={alt}
          />
        )}
        {type === 'video' && (
          <video
            className={styles.media}
            src={uri}
            controls
          />
        )}
      </Fragment>
    </div>
  )
}
