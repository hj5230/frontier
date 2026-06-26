/**
 * A CSS position offset. Values may be numbers (treated as `px` by the
 * consumer) or CSS length/percentage strings such as `'45%'` or `'5px'`.
 */
export interface Position {
  readonly x: number | string
  readonly y: number | string
}
