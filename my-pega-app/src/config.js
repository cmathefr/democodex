export const pegaConfig = {
  baseUrl: 'https://your-pega-instance/prweb/api',
  auth: {
    clientId: 'your-client-id',
    clientSecret: 'your-client-secret'
  },
  application: {
    name: 'NomApplicationPega',
    version: '01.01.01'
  },
  mocks: {
    D_CaseList: [
      {
        pyID: 'C-001',
        pyLabel: 'Demande de prêt',
        status: 'En cours'
      },
      {
        pyID: 'C-002',
        pyLabel: 'Ouverture de compte',
        status: 'Résolu'
      }
    ]
  }
};
