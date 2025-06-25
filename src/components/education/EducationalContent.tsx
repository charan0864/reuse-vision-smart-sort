
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Lightbulb, Award } from 'lucide-react';

const educationalArticles = [
  {
    id: 1,
    title: "Understanding Plastic Recycling Codes",
    category: "best_practices",
    content: "Learn about the 7 plastic recycling codes and what they mean for proper disposal...",
    image: "/placeholder.svg",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Success Story: Ocean Cleanup Project",
    category: "success_stories",
    content: "How a community initiative removed 10 tons of plastic from local waterways...",
    image: "/placeholder.svg",
    readTime: "8 min read"
  },
  {
    id: 3,
    title: "Innovative Biodegradable Packaging",
    category: "innovations",
    content: "Discover new materials that could replace traditional plastic packaging...",
    image: "/placeholder.svg",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "Home Composting for Beginners",
    category: "best_practices",
    content: "Start your journey to zero waste with these simple composting techniques...",
    image: "/placeholder.svg",
    readTime: "7 min read"
  },
  {
    id: 5,
    title: "Corporate Sustainability Champions",
    category: "success_stories",
    content: "Companies leading the way in sustainable packaging and waste reduction...",
    image: "/placeholder.svg",
    readTime: "10 min read"
  },
  {
    id: 6,
    title: "Smart Recycling Technologies",
    category: "innovations",
    content: "AI and robotics revolutionizing waste sorting and recycling processes...",
    image: "/placeholder.svg",
    readTime: "9 min read"
  }
];

const categoryIcons = {
  best_practices: BookOpen,
  success_stories: Award,
  innovations: Lightbulb
};

const categoryColors = {
  best_practices: "bg-blue-100 text-blue-800",
  success_stories: "bg-green-100 text-green-800",
  innovations: "bg-purple-100 text-purple-800"
};

export const EducationalContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Educational Hub</h1>
        <p className="text-gray-600">
          Learn about sustainable practices, success stories, and innovative solutions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {educationalArticles.map((article) => {
          const IconComponent = categoryIcons[article.category as keyof typeof categoryIcons];
          const colorClass = categoryColors[article.category as keyof typeof categoryColors];
          
          return (
            <Card key={article.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="p-0">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={colorClass}>
                    <IconComponent className="h-3 w-3 mr-1" />
                    {article.category.replace('_', ' ')}
                  </Badge>
                  <span className="text-xs text-gray-500">{article.readTime}</span>
                </div>
                <CardTitle className="text-lg mb-2">{article.title}</CardTitle>
                <p className="text-gray-600 text-sm">{article.content}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">♻️ Daily Recycling</h3>
              <p className="text-sm text-green-700">
                Always rinse containers before recycling and check your local guidelines for accepted materials.
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">🌍 Reduce First</h3>
              <p className="text-sm text-blue-700">
                The best waste is no waste. Consider reusable alternatives before purchasing disposable items.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">🔄 Repurpose Items</h3>
              <p className="text-sm text-purple-700">
                Get creative! Many items can be repurposed for new uses before being recycled.
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <h3 className="font-semibold text-orange-800 mb-2">📍 Find Centers</h3>
              <p className="text-sm text-orange-700">
                Use our recycling center locator to find specialized facilities for hard-to-recycle items.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
