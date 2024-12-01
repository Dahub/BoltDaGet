import React from 'react';

export interface BankLogo {
  id: string;
  name: string;
  bgColor: string;
  svg: React.ReactNode;
}

export const bankLogos: BankLogo[] = [
  {
    id: 'bnp',
    name: 'BNP Paribas',
    bgColor: '#00915a',
    svg: (
      <svg viewBox="0 0 24 24" fill="white">
        <path d="M12 3L3 8v8l9 5 9-5V8l-9-5zm0 2.5L18 9v6l-6 3.5L6 15V9l6-3.5z"/>
      </svg>
    )
  },
  {
    id: 'sg',
    name: 'Société Générale',
    bgColor: '#ed1c24',
    svg: (
      <svg viewBox="0 0 24 24" fill="white">
        <path d="M5 5v14h14V5H5zm12 12H7V7h10v10z"/>
      </svg>
    )
  },
  {
    id: 'ca',
    name: 'Crédit Agricole',
    bgColor: '#004c8f',
    svg: (
      <svg viewBox="0 0 24 24" fill="white">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 3l6 3v8l-6 3-6-3V8l6-3z"/>
      </svg>
    )
  },
  {
    id: 'lcl',
    name: 'LCL',
    bgColor: '#002e6d',
    svg: (
      <svg viewBox="0 0 24 24" fill="white">
        <path d="M4 4v16h16V4H4zm14 14H6V6h12v12z"/>
      </svg>
    )
  },
  {
    id: 'bp',
    name: 'Banque Populaire',
    bgColor: '#004990',
    svg: (
      <svg viewBox="0 0 24 24" fill="white">
        <path d="M3 3v18h18V3H3zm16 16H5V5h14v14z"/>
      </svg>
    )
  },
  {
    id: 'ce',
    name: 'Caisse d\'Épargne',
    bgColor: '#c30046',
    svg: (
      <svg viewBox="0 0 24 24" fill="white">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 3l6 3v8l-6 3-6-3V8l6-3z"/>
      </svg>
    )
  }
];