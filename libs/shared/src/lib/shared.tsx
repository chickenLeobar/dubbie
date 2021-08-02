import './shared.module.css';

/* eslint-disable-next-line */
export interface SharedProps {}

export function Shared(props: SharedProps) {
  return (
    <div>
      <h1>Welcome to shared!</h1>
    </div>
  );
}

export default Shared;
