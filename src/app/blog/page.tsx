import { PageHeader } from '@/app/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/app/lib/blog-data';

export default function BlogPage() {
  return (
    <div className="p-8 flex-1 bg-blog-background">
      <div className="py-8 px-4 md:px-6">
        <PageHeader
          title={<span className="text-blog-foreground">Blog</span>}
          description={
            <span className="text-blog-foreground/80">
              Notícies, articles i actualitzacions de la indústria del
              transport.
            </span>
          }
        />
        <div className="grid gap-8 md:grid-cols-2">
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className="shadow-lg bg-card/90 overflow-hidden"
            >
              {post.imageUrl && (
                <Link href={`/blog/${post.id}`}>
                  <div className="relative h-48 w-full cursor-pointer">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover"
                      data-ai-hint={post.imageHint}
                    />
                  </div>
                </Link>
              )}
              <CardHeader>
                <CardTitle>
                  <Link href={`/blog/${post.id}`} className="hover:underline">
                    {post.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3">
                  {post.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
