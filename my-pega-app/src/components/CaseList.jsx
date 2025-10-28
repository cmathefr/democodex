import { usePegaData } from 'pega-react-sdk';

function CaseList() {
  const { data, loading, error } = usePegaData({ dataPage: 'D_CaseList' });

  if (loading) {
    return <p>Chargement des cas…</p>;
  }

  if (error) {
    return <p className="error">Erreur : {error.message}</p>;
  }

  if (!data?.length) {
    return <p>Aucun cas disponible.</p>;
  }

  return (
    <ul className="case-list">
      {data.map((item) => (
        <li key={item.pyID}>
          <div className="case-title">{item.pyLabel}</div>
          <div className="case-meta">
            <span>ID : {item.pyID}</span>
            <span>Statut : {item.status}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CaseList;
