export default function NotFound() {
    return (
        <div className="h-screen flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl font-bold text-foreground mb-4">404 - Page Not Found</h1>
            <p className="text-muted-foreground mb-4">
                Sorry, the page you’re looking for doesn’t exist.
            </p>
            <a
                href="/"
                className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition"
            >
                Go back home
            </a>
        </div>
    );
}
