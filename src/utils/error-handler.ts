export function handlePrismaError(operation: string) {
  return async <T>(
    fn: () => Promise<T>
  ): Promise<{ success: boolean; data?: T; error?: string }> => {
    try {
      const data = await fn();
      return { success: true, data };
    } catch (error) {
      console.error(`Error ${operation}:`, error);
      return { success: false, error: `Не удалось ${operation}` };
    }
  };
}
