import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import apiService from '../services/apiService';
import { ClockIcon, UserIcon } from '@heroicons/react/24/outline';

const RecipesPage = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const data = await apiService.get('/recipes');
                setRecipes(data);
            } catch (error) {
                console.error('Failed to fetch recipes:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchRecipes();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Explore All Recipes</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">Find your next culinary adventure from our community's creations.</p>
                </div>

                {loading ? (
                    <div className="text-center">
                        <p className="text-gray-600">Loading recipes...</p>
                    </div>
                ) : (
                    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {recipes.map(recipe => (
                            <Link to={`/recipes/${recipe.id}`} key={recipe.id} className="group block">
                                <Card className="h-full flex flex-col">
                                    <div className="relative">
                                        <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-48 object-cover rounded-t-lg" />
                                    </div>
                                    <div className="p-6 flex-grow flex flex-col">
                                        <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{recipe.title}</h2>
                                        <p className="text-gray-600 mt-2 flex-grow text-sm">{recipe.description.substring(0, 100)}...</p>
                                        <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
                                            <div className="flex items-center">
                                                <ClockIcon className="h-4 w-4 mr-1.5" />
                                                <span>{recipe.prepTime + recipe.cookTime} min</span>
                                            </div>
                                            <div className="flex items-center">
                                                 <UserIcon className="h-4 w-4 mr-1.5" />
                                                <span>Serves {recipe.servings}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default RecipesPage;