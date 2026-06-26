/**
 * Copy text to the clipboard, preferring the async Clipboard API and
 * falling back to a hidden `<textarea>` + `execCommand('copy')` for older
 * browsers or insecure contexts.
 *
 * @returns `true` if the text was copied successfully.
 */
export async function writeToClipboard(
  text: string,
): Promise<boolean> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch (err) {
      console.warn(
        '[clipboard] async API failed, falling back to legacy copy',
        err,
      )
    }
  }
  return legacyCopy(text)
}

function legacyCopy(text: string): boolean {
  const textArea = document.createElement('textarea')
  textArea.value = text
  textArea.style.top = '0'
  textArea.style.left = '0'
  textArea.style.position = 'fixed'

  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  let copied = false
  try {
    copied = document.execCommand('copy')
  } catch (err) {
    console.error(
      '[clipboard] legacy execCommand copy failed',
      err,
    )
  }

  document.body.removeChild(textArea)
  return copied
}
