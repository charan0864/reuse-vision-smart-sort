
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Eye, ThumbsUp } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  category: string;
  content: string;
  detailed_content: string;
  reading_time: string;
  difficulty: string;
  likes: number;
  views: number;
  image_url: string;
  icon: React.ReactNode;
}

interface ArticleDetailProps {
  article: Article;
  onBack: () => void;
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({ article, onBack }) => {
  return (
    <div className="space-y-6 p-4 md:p-0">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Articles
        </Button>
      </div>

      <Card>
        <div className="relative overflow-hidden">
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-64 md:h-80 object-cover"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.src = '/placeholder.svg';
            }}
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge variant="secondary">{article.category}</Badge>
            <Badge variant="outline" className="bg-white/90">{article.difficulty}</Badge>
          </div>
        </div>
        
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl flex items-start gap-3">
            {article.icon}
            <span>{article.title}</span>
          </CardTitle>
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {article.reading_time}
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {article.views.toLocaleString()} views
            </div>
            <div className="flex items-center gap-1">
              <ThumbsUp className="h-4 w-4" />
              {article.likes.toLocaleString()} likes
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              {article.content}
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 border">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Detailed Analysis</h3>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {article.detailed_content}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
