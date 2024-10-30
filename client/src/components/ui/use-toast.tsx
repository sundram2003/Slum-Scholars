import React, { useState } from 'react';

export const useToast = () => {
  const [toast, setToast] = useState<{ title: string; description: string; variant?: string } | null>(null);

  const showToast = ({ title, description, variant = 'default' }: { title: string; description: string; variant?: string }) => {
    setToast({ title, description, variant });
    setTimeout(() => setToast(null), 3000);
  };

  return { toast, showToast };
};

export const Toast: React.FC<{ toast: { title: string; description: string; variant?: string } | null }> = ({ toast }) => {
  if (!toast) return null;

  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-md shadow-md ${toast.variant === 'destructive' ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}>
      <strong>{toast.title}</strong>
      <p>{toast.description}</p>
    </div>
  );
};
