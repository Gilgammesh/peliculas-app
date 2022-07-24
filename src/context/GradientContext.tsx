import React, {createContext, useState} from 'react';

interface IColors {
  primary: string;
  secondary: string;
}
interface GradientContextProps {
  colors: IColors;
  prevColors: IColors;
  setColors: (value: IColors) => void;
  setPrevColors: (value: IColors) => void;
}

export const GradientContext = createContext<GradientContextProps>(
  {} as GradientContextProps,
);

export const GradientProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const initialColors = {
    primary: 'transparent',
    secondary: 'transparent',
  };
  const [colors, setColors] = useState<IColors>(initialColors);
  const [prevColors, setPrevColors] = useState<IColors>(initialColors);

  const value: GradientContextProps = {
    colors,
    prevColors,
    setColors,
    setPrevColors,
  };

  // Retornamos el provider con los valores del context
  return (
    <GradientContext.Provider value={value}>
      {children}
    </GradientContext.Provider>
  );
};
