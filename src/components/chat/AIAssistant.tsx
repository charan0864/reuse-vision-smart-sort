
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Send, Bot, User, Lightbulb, AlertCircle, Recycle, Leaf, Factory, Globe, Smartphone } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const expertTopics = [
  {
    id: '1',
    title: 'Plastic Identification Help',
    description: 'Get help identifying unknown plastic types and recycling codes',
    icon: <AlertCircle className="h-4 w-4" />,
    color: 'bg-blue-50 border-blue-200 text-blue-800'
  },
  {
    id: '2',
    title: 'Recycling Best Practices',
    description: 'Learn optimal preparation and sorting techniques',
    icon: <Recycle className="h-4 w-4" />,
    color: 'bg-green-50 border-green-200 text-green-800'
  },
  {
    id: '3',
    title: 'Environmental Impact Assessment',
    description: 'Understand the ecological effects of different plastics',
    icon: <Leaf className="h-4 w-4" />,
    color: 'bg-emerald-50 border-emerald-200 text-emerald-800'
  },
  {
    id: '4',
    title: 'Industrial Recycling Processes',
    description: 'Deep dive into mechanical and chemical recycling',
    icon: <Factory className="h-4 w-4" />,
    color: 'bg-purple-50 border-purple-200 text-purple-800'
  },
  {
    id: '5',
    title: 'Global Recycling Policies',
    description: 'Navigate international regulations and standards',
    icon: <Globe className="h-4 w-4" />,
    color: 'bg-indigo-50 border-indigo-200 text-indigo-800'
  },
  {
    id: '6',
    title: 'Sustainable Alternatives',
    description: 'Explore eco-friendly plastic alternatives and innovations',
    icon: <Lightbulb className="h-4 w-4" />,
    color: 'bg-yellow-50 border-yellow-200 text-yellow-800'
  }
];

export const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI recycling assistant with specialized knowledge in plastic identification, recycling guidelines, environmental impact, and sustainability. I'm trained on the latest recycling science and can provide detailed, topic-specific guidance. How can I help you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response with enhanced training
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateEnhancedAIResponse(inputMessage),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateEnhancedAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Plastic Identification Help
    if (input.includes('identify') || input.includes('what plastic') || input.includes('plastic type')) {
      return "🔍 **Plastic Identification Guide:**\n\n**Look for the recycling symbol** (triangle with number):\n• **#1 PET** - Clear bottles, food containers\n• **#2 HDPE** - Milk jugs, detergent bottles\n• **#3 PVC** - Pipes, medical tubing\n• **#4 LDPE** - Plastic bags, squeezable bottles\n• **#5 PP** - Yogurt containers, bottle caps\n• **#6 PS** - Foam containers, disposable cups\n• **#7 Other** - Mixed plastics, electronics\n\n**No symbol?** Check texture: flexible = likely LDPE/HDPE, rigid clear = likely PET, opaque = likely PP/HDPE.";
    }
    
    if (input.includes('pet') || input.includes('#1')) {
      return "♻️ **PET (Polyethylene Terephthalate) #1 - Highly Recyclable!**\n\n**Common items:** Water bottles, soda bottles, food containers, polyester clothing\n**Recycling rate:** 85% in many regions\n**Preparation:** Remove caps, rinse clean, remove labels when possible\n**New products:** New bottles (closed-loop), polyester fiber, carpeting, fleece clothing\n**Environmental benefit:** 1 recycled PET bottle saves enough energy to power a 60W light bulb for 3 hours\n**Quality:** Can be recycled 7-9 times before quality degrades significantly.";
    }
    
    if (input.includes('hdpe') || input.includes('#2')) {
      return "♻️ **HDPE (High-Density Polyethylene) #2 - Widely Recyclable**\n\n**Common items:** Milk jugs, detergent bottles, shampoo bottles, playground equipment\n**Recycling rate:** 30% globally\n**Preparation:** Rinse thoroughly, keep caps ON (they're usually HDPE too)\n**New products:** New bottles, plastic lumber, drainage pipes, outdoor furniture\n**Durability:** Extremely durable - can be recycled indefinitely without significant quality loss\n**Tip:** White/natural HDPE has higher value than colored versions.";
    }

    // Recycling Best Practices
    if (input.includes('best practices') || input.includes('how to recycle') || input.includes('preparation')) {
      return "🎯 **Recycling Best Practices - The 3 R's Plus:**\n\n**1. CLEAN:** Rinse containers to remove food residue (a little soap is OK)\n**2. SEPARATE:** Sort by plastic type and color when possible\n**3. REMOVE:** Take off non-recyclable parts (metal springs, different plastic types)\n**4. CHECK:** Verify acceptance with local facility - rules vary by location\n**5. TIMING:** Don't let recyclables sit dirty - bacteria makes processing harder\n\n**Pro Tips:**\n• Caps ON for bottles #1 and #2\n• Flatten containers to save space\n• Never bag recyclables unless specifically required\n• When in doubt, throw it out - contamination hurts the whole batch";
    }

    // Environmental Impact Assessment
    if (input.includes('environmental') || input.includes('impact') || input.includes('microplastic') || input.includes('ocean')) {
      return "🌍 **Environmental Impact Assessment:**\n\n**Ocean Pollution:** 8 million tons of plastic enter oceans annually\n**Microplastics:** Found in 83% of tap water globally, take 450+ years to decompose\n**Carbon Footprint:** Recycling 1 ton of plastic saves 2 tons of CO2 equivalent\n**Wildlife Impact:** 700+ species affected by plastic pollution\n\n**Reduction Strategies:**\n• Choose refillable containers\n• Use water filters vs. bottled water\n• Select products with minimal packaging\n• Support brands using recycled content\n\n**Positive Impact:** Recycling 1 plastic bottle saves enough energy to power a laptop for 25 minutes!";
    }

    // Industrial Recycling Processes
    if (input.includes('industrial') || input.includes('mechanical') || input.includes('chemical') || input.includes('process')) {
      return "🏭 **Industrial Recycling Processes:**\n\n**Mechanical Recycling:**\n• Shredding → Washing → Melting → Pelletizing\n• Maintains polymer structure\n• Can reduce quality over cycles\n• Most common for PET and HDPE\n\n**Chemical Recycling:**\n• Depolymerization breaks down to molecular level\n• Creates virgin-quality material\n• Higher energy cost but infinite recyclability\n• Growing for hard-to-recycle plastics\n\n**Advanced Sorting:**\n• Near-infrared spectroscopy identifies plastic types\n• Air classification separates by density\n• AI-powered robots sort by visual recognition\n\n**Quality Control:** Multiple wash cycles, contamination detection, polymer testing ensure food-grade output.";
    }

    // Global Recycling Policies
    if (input.includes('policy') || input.includes('regulation') || input.includes('global') || input.includes('law')) {
      return "🌐 **Global Recycling Policies & Regulations:**\n\n**Extended Producer Responsibility (EPR):**\n• Manufacturers responsible for product lifecycle\n• Implemented in EU, Canada, parts of US\n• Drives design for recyclability\n\n**Key Policies:**\n• **EU Single-Use Plastics Directive:** Bans certain items, requires 90% bottle collection\n• **China's National Sword:** Restricted plastic waste imports globally\n• **Basel Convention:** Controls international plastic waste trade\n• **California SB 54:** Requires 65% packaging reduction by 2032\n\n**Emerging Trends:**\n• Plastic credits and carbon offsetting\n• Mandatory recycled content requirements\n• Digital product passports for traceability";
    }

    // Sustainable Alternatives
    if (input.includes('alternative') || input.includes('biodegradable') || input.includes('compostable') || input.includes('sustainable')) {
      return "🌱 **Sustainable Plastic Alternatives:**\n\n**Bioplastics:**\n• **PLA (Polylactic Acid):** Made from corn/sugarcane, industrially compostable\n• **PHA (Polyhydroxyalkanoates):** Marine biodegradable, made by bacteria\n• **Starch-based:** Home compostable, dissolves in water\n\n**Non-Plastic Alternatives:**\n• Glass (infinitely recyclable)\n• Aluminum (90% recyclability rate)\n• Paper/cardboard (renewable, biodegradable)\n• Bamboo fiber (fast-growing, compostable)\n\n**Innovation Spotlight:**\n• Seaweed packaging (edible!)\n• Mushroom mycelium materials\n• Recycled ocean plastic products\n• Plant-based bottles from agricultural waste\n\n**Choosing Wisely:** Check end-of-life options - 'biodegradable' doesn't always mean home compostable!";
    }

    // Default comprehensive response
    return "Based on current recycling science and environmental research, here's what I recommend:\n\n🔬 **For plastic identification:** Look for the recycling number in the triangle symbol, check texture and flexibility\n\n♻️ **For recycling prep:** Clean thoroughly, sort by type, remove non-recyclable components\n\n🌍 **Environmental consideration:** Every recycled item reduces landfill waste and saves energy\n\n📚 **Want specific guidance?** Ask about:\n• Identifying unknown plastic types\n• Local recycling guidelines\n• Environmental impact data\n• Industrial processing methods\n• Policy updates\n• Sustainable alternatives\n\nWhat specific aspect would you like me to explain in detail?";
  };

  const handleTopicClick = (topic: typeof expertTopics[0]) => {
    const topicMessage = `Tell me about ${topic.title.toLowerCase()}`;
    setInputMessage(topicMessage);
  };

  return (
    <div className="space-y-4 md:space-y-6 p-2 md:p-0">
      <div className="text-center">
        <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">AI Assistant</h1>
        <p className="text-gray-600 text-xs md:text-base">
          Get expert guidance on plastic recycling, sustainability, and environmental impact
        </p>
      </div>

      {/* Expert Consultation Topics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base md:text-xl">
            <Lightbulb className="h-4 w-4 md:h-6 md:w-6" />
            Expert Consultation Topics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
            {expertTopics.map((topic) => (
              <Card 
                key={topic.id} 
                className={`cursor-pointer hover:shadow-md transition-all duration-200 ${topic.color} border-2`}
                onClick={() => handleTopicClick(topic)}
              >
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-start gap-2 md:gap-3">
                    <div className="mt-1">
                      {topic.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-xs md:text-sm mb-1">{topic.title}</h4>
                      <p className="text-xs opacity-80">{topic.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="h-80 md:h-[500px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <MessageSquare className="h-4 w-4 md:h-5 md:w-5" />
            Chat with AI Assistant
            <Badge variant="outline" className="ml-auto">
              <Smartphone className="h-3 w-3 mr-1" />
              Mobile Optimized
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col h-full">
          <ScrollArea className="flex-1 mb-3 md:mb-4 p-2 md:p-4 border rounded-lg bg-gray-50">
            <div className="space-y-3 md:space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 md:gap-3 ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`flex gap-2 max-w-[85%] md:max-w-[80%] ${
                      message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-xs md:text-sm flex-shrink-0">
                      {message.sender === 'user' ? <User className="h-3 w-3 md:h-4 md:w-4" /> : <Bot className="h-3 w-3 md:h-4 md:w-4" />}
                    </div>
                    <div
                      className={`rounded-lg p-2 md:p-3 text-xs md:text-sm whitespace-pre-line ${
                        message.sender === 'user'
                          ? 'bg-green-600 text-white'
                          : 'bg-white border shadow-sm'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2">
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-xs md:text-sm">
                      <Bot className="h-3 w-3 md:h-4 md:w-4" />
                    </div>
                    <div className="bg-white border shadow-sm rounded-lg p-2 md:p-3 text-xs md:text-sm">
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about plastic recycling, identification, or environmental impact..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 text-xs md:text-sm"
            />
            <Button onClick={handleSendMessage} disabled={isLoading || !inputMessage.trim()} size="sm">
              <Send className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
