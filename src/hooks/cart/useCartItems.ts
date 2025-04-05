
import { useState } from 'react';
import { useCartOperations } from './useCartOperations';

/**
 * Hook for managing cart items
 */
export const useCartItems = (user: any, setIsLoading: (loading: boolean) => void) => {
  // Get cart operations from the dedicated hook
  const cartOperations = useCartOperations(user, setIsLoading);
  
  return {
    ...cartOperations
  };
};
