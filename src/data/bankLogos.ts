export interface BankLogo {
  id: string;
  name: string;
  logoUrl: string;
  bgColor: string;
}

export const bankLogos: BankLogo[] = [
  {
    id: 'lbp',
    name: 'La Banque Postale',
    logoUrl: '/lbp.png',
    bgColor: '#0046c0'
  },
  {
    id: 'fortuneo',
    name: 'Fortuneo',
    logoUrl: '/fortuneo.png',
    bgColor: '#002f6c'
  },
  {
    id: 'linxea',
    name: 'Linxea',
    logoUrl: '/linxea.png',
    bgColor: '#00a0df'
  }
];