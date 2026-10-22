import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-3xl font-bold text-gray-800">Page not found</h1>
      <p className="text-gray-600">The page you are looking for does not exist.</p>
      <Link to="/" className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">
        Back to home
      </Link>
    </div>
  );
}
