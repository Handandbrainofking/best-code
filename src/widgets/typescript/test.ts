
interface Action<T> {
    payload?: T
    type: string
}

class EffectModule{
    count = 1;
    message = 'hello';
    delay(input: Promise<number>) {
        return input.then(i=> ({
            payload: `hello ${i}`,
            type: 'delay'
        }))
    }
    setMessage(action:Action<Date>) {
        return {
            payload: action.payload.getMilliseconds(),
            type: 'set-message'
        }
    }
}

type Connected = {
    delay(input:number): Action<string>;
    setMessage(action: Date) :Action<number>
}

const effectModule = new EffectModule()
const connected: Connected = connect(effectModule)