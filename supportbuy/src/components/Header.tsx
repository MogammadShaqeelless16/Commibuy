// src/components/Header.tsx
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold">SupportBuy</h1>
        {/* Add navigation or other header elements here */}
      </div>
    </header>
  );
};

export default Header;





