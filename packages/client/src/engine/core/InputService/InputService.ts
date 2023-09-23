import type { KeyCode, InputKeysState } from './types';

export default class InputService {
  public readonly inputKeysState: Partial<InputKeysState> = {};

  private static _instance?: InputService;

  private _onKeyDown = (event: KeyboardEvent) => {
    const code = event.code as KeyCode;
    this.changeInputKeyState(code, true);
  };

  private _onKeyUp = (event: KeyboardEvent) => {
    const code = event.code as KeyCode;
    this.changeInputKeyState(code, false);
  };

  private constructor() {
    this._attachKeyDownEvent();
    this._attachKeyUpEvent();
  }

  public static getInstance() {
    if (InputService._instance) {
      return InputService._instance;
    }
    InputService._instance = new InputService();
    return InputService._instance;
  }

  private _attachKeyDownEvent() {
    document.addEventListener('keydown', this._onKeyDown);
  }

  private _attachKeyUpEvent() {
    document.addEventListener('keyup', this._onKeyUp);
  }

  public getInputKeyState(key: KeyCode) {
    return !!this.inputKeysState[key];
  }

  public changeInputKeyState(key: KeyCode, value: boolean) {
    this.inputKeysState[key] = value;
  }

  public destroy() {
    document.removeEventListener('keydown', this._onKeyDown);
    document.removeEventListener('keyup', this._onKeyUp);
    delete InputService._instance;
  }

  public toggleInputKeyState(key: KeyCode) {
    this.changeInputKeyState(key, !this.inputKeysState[key]);
  }
}
