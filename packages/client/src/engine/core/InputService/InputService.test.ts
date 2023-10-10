import { InputService } from '@app/engine';

enum KeyCode {
  KeyA = 'KeyA',
}

describe('InputService', () => {
  it('create an instance of InputService', () => {
    const inputService = InputService.getInstance();

    expect(inputService).toBeInstanceOf(InputService);
  });

  describe('should toggle input key state correctly', () => {
    it('toggle input key state to true', () => {
      const inputService = InputService.getInstance();
      const keyCode = KeyCode.KeyA;

      inputService.toggleInputKeyState(keyCode);

      expect(inputService.getInputKeyState(keyCode)).toBe(true);
    });

    it('toggle input key state to false', () => {
      const inputService = InputService.getInstance();
      const keyCode = KeyCode.KeyA;

      inputService.toggleInputKeyState(keyCode);

      expect(inputService.getInputKeyState(keyCode)).toBe(false);
    });
  });
});
