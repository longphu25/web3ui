// import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import api from '../utils/api'
import { classnames } from '../utils/general'
import CodeEditorWindow from './CodeEditorWindow'
import OutputWindow from './OutputWindow'

// const httpsAgent = new https.Agent({
//   rejectUnauthorized: false,
// })
// axios.defaults.httpsAgent = httpsAgent

const typescriptDefault: string = `import { Contract } from '@algorandfoundation/tealscript';

// eslint-disable-next-line no-unused-vars
class Runner extends Contract {

  private getSum(a: number, b: number): number {
    return a + b;
  }

  private getDifference(a: number, b: number): number {
    return a >= b ? a - b : b - a;
  }

  doMath(a: number, b: number, operation: string): number {
    let result: number;

    if (operation === 'sum') {
      result = this.getSum(a, b);
    } else if (operation === 'difference') {
      result = this.getDifference(a, b);
    } else throw Error('Invalid operation');

    return result;
  }
}
`
const typescriptTest: string = `import { describe, test, expect, beforeAll, beforeEach } from '@jest/globals';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { RunnerClient } from '../contracts/clients/RunnerClient';

const fixture = algorandFixture();

let appClient: RunnerClient;

describe('Runner', () => {
  beforeEach(fixture.beforeEach);

  beforeAll(async () => {
    await fixture.beforeEach();
    const { algod, testAccount } = fixture.context;

    appClient = new RunnerClient(
      {
        sender: testAccount,
        resolveBy: 'id',
        id: 0,
      },
      algod
    );

    await appClient.create.createApplication({});
  });

  test('sum', async () => {
    const a = 13;
    const b = 37;
    const sum = await appClient.doMath({ a, b, operation: 'sum' });
    expect(sum.return?.valueOf()).toBe(BigInt(a + b));
  });

  test('difference', async () => {
    const a = 13;
    const b = 37;
    const diff = await appClient.doMath({ a, b, operation: 'difference' });
    expect(diff.return?.valueOf()).toBe(BigInt(a >= b ? a - b : b - a));
  });
});

`
interface outputDetails {
  status: number
  message: string
  output: string
  error: string
}

const CodePage: React.FC = () => {
  const [theme, setTheme] = useState<{ value: string; label: string }>({ value: 'vs-dark', label: 'VS Dark' })
  const [code, setCode] = useState<string>(typescriptDefault)
  const [codeTest, setCodeTest] = useState<string>(typescriptTest)
  const [customInput, setCustomInput] = useState<string>('')
  const [outputDetails, setOutputDetails] = useState<outputDetails>({ status: 1, message: '', output: '', error: '' })
  const [processing, setProcessing] = useState<boolean | null>(null)
  const [language, setLanguage] = useState<{ value: string; label: string }>({ value: 'typescript', label: 'Typescript' })

  const onChange = (action: string, data: string): void => {
    switch (action) {
      case 'code': {
        setCode(data)
        break
      }
      default: {
        console.warn('case not handled!', action, data)
      }
    }
  }

  const onChangeTest = (action: string, data: string): void => {
    switch (action) {
      case 'code': {
        setCodeTest(data)
        break
      }
      default: {
        console.warn('case not handled!', action, data)
      }
    }
  }

  const handleCompile = (): void => {
    setProcessing(true)
    const formData = {
      // encode source code in base64
      code: code,
      code_test: codeTest,
      stdin: customInput,
    }
    // const options = {
    //   method: 'POST',
    //   // url: 'https://178.63.14.81:21558/api/v1/execute-code-test',
    //   url: '/api/v1/execute-code-test',
    //   // params: { base64_encoded: 'false', fields: '*' },
    //   headers: {
    //     'content-type': 'application/json',
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': '*',
    //   },
    //   data: formData,
    // }
    // axios
    api
      // .request(options)
      .post('/api/v1/execute-code-test', formData)
      .then(function (response) {
        console.log('res.data', response.data)
        const statusId = response.data.status
        if (statusId === 1) {
          setProcessing(false)
          setOutputDetails(response.data)
          showSuccessToast(`Compiled Successfully!`)
          console.log('response.data', response.data)
        } else {
          setProcessing(false)
        }
        // const token = response.data.token
        // checkStatus(token)
      })
      .catch((err) => {
        setProcessing(false)
        const error = err.response ? err.response.data : err
        if (err.response) {
          setOutputDetails(err.response.data)
          showErrorToast(err.response.data?.message, 10000)
        }
        console.log('catch block...', error)
      })
  }

  useEffect(() => {
    // defineTheme('dracula').then(() => setTheme({ value: 'dracula', label: 'Dracula' }))
    setTheme({ value: 'dracula', label: 'Dracula' })
    setCustomInput('')
    setLanguage({ value: 'typescript', label: 'Typescript' })
  }, [])

  const showSuccessToast = (msg?: string): void => {
    toast.success(msg || `Compiled Successfully!`, {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }
  const showErrorToast = (msg?: string, timer?: number): void => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: 'top-right',
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex flex-row space-x-4 items-start px-4 py-4">
        <div className="flex flex-col w-full h-full justify-start items-end">
          <h1 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-2">Code</h1>
          <CodeEditorWindow code={code} onChange={onChange} language={language?.value} theme={theme.value} />
        </div>
        <div className="flex flex-col w-full h-full justify-start items-end">
          <h1 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-2">Code Test</h1>
          <CodeEditorWindow code={codeTest} onChange={onChangeTest} language={language?.value} theme={theme.value} />
        </div>

        <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
          <OutputWindow outputDetails={outputDetails} />
          <div className="flex flex-col items-end">
            {/* <CustomInput customInput={customInput} setCustomInput={setCustomInput} /> */}
            <button
              onClick={handleCompile}
              disabled={!code}
              className={classnames(
                'mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0',
                !code ? 'opacity-50' : '',
              )}
            >
              {processing ? 'Processing...' : 'Compile and Execute'}
            </button>
          </div>
          {/* {outputDetails && <OutputDetails outputDetails={outputDetails} />} */}
        </div>
      </div>
    </>
  )
}
export default CodePage
