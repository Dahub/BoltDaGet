export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount);
};

export const getAccountTypeLabel = (type: string) => {
  const types: Record<string, string> = {
    LIVRET_A: 'Livret A',
    LDDS: 'LDDS',
    PEL: 'PEL',
    CHECKING: 'Compte Courant',
    PEA: 'PEA',
    PER: 'PER'
  };
  return types[type];
};