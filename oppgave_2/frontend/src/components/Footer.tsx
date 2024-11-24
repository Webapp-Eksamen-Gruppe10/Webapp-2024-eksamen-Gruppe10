import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">web apps 2024</h2>
          </div>

          <div className="w-full md:w-1/3 text-center mb-4 md:mb-0">
            <h3 className="text-lg font-bold">gruppe 10</h3>
          </div>

          <div className="w-full md:w-1/3 text-center md:text-right mb-2">
            <p className="font-bold">Eksamen</p>
          </div>
        </div>
      </div>
    </footer>
  );
};


export default Footer;
