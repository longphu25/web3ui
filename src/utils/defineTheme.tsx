import { loader } from '@monaco-editor/react'
// https://github.com/suren-atoyan/monaco-react/discussions/201
// import 'monaco-themes/themes/Monokai Bright.json'
import monacoThemesJson from 'monaco-themes/themes/themelist.json'

interface MonacoThemes {
  [key: string]: string
}

const monacoThemes: MonacoThemes = monacoThemesJson

const defineTheme = (theme: string): Promise<void> => {
  return new Promise<void>((res) => {
    Promise.all([loader.init(), import(`monaco-themes/themes/${monacoThemes[theme]}.json`)]).then(([monaco, themeData]) => {
      monaco.editor.defineTheme(theme, themeData)
      res()
    })
  })
}

export { defineTheme }
