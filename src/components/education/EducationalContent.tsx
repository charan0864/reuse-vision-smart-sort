
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Recycle, AlertTriangle, Lightbulb, Users, TrendingUp, Factory, Leaf, Globe, Zap, Target, Award, Shield, Cpu } from 'lucide-react';

const educationalArticles = [
  {
    id: '1',
    title: 'Complete Guide to Plastic Recycling Codes',
    category: 'Basics',
    content: 'Master the 7 plastic recycling codes, their properties, recycling processes, and environmental impact. Learn to identify each type and make informed recycling decisions.',
    image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    likes: 342,
    views: 8940,
    icon: <Recycle className="h-5 w-5" />,
    detailed_content: 'This comprehensive guide covers all seven plastic types: PET (#1) - bottles and containers with 85% recycling rate, HDPE (#2) - milk jugs and detergent bottles with 30% recycling rate, PVC (#3) - pipes and vinyl products (rarely recycled), LDPE (#4) - bags and films requiring special collection, PP (#5) - yogurt containers with growing acceptance, PS (#6) - foam and disposables (limited recycling), and Other (#7) - mixed plastics including bioplastics. Each section includes molecular structure diagrams, thermal properties, chemical resistance data, and detailed recycling facility requirements.',
    reading_time: '12 min read',
    difficulty: 'Beginner'
  },
  {
    id: '2',
    title: 'Ocean Plastic Crisis: Facts and Solutions',
    category: 'Environment',
    content: 'Explore the devastating impact of plastic pollution on marine ecosystems, microplastics in the food chain, and innovative cleanup technologies making a difference.',
    image_url: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
    likes: 567,
    views: 15230,
    icon: <AlertTriangle className="h-5 w-5" />,
    detailed_content: 'Every year, 8 million metric tons of plastic enter our oceans, creating 5 major garbage patches. The Great Pacific Garbage Patch spans 1.6 million km². This article examines microplastic concentrations (5.25 trillion particles), impact on 700+ marine species, bioaccumulation in seafood (up to 90 particles per gram), and breakthrough solutions including The Ocean Cleanup\'s System 002 (collecting 20,000 kg), plastic-eating enzymes PETase and MHETase, advanced membrane filtration achieving 99.9% removal rates, and AI-powered beach cleanup robots.',
    reading_time: '18 min read',
    difficulty: 'Intermediate'
  },
  {
    id: '3',
    title: 'Advanced Plastic Preparation for Maximum Recycling',
    category: 'Tips',
    content: 'Professional-grade techniques for cleaning, sorting, and preparing plastics to achieve 95%+ recycling efficiency. Includes contamination prevention and quality optimization.',
    image_url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop',
    likes: 478,
    views: 12670,
    icon: <Lightbulb className="h-5 w-5" />,
    detailed_content: 'Learn temperature-specific cleaning methods (40°C for PET, 60°C for HDPE), adhesive removal using citrus-based solvents, multi-material separation techniques including density separation (0.9-1.4 g/cm³), optical sorting criteria, quality grading systems from A (food-grade) to D (energy recovery), and how to achieve FDA food-contact standards. Includes industrial Near-Infrared Spectroscopy principles, contamination thresholds (< 100 ppm for food-grade), and home application methods for 15+ plastic types.',
    reading_time: '14 min read',
    difficulty: 'Advanced'
  },
  {
    id: '4',
    title: 'Global Community Recycling Success Stories',
    category: 'Community',
    content: 'Discover how communities worldwide achieved 90%+ recycling rates through innovative programs, citizen engagement, and policy changes that you can implement locally.',
    image_url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop',
    likes: 623,
    views: 18940,
    icon: <Users className="h-5 w-5" />,
    detailed_content: 'Case studies from Kamikatsu, Japan (99.1% recycling rate with 45 categories), Sweden\'s waste-to-energy programs (4.5 million tonnes annually), Germany\'s Green Dot system (€1.7 billion revenue), Taiwan\'s pay-as-you-throw program (55% waste reduction), and grassroots initiatives in Kenya (plastic-to-fuel conversion), India (waste-picker integration), and Brazil (reverse vending machines). Includes step-by-step implementation guides, policy frameworks, funding mechanisms, and measurable impact metrics.',
    reading_time: '22 min read',
    difficulty: 'Intermediate'
  },
  {
    id: '5',
    title: 'Revolutionary Plastic Recycling Technologies 2024',
    category: 'Innovation',
    content: 'Cutting-edge chemical recycling, AI-powered sorting systems, enzyme-based breakdown, and molecular recycling technologies transforming the industry.',
    image_url: 'https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?w=400&h=300&fit=crop',
    likes: 789,
    views: 24580,
    icon: <TrendingUp className="h-5 w-5" />,
    detailed_content: 'Explore pyrolysis systems operating at 400-800°C with 80% yield rates, gasification technologies achieving 2,000°C plasma temperatures, PETase enzyme developments by Carbios achieving 90% depolymerization, MHETase variants with 10x faster breakdown rates, AI vision systems using hyperspectral imaging achieving 99.5% sorting accuracy, blockchain tracking systems with real-time material flow monitoring, molecular recycling creating infinite loops with virgin-quality output, and bio-based plastic alternatives with 6-month composting cycles.',
    reading_time: '25 min read',
    difficulty: 'Advanced'
  },
  {
    id: '6',
    title: 'Industrial Plastic Manufacturing and Sustainability',
    category: 'Industry',
    content: 'How major manufacturers are redesigning products for circularity, reducing virgin plastic use by 80%, and implementing closed-loop production systems.',
    image_url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
    likes: 445,
    views: 13250,
    icon: <Factory className="h-5 w-5" />,
    detailed_content: 'Analysis of Coca-Cola\'s 100% recyclable packaging initiative (50 billion bottles annually), Unilever\'s refillable systems reducing packaging by 75%, automotive industry\'s recycled plastic integration (BMW\'s 25% recycled content target), Patagonia\'s closed-loop fleece production, and design-for-recycling principles including mono-material packaging, removable adhesives, standardized polymer families, and digital watermarking for automated sorting. Includes lifecycle assessments, carbon footprint reductions (up to 70%), and supply chain optimization strategies.',
    reading_time: '16 min read',
    difficulty: 'Intermediate'
  },
  {
    id: '7',
    title: 'Biodegradable Plastics: Promise and Reality',
    category: 'Innovation',
    content: 'Comprehensive analysis of bioplastics, PLA, PHA, and starch-based alternatives. Understanding decomposition conditions, industrial composting, and environmental trade-offs.',
    image_url: 'https://images.unsplash.com/photo-1463594373139-e5e8ac7b80e9?w=400&h=300&fit=crop',
    likes: 567,
    views: 16890,
    icon: <Leaf className="h-5 w-5" />,
    detailed_content: 'Deep dive into bioplastic types: PLA requiring 58°C industrial composting (180-day breakdown), PHA marine-biodegradable (6-month ocean degradation), starch-based plastics with 90-day soil composting, PBS/PBAT blends for flexible packaging, and cellulose acetate for films. Covers composting infrastructure requirements, marine biodegradability testing standards (ASTM D6400), lifecycle assessment comparisons showing 20-60% carbon reduction, cost analysis ($2-5/kg vs $1.20/kg conventional), and performance limitations including heat resistance and barrier properties.',
    reading_time: '19 min read',
    difficulty: 'Advanced'
  },
  {
    id: '8',
    title: 'Global Plastic Policy and Legislation',
    category: 'Policy',
    content: 'Navigate the complex landscape of plastic regulations, international agreements, extended producer responsibility, and how policies drive recycling innovation.',
    image_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
    likes: 398,
    views: 11670,
    icon: <Globe className="h-5 w-5" />,
    detailed_content: 'Analysis of EU\'s Single-Use Plastics Directive banning 10 items by 2021, China\'s National Sword policy reducing contamination limits to 0.5%, Extended Producer Responsibility programs covering 30+ countries, plastic credits trading systems ($50-200/tonne), deposit systems achieving 85-95% return rates, and emerging legislation including Canada\'s single-use ban, India\'s Extended Producer Responsibility rules, and Africa\'s plastic bag bans in 34 countries. Includes policy effectiveness metrics, economic impact assessments, and implementation timelines.',
    reading_time: '17 min read',
    difficulty: 'Intermediate'
  },
  {
    id: '9',
    title: 'Energy Recovery from Non-Recyclable Plastics',
    category: 'Energy',
    content: 'When recycling isn\'t possible, learn about waste-to-energy systems, plasma gasification, and how non-recyclable plastics can still contribute to sustainability.',
    image_url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=300&fit=crop',
    likes: 334,
    views: 9870,
    icon: <Zap className="h-5 w-5" />,
    detailed_content: 'Technical overview of incineration with energy recovery achieving 25-30% electrical efficiency, plasma arc gasification at 3,000-10,000°C producing synthesis gas, refuse-derived fuel production with 15-25 MJ/kg energy content, pyrolysis oil with heating value of 40-44 MJ/kg, and environmental safeguards including emission controls removing 99.9% of dioxins, mercury capture systems, and ash treatment protocols. Includes energy yield calculations, environmental monitoring data, and comparison with landfill methane emissions (25x CO2 equivalent impact).',
    reading_time: '13 min read',
    difficulty: 'Advanced'
  },
  {
    id: '10',
    title: 'Microplastics: Detection, Impact, and Prevention',
    category: 'Environment',
    content: 'Understanding the invisible threat of microplastics in our environment, food chain, and bodies. Learn detection methods and prevention strategies.',
    image_url: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&h=300&fit=crop',
    likes: 612,
    views: 19340,
    icon: <Target className="h-5 w-5" />,
    detailed_content: 'Microplastics (< 5mm) are found in 83% of tap water samples, 90% of sea salt brands, and 100% of beer samples tested. Detection methods include Raman spectroscopy, FTIR analysis, and new AI-powered imaging achieving 95% accuracy. Health impacts include endocrine disruption from BPA/phthalates, immune system activation, and potential blood-brain barrier crossing. Prevention strategies cover synthetic textile washing (releasing 700,000 fibers per wash), tire wear particles (28% of ocean microplastics), and personal care products phase-out. Includes filtration technologies, policy responses, and emerging biodegradation solutions.',
    reading_time: '16 min read',
    difficulty: 'Intermediate'
  },
  {
    id: '11',
    title: 'Circular Economy Models for Plastic Waste',
    category: 'Innovation',
    content: 'Explore successful circular economy implementations, cradle-to-cradle design principles, and business models that eliminate plastic waste.',
    image_url: 'https://images.unsplash.com/photo-1532601491451-af6aeb684bae?w=400&h=300&fit=crop',
    likes: 445,
    views: 14520,
    icon: <Award className="h-5 w-5" />,
    detailed_content: 'Circular economy principles applied to plastics: Ellen MacArthur Foundation\'s New Plastics Economy initiative involving 400+ organizations, Interface Inc.\'s Mission Zero achieving carbon neutrality, Patagonia\'s Worn Wear program extending product life 2x, and TerraCycle\'s specialized recycling for 200+ waste streams. Business models include product-as-a-service reducing material use by 80%, deposit-return systems achieving 90%+ collection rates, industrial symbiosis networks, and blockchain-enabled material passports. Includes economic impact analysis showing $120 billion annual opportunity and job creation potential of 700,000 positions.',
    reading_time: '20 min read',
    difficulty: 'Advanced'
  },
  {
    id: '12',
    title: 'Plastic Additives: Safety, Function, and Recycling Challenges',
    category: 'Basics',
    content: 'Deep dive into plastic additives including stabilizers, colorants, and plasticizers. Understand their impact on recyclability and human health.',
    image_url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
    likes: 267,
    views: 8940,
    icon: <Shield className="h-5 w-5" />,
    detailed_content: 'Comprehensive analysis of 3,000+ plastic additives: UV stabilizers (benzotriazoles, benzophenones) preventing degradation, plasticizers like phthalates (40% of additive market), flame retardants (brominated compounds), colorants affecting sorting accuracy, and antioxidants (BHT, Irganox). Health concerns include endocrine disruption from phthalates (detected in 95% of urine samples), migration rates into food (up to 60 mg/kg), and accumulation in recycled products. Recycling challenges include color contamination, additive concentration limits, and separation technologies. Includes safer alternatives, regulatory frameworks (REACH, FDA), and detection methods.',
    reading_time: '15 min read',
    difficulty: 'Advanced'
  },
  {
    id: '13',
    title: 'AI and Machine Learning in Waste Management',
    category: 'Innovation',
    content: 'How artificial intelligence is revolutionizing waste sorting, route optimization, and predictive maintenance in recycling facilities.',
    image_url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop',
    likes: 523,
    views: 17860,
    icon: <Cpu className="h-5 w-5" />,
    detailed_content: 'AI applications in waste management: computer vision systems achieving 99% sorting accuracy using convolutional neural networks, predictive maintenance reducing downtime by 35%, route optimization algorithms decreasing collection costs by 20%, and robotic sorting systems operating at 4,000 picks/hour. Machine learning models for contamination prediction, demand forecasting for recycled materials, and automated quality control. Case studies include AMP Robotics\' AI sorting robots deployed in 200+ facilities, Greyparrot\'s waste analytics platform processing 300+ waste streams, and smart bins using IoT sensors for optimal collection timing. Includes technical specifications, ROI analysis, and implementation strategies.',
    reading_time: '18 min read',
    difficulty: 'Advanced'
  },
  {
    id: '14',
    title: 'Packaging Design for Recyclability',
    category: 'Industry',
    content: 'Learn design principles that maximize recyclability, reduce material use, and maintain product protection. Includes industry standards and testing methods.',
    image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
    likes: 389,
    views: 12450,
    icon: <Target className="h-5 w-5" />,
    detailed_content: 'Design for recycling principles: mono-material construction increasing recycling rates by 40%, removable adhesives using water-based formulations, barrier coatings compatible with recycling streams, and standardized polymer families. Testing protocols include wash-off tests for labels (ASTM D1681), density separation trials, and contamination assessments. Industry standards covering APR Design Guidelines, CEFLEX recommendations for flexible packaging, and EUROPEN design guidelines. Case studies include Coca-Cola\'s CanCollar elimination, Procter & Gamble\'s removable sleeve technology, and Danone\'s mono-material yogurt cups. Includes material selection matrices, compatibility charts, and economic optimization models.',
    reading_time: '14 min read',
    difficulty: 'Intermediate'
  },
  {
    id: '15',
    title: 'Chemical Recycling vs Mechanical Recycling',
    category: 'Innovation',
    content: 'Compare mechanical and chemical recycling technologies, their applications, economics, and environmental impacts. Understand when each method is optimal.',
    image_url: 'https://images.unsplash.com/photo-1581093458791-9d42e4d8b2b4?w=400&h=300&fit=crop',
    likes: 456,
    views: 15670,
    icon: <Recycle className="h-5 w-5" />,
    detailed_content: 'Mechanical recycling processes: shredding, washing, melting with 20-30% material loss per cycle and 2-6 cycle limits before quality degradation. Chemical recycling methods: depolymerization achieving infinite recyclability, pyrolysis converting mixed plastics to oils (70-80% yield), gasification producing synthesis gas, and solvolysis breaking polymer bonds. Economics comparison: mechanical recycling at $200-400/tonne vs chemical recycling at $600-1,200/tonne. Environmental analysis shows mechanical recycling using 80% less energy, while chemical recycling handles contaminated streams. Applications include mechanical for clean, single-polymer waste and chemical for mixed, contaminated, or degraded plastics. Includes technology readiness levels, scalability assessments, and hybrid processing approaches.',
    reading_time: '21 min read',
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

      {/* Enhanced Category Filter */}
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
          <div className="mt-4 text-sm text-gray-500 flex items-center justify-between">
            <span>
              Showing {filteredArticles.length} articles
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            </span>
            <span>
              Total views: {filteredArticles.reduce((sum, article) => sum + article.views, 0).toLocaleString()}
            </span>
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
              
              {/* Enhanced Detailed Preview */}
              <div className="bg-gray-50 rounded-lg p-3 mb-4 border">
                <p className="text-xs text-gray-700 line-clamp-4">
                  {article.detailed_content}
                </p>
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    👍 {article.likes.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    👁️ {article.views.toLocaleString()}
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

      {/* Enhanced Professional Learning Resources */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl text-green-800">
            <BookOpen className="h-5 w-5 md:h-6 md:w-6" />
            Professional Recycling Mastery Program
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <h4 className="font-semibold text-sm md:text-base text-green-800">Advanced Identification</h4>
                  <p className="text-xs md:text-sm text-green-700">Master visual, tactile, burn, and spectroscopic tests for 99.5% accuracy across 50+ plastic types</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <h4 className="font-semibold text-sm md:text-base text-green-800">Industrial Processing</h4>
                  <p className="text-xs md:text-sm text-green-700">Learn mechanical and chemical recycling, quality grading, contamination control, and facility operations</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <h4 className="font-semibold text-sm md:text-base text-green-800">Market Analysis</h4>
                  <p className="text-xs md:text-sm text-green-700">Understand global commodity markets, pricing models, supply chains, and emerging technologies</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                <div>
                  <h4 className="font-semibold text-sm md:text-base text-green-800">System Design</h4>
                  <p className="text-xs md:text-sm text-green-700">Design efficient collection networks, processing workflows, and circular economy implementations</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Learning Statistics */}
          <div className="mt-6 pt-6 border-t border-green-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">15+</div>
                <div className="text-sm text-green-700">Comprehensive Modules</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">250+</div>
                <div className="text-sm text-green-700">Research Studies</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">50+</div>
                <div className="text-sm text-green-700">Industry Case Studies</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">1000+</div>
                <div className="text-sm text-green-700">Technical Resources</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Reference Guide */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl text-blue-800">
            <Target className="h-5 w-5 md:h-6 md:w-6" />
            Quick Reference: Plastic Types at a Glance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { code: '1', name: 'PET', recycling: '85%', uses: 'Bottles, containers', color: 'bg-blue-100' },
              { code: '2', name: 'HDPE', recycling: '30%', uses: 'Milk jugs, detergent', color: 'bg-green-100' },
              { code: '3', name: 'PVC', recycling: '< 1%', uses: 'Pipes, flooring', color: 'bg-red-100' },
              { code: '4', name: 'LDPE', recycling: '5%', uses: 'Bags, films', color: 'bg-yellow-100' },
              { code: '5', name: 'PP', recycling: '1%', uses: 'Yogurt cups, caps', color: 'bg-purple-100' },
              { code: '6', name: 'PS', recycling: '< 1%', uses: 'Foam, disposables', color: 'bg-orange-100' }
            ].map((plastic) => (
              <div key={plastic.code} className={`${plastic.color} rounded-lg p-3 border`}>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="font-bold">#{plastic.code}</Badge>
                  <span className="text-sm font-semibold">{plastic.recycling} recycled</span>
                </div>
                <h4 className="font-bold text-sm">{plastic.name}</h4>
                <p className="text-xs text-gray-600">{plastic.uses}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
