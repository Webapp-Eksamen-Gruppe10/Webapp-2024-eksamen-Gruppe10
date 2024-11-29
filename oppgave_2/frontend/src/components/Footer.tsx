import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 text-center md:text-left mb-4 md:mb-0">
            <h4 className=" text-white text-lg">Webapplikasjoner</h4>
          </div>

          <div className="w-full md:w-1/3 text-center mb-4 md:mb-0">
            <h4 className=" text-white text-lg">Eksamen høsten 2024</h4>
          </div>

          <div className="w-full md:w-1/3 text-center md:text-right mb-2">
            <h4 className=" text-white text-lg">Gruppe 10</h4>
          </div>
        </div>
      </div>
    </footer>
  );
};


export default Footer;
