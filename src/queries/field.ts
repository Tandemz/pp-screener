export interface Field {
  id: number;
  label: string;
}

export const useFields = (): Field[] => {
  return [
    {
      id: 1,
      label: 'Quel est votre nom ?',
    },
  ];
};
