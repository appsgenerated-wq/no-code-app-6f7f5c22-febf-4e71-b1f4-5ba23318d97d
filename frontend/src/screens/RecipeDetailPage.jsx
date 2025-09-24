import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../services/apiService';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ClockIcon, UserGroupIcon, FireIcon } from '@heroicons/react/24/outline';

const RecipeDetailPage = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const data = await apiService.get(`/recipes/${id}`);
                setRecipe(data);
            } catch (error) {
                console.error('Failed to fetch recipe:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchRecipe();
    }, [id]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (!recipe) {
        return <div className="flex justify-center items-center h-screen">Recipe not found.</div>;
    }

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">{recipe.title}</h1>
                        <p className="mt-4 text-lg text-gray-500">{recipe.description}</p>
                    </div>
                    
                    <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-96 object-cover rounded-lg shadow-lg mb-8" />

                    <div className="grid grid-cols-3 gap-8 text-center bg-gray-50 p-6 rounded-lg mb-8 border">
                        <div className="flex flex-col items-center">
                            <ClockIcon className="h-8 w-8 text-gray-500 mb-2" />
                            <span className="font-semibold">Prep Time</span>
                            <span className="text-gray-700">{recipe.prepTime} min</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <FireIcon className="h-8 w-8 text-gray-500 mb-2" />
                            <span className="font-semibold">Cook Time</span>
                            <span className="text-gray-700">{recipe.cookTime} min</span>
                        </div>
                         <div className="flex flex-col items-center">
                            <UserGroupIcon className="h-8 w-8 text-gray-500 mb-2" />
                            <span className="font-semibold">Servings</span>
                            <span className="text-gray-700">{recipe.servings}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-1">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ingredients</h2>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 bg-gray-50 p-4 rounded-lg border">
                                {recipe.ingredients.map((item, index) => <li key={index}>{item}</li>)}
                            </ul>
                        </div>
                        <div className="md:col-span-2">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Instructions</h2>
                            <ol className="list-decimal list-inside space-y-4 text-gray-700">
                                {recipe.instructions.map((step, index) => <li key={index} className="pl-2"><p>{step}</p></li>)}
                            </ol>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default RecipeDetailPage;