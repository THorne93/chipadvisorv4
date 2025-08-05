'use client'
export default async function FrontPageStats(stats: {
    totalReviews: number;
    totalChips: number;
    totalUsers: number;
    totalRatings: number;
}) {
    return (
        <div className='mx-auto w-3/4'>
            <div className="flex  flex-col sm:flex-row gap-4 justify-between text-gray-800 font-medium text-center">
                <div className="sm:p-3 p-1 bg-gray-100 w-full rounded-md shadow-sm">
                    <p className="text-xl sm:text-2xl font-bold text-blue-700">{stats.totalChips}</p>
                    <p className="text-sm sm:text-base text-gray-600">Restaurants</p>
                </div>

                <div className="sm:p-3 p-1 bg-gray-100 w-full rounded-md shadow-sm">
                    <p className="text-xl sm:text-2xl font-bold text-blue-700">Coming Soon!</p>
                    <p className="text-sm sm:text-base text-gray-600">Recipes</p>
                </div>

                <div className="sm:p-3 p-1 bg-gray-100 w-full rounded-md shadow-sm">
                    <span className="text-xl sm:text-2xl font-bold text-blue-700">{stats.totalUsers}</span>
                    <p className="text-sm sm:text-base text-gray-600">Users</p>
                </div>

                <div className="sm:p-3 p-1 bg-gray-100 w-full rounded-md shadow-sm">
                    <p className="text-xl sm:text-2xl font-bold text-blue-700">{stats.totalRatings}</p>
                    <p className="text-sm sm:text-base text-gray-600">Ratings</p>
                </div>

                <div className="sm:p-3 p-1 bg-gray-100 w-full rounded-md shadow-sm">
                    <span className="text-xl sm:text-2xl font-bold text-blue-700">{stats.totalReviews}</span>
                    <p className="text-sm sm:text-base text-gray-600">Reviews</p>
                </div>

                <div className="sm:p-3 p-1 bg-gray-100 w-full rounded-md shadow-sm">
                    <p className="text-xl sm:text-2xl font-bold text-blue-700">0</p>
                    <p className="text-sm sm:text-base text-gray-600">Lists</p>
                </div>

            </div>
        </div>
    );
}