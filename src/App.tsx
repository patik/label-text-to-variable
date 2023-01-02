import * as React from 'react'
import { camelCase } from 'lodash'
import CopyToClipboard from 'react-copy-to-clipboard'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
import './styles.css'

export default function App() {
    const [input, setInput] = React.useState('')
    const [output, setOutput] = React.useState('')

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const values = event.target.value
        const lines: string[] = []

        values.split('\n').forEach((value) => {
            const varName = camelCase(value)
            const quotedString = value
                .trim()
                .replace(/^"+/g, '')
                .replace(/^'+/g, '')
                .replace(/"+$/g, '')
                .replace(/'+$/g, '')
                .replace("'", "\\'")

            if (quotedString.length > 0) {
                lines.push(`export const ${varName} = '${quotedString}'`)
            }
        })

        setInput(values)
        setOutput(lines.join('\n'))
    }

    return (
        <div className="App">
            <h1>Convert plain text to label variable</h1>
            <TextField
                value={input}
                onChange={handleInput}
                variant="outlined"
                fullWidth
                label="User-facing text"
                autoFocus
                multiline
            />
            <p className="output">
                {output
                    ? output.split('\n').map((line) => (
                          <React.Fragment key={line}>
                              {line}
                              <br />
                          </React.Fragment>
                      ))
                    : '(Output...)'}
            </p>
            <p>
                <CopyToClipboard text={output}>
                    <Button variant="contained">Copy to clipboard</Button>
                </CopyToClipboard>
            </p>
            <p className="codesandbox-link">
                <a href="https://codesandbox.io/s/label-variable-name-1pqzt?file=/src/App.tsx">Edit on Codesandbox</a>
            </p>
        </div>
    )
}
