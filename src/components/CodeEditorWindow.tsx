import Editor, { OnChange, useMonaco } from '@monaco-editor/react'
import React, { useEffect, useState } from 'react'

interface CodeEditorWindowProps {
  onChange: (key: string, value: string) => void
  language?: string
  code?: string
  theme?: string
}

const CodeEditorWindow: React.FC<CodeEditorWindowProps> = ({ onChange, language, code, theme }) => {
  const monaco = useMonaco()
  const [value, setValue] = useState<string>(code || '')

  const handleEditorChange: OnChange = (value) => {
    setValue(value!)
    onChange('code', value!)
  }

  useEffect(() => {
    // do conditional chaining
    monaco?.languages.typescript.javascriptDefaults.setEagerModelSync(true)
  }, [monaco])

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="85vh"
        width={`100%`}
        language={language || 'typescript'}
        value={value}
        theme={theme || 'vs-dark'}
        defaultValue="// some comment"
        onChange={handleEditorChange}
      />
    </div>
  )
}

export default CodeEditorWindow
