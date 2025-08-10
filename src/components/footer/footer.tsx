import React from 'react';
import { Spacer, Link } from '@heroui/react';
import { Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-800 p-4 flex justify-center items-center">
      <Spacer x={1} /> 
      <Link
        href="https://linkedin.com/in/albertshih3"
        className="text-white hover:text-gray-300"
      >
        <Linkedin size={24} />
      </Link>
      <Spacer x={3} />
      <Link
        href="https://github.com/albertshih3"
        className="text-white hover:text-gray-300"
      >
        <Github size={24} />
      </Link>
      <Spacer x={1} /> 
    </footer>
  );
};

export default Footer;
