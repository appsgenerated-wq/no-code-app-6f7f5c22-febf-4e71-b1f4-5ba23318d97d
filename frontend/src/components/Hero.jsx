import React from 'react';
import Button from './Button';

const Hero = ({ title, subtitle, primaryAction, secondaryAction }) => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
            {title}
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            {primaryAction && (
               <Button href={primaryAction.href} size="lg">{primaryAction.text}</Button>
            )}
            {secondaryAction && (
               <Button href={secondaryAction.href} variant="outline" size="lg">{secondaryAction.text}</Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;