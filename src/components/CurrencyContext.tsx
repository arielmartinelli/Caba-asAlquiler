'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Currency = 'ARS' | 'USD';

interface CurrencyContextType {
 currency: Currency;
 setCurrency: (c: Currency) => void;
 formatPrice: (priceARS: number, priceUSD: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType>({
 currency: 'ARS',
 setCurrency: () => {},
 formatPrice: (ars) => `$${ars.toLocaleString('es-AR')} ARS`,
});

export const CurrencyProvider = ({ children }: { children: React.ReactNode }) => {
 const [currency, setCurrency] = useState<Currency>('ARS');

 useEffect(() => {
 const saved = localStorage.getItem('user_currency') as Currency;
 if (saved === 'ARS' || saved === 'USD') {
 setCurrency(saved);
 }
 }, []);

 const handleSetCurrency = (c: Currency) => {
 setCurrency(c);
 localStorage.setItem('user_currency', c);
 };

 const formatPrice = (priceARS: number, priceUSD: number) => {
 if (currency === 'USD') {
 return `${priceUSD.toLocaleString('en-US')} USD`;
 }
 return `${priceARS.toLocaleString('es-AR')} ARS`;
 };

 return (
 <CurrencyContext.Provider value={{ currency, setCurrency: handleSetCurrency, formatPrice }}>
 {children}
 </CurrencyContext.Provider>
 );
};

export const useCurrency = () => useContext(CurrencyContext);
