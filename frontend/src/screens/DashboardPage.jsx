import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/Header';
import Button from '../components/Button';
import Card from '../components/Card';
import apiService from '../services/apiService';
import { Link } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/solid';

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRecipes = async () => {
      if (user) {
        try {
          // Manifest convention: filter by relationship foreign key
          const userRecipes = await apiService.get(`/recipes?authorId=${user.id}`);
          setRecipes(userRecipes);
        } catch (error) {
          console.error('Failed to fetch user recipes:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchUserRecipes();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name}!</h1>
            <Button href="/create-recipe">
                <PlusIcon className="h-5 w-5 mr-2" />
                Add New Recipe
            </Button>
        </div>
        
        <Card title="My Recipes">
            {loading ? (
                <p className="text-gray-500">Loading your recipes...</p>
            ) : recipes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recipes.map(recipe => (
                        <Link to={`/recipes/${recipe.id}`} key={recipe.id} className="block bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                            <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-40 object-cover rounded-t-lg" />
                            <div className="p-4">
                                <h3 className="font-semibold text-lg text-gray-900">{recipe.title}</h3>
                                <p className="text-sm text-gray-600 mt-1 truncate">{recipe.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                     <h3 className="mt-2 text-sm font-medium text-gray-900">No recipes found</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by creating a new recipe.</p>
                    <div className="mt-6">
                       <Button href="/create-recipe" size="sm">
                            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                            New Recipe
                        </Button>
                    </div>
                </div>
            )}
        </Card>
      </main>
    </div>
  );
};

export default DashboardPage;