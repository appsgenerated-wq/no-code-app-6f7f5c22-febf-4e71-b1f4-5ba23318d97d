import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/Header';
import Button from '../components/Button';
import Input from '../components/Input';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid';

const CreateRecipePage = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [prepTime, setPrepTime] = useState('');
    const [cookTime, setCookTime] = useState('');
    const [servings, setServings] = useState('');
    const [image, setImage] = useState(null);
    const [ingredients, setIngredients] = useState(['']);
    const [instructions, setInstructions] = useState(['']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleAddField = (setter, fields) => setter([...fields, '']);
    const handleRemoveField = (setter, fields, index) => {
        if (fields.length > 1) {
            setter(fields.filter((_, i) => i !== index));
        }
    };
    const handleFieldChange = (setter, fields, index, value) => {
        const newFields = [...fields];
        newFields[index] = value;
        setter(newFields);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('prepTime', prepTime);
        formData.append('cookTime', cookTime);
        formData.append('servings', servings);
        ingredients.forEach(ing => formData.append('ingredients[]', ing));
        instructions.forEach(ins => formData.append('instructions[]', ins));
        if (image) {
            formData.append('imageUrl', image);
        }

        try {
            await apiService.upload('/recipes', formData);
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to create recipe. Please check your inputs.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-8">
                    <h1 className="text-2xl font-bold text-gray-900 border-b pb-4">Create a New Recipe</h1>
                    
                    {error && <p className="text-red-500 bg-red-50 p-3 rounded-md">{error}</p>}

                    <div className="space-y-6">
                        <Input label="Recipe Title" value={title} onChange={e => setTitle(e.target.value)} required />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Recipe Image</label>
                            <input type="file" onChange={e => setImage(e.target.files[0])} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Input label="Prep Time (min)" type="number" value={prepTime} onChange={e => setPrepTime(e.target.value)} required />
                            <Input label="Cook Time (min)" type="number" value={cookTime} onChange={e => setCookTime(e.target.value)} required />
                            <Input label="Servings" type="number" value={servings} onChange={e => setServings(e.target.value)} required />
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-medium text-gray-900 mb-2">Ingredients</h2>
                        {ingredients.map((ing, i) => (
                            <div key={i} className="flex items-center gap-2 mb-2">
                                <Input value={ing} onChange={e => handleFieldChange(setIngredients, ingredients, i, e.target.value)} placeholder={`Ingredient ${i+1}`} className="flex-grow" noMargin/>
                                <Button type="button" variant="danger" onClick={() => handleRemoveField(setIngredients, ingredients, i)} className="p-2 h-10"><MinusIcon className="h-5 w-5"/></Button>
                            </div>
                        ))}
                        <Button type="button" variant="secondary" size="sm" onClick={() => handleAddField(setIngredients, ingredients)}><PlusIcon className="h-4 w-4 mr-1"/>Add Ingredient</Button>
                    </div>

                     <div>
                        <h2 className="text-lg font-medium text-gray-900 mb-2">Instructions</h2>
                        {instructions.map((step, i) => (
                            <div key={i} className="flex items-center gap-2 mb-2">
                                <Input value={step} onChange={e => handleFieldChange(setInstructions, instructions, i, e.target.value)} placeholder={`Step ${i+1}`} className="flex-grow" noMargin/>
                                <Button type="button" variant="danger" onClick={() => handleRemoveField(setInstructions, instructions, i)} className="p-2 h-10"><MinusIcon className="h-5 w-5"/></Button>
                            </div>
                        ))}
                        <Button type="button" variant="secondary" size="sm" onClick={() => handleAddField(setInstructions, instructions)}><PlusIcon className="h-4 w-4 mr-1"/>Add Step</Button>
                    </div>

                    <div className="pt-5 border-t">
                        <div className="flex justify-end">
                            <Button type="button" variant="secondary" onClick={() => navigate(-1)} className="mr-3">Cancel</Button>
                            <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Recipe'}</Button>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default CreateRecipePage;