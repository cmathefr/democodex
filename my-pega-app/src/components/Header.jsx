import { usePegaConfig } from 'pega-react-sdk';

function Header() {
  const config = usePegaConfig();

  return (
    <header className="app-header">
      <h1>{config.application?.name ?? 'Application Pega'}</h1>
      <p>Instance : {config.baseUrl}</p>
    </header>
  );
}

export default Header;
