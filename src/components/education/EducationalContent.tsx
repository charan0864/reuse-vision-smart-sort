
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Recycle, AlertTriangle, Lightbulb, Users, TrendingUp } from 'lucide-react';

const educationalArticles = [
  {
    id: '1',
    title: 'Understanding Plastic Recycling Codes',
    category: 'Basics',
    content: 'Learn about the 7 different plastic recycling codes and what they mean for recycling.',
    image_url: '/placeholder.svg',
    likes: 45,
    views: 230,
    icon: <Recycle className="h-5 w-5" />
  },
  {
    id: '2',
    title: 'The Environmental Impact of Single-Use Plastics',
    category: 'Environment',
    content: 'Discover how single-use plastics affect our environment and what alternatives exist.',
    image_url: '/placeholder.svg',
    likes: 67,
    views: 312,
    icon: <AlertTriangle className="h-5 w-5" />
  },
  {
    id: '3',
    title: 'How to Properly Clean Plastics for Recycling',
    category: 'Tips',
    content: 'Step-by-step guide on preparing plastic items for recycling to maximize their value.',
    image_url: '/placeholder.svg',
    likes: 89,
    views: 456,
    icon: <Lightbulb className="h-5 w-5" />
  },
  {
    id: '4',
    title: 'Building Sustainable Communities',
    category: 'Community',
    content: 'Learn how communities worldwide are reducing plastic waste and promoting recycling.',
    image_url: '/placeholder.svg',
    likes: 34,
    views: 189,
    icon: <Users className="h-5 w-5" />
  },
  {
    id: '5',
    title: 'The Future of Plastic Recycling Technology',
    category: 'Innovation',
    content: 'Explore cutting-edge technologies that are revolutionizing plastic recycling.',
    image_url: '/placeholder.svg',
    likes: 78,
    views: 401,
    icon: <TrendingUp className="h-5 w-5" />
  }
];

const categories = ['All', 'Basics', 'Environment', 'Tips', 'Community', 'Innovation'];

export const EducationalContent: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredArticles = selectedCategory === 'All' 
    ? educationalArticles 
    : educationalArticles.filter(article => article.category === selectedCategory);

  return (
    <div className="space-y-6 p-4 md:p-0">
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Learn</h1>
        <p className="text-gray-600 text-sm md:text-base">
          Expand your knowledge about plastic recycling and environmental impact
        </p>
      </div>

      {/* Category Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer text-xs md:text-sm px-3 py-1"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Educational Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredArticles.map((article) => (
          <Card key={article.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <div className="relative">
              <img
                src={article.image_url}
                alt={article.title}
                className="w-full h-40 md:h-48 object-cover rounded-t-lg"
              />
              <div className="absolute top-3 left-3">
                <Badge variant="secondary" className="text-xs">
                  {article.category}
                </Badge>
              </div>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-base md:text-lg leading-tight flex items-start gap-2">
                {article.icon}
                <span>{article.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-xs md:text-sm mb-4 leading-relaxed">
                {article.content}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-3">
                  <span>👍 {article.likes}</span>
                  <span>👁️ {article.views}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  Read More
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Tips Section */}
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl text-green-800">
            <BookOpen className="h-5 w-5 md:h-6 md:w-6" />
            Quick Recycling Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                <div>
                  <h4 className="font-semibold text-sm md:text-base text-green-800">Clean Before Recycling</h4>
                  <p className="text-xs md:text-sm text-green-700">Remove all food residue and labels to prevent contamination</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                <div>
                  <h4 className="font-semibold text-sm md:text-base text-green-800">Check Local Guidelines</h4>
                  <p className="text-xs md:text-sm text-green-700">Recycling programs vary by location - know your local rules</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                <div>
                  <h4 className="font-semibold text-sm md:text-base text-green-800">Sort by Type</h4>
                  <p className="text-xs md:text-sm text-green-700">Different plastic types require different recycling processes</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
                <div>
                  <h4 className="font-semibold text-sm md:text-base text-green-800">Reduce First</h4>
                  <p className="text-xs md:text-sm text-green-700">The best plastic is the one you don't use - consider alternatives</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
