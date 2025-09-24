import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import Footer from '../components/Footer';
import { BookOpenIcon, UserGroupIcon, SparklesIcon } from '@heroicons/react/24/outline';

const HomePage = () => {

  const features = [
    {
      icon: <BookOpenIcon className="h-8 w-8 text-blue-600" />,
      title: 'Discover Delicious Recipes',
      description: 'Explore a vast collection of recipes from different cuisines, submitted by a community of food lovers.'
    },
    {
      icon: <UserGroupIcon className="h-8 w-8 text-blue-600" />,
      title: 'Share Your Creations',
      description: 'Have a great recipe? Share it with the world! Upload your recipes with photos, ingredients, and instructions.'
    },
    {
      icon: <SparklesIcon className="h-8 w-8 text-blue-600" />,
      title: 'Find Inspiration',
      description: 'Whether you\'re a beginner cook or a seasoned chef, find your next meal inspiration right here.'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Header />
      <main>
        <Hero 
          title="Find Your Next Favorite Meal"
          subtitle="Join GourmetGo, a vibrant community where food lovers share, discover, and create amazing recipes from around the globe. Your culinary adventure starts here."
          primaryAction={{ text: 'Explore Recipes', href: '/recipes' }}
          secondaryAction={{ text: 'Share a Recipe', href: '/register' }}
        />
        
        <section id="features" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">A World of Flavors at Your Fingertips</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">GourmetGo is more than a recipe book; it\'s a community built for food enthusiasts.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900">Ready to Start Cooking?</h2>
            <p className="mt-4 text-xl text-gray-600">Create an account to save your favorite recipes and share your own culinary masterpieces.</p>
            <div className="mt-8">
              <Link to="/register" className="inline-block bg-blue-600 text-white font-medium py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300">
                Join Our Community
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;