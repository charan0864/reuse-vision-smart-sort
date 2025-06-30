
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Recycle, AlertTriangle, Lightbulb, Users, TrendingUp, Factory, Leaf, Globe, Zap } from 'lucide-react';

const educationalArticles = [
  {
    id: '1',
    title: 'Complete Guide to Plastic Recycling Codes',
    category: 'Basics',
    content: 'Master the 7 plastic recycling codes, their properties, recycling processes, and environmental impact. Learn to identify each type and make informed recycling decisions.',
    image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    likes: 127,
    views: 2340,
    icon: <Recycle className="h-5 w-5" />,
    detailed_content: 'This comprehensive guide covers all seven plastic types: PET (#1) - bottles and containers, HDPE (#2) - milk jugs and detergent bottles, PVC (#3) - pipes and vinyl products, LDPE (#4) - bags and films, PP (#5) - yogurt containers and caps, PS (#6) - foam and disposables, and Other (#7) - mixed plastics. Each section includes molecular structure, common uses, recycling processes, and environmental considerations.',
    reading_time: '12 min read',
    difficulty: 'Beginner'
  },
  {
    id: '2',
    title: 'Ocean Plastic Crisis: Facts and Solutions',
    category: 'Environment',
    content: 'Explore the devastating impact of plastic pollution on marine ecosystems, microplastics in the food chain, and innovative cleanup technologies making a difference.',
    image_url: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
    likes: 189,
    views: 3120,
    icon: <AlertTriangle className="h-5 w-5" />,
    detailed_content: 'Every year, 8 million metric tons of plastic enter our oceans. This article examines the Great Pacific Garbage Patch, microplastic contamination in seafood, impact on marine life, and breakthrough solutions like The Ocean Cleanup project, plastic-eating enzymes, and advanced filtration systems.',
    reading_time: '15 min read',
    difficulty: 'Intermediate'
  },
  {
    id: '3',
    title: 'Advanced Plastic Preparation for Maximum Recycling',
    category: 'Tips',
    content: 'Professional-grade techniques for cleaning, sorting, and preparing plastics to achieve 95%+ recycling efficiency. Includes contamination prevention and quality optimization.',
    image_url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop',
    likes: 234,
    views: 4560,
    icon: <Lightbulb className="h-5 w-5" />,
    detailed_content: 'Learn temperature-specific cleaning methods, adhesive removal techniques, multi-material separation, quality grading systems, and how to achieve food-grade recycling standards. Includes industrial insights and home application methods.',
    reading_time: '10 min read',
    difficulty: 'Advanced'
  },
  {
    id: '4',
    title: 'Global Community Recycling Success Stories',
    category: 'Community',
    content: 'Discover how communities worldwide achieved 90%+ recycling rates through innovative programs, citizen engagement, and policy changes that you can implement locally.',
    image_url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop',
    likes: 156,
    views: 2890,
    icon: <Users className="h-5 w-5" />,
    detailed_content: 'Case studies from Kamikatsu, Japan (99% recycling rate), Sweden\'s waste-to-energy programs, Germany\'s Green Dot system, and grassroots initiatives in developing countries. Includes implementation guides and policy frameworks.',
    reading_time: '18 min read',
    difficulty: 'Intermediate'
  },
  {
    id: '5',
    title: 'Revolutionary Plastic Recycling Technologies 2024',
    category: 'Innovation',
    content: 'Cutting-edge chemical recycling, AI-powered sorting systems, enzyme-based breakdown, and molecular recycling technologies transforming the industry.',
    image_url: 'https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?w=400&h=300&fit=crop',
    likes: 298,
    views: 5210,
    icon: <TrendingUp className="h-5 w-5" />,
    detailed_content: 'Explore pyrolysis and gasification technologies, PETase enzyme developments, AI vision systems achieving 99% sorting accuracy, blockchain tracking systems, and molecular recycling achieving infinite loops.',
    reading_time: '20 min read',
    difficulty: 'Advanced'
  },
  {
    id: '6',
    title: 'Industrial Plastic Manufacturing and Sustainability',
    category: 'Industry',
    content: 'How major manufacturers are redesigning products for circularity, reducing virgin plastic use by 80%, and implementing closed-loop production systems.',
    image_url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
    likes: 167,
    views: 3450,
    icon: <Factory className="h-5 w-5" />,
    detailed_content: 'Analysis of Coca-Cola\'s 100% recyclable packaging initiative, Unilever\'s refillable systems, automotive industry\'s recycled plastic integration, and design-for-recycling principles.',
    reading_time: '14 min read',
    difficulty: 'Intermediate'
  },
  {
    id: '7',
    title: 'Biodegradable Plastics: Promise and Reality',
    category: 'Innovation',
    content: 'Comprehensive analysis of bioplastics, PLA, PHA, and starch-based alternatives. Understanding decomposition conditions, industrial composting, and environmental trade-offs.',
    image_url: 'https://images.unsplash.com/photo-1463594373139-e5e8ac7b80e9?w=400&h=300&fit=crop',
    likes: 203,
    views: 3890,
    icon: <Leaf className="h-5 w-5" />,
    detailed_content: 'Deep dive into bioplastic types, composting requirements, marine biodegradability myths, lifecycle assessments, and when traditional recycling remains superior.',
    reading_time: '16 min read',
    difficulty: 'Advanced'
  },
  {
    id: '8',
    title: 'Global Plastic Policy and Legislation',
    category: 'Policy',
    content: 'Navigate the complex landscape of plastic regulations, international agreements, extended producer responsibility, and how policies drive recycling innovation.',
    image_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
    likes: 134,
    views: 2670,
    icon: <Globe className="h-5 w-5" />,
    detailed_content: 'Analysis of EU\'s Single-Use Plastics Directive, China\'s National Sword policy impact, plastic credits trading systems, and emerging legislation in developing nations.',
    reading_time: '13 min read',
    difficulty: 'Intermediate'
  },
  {
    id: '9',
    title: 'Energy Recovery from Non-Recyclable Plastics',
    category: 'Energy',
    content: 'When recycling isn\'t possible, learn about waste-to-energy systems, plasma gasification, and how non-recyclable plastics can still contribute to sustainability.',
    image_url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=300&fit=crop',
    likes: 145,
    views: 2980,
    icon: <Zap className="h-5 w-5" />,
    detailed_content: 'Technical overview of incineration with energy recovery, plasma arc gasification, refuse-derived fuel production, and environmental safeguards in energy recovery.',
    reading_time: '11 min read',
    difficulty: 'Advanced'
  }
];

const categories = ['All', 'Basics', 'Environment', 'Tips', 'Community', 'Innovation', 'Industry', 'Policy', 'Energy'];

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
          Comprehensive knowledge base for plastic recycling, sustainability, and environmental impact
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
                className="cursor-pointer text-xs md:text-sm px-3 py-1 hover:bg-green-50 transition-colors"
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
          <Card key={article.id} className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
            <div className="relative overflow-hidden">
              <img
                src={article.image_url}
                alt={article.title}
                className="w-full h-40 md:h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-200"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.src = '/placeholder.svg';
                }}
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <Badge variant="secondary" className="text-xs">
                  {article.category}
                </Badge>
                <Badge variant="outline" className="text-xs bg-white/90">
                  {article.difficulty}
                </Badge>
              </div>
              <div className="absolute bottom-3 right-3">
                <Badge variant="outline" className="text-xs bg-white/90">
                  {article.reading_time}
                </Badge>
              </div>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-base md:text-lg leading-tight flex items-start gap-2 group-hover:text-green-600 transition-colors">
                {article.icon}
                <span>{article.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-xs md:text-sm mb-3 leading-relaxed">
                {article.content}
              </p>
              
              {/* Detailed Preview */}
              <div className="bg-gray-50 rounded-lg p-3 mb-4 border">
                <p className="text-xs text-gray-700 line-clamp-3">
                  {article.detailed_content}
                </p>
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    👍 {article.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    👁️ {article.views}
                  </span>
                </div>
                <Badge variant="outline" className="text-xs hover:bg-green-50 transition-colors">
                  Read Full Article
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Advanced Learning Resources */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl text-green-800">
            <BookOpen className="h-5 w-5 md:h-6 md:w-6" />
            Professional Recycling Mastery Guide
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <h4 className="font-semibold text-sm md:text-base text-green-800">Advanced Identification</h4>
                  <p className="text-xs md:text-sm text-green-700">Master visual, tactile, and burn tests for 99% accuracy</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <h4 className="font-semibold text-sm md:text-base text-green-800">Professional Cleaning</h4>
                  <p className="text-xs md:text-sm text-green-700">Industrial-grade preparation techniques and quality standards</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <h4 className="font-semibold text-sm md:text-base text-green-800">Market Knowledge</h4>
                  <p className="text-xs md:text-sm text-green-700">Understand plastic commodities, pricing, and demand cycles</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                <div>
                  <h4 className="font-semibold text-sm md:text-base text-green-800">System Optimization</h4>
                  <p className="text-xs md:text-sm text-green-700">Design efficient collection and processing workflows</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
