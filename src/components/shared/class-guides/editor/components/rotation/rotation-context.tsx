import React, { createContext, useContext, useRef, useCallback } from 'react';

interface RotationData {
  tabValue: string;
  rotationId: number | null;
  saveRotation: () => Promise<number | null | undefined>;
  setRotationId: (id: number | null) => void;
  setError: (error: string | null) => void;
}

interface RotationContextType {
  registerRotation: (data: RotationData) => void;
  saveAllRotations: () => Promise<void>;
}

const RotationContext = createContext<RotationContextType | undefined>(
  undefined
);

export const RotationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const rotationsRef = useRef<Map<string, RotationData>>(new Map());

  const registerRotation = useCallback((data: RotationData) => {
    rotationsRef.current.set(data.tabValue, data);
  }, []);

  const saveAllRotations = useCallback(async () => {
    for (const [
      tabValue,
      { saveRotation, setRotationId, setError },
    ] of rotationsRef.current) {
      try {
        const newRotationId = await saveRotation();
        if (newRotationId) {
          setRotationId(newRotationId);
          setError(null);
          console.log(
            `Ротация сохранена для ${tabValue}, ID: ${newRotationId}`
          );
        }
      } catch (err) {
        setError(
          err && typeof err === 'object' && 'message' in err
            ? (err as { message: string }).message
            : 'Ошибка при сохранении ротации'
        );
      }
    }
  }, []);

  return (
    <RotationContext.Provider value={{ registerRotation, saveAllRotations }}>
      {children}
    </RotationContext.Provider>
  );
};

export const useRotationContext = () => {
  const context = useContext(RotationContext);
  if (!context) {
    throw new Error('useRotationContext must be used within RotationProvider');
  }
  return context;
};
