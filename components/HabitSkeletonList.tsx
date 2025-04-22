export default function HabitSkeletonList() {
  return (
    <ul className="space-y-3">
      {[...Array(3)].map((_, i) => (
        <li
          key={i}
          className="flex justify-between items-center bg-white border px-4 py-3 rounded-lg shadow-sm animate-pulse"
        >
          <div className="flex items-center gap-3 w-full">
            <div className="w-5 h-5 rounded-full bg-gray-300" />
            <div className="flex-1 h-4 bg-gray-300 rounded w-3/4" />
          </div>
          <div className="h-4 w-10 bg-gray-300 rounded" />
        </li>
      ))}
    </ul>
  );
}
