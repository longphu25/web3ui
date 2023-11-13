import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import axios from 'axios'
import CodeEditorWindow from './CodeEditorWindow'

const typescriptDefault: string = `import { Contract } from '@algorandfoundation/tealscript';

// eslint-disable-next-line no-unused-vars
class Runner extends Contract {
  /**
   * Calculates the sum of two numbers
   *
   * @param a
   * @param b
   * @returns The sum of a and b
   */
  private getSum(a: number, b: number): number {
    return a + b;
  }

  /**
   * Calculates the difference between two numbers
   *
   * @param a
   * @param b
   * @returns The difference between a and b.
   */
  private getDifference(a: number, b: number): number {
    return a >= b ? a - b : b - a;
  }

  /**
   * A method that takes two numbers and does either addition or subtraction
   *
   * @param a The first number
   * @param b The second number
   * @param operation The operation to perform. Can be either 'sum' or 'difference'
   *
   * @returns The result of the operation
   */
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

const CodePage: React.FC = () => {
  const [theme, setTheme] = useState<{ value: string; label: string }>({ value: 'vs-dark', label: 'VS Dark' })
  const [code, setCode] = useState<string>(typescriptDefault)
  const [codeTest, setCodeTest] = useState<string>(typescriptTest)
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

  useEffect(() => {
    // defineTheme('dracula').then(() => setTheme({ value: 'dracula', label: 'Dracula' }))
  }, [])

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
          <CodeEditorWindow code={code} onChange={onChange} language={language?.value} theme={theme.value} />
        </div>
        <div className="flex flex-col w-full h-full justify-start items-end">
          <CodeEditorWindow code={codeTest} onChange={onChangeTest} language={language?.value} theme={theme.value} />
        </div>

        <div className="right-container flex flex-shrink-0 w-[30%] flex-col"></div>
      </div>
    </>
  )
}
export default CodePage
