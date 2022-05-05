import React from 'react'
import { useUser } from '@auth0/nextjs-auth0';
import UpdateCategoryModal from './UpdateCategoryModal';

function UserCategory({ category, changeCategories }) {
    const { user, isLoading } = useUser();
    return (
        <tr>
            <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">{category.name}</td>
            <td className="flex flex-wrap p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 md:flex-row md:overflow-y-auto md:w-40 whitespace-nowrap">{category.description}</td>
            <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">{category.num_cities}</td>
            {!isLoading && user && (
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                    <UpdateCategoryModal category={category} changeCategories={changeCategories} />
                </td>
            )}
        </tr>
)
}

export default UserCategory