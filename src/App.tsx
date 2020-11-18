import * as React from 'react'
import { camelCase } from 'lodash'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import TextField from '@material-ui/core/TextField'
import './styles.css'
import { Button } from '@material-ui/core'

export default function App() {
    const [input, setInput] = React.useState('')
    const [output, setOutput] = React.useState('')

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        const varName = camelCase(value)
        const quotedString = value.trim().replace("'", "\\'")

        setInput(value)
        setOutput(`export const ${varName} = '${quotedString}'`)
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
            <p className="output">{output || '(Output...)'}</p>
            <p>
                <CopyToClipboard text={output}>
                    <Button variant="contained">Copy to clipboard</Button>
                </CopyToClipboard>
            </p>
        </div>
    )
}
