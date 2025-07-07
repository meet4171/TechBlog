
import ClientBlogPost from './ClientBlogPost';

export async function generateStaticParams() {
    return [
        { id: '1' },
        { id: '2' }
    ];
}

export default function Page({ params }: { params: { id: string } }) {
    return <ClientBlogPost postId={params.id} />;
}
