import { PageHeader } from '@/app/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/app/lib/blog-data';

export default function BlogPage() {
  return (
    <div className="p-8 flex-1 bg-yellow-50">
      <div className="relative py-8 px-4 md:px-6">
        <Image
          src="https://www.cisternashnosfajardo.com/wp-content/uploads/2018/11/SLIDE-1-800x400.jpg"
          alt="Camión cisterna en carretera"
          fill
          className="object-cover absolute inset-0 z-0"
          data-ai-hint="tanker truck road"
        />
        <div className="absolute inset-0 z-10 bg-background/80 backdrop-blur-sm" />
        <div className="relative z-20">
          <PageHeader
            title="Blog"
            description="Noticias, artículos y actualizaciones de la industria del transporte."
          />
          <div className="grid gap-8 md:grid-cols-2">
            {blogPosts.map((post) => (
              <Card key={post.id} className="shadow-lg bg-card/80 overflow-hidden">
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
                  <p className="text-muted-foreground line-clamp-3">{post.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
