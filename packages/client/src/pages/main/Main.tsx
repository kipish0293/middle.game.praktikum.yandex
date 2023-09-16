import { Link } from 'react-router-dom';

import { decrement, increment } from '@app/store';
import { useAppDispatch, useAppSelector } from '@app/hooks';

// type Props = {};

export function MainPage() {
  const dispatch = useAppDispatch();
  const { counter } = useAppSelector((store) => store.counter);

  return (
    <nav style={{ padding: '10px' }}>
      <ul>
        <li>
          <Link to="/login">Login Page</Link>
        </li>
        <li>
          <Link to="/register">Register Page</Link>
        </li>
        <li>
          <Link to="/game">Game Page</Link>
        </li>
        <li>
          <Link to="/profile">Profile Page</Link>
        </li>
        <li>
          <Link to="/forum">Forum Page</Link>
        </li>
        <li>
          <Link to="/leaderboard">Leaderboard Page</Link>
        </li>
      </ul>

      <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
        <button type="button" onClick={() => dispatch(decrement())}>
          -
        </button>
        {counter}
        <button type="button" onClick={() => dispatch(increment())}>
          +
        </button>
      </div>
    </nav>
  );
}
