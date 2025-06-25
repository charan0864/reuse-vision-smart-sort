
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Lightbulb, Award, ChevronRight, Recycle, AlertTriangle, Leaf } from 'lucide-react';

const educationalArticles = [
  {
    id: 1,
    title: "Complete Guide to Plastic Recycling Codes",
    category: "best_practices",
    content: "Master the 7 plastic recycling codes (PET, HDPE, PVC, LDPE, PP, PS, OTHER) and learn exactly how to sort them for maximum environmental impact...",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop",
    readTime: "8 min read",
    difficulty: "Beginner"
  },
  {
    id: 2,
    title: "Identifying Microplastics in Everyday Items",
    category: "best_practices",
    content: "Learn to identify hidden microplastics in cosmetics, clothing, and food packaging that require special disposal methods...",
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=300&fit=crop",
    readTime: "6 min read",
    difficulty: "Intermediate"
  },
  {
    id: 3,
    title: "Success Story: Zero Waste Community Initiative",
    category: "success_stories",
    content: "How the Green Valley community achieved 90% waste reduction through smart plastic sorting and community-driven recycling programs...",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop",
    readTime: "10 min read",
    difficulty: "Beginner"
  },
  {
    id: 4,
    title: "Revolutionary Bio-Plastic Alternatives",
    category: "innovations",
    content: "Discover cutting-edge biodegradable materials made from seaweed, corn starch, and mushroom mycelium that could replace traditional plastics...",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
    readTime: "7 min read",
    difficulty: "Advanced"
  },
  {
    id: 5,
    title: "Advanced Plastic Sorting Techniques",
    category: "best_practices",
    content: "Professional tips for identifying mixed plastics, cleaning contaminated items, and preparing materials for specialized recycling facilities...",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    readTime: "12 min read",
    difficulty: "Advanced"
  },
  {
    id: 6,
    title: "AI-Powered Waste Sorting Revolution",
    category: "innovations",
    content: "How machine learning and computer vision are transforming waste management facilities with 99% accuracy in plastic identification...",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
    readTime: "9 min read",
    difficulty: "Intermediate"
  }
];

const plasticGuide = [
  {
    code: "PET/PETE (1)",
    name: "Polyethylene Terephthalate",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=150&fit=crop",
    recyclable: true,
    commonItems: ["Water bottles", "Soda bottles", "Food containers", "Salad containers"],
    howToRecycle: "Rinse clean, remove labels and caps, place in recycling bin",
    tips: "Look for the #1 in the recycling triangle. Can be recycled into new bottles, carpets, and clothing."
  },
  {
    code: "HDPE (2)",
    name: "High-Density Polyethylene",
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=200&h=150&fit=crop",
    recyclable: true,
    commonItems: ["Milk jugs", "Detergent bottles", "Shampoo bottles", "Grocery bags"],
    howToRecycle: "Rinse thoroughly, caps can stay on, widely accepted in curbside recycling",
    tips: "One of the most recyclable plastics. Often recycled into new bottles and plastic lumber."
  },
  {
    code: "PVC (3)",
    name: "Polyvinyl Chloride",
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=200&h=150&fit=crop",
    recyclable: false,
    commonItems: ["Pipes", "Wire insulation", "Some packaging", "Credit cards"],
    howToRecycle: "Not accepted in most programs. Check for special collection sites.",
    tips: "Contains harmful chemicals. Avoid when possible and look for PVC-free alternatives."
  },
  {
    code: "LDPE (4)",
    name: "Low-Density Polyethylene",
    image: "https://images.unsplash.com/photo-1586063893991-59ffd504ff14?w=200&h=150&fit=crop",
    recyclable: true,
    commonItems: ["Plastic bags", "Food wraps", "Squeezable bottles", "Bread bags"],
    howToRecycle: "Take to special collection bins at grocery stores. Not curbside recyclable.",
    tips: "Most grocery stores have collection bins for plastic bags and films."
  },
  {
    code: "PP (5)",
    name: "Polypropylene",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop",
    recyclable: true,
    commonItems: ["Yogurt containers", "Bottle caps", "Straws", "Medicine bottles"],
    howToRecycle: "Clean thoroughly, increasingly accepted in recycling programs",
    tips: "Growing acceptance in recycling programs. Check with your local facility."
  },
  {
    code: "PS (6)",
    name: "Polystyrene",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=150&fit=crop",
    recyclable: false,
    commonItems: ["Foam containers", "Disposable cups", "Packaging peanuts", "Foam trays"],
    howToRecycle: "Rarely recyclable. Look for special collection events or avoid.",
    tips: "Breaks into microplastics easily. Seek reusable alternatives when possible."
  },
  {
    code: "OTHER (7)",
    name: "Other Plastics",
    image: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=200&h=150&fit=crop",
    recyclable: false,
    commonItems: ["Multi-layer packaging", "CDs/DVDs", "Some toys", "Mixed materials"],
    howToRecycle: "Generally not recyclable. Consider reuse or proper disposal.",
    tips: "Complex composition makes recycling nearly impossible. Focus on reducing use."
  }
];

const quickTips = [
  {
    icon: Recycle,
    title: "The 3 R's Priority",
    tip: "Always follow this order: REDUCE first (buy less plastic), REUSE second (repurpose items), then RECYCLE third (proper disposal).",
    color: "green"
  },
  {
    icon: AlertTriangle,
    title: "Contamination Kills Recycling",
    tip: "One dirty container can contaminate an entire batch. Always rinse food containers and remove labels when possible.",
    color: "orange"
  },
  {
    icon: Leaf,
    title: "Know Your Local Rules",
    tip: "Recycling rules vary by location. Check your local facility's guidelines - what's accepted in one city may not be in another.",
    color: "blue"
  },
  {
    icon: BookOpen,
    title: "Read the Numbers",
    tip: "Look for the recycling symbol with numbers 1-7. Lower numbers (1,2) are most recyclable, higher numbers (6,7) are least recyclable.",
    color: "purple"
  },
  {
    icon: Lightbulb,
    title: "Plastic-Free Alternatives",
    tip: "Glass, stainless steel, bamboo, and paper alternatives often have lower environmental impact than even recycled plastic.",
    color: "amber"
  },
  {
    icon: Recycle,
    title: "Check for Special Programs",
    tip: "Many items like plastic bags, electronics, and batteries have special collection programs at stores or community centers.",
    color: "cyan"
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

const difficultyColors = {
  Beginner: "bg-green-100 text-green-700",
  Intermediate: "bg-yellow-100 text-yellow-700",
  Advanced: "bg-red-100 text-red-700"
};

export const EducationalContent: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'articles' | 'plastic-guide'>('articles');

  return (
    <div className="space-y-6 p-4 md:p-0">
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Educational Hub</h1>
        <p className="text-gray-600 text-sm md:text-base">
          Master sustainable practices, learn from success stories, and discover innovative solutions
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-col sm:flex-row gap-2 bg-gray-100 p-1 rounded-lg">
        <Button
          variant={selectedTab === 'articles' ? 'default' : 'ghost'}
          onClick={() => setSelectedTab('articles')}
          className="flex-1"
        >
          <BookOpen className="h-4 w-4 mr-2" />
          Articles & Stories
        </Button>
        <Button
          variant={selectedTab === 'plastic-guide' ? 'default' : 'ghost'}
          onClick={() => setSelectedTab('plastic-guide')}
          className="flex-1"
        >
          <Recycle className="h-4 w-4 mr-2" />
          Plastic Types Guide
        </Button>
      </div>

      {/* Articles Tab */}
      {selectedTab === 'articles' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {educationalArticles.map((article) => {
              const IconComponent = categoryIcons[article.category as keyof typeof categoryIcons];
              const colorClass = categoryColors[article.category as keyof typeof categoryColors];
              const difficultyColor = difficultyColors[article.difficulty as keyof typeof difficultyColors];
              
              return (
                <Card key={article.id} className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader className="p-0">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-40 md:h-48 object-cover rounded-t-lg"
                    />
                  </CardHeader>
                  <CardContent className="p-4 flex flex-col h-full">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge className={colorClass}>
                        <IconComponent className="h-3 w-3 mr-1" />
                        {article.category.replace('_', ' ')}
                      </Badge>
                      <Badge className={difficultyColor} variant="outline">
                        {article.difficulty}
                      </Badge>
                    </div>
                    <span className="text-xs text-gray-500 mb-2">{article.readTime}</span>
                    <CardTitle className="text-base md:text-lg mb-2 flex-grow">{article.title}</CardTitle>
                    <p className="text-gray-600 text-xs md:text-sm mb-3 flex-grow">{article.content}</p>
                    <Button variant="outline" size="sm" className="w-full">
                      Read More <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Plastic Guide Tab */}
      {selectedTab === 'plastic-guide' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {plasticGuide.map((plastic, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row">
                    <img
                      src={plastic.image}
                      alt={plastic.name}
                      className="w-full sm:w-32 h-32 object-cover"
                    />
                    <div className="p-4 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <h3 className="font-bold text-sm md:text-base">{plastic.code}</h3>
                        <Badge variant={plastic.recyclable ? "default" : "destructive"}>
                          {plastic.recyclable ? "Recyclable" : "Not Recyclable"}
                        </Badge>
                      </div>
                      <p className="text-xs md:text-sm text-gray-600 mb-2">{plastic.name}</p>
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs font-medium text-gray-700">Common Items:</p>
                          <p className="text-xs text-gray-600">{plastic.commonItems.join(", ")}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-700">How to Handle:</p>
                          <p className="text-xs text-gray-600">{plastic.howToRecycle}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-green-700">Pro Tip:</p>
                          <p className="text-xs text-green-600">{plastic.tips}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Quick Tips Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Essential Recycling Tips</CardTitle>
          <p className="text-sm text-gray-600">Master these fundamentals for maximum environmental impact</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickTips.map((tip, index) => {
              const colorClasses = {
                green: "bg-green-50 border-green-200 text-green-800",
                blue: "bg-blue-50 border-blue-200 text-blue-800",
                purple: "bg-purple-50 border-purple-200 text-purple-800",
                orange: "bg-orange-50 border-orange-200 text-orange-800",
                amber: "bg-amber-50 border-amber-200 text-amber-800",
                cyan: "bg-cyan-50 border-cyan-200 text-cyan-800"
              };
              
              return (
                <div key={index} className={`p-4 rounded-lg border-2 ${colorClasses[tip.color as keyof typeof colorClasses]}`}>
                  <div className="flex items-start gap-3">
                    <tip.icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-sm md:text-base mb-2">{tip.title}</h3>
                      <p className="text-xs md:text-sm">{tip.tip}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Additional Resources Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Take Action Today</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gradient-to-b from-green-50 to-green-100 rounded-lg">
              <Recycle className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <h3 className="font-semibold text-green-800 mb-1">Start Scanning</h3>
              <p className="text-xs md:text-sm text-green-700">
                Use our AI scanner to identify and properly sort your plastic items
              </p>
            </div>
            <div className="text-center p-4 bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg">
              <Award className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <h3 className="font-semibold text-blue-800 mb-1">Join Community</h3>
              <p className="text-xs md:text-sm text-blue-700">
                Share your knowledge and learn from other eco-conscious users
              </p>
            </div>
            <div className="text-center p-4 bg-gradient-to-b from-purple-50 to-purple-100 rounded-lg">
              <Lightbulb className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <h3 className="font-semibold text-purple-800 mb-1">Track Progress</h3>
              <p className="text-xs md:text-sm text-purple-700">
                Monitor your eco-points and environmental impact over time
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
