import { getSession, login, logout, getLatestReviews, getStats } from "@/lib";
import ReviewList from "./components/ReviewList";
import React, { Suspense } from 'react';
import FrontPageStats from "./components/FrontPageStats";
export default async function Page() {
  const session = await getSession();
  const reviews = await getLatestReviews(10);
  const stats = await getStats();
  return (
    <div>
      {/* I need a front page stats component and a list component (that features in every slug) */}
      <Suspense fallback={<div className="text-center p-10">Loading stats...</div>}>
        <FrontPageStats {...stats} />
      </Suspense>
      <div className="mt-10 mx-auto w-3/4">

        <h2 className="text-xl text-center sm:text-left font-semibold text-gray-800">Latest Reviews</h2>
        <Suspense fallback={<div className="text-center p-10">Loading reviews...</div>}>

          <ReviewList reviews={reviews} />
        </Suspense>
      </div>
    </div>
  );
}
