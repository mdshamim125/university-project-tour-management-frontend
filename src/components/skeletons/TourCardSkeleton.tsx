export default function TourCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 w-full bg-gray-200 dark:bg-gray-700" />

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Title */}
        <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />

        {/* Location & Division */}
        <div className="flex justify-between">
          <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>

        {/* Price */}
        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" />

        {/* Buttons */}
        <div className="flex justify-between items-center pt-2">
          <div className="h-9 w-28 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          <div className="h-9 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
