import { PageHeader } from '@/app/components/page-header';
import { blogPosts } from '@/app/lib/blog-data';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id.toString(),
  }));
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = blogPosts.find(p => p.id.toString() === params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="p-8 flex-1 bg-background">
      <div className="container mx-auto">
        <div className="relative h-96 w-full overflow-hidden rounded-lg shadow-lg mb-8">
            {post.imageUrl && (
                <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                    data-ai-hint={post.imageHint}
                />
            )}
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute bottom-0 p-8">
                <h1 className="text-4xl font-bold text-white font-headline">{post.title}</h1>
            </div>
        </div>

        <article className="prose prose-lg max-w-none">
            <p className="text-lg text-muted-foreground whitespace-pre-wrap">{post.content}</p>
        </article>
      </div>
    </div>
  );
}
